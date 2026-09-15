from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
from email.message import EmailMessage
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()
api_router = APIRouter(prefix="/api")

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
RSVP_NOTIFY_TO = os.environ.get("RSVP_NOTIFY_TO", "piyush.madnani6d@gmail.com")
RSVP_NOTIFY_FROM = os.environ.get("RSVP_NOTIFY_FROM", SMTP_USER)


class RsvpCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    phone: str = Field(default="", max_length=40)
    attendance: Literal["accept", "decline"]
    guests: int = Field(default=1, ge=1, le=20)
    events: List[str] = Field(default_factory=list)
    message: str = Field(default="", max_length=1000)


def _format_rsvp_email(doc: dict) -> EmailMessage:
    attending = doc["attendance"] == "accept"
    headline = "Joyfully accepting" if attending else "Regretfully declining"

    lines = [
        f"{headline} — {doc['name']}",
        "",
        f"Name:       {doc['name']}",
        f"Phone:      {doc['phone'] or '—'}",
        f"Attending:  {'Yes' if attending else 'No'}",
    ]
    if attending:
        lines.append(f"Guests:     {doc['guests']}")
        lines.append(f"Events:     {', '.join(doc['events']) if doc['events'] else '—'}")
    lines += [
        f"Message:    {doc['message'] or '—'}",
        "",
        f"Received:   {doc['created_at']}",
        f"Ref:        {doc['id']}",
    ]

    msg = EmailMessage()
    msg["Subject"] = f"RSVP — {doc['name']} ({'attending' if attending else 'not attending'})"
    msg["From"] = RSVP_NOTIFY_FROM
    msg["To"] = RSVP_NOTIFY_TO
    msg.set_content("\n".join(lines))
    return msg


def send_rsvp_email(doc: dict) -> None:
    """Email the RSVP to the couple. Runs in a worker thread; never raises."""
    if not (SMTP_USER and SMTP_PASSWORD and RSVP_NOTIFY_FROM):
        logger.warning("SMTP not configured — skipping RSVP email for %s", doc["id"])
        return
    try:
        msg = _format_rsvp_email(doc)
        if SMTP_PORT == 465:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=20) as smtp:
                smtp.login(SMTP_USER, SMTP_PASSWORD)
                smtp.send_message(msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as smtp:
                smtp.starttls()
                smtp.login(SMTP_USER, SMTP_PASSWORD)
                smtp.send_message(msg)
        logger.info("RSVP email sent for %s", doc["id"])
    except Exception:
        logger.exception("Failed to send RSVP email for %s", doc["id"])


@api_router.get("/")
async def root():
    return {"message": "Arushi & Piyush wedding invitation API"}


@api_router.post("/rsvp")
async def create_rsvp(input: RsvpCreate, background_tasks: BackgroundTasks):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    notify = dict(doc)
    await db.rsvps.insert_one(doc)
    background_tasks.add_task(send_rsvp_email, notify)
    return {"ok": True, "id": notify["id"]}


@api_router.get("/rsvp/summary")
async def rsvp_summary():
    rsvps = await db.rsvps.find({}, {"_id": 0, "attendance": 1, "guests": 1}).to_list(5000)
    accepting = sum(1 for r in rsvps if r.get("attendance") == "accept")
    guests = sum(int(r.get("guests", 1)) for r in rsvps if r.get("attendance") == "accept")
    return {
        "responses": len(rsvps),
        "accepting": accepting,
        "declining": len(rsvps) - accepting,
        "expected_guests": guests,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
