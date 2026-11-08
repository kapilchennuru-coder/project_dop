# The Story That Stayed (2017–2026)

A personal storytelling website, made by Kapil for Maddirevula Charitha.

## Run it on your computer

You need [Node.js](https://nodejs.org) version 20.19 or newer, installed once.

```
npm install
npm run dev
```

Then open the address it prints, usually http://localhost:5173. To open it on your phone, connect the phone to the same Wi-Fi and use the "Network" address it prints.

## Change the words

Every message on the site is in [src/data/storyContent.ts](src/data/storyContent.ts). Edit the text between the quotes and save.

## Prepare it for sharing

```
npm run build
```

This creates a `dist` folder, which works on any static host such as Netlify, Vercel or Cloudflare Pages.

To get the picture in the WhatsApp preview, build with your final address set. WhatsApp ignores relative image links.

```
$env:SITE_URL = "https://your-site-address"; npm run build
```

Anyone with the link can open the site, and it asks search engines not to list it.

## Photographs and music

Photographs are freely licensed images, listed in [CREDITS.md](CREDITS.md) and in the site's footer. None of them show Kapil, Maddirevula Charitha, or their school. Replacements go in `public/images`, with details in `src/data/imageManifest.json`.

The music is original and generated in the browser, so there is no audio file. It never plays until the music button is pressed.
