from __future__ import annotations

import io
import json
import re
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_PATH = ROOT / "script.js"
PDF_PATH = ROOT / "Art Catalog Fanie Simon.pdf"
SOURCE_IMAGES = ROOT / "assets" / "artworks"
OUTPUT_DIR = Path(__file__).resolve().parent
IMAGE_DIR = OUTPUT_DIR / "images"
CATALOG_PATH = OUTPUT_DIR / "catalog.json"
README_PATH = OUTPUT_DIR / "README.md"

BACKGROUND_THRESHOLD = 254
PADDING = 28

PDF_COMPONENTS = {
    "citlalicue": (17, (68, 300, 1665, 1898)),
    "chantico": (17, (1826, 324, 3412, 1882)),
    "huipil-maya-ii": (20, (134, 153, 1883, 1119)),
    "huipil-maya-iii": (20, (1643, 1387, 3381, 2343)),
    "chalchiuhtotolin": (30, (94, 321, 1650, 1868)),
    "ometeotl": (30, (1835, 336, 3399, 1861)),
    "cihuacoatl": (32, (110, 320, 1640, 1839)),
    "el-ojo": (32, (1854, 296, 3387, 1828)),
    "el-ojo-ii": (33, (120, 325, 1622, 1827)),
    "el-ojo-iii": (33, (1863, 308, 3389, 1838)),
    "oxomoco": (39, (127, 355, 1619, 1855)),
    "huitzilopochtli-ii": (39, (1864, 359, 3389, 1801)),
}


def parse_js_value(raw: str):
    raw = raw.strip().rstrip(",")
    if raw == "null":
        return None
    if raw == "true":
        return True
    if raw == "false":
        return False
    if re.fullmatch(r"-?\d+", raw):
        return int(raw)
    if re.fullmatch(r"-?\d+\.\d+", raw):
        return float(raw)
    if raw.startswith('"') and raw.endswith('"'):
        return raw[1:-1]
    return raw


def parse_artworks(script_text: str):
    pattern = re.compile(r'art\("([^"]+)",\s*"([^"]+)",\s*\{(.*?)\}\),', re.S)
    artworks = []
    for match in pattern.finditer(script_text):
        record = {"id": match.group(1), "title": match.group(2)}
        body = match.group(3)
        for line in body.splitlines():
            line = line.strip()
            if not line or ":" not in line:
                continue
            key, value = line.split(":", 1)
            record[key.strip()] = parse_js_value(value.strip())
        artworks.append(record)
    return artworks


def flood_fill_background(arr: np.ndarray) -> np.ndarray:
    rgb = arr[:, :, :3]
    candidate = np.all(rgb >= BACKGROUND_THRESHOLD, axis=2)
    h, w = candidate.shape
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()

    def push(y: int, x: int):
        if candidate[y, x] and not visited[y, x]:
            visited[y, x] = True
            queue.append((y, x))

    for x in range(w):
        push(0, x)
        push(h - 1, x)
    for y in range(h):
        push(y, 0)
        push(y, w - 1)

    while queue:
        y, x = queue.popleft()
        if y > 0:
            push(y - 1, x)
        if y + 1 < h:
            push(y + 1, x)
        if x > 0:
            push(y, x - 1)
        if x + 1 < w:
            push(y, x + 1)

    arr = arr.copy()
    arr[:, :, 3][visited] = 0
    return arr


def connected_components(mask: np.ndarray):
    h, w = mask.shape
    visited = np.zeros((h, w), dtype=bool)
    components = []

    for y in range(h):
        row = mask[y]
        for x in np.flatnonzero(row):
            if visited[y, x]:
                continue
            queue = deque([(y, x)])
            visited[y, x] = True
            area = 0
            min_x = max_x = x
            min_y = max_y = y
            while queue:
                cy, cx = queue.popleft()
                area += 1
                if cx < min_x:
                    min_x = cx
                if cx > max_x:
                    max_x = cx
                if cy < min_y:
                    min_y = cy
                if cy > max_y:
                    max_y = cy
                ny = cy - 1
                if ny >= 0 and mask[ny, cx] and not visited[ny, cx]:
                    visited[ny, cx] = True
                    queue.append((ny, cx))
                ny = cy + 1
                if ny < h and mask[ny, cx] and not visited[ny, cx]:
                    visited[ny, cx] = True
                    queue.append((ny, cx))
                nx = cx - 1
                if nx >= 0 and mask[cy, nx] and not visited[cy, nx]:
                    visited[cy, nx] = True
                    queue.append((cy, nx))
                nx = cx + 1
                if nx < w and mask[cy, nx] and not visited[cy, nx]:
                    visited[cy, nx] = True
                    queue.append((cy, nx))
            bbox_area = max(1, (max_x - min_x + 1) * (max_y - min_y + 1))
            compactness = area / bbox_area
            score = (area ** 1.15) * compactness
            components.append(
                {
                    "area": area,
                    "bbox": (min_x, min_y, max_x, max_y),
                    "score": score,
                }
            )

    return components


