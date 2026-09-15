import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path("/app/frontend/public/images")
OUT.mkdir(parents=True, exist_ok=True)

STYLE = (
    "Elegant hand-painted watercolour illustration for a luxury Indian wedding invitation suite. "
    "Visible watercolour brush texture, soft imperfect fine ink outlines, muted natural palette of deep forest green, "
    "marigold orange, saffron yellow, antique temple gold and vermillion red, on a plain warm ivory background (hex #FAF6F0). "
    "Generous negative space, sophisticated editorial composition, South Indian wedding aesthetic. "
    "No text, no words, no letters, no numbers, no human faces. "
)

IMAGES = [
    ("hero-frame.png", STYLE + "Subject: an ornamental hanging border along the TOP edge of the canvas only — traditional Indian toran of marigold flower garlands and white jasmine strings with small brass temple bells and banana leaf tips, draping gently downward in a graceful swag, corners hanging slightly lower. Bottom two-thirds of the canvas stays plain empty ivory."),
    ("couple.png", STYLE + "Subject: an Indian bride and groom seen from BEHIND walking away hand in hand; bride in a deep vermillion red silk saree with gold temple border and jasmine flowers woven into her long braid, groom in an ivory silk sherwani with a saffron stole; soft marigold petals drifting around them. Faces not visible."),
    ("story-1.png", STYLE + "Subject: two small brass tumblers of South Indian filter coffee with steam, resting on a fresh green banana leaf with a few white jasmine buds beside them."),
    ("story-2.png", STYLE + "Subject: a handwritten love letter folded on ivory silk cloth, sealed with deep red wax, a small brass oil lamp glowing beside it, scattered jasmine buds."),
    ("story-3.png", STYLE + "Subject: a winding garden path between tall banana plants, scattered marigold petals on the path and a small vintage leather suitcase resting at the side."),
    ("story-4.png", STYLE + "Subject: a courtyard evening with strings of warm festoon lights and marigold garlands overhead, brass urli bowls below filled with water, floating rose petals and jasmine."),
    ("story-5.png", STYLE + "Subject: two gold wedding rings resting on a fresh green betel leaf, white jasmine buds and a sprinkle of vermillion rose petals around them."),
    ("story-6.png", STYLE + "Subject: a traditional South Indian wedding mandap at dusk decorated with banana stalks, coconut fronds, marigold garlands and glowing brass oil lamps."),
    ("event-mehandi.png", STYLE + "Subject: a bride's two hands decorated with intricate henna mehandi patterns resting palms-down beside a brass bowl of golden turmeric paste, marigold flowers and mango leaves around. Only hands, no face."),
    ("event-cocktail.png", STYLE + "Subject: two elegant champagne coupes clinking with a gold engagement ring resting beside them, soft arrangement of ivory roses and jasmine, gentle evening sparkle."),
    ("event-wedding.png", STYLE + "Subject: a sacred wedding fire glowing in a brass havan kund in front of a floral mandap with banana stalks, hanging marigold garlands and small brass temple bells."),
    ("wardrobe-1.png", STYLE + "Subject: a flat-lay of elegant daytime festive Indian wear — a mustard yellow and deep green silk saree with thin gold border neatly draped, white jasmine flowers, green glass bangles and small gold jhumka earrings."),
    ("wardrobe-2.png", STYLE + "Subject: a flat-lay of bright playful mehandi outfits — sunshine yellow kurta fabric and a lehenga skirt in marigold orange, with floral jewellery made of white jasmine and orange marigold buds."),
    ("wardrobe-3.png", STYLE + "Subject: a flat-lay of elegant evening attire — deep emerald green and maroon silk fabrics with gold zari embroidery, a sherwani cloth swatch, kundan necklace and cufflinks."),
    ("closing.png", STYLE + "Subject: a decorative composition along the BOTTOM edge of the canvas only — banana leaves, clusters of marigold flowers, strings of white jasmine and two small brass temple bells arranged as a lush bottom border. Top two-thirds of the canvas stays plain empty ivory."),
]


async def generate(name: str, prompt: str) -> None:
    chat = LlmChat(
        api_key=os.environ["EMERGENT_LLM_KEY"],
        session_id=f"invite-{name}",
        system_message="You are a master watercolour illustrator for luxury Indian wedding stationery.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        (OUT / name).write_bytes(base64.b64decode(images[0]["data"]))
        print(f"OK {name}", flush=True)
    else:
        raise RuntimeError(f"no image returned: {str(text)[:80]}")


async def main() -> None:
    sem = asyncio.Semaphore(1)

    async def task(name: str, prompt: str) -> None:
        async with sem:
            if (OUT / name).exists():
                print(f"SKIP {name}", flush=True)
                return
            for attempt in range(4):
                try:
                    await generate(name, prompt)
                    await asyncio.sleep(6)
                    return
                except Exception as exc:
                    print(f"ERR {name} attempt {attempt + 1}: {str(exc)[:120]}", flush=True)
                    await asyncio.sleep(20)
            print(f"FAIL {name}", flush=True)

    await asyncio.gather(*(task(n, p) for n, p in IMAGES))
    print("DONE", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
