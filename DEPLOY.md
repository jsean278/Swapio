# How to Deploy Swapio on Cloudflare

## You saw this error?

> *This uploader does not yet support projects that require a build process. It looks like you're trying to upload a project with a wrangler config file. Please use `wrangler deploy` instead.*

**Dashboard zip upload cannot deploy this project with Telegram forms.** Use one of the options below.

---

## Option 1: GitHub + Cloudflare (easiest, no terminal)

1. Go to [github.com/new](https://github.com/new) → create a repo named `swapio`
2. Click **Upload files** → drag everything from the `swapio` folder → **Commit**
3. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
4. Select your `swapio` repo
5. Build settings:
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
6. **Save and Deploy**
7. **Settings → Environment variables** → add (encrypted):
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHANNEL_ID`
8. **Deployments → Retry deployment**

Forms + Telegram will work. The `functions/` folder is included automatically.

---

## Option 2: Wrangler CLI (terminal)

```bash
npm install -g wrangler
wrangler login
cd swapio
wrangler pages deploy . --project-name=swapio
wrangler pages secret put TELEGRAM_BOT_TOKEN --project-name=swapio
wrangler pages secret put TELEGRAM_CHANNEL_ID --project-name=swapio
wrangler pages deploy . --project-name=swapio
```

---

## Option 3: Dashboard zip (static only — forms WON'T work)

Use **`swapio-static.zip`** on your Desktop — it has no `wrangler.toml` or `functions/` folder.

- Site pages will load
- **Swap/contact forms will fail** (no Telegram backend)

Only use this if you just want to preview the design without forms.