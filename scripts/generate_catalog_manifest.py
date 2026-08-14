import os
import json

BASE_DIR = "public/images/catalog_v2"
OUT_FILE = "src/lib/data/catalog_manifest.json"

categories = {}

for root, dirs, files in os.walk(BASE_DIR):
    rel_folder = os.path.relpath(root, BASE_DIR)
    category_name = "General / Miscelánea" if rel_folder == "." else rel_folder
    
    img_files = []
    for f in sorted(files):
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) and not f.startswith('.'):
            web_path = "/images/catalog_v2/" + (rel_folder + "/" + f if rel_folder != "." else f)
            img_files.append({
                "name": f,
                "path": web_path,
                "label": os.path.splitext(f)[0].replace("-", " ").replace("_", " ")
            })
    
    if img_files:
        categories[category_name] = img_files

os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
with open(OUT_FILE, "w", encoding="utf-8") as f:
    json.dump(categories, f, indent=2, ensure_ascii=False)

total_imgs = sum(len(v) for v in categories.values())
print(f"Generated manifest with {len(categories)} categories and {total_imgs} images at {OUT_FILE}")
