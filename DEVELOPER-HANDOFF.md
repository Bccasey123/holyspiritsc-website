# Developer Handoff — Holy Spirit Catholic Church Website

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [How to Make Common Edits](#3-how-to-make-common-edits)
4. [Design System](#4-design-system)
5. [Content Still Needed](#5-content-still-needed)
6. [How to Deploy](#6-how-to-deploy)

---

## 1. Project Overview

### What This Is

A full website redesign for **Holy Spirit Catholic Church**, a Catholic parish in Johns Island, South Carolina.

- **Address:** 3871 Betsy Kerrison Pkwy, Johns Island, SC 29455
- **Phone:** (843) 768-0357
- **Email:** office@holyspiritsc.org
- **Pastor:** Father Stephen Dyas
- **Diocese:** Diocese of Charleston

The site is designed to serve four main audiences: people new to the parish, people exploring the Catholic faith, registered parishioners, and people looking for ways to serve. The overall design philosophy is warm and inviting — prioritizing belonging over information density.

### Tech Stack

This is a **plain static HTML/CSS/JavaScript site**. There is no framework, no build tool, no package manager, and no server-side code. Every page is a standalone `.html` file.

- HTML5 (semantic, accessible markup)
- CSS3 (custom properties / variables, CSS Grid, Flexbox)
- Vanilla JavaScript (ES5-compatible IIFE, no dependencies)
- Google Fonts (loaded via `<link>` tag in every page head)

Future plans include migrating to [Astro](https://astro.build/) to eliminate the nav/footer copy-paste requirement.

### How to Run Locally

**Option 1 — VS Code Live Server (recommended)**

1. Open the project folder in VS Code
2. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) if you haven't already
3. Right-click `index.html` in the file explorer and choose "Open with Live Server"
4. The site opens at `http://127.0.0.1:5500` and auto-refreshes on save

**Option 2 — Any local HTTP server**

```bash
# Python 3
cd /path/to/holyspiritsc-website
python3 -m http.server 5500

# Node.js (if npx is available)
npx serve .
```

> **Important:** Do not open HTML files directly as `file://` paths. The absolute path links (`/worship/index.html`) used in subdirectory pages will break without a local server.

---

## 2. File Structure

```
holyspiritsc-website/
│
├── index.html              # Homepage — hero, mass times, pastor note, pillars, events, next steps
├── welcome.html            # Welcome / I'm New Here — pastor letter, journey paths, join parish, OCIA, FAQ
├── about.html              # About Us — mission, staff, history, long-range plan, location
├── contact.html            # Contact — SHELL, needs real content
├── events.html             # Events — SHELL, needs calendar embed
├── give.html               # Give / Stewardship — SHELL, needs giving platform link
├── style-guide.html        # Living style guide — all design system components for reference
│
├── css/
│   ├── style-guide.css     # DESIGN TOKENS — all CSS custom properties (colors, fonts, spacing)
│   └── style.css           # COMPONENT STYLES — imports style-guide.css, defines all classes
│
├── js/
│   └── nav.js              # Navigation JS — mobile hamburger toggle + dropdown menus
│
├── worship/
│   ├── index.html          # Mass Times — weekend/daily/confession/adoration schedule
│   ├── adoration.html      # Adoration — what it is, schedule, practical tips
│   ├── anointing.html      # Anointing of the Sick — when/how to receive, contact info
│   ├── baptism.html        # Baptism — infant and adult paths, FAQ
│   ├── confirmation.html   # Confirmation — teen prep, adult confirmation, 7 gifts
│   ├── first-communion.html# First Communion — Real Presence, prep process, eligibility
│   ├── funerals.html       # Funerals — step-by-step guide, liturgy options, cremation
│   ├── matrimony.html      # Weddings & Marriage — prep steps, convalidation, inquiry form
│   ├── prayer-requests.html# Prayer Requests — submission form
│   ├── reconciliation.html # Reconciliation / Confession — how it works, schedule, step-by-step
│   ├── music-ministry.html # Music Ministry — STUB, needs real content from parish
│   ├── livestream.html     # Livestream — STUB, needs platform link
│   └── homily-podcast.html # Homily Podcast — STUB, needs podcast feed/link
│
├── grow/
│   ├── index.html          # Grow hub — "There Is Always More", 4 pathway cards
│   ├── adult-formation.html# Adult Formation — 7 programs (Bible Study, Cursillo, Alpha, etc.)
│   ├── becoming-catholic.html # OCIA — journey steps, June/November 2026 gathering dates
│   ├── children-psr.html   # Children's PSR — "Forming Young Disciples", Pre-K through Grade 10 table
│   └── youth-ministry.html # Youth Ministry — "You Belong Here", 4 pillars, Confirmation info
│
├── serve/
│   ├── index.html          # Serve & Ministries — all 4 ministry categories, volunteer CTA
│   ├── ministries.html     # Redirect → serve/index.html (legacy URL support)
│   └── volunteer.html      # Redirect → serve/index.html (legacy URL support)
│
└── _partials/
    └── nav.html            # CANONICAL NAV — copy this when building new pages (see Section 3)
```

### Which Files Control Navigation

- **`_partials/nav.html`** — the authoritative source for the nav HTML. When the nav changes, update this file first, then copy the changes to every page.
- **`css/style.css`** — contains all nav styling (`.site-nav`, `.nav-links`, `.nav-dropdown`, mobile responsive breakpoints).
- **`js/nav.js`** — controls dropdown open/close behavior and the mobile hamburger toggle.

### Which Files Control Styles

- **`css/style-guide.css`** — the only place design tokens live. Change a color or font here and it updates everywhere.
- **`css/style.css`** — defines all component classes. Imports `style-guide.css` at the top via `@import`.
- **`style-guide.html`** — a visual reference page showing all components rendered in the browser. Open this to see what's available before writing new HTML.

---

## 3. How to Make Common Edits

### How to Update Text Content on Any Page

Every page is a self-contained HTML file. Open the file, find the text, change it, save. There is no CMS, no database, no template compilation step.

**Tips:**
- Use your editor's Find (`Cmd+F`) to locate the specific text
- Content sections are marked with HTML comments like `<!-- PASTOR WELCOME LETTER -->` and `<!-- FAQ -->`
- After saving, Live Server auto-refreshes the browser

### How to Change a Photo or Image

Currently, every image location uses a placeholder `<div>`:

```html
<div class="img-placeholder" style="height:200px;">
  Photo of Fr. Stephen Dyas coming soon
</div>
```

To replace with a real image:

1. Add the image file to the project (a folder like `img/` is recommended)
2. Replace the `<div class="img-placeholder">` with an `<img>` tag:

```html
<img src="img/fr-stephen-dyas.jpg"
     alt="Father Stephen Dyas, Pastor of Holy Spirit Catholic Church"
     style="width:100%; height:100%; object-fit:cover; border-radius: var(--hs-radius-lg);" />
```

**Image guidelines:**
- Photos of people: minimum 800px wide, square or portrait crop preferred
- Hero/banner images: minimum 1400px wide, landscape
- Optimize file sizes before uploading (use [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com))

### How to Add a New Event to the Events Page

`events.html` is currently a shell with a placeholder. Once a calendar solution is chosen (see Section 6), events will be embedded there. In the meantime, events on the **homepage** (`index.html`) are in the events section around line 230:

```html
<div class="event-card">
  <div class="event-card__date">June 2026 — Date TBD</div>
  <h3 class="event-card__title">OCIA Interest Gathering</h3>
  <p class="event-card__desc">...</p>
  <a href="grow/becoming-catholic.html" class="btn btn--ghost-dark btn--sm">Learn More</a>
</div>
```

Copy an existing `.event-card` block, paste it into the grid, and update the date, title, description, and link.

### How to Update Mass Times

Mass times appear in **four places**. Update all four when times change:

| File | Location |
|---|---|
| `worship/index.html` | The main schedule tables (the authoritative page) |
| `index.html` | The mass times card grid near the top (~line 79) |
| Every page footer | The "Mass Times" column in the 4-column footer |
| `welcome.html` | The FAQ item "What are the Mass times?" (~line 256) |

**Current schedule (as of build):**
- Weekend: Saturday 5:30 pm · Sunday 9:00 am & 11:00 am · Sunday (Spanish) 1:00 pm
- Daily: Monday–Friday 8:30 am · Saturday 9:00 am (Chapel)
- Confession: Monday–Friday 8:15–8:30 am · Saturday 3:30–5:00 pm · By appointment
- Adoration: Thursdays 7:30–8:30 am · First Fridays 9:00–10:00 am

### How to Update the Navigation Bar

The nav is copied inline into every page (it is not included via JavaScript). This means **updating the nav requires editing every file**.

**Workflow:**

1. Open `_partials/nav.html` — this is the canonical reference
2. Make your change there first and confirm it looks right
3. Copy the entire `<nav>...</nav>` block
4. Paste it into every `.html` file, replacing the existing nav block

**Important path rules:**
- Root-level pages (`index.html`, `welcome.html`, etc.) use **relative paths**: `href="worship/index.html"`
- Subdirectory pages (`worship/`, `grow/`, `serve/`) use **absolute paths**: `href="/worship/index.html"`
- Each page sets `aria-current="page"` on its own nav link for the active state underline

**To add a new top-level nav link**, add a `<li>` to the `<ul class="nav-links">` in `_partials/nav.html`, then propagate to all pages.

**To add a link to the Worship or Sacraments dropdown**, add a `<li><a href="...">Label</a></li>` inside the corresponding `.nav-dropdown__menu` list.

---

## 4. Design System

### Where CSS Variables Are Defined

All design tokens live in **`css/style-guide.css`** inside the `:root {}` block. Change a value there and it updates across the entire site automatically.

```css
/* Example tokens */
--hs-navy:    #1E3347;
--hs-gold:    #B8901F;
--hs-cream:   #FAF7F1;
--hs-stone:   #766556;
--hs-parchment: #EDE0CC;
```

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Navy | `#1E3347` | Primary text, nav bar, section backgrounds, footer |
| Gold | `#B8901F` | Eyebrow labels, accents, primary buttons, links |
| Cream | `#FAF7F1` | Alternate section backgrounds |
| Stone | `#766556` | Secondary text, captions |
| Parchment | `#EDE0CC` | Warm alternate section backgrounds |
| White | `#FFFFFF` | Primary page background, card backgrounds |

### Fonts

Both fonts are loaded from Google Fonts via `<link>` in every page `<head>`.

| Font | Variable | Usage |
|---|---|---|
| [Lora](https://fonts.google.com/specimen/Lora) | `--hs-font-heading` | All headings (h1–h4), blockquotes, pastor signatures |
| [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) | `--hs-font-body` | Body text, nav, captions, buttons, eyebrow labels |

### Key CSS Classes

| Class | What It Does |
|---|---|
| `.eyebrow` | Small gold uppercase label above section headings |
| `.section-heading` | Centered heading block (eyebrow + h2 + optional lead) |
| `.card-grid` | Responsive 4-column card grid (stacks on mobile) |
| `.ministry-grid` | Responsive 3-column grid for ministry cards |
| `.content-with-sidebar` | Two-column layout: main content + sidebar |
| `.section--navy` | Navy background section |
| `.section--cream` | Cream background section |
| `.section--parchment` | Parchment background section |
| `.btn--primary` | Gold background button (main CTA) |
| `.btn--secondary` | Navy background button |
| `.btn--ghost` | White outline button (for use on dark backgrounds) |
| `.btn--ghost-dark` | Navy outline button (for use on light backgrounds) |
| `.callout` | Highlighted parchment-background info box |
| `.steps-list` | Numbered step-by-step list with icons |
| `.faq` / `.faq__item` | FAQ section — question/answer pairs |

### How the Navigation Dropdowns Work

The Worship and Sacraments nav items are dropdowns controlled by `js/nav.js`. The pattern:

```html
<li class="nav-dropdown">
  <button class="nav-dropdown__trigger" aria-expanded="false" aria-haspopup="true">
    Worship <span class="nav-dropdown__arrow" aria-hidden="true">▾</span>
  </button>
  <ul class="nav-dropdown__menu" role="list">
    <li><a href="/worship/index.html">Mass Times</a></li>
    <!-- more links -->
  </ul>
</li>
```

**Behavior:**
- Clicking the trigger button toggles the `is-open` class on the parent `.nav-dropdown`
- Only one dropdown can be open at a time
- Clicking anywhere outside closes all dropdowns
- Pressing `Escape` closes all dropdowns
- On mobile, dropdowns expand inline within the full-screen overlay menu

---

## 5. Content Still Needed

The following real content needs to come from the parish before the site can go live. Items marked with a page reference indicate where the placeholder currently lives.

### Photos

- [ ] Fr. Stephen Dyas headshot — `index.html` (pastor note section), `welcome.html` (pastor letter section)
- [ ] Parish Administrator photo — `about.html`
- [ ] DRE (Director of Religious Education) photo — `about.html`
- [ ] Music Director photo — `about.html`
- [ ] Business Manager photo — `about.html`
- [ ] Administrative Assistant photo — `about.html`
- [ ] OCIA Coordinator photo — `about.html`
- [ ] Parish family / community photo — `index.html` (hero background or Life in Abundance section)
- [ ] Photo for OCIA Interest Gathering event card — `index.html`
- [ ] Photo for Couples Night event card — `index.html`
- [ ] Photo for Women's Retreat event card — `index.html`

### Staff Names

All six staff roles on `about.html` currently show `[Staff Name]` placeholders:

- [ ] Parish Administrator name
- [ ] DRE name
- [ ] Music Director name
- [ ] Business Manager name
- [ ] Administrative Assistant name
- [ ] OCIA Coordinator name

### Exact Dates

- [ ] OCIA Interest Gathering — June 2026 (exact date) — `welcome.html`, `grow/becoming-catholic.html`, `index.html`
- [ ] OCIA Interest Gathering — November 2026 (exact date) — same files
- [ ] Couples Night date — `index.html`
- [ ] Women's Retreat date in September 2026 — `index.html`
- [ ] Long Range Plan Town Hall date in September — `about.html`

### Council Members

- [ ] Finance Council member names — `about.html`
- [ ] Pastoral Council member names — `about.html`

### Social Media & Online Platforms

- [ ] Facebook page URL — all page footers (currently `href="#"`)
- [ ] Instagram URL — all page footers (currently `href="#"`)
- [ ] Online giving platform link (e.g., Pushpay, Flocknote, GiveCentral) — `give.html`
- [ ] Livestream platform link (YouTube, Facebook Live, etc.) — `worship/livestream.html`
- [ ] Homily podcast feed or link — `worship/homily-podcast.html`

### Pages Needing Full Content

- [ ] **`contact.html`** — needs real contact form, Google Maps embed, updated office info
- [ ] **`events.html`** — needs parish calendar embed (or list of upcoming events)
- [ ] **`give.html`** — needs giving platform link and stewardship copy
- [ ] **`worship/music-ministry.html`** — needs choir names, rehearsal schedule, how to join
- [ ] **`worship/livestream.html`** — needs platform link and embed code
- [ ] **`worship/homily-podcast.html`** — needs podcast player or link

### Email / Forms

- [ ] Email signup form on `index.html` (Stay Connected section) — currently `action="#"`. Needs a real email service (Mailchimp, Flocknote, etc.) with a form submission URL or embed code.
- [ ] All inquiry/prayer forms use `action="mailto:office@holyspiritsc.org"` — this works but opens the user's local email client. A form service like Formspree or Netlify Forms would be more reliable.

---

## 6. How to Deploy

This is a static site — no server-side configuration is needed. The recommended setup is **GitHub + Netlify**: code lives on GitHub, Netlify hosts it and rebuilds automatically on every push.

---

### Step 1 — Push the Project to GitHub

If the project is not already on GitHub, do this first.

1. Create a free account at [github.com](https://github.com) if you do not have one
2. Click the `+` icon in the top-right corner → **New repository**
3. Name it `holyspiritsc-website`, set it to **Private**, and click **Create repository**
4. In your terminal, navigate to the project folder and run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/holyspiritsc-website.git
git branch -M main
git push -u origin main
```

All files are now on GitHub. You only need to do this once.

---

### Step 2 — Deploy to Netlify from GitHub

1. Go to [netlify.com](https://netlify.com) and create a free account (sign in with GitHub for easiest setup)
2. From the Netlify dashboard, click **Add new site → Import an existing project**
3. Choose **GitHub** as the source
4. Authorize Netlify to access your GitHub account when prompted
5. Select the `holyspiritsc-website` repository from the list
6. On the build settings screen:
   - **Branch to deploy:** `main`
   - **Build command:** leave this blank (this is a plain HTML site, no build step)
   - **Publish directory:** leave this blank or enter `/` (the root folder)
7. Click **Deploy site**

Netlify will deploy the site in about 30 seconds. It will be live at a temporary URL like `https://random-name-123.netlify.app`. You can rename this under **Site Settings → Site details → Change site name**.

---

### Step 3 — Set Up Automatic Deploys (GitHub → Netlify)

This is configured automatically when you connect via GitHub in Step 2. Once it is set up:

- Every time anyone pushes a commit to the `main` branch on GitHub, Netlify detects the change and rebuilds the live site within about 60 seconds
- No manual upload or FTP is required
- You can monitor deploys in real time under the **Deploys** tab in the Netlify dashboard

**To verify it is working:**

1. Make a small change to any file (e.g., fix a typo in `index.html`)
2. Commit and push to GitHub:

```bash
git add index.html
git commit -m "Test deploy"
git push
```

3. Go to the Netlify dashboard → Deploys tab — you should see a new deploy running within a few seconds

---

### Step 4 — Connect the Custom Domain (holyspiritsc.org)

#### 4a. Add the Domain in Netlify

1. In the Netlify dashboard, go to **Site Settings → Domain management**
2. Click **Add a domain**
3. Enter `holyspiritsc.org` and click **Verify**
4. Also add `www.holyspiritsc.org` — Netlify will redirect `www` to the root domain automatically

Netlify will show you DNS instructions. Follow the steps for whichever situation applies below.

#### 4b. DNS Settings — Using Netlify DNS (Recommended)

The simplest approach is to point the domain's nameservers to Netlify. Netlify then manages all DNS for the domain.

1. In Netlify under Domain management, click **Set up Netlify DNS** and follow the prompts
2. Netlify will give you four nameserver addresses, for example:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   (Your exact nameservers will appear in the Netlify dashboard — use those, not these examples.)
3. Log in to wherever the domain `holyspiritsc.org` is registered (GoDaddy, Namecheap, Google Domains, etc.)
4. Find the **Nameservers** setting for the domain and replace the existing nameservers with the four Netlify nameservers
5. Save the changes

DNS propagation takes anywhere from a few minutes to 48 hours. Once it propagates, the site will be live at `holyspiritsc.org` and Netlify will provision a free SSL certificate (HTTPS) automatically.

#### 4c. DNS Settings — Manual A Record (If You Cannot Change Nameservers)

If you need to keep the domain's DNS managed elsewhere (e.g., at the registrar or at a hosting provider), you can point an A record to Netlify instead.

1. In Netlify under Domain management, note the **Netlify load balancer IP address** shown in the DNS instructions panel (it will look like `75.2.60.5` — use the exact IP Netlify shows you, as it may differ)
2. Log in to your domain registrar or DNS provider
3. Find the DNS records for `holyspiritsc.org` and make these changes:

| Type | Name | Value |
|---|---|---|
| A | `@` | Netlify load balancer IP (from Netlify dashboard) |
| CNAME | `www` | `[your-site-name].netlify.app` |

4. Delete any existing A records or CNAME records that point to the old host
5. Save and wait for DNS propagation (up to 48 hours)

---

### Situation A — Current Site Is on Wix

**Important:** Wix is a closed platform. You cannot host custom HTML files on Wix — Wix only hosts sites built inside its own editor. The new site must be hosted elsewhere (Netlify), and the domain must be pointed away from Wix.

#### If the domain was registered through Wix:

Wix-registered domains can have their nameservers changed from within the Wix dashboard.

1. Log in to Wix at [manage.wix.com](https://manage.wix.com)
2. Go to **Domains** in the left sidebar
3. Click on `holyspiritsc.org`
4. Click **Advanced** → **Nameservers**
5. Select **Use custom nameservers** and enter the four Netlify nameservers from Step 4b above
6. Save. DNS propagation may take up to 48 hours.

> After changing nameservers, the Wix site will go offline — this is expected. The new Netlify site will come online as DNS propagates.

#### If the domain is registered elsewhere but was pointed to Wix:

The domain's A records were previously set to Wix's IP addresses. You need to update those to point to Netlify instead.

1. Log in to your domain registrar (wherever `holyspiritsc.org` is registered — GoDaddy, Namecheap, etc.)
2. Find the DNS records
3. Delete the existing A records that point to Wix (Wix IPs look like `185.230.63.x` or similar)
4. Add the new A record pointing to Netlify as described in Step 4c above
5. Save and wait for propagation

---

### Situation B — Current Site Is on a Traditional Web Host (FTP)

If the parish currently has traditional web hosting (cPanel, Bluehost, SiteGround, etc.) and wants to use that same host for the new site, upload the files via FTP.

#### What you need first

- FTP hostname (e.g., `ftp.holyspiritsc.org`)
- FTP username
- FTP password
- The name of the public web root directory (usually `public_html`, `www`, or `httpdocs`)

Get these from the hosting provider's welcome email or their support team.

#### Upload via FTP using FileZilla (free)

1. Download and install [FileZilla](https://filezilla-project.org) (free FTP client)
2. Open FileZilla and enter your credentials in the Quickconnect bar at the top:
   - **Host:** your FTP hostname
   - **Username:** your FTP username
   - **Password:** your FTP password
   - **Port:** `21` (or `22` for SFTP)
3. Click **Quickconnect**
4. In the right panel (remote server), navigate to the public web root folder (`public_html` or `www`)
5. In the left panel (your local computer), navigate to the `holyspiritsc-website` project folder
6. Select all files and folders in the local panel and drag them to the remote panel
7. Wait for all files to finish uploading
8. Visit `holyspiritsc.org` in a browser to confirm the site is live

**Important:** Preserve the full folder structure when uploading. The `worship/`, `grow/`, `serve/`, `css/`, `js/`, and `_partials/` folders must all be present at the same level as `index.html`.

#### If the old site's files are already in `public_html`

Back up the old files first, then either delete them or upload into a clean folder. Do not mix old Wix-exported files with the new HTML files.

> Note: If you use FTP hosting rather than Netlify, automatic deploys are not available. Every time a change is made, files must be manually re-uploaded via FTP.

---

### Pre-Launch Checklist

Before pointing the domain to the new site, confirm the following:

- [ ] All placeholder photos replaced with real images
- [ ] All staff names filled in on `about.html`
- [ ] All exact event dates filled in
- [ ] Facebook and Instagram URLs updated in all page footers
- [ ] Online giving link added to `give.html`
- [ ] Livestream and podcast stub pages completed or linked externally
- [ ] Email signup form wired to a real email service
- [ ] Contact form solution chosen and implemented
- [ ] All pages tested on mobile (iOS Safari, Android Chrome)
- [ ] All pages tested on desktop (Chrome, Safari, Firefox)
- [ ] Nav dropdowns tested on both touch and mouse
- [ ] SSL certificate active on Netlify (HTTPS) — Netlify provisions this automatically once DNS is connected
- [ ] Old Wix or hosted site confirmed offline or redirected
- [ ] `holyspiritsc.org` resolves to the new site in the browser
