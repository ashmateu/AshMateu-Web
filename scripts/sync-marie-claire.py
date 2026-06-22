#!/usr/bin/env python3
"""
Sync notas de Ash Mateu en Marie Claire → Supabase posts
Uso: python3 sync-marie-claire.py
Requiere: SB_SERVICE_KEY en entorno o en ~/.ashmateu_sb_key
"""

import os, re, json, html, sys, urllib.request, urllib.parse
from datetime import datetime

SUPABASE_URL = "https://jrxklahobxpxmtnncvst.supabase.co"
ANON_KEY     = "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd"
MC_AUTHOR    = "https://marieclaire.perfil.com/autores/ashmateu"

def get_service_key():
    key = os.environ.get("SB_SERVICE_KEY", "")
    if not key:
        path = os.path.expanduser("~/.ashmateu_sb_key")
        if os.path.exists(path):
            key = open(path).read().strip()
    if not key:
        sys.exit("ERROR: SB_SERVICE_KEY no definida. Guardala en ~/.ashmateu_sb_key")
    return key

def fetch(url, headers=None):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0",
        **(headers or {})
    })
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode("utf-8", errors="replace")

def supabase_get(key, path):
    return json.loads(fetch(f"{SUPABASE_URL}{path}", {
        "apikey": key, "Authorization": f"Bearer {key}"
    }))

def supabase_post(key, path, data):
    body = json.dumps(data).encode()
    req = urllib.request.Request(
        f"{SUPABASE_URL}{path}", data=body,
        headers={
            "apikey": key, "Authorization": f"Bearer {key}",
            "Content-Type": "application/json", "Prefer": "return=minimal"
        }, method="POST"
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.status

def extract_articles(page_html):
    """Extrae artículos de la página de autora."""
    links = re.findall(
        r'href="(https://marieclaire\.perfil\.com/noticias/[^"]+\.phtml)"[^>]*>\s*([^<]{10,})',
        page_html
    )
    seen, articles = set(), []
    for url, title in links:
        title = html.unescape(title.strip())
        if url not in seen:
            seen.add(url)
            articles.append({"url": url, "title": title})
    return articles

def fetch_article_meta(url):
    """Extrae excerpt e imagen de portada de un artículo."""
    try:
        body = fetch(url)
        # og:description como excerpt
        m = re.search(r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\'](.*?)["\']', body)
        excerpt = html.unescape(m.group(1).strip()) if m else ""
        # og:image como cover
        m = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\'](.*?)["\']', body)
        cover = m.group(1).strip() if m else ""
        # published_time
        m = re.search(r'<meta[^>]+property=["\']article:published_time["\'][^>]+content=["\'](.*?)["\']', body)
        pub = m.group(1).strip() if m else datetime.utcnow().isoformat() + "Z"
        return excerpt, cover, pub
    except Exception as e:
        print(f"  WARN: no se pudo parsear {url}: {e}")
        return "", "", datetime.utcnow().isoformat() + "Z"

def main():
    key = get_service_key()
    print(f"[{datetime.now():%Y-%m-%d %H:%M}] Iniciando sync Marie Claire...")

    # Slugs existentes en DB
    existing = {r["slug"] for r in supabase_get(key, "/rest/v1/posts?select=slug")}
    print(f"  Posts existentes en DB: {len(existing)}")

    # Scrapear página autora
    page = fetch(MC_AUTHOR)
    articles = extract_articles(page)
    print(f"  Artículos encontrados en MC: {len(articles)}")

    new_posts = []
    for a in articles:
        slug = a["url"].split("/")[-1].replace(".phtml", "")
        if slug in existing:
            continue
        print(f"  NUEVO: {a['title'][:60]}")
        excerpt, cover, pub = fetch_article_meta(a["url"])
        new_posts.append({
            "slug": slug,
            "title": a["title"],
            "excerpt": excerpt,
            "cover_url": cover,
            "published_at": pub,
            "active": True
        })

    if not new_posts:
        print("  Sin novedades.")
        return

    status = supabase_post(key, "/rest/v1/posts", new_posts)
    print(f"  Insertados {len(new_posts)} posts (HTTP {status}).")

if __name__ == "__main__":
    main()
