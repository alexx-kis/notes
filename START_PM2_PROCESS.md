# How to start an app with PM2 (step-by-step)

## 0. Prerequisites (don’t skip, this is where most pain is born)

● Node.js installed

● Your project already builds and runs locally

● You are in the project root

● PM2 installed globally

● If PM2 is not installed yet:

`npm install -g pm2`

● Check:

`pm2 -v`

● If this fails — stop. Fix Node/npm first.

## 1. Decide what exactly PM2 should run

● PM2 does not magically understand frameworks. ● It runs commands or JS files.

### Common cases:

✅ Next.js (production) You must build first, then run next start.

✅ Vite You usually run a preview server or a custom Node server.

## 2. Build the project (mandatory for prod)

**Next.js**: `npm run build`

● This creates .next/.

**Vite** `npm run build`

● This creates dist/.

● If build fails → PM2 will not save you. Fix build first.

## 3. Start PM2 process

🔹 Next.js (recommended way)

`pm2 start npm --name "next-app" -- start`

● Explanation (important):

`npm` — PM2 runs npm itself

`-- start` — maps to npm run start

`"next-app"` — your process name (pick something sane)

- Your package.json must have:

```json
"scripts": {
  "start": "next start"
}
```

🔹 Vite (preview mode)

`pm2 start npm --name "vite-app" -- run preview`

- Your package.json must include:

```json
"scripts": {
  "preview": "vite preview"
}
```

⚠️ Reminder: vite preview is not a real production server. Fine for internal tools, not fine for high-traffic public apps.

## 4. Check that it’s actually running

`pm2 status`

● You should see:

```
status: online
restarts: 0 (or low)
correct name
Logs (always check logs):
pm2 logs next-app
```

or

`pm2 logs vite-app`

● If it crashes — logs will tell you why.

## 5. Make PM2 survive server reboot (CRITICAL)

● If you skip this, PM2 dies on reboot and you’ll pretend it’s “random”.

`pm2 startup`

● PM2 will print a command like:

`sudo env PATH=...`

👉 Copy it and run it exactly.

● Then save current processes:

`pm2 save`

## 6. Useful everyday commands (memorize these)

Restart app: `pm2 restart next-app`

Stop app: `pm2 stop next-app`

Delete app: `pm2 delete next-app`

Watch logs: `pm2 logs`

Live CPU / memory: `pm2 monit`

### Common mistakes (aka “why prod is down”)

❌ Running pm2 start npm -- run dev → Dev mode is not production. Ever.

❌ Forgetting pm2 save → Reboot = app gone.

❌ App works locally but not in PM2 → Environment variables missing (.env, ports, NODE_ENV).

❌ Port already in use → Check with:

`pm2 logs`

### Minimal TL;DR

npm install -g pm2

npm run build

pm2 start npm --name "app-name" -- start

pm2 startup

pm2 save