def crop_component(img: Image.Image) -> Image.Image:
    arr = np.array(img.convert("RGBA"))
    arr = flood_fill_background(arr)
    alpha = arr[:, :, 3] > 0
    if not alpha.any():
        return Image.fromarray(arr)

    components = connected_components(alpha)
    if components:
        components.sort(key=lambda c: (c["score"], c["area"]), reverse=True)
        chosen = components[0]["bbox"]
        x0, y0, x1, y1 = chosen
    else:
        ys, xs = np.nonzero(alpha)
        x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()

    x0 = max(0, x0 - PADDING)
    y0 = max(0, y0 - PADDING)
    x1 = min(arr.shape[1] - 1, x1 + PADDING)
    y1 = min(arr.shape[0] - 1, y1 + PADDING)

    cropped = arr[y0 : y1 + 1, x0 : x1 + 1]
    return Image.fromarray(cropped, mode="RGBA")


def trim_transparent_bounds(img: Image.Image) -> Image.Image:
    arr = np.array(img.convert("RGBA"))
    alpha = arr[:, :, 3] > 0
    if not alpha.any():
        return Image.fromarray(arr)

    ys, xs = np.nonzero(alpha)
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()
    return Image.fromarray(arr[y0 : y1 + 1, x0 : x1 + 1], mode="RGBA")


def load_pdf_page_image(page_number: int) -> Image.Image:
    reader = PdfReader(PDF_PATH)
    page = reader.pages[page_number - 1]
    xobjects = page["/Resources"]["/XObject"].get_object()
    best = None
    best_size = -1

    for _, obj in xobjects.items():
        obj = obj.get_object()
        if obj.get("/Subtype") != "/Image":
            continue
        data = obj.get_data()
        size = len(data)
        if size > best_size:
            best = data
            best_size = size

    if best is None:
        raise ValueError(f"No image found on PDF page {page_number}")

    return Image.open(io.BytesIO(best)).convert("RGBA")


def build_pdf_component(record: dict) -> Image.Image:
    page_number, bbox = PDF_COMPONENTS[record["id"]]
    page_img = load_pdf_page_image(page_number)
    cropped = page_img.crop(bbox)
    arr = np.array(cropped.convert("RGBA"))
    arr = flood_fill_background(arr)
    return trim_transparent_bounds(Image.fromarray(arr, mode="RGBA"))


def build_image(record: dict) -> str:
    if record.get("id") in PDF_COMPONENTS:
        cropped = build_pdf_component(record)
    else:
        source_name = Path(record["image"]).name if record.get("image") else None
        if not source_name:
            return ""
        source_path = SOURCE_IMAGES / source_name
        if not source_path.exists():
            return ""
        img = Image.open(source_path)
        cropped = crop_component(img)
    output_path = IMAGE_DIR / f'{record["id"]}.png'
    cropped.save(output_path)
    return str(output_path.relative_to(ROOT))


def main():
    script_text = SCRIPT_PATH.read_text(encoding="utf-8")
    artworks = parse_artworks(script_text)

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    output_records = []
    for record in artworks:
        # Build a clean, transparent PNG for every artwork that has a source image.
        image_png = build_image(record)
        output_records.append(
            {
                "id": record.get("id"),
                "title": record.get("title"),
                "status": record.get("status") or "available",
                "year": record.get("year"),
                "materials": record.get("materials") or "Mixed media with wood",
                "dimensions": record.get("dimensions"),
                "price": record.get("price"),
                "shape": record.get("shape"),
                "page": record.get("page"),
                "note": record.get("note"),
                "sourceState": record.get("sourceState") or "confirmed",
                "sourceImage": record.get("image"),
                "imagePng": image_png,
            }
        )

    CATALOG_PATH.write_text(
        json.dumps(output_records, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    stats = {
        "count": len(output_records),
        "with_images": sum(1 for item in output_records if item["imagePng"]),
        "without_images": sum(1 for item in output_records if not item["imagePng"]),
    }

    README_PATH.write_text(
        "\n".join(
            [
                "# Source Database",
                "",
                "Clean per-piece artwork database generated from the catalogue source data.",
                "",
                f"- Records: {stats['count']}",
                f"- PNGs generated: {stats['with_images']}",
                f"- Missing source images: {stats['without_images']}",
                "",
                "Files:",
                "- `catalog.json`",
                "- `images/*.png`",
                "",
                "Regenerate with:",
                "",
                "```bash",
                "python3 source-database/build_source_database.py",
                "```",
            ]
        ),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
