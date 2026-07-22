# Universal Deployment Guide: Next.js + PM2 or Vite + Nginx

This guide can be reused for frontend projects deployed on an Ubuntu server from a private GitLab repository.

It covers two deployment types:

1. **Next.js server application** — built with Node.js, kept running by PM2, proxied through Nginx.
2. **Vite static application** — built into `dist` and served directly by Nginx. PM2 is not needed.

Replace every placeholder written in uppercase:

```text
SERVER_IP
SSH_USER
SSH_ALIAS
PROJECT_NAME
PROJECT_DIR
REPOSITORY_PATH
DEPLOY_TOKEN_USERNAME
DOMAIN
PORT
PM2_NAME
API_URL
```

Example project directory:

```text
/var/www/PROJECT_DIR
```

---

# 1. Choose the deployment type

Check `package.json`.

## Next.js

Typical scripts:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

Use:

```text
Node.js → npm build → PM2 → Nginx reverse proxy
```

## Vite

Typical scripts:

```json
{
  "scripts": {
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

Use:

```text
Node.js → npm build → Nginx serves dist
```

Do **not** use PM2 for a normal Vite production build. Vite produces static files; keeping `vite preview` alive with PM2 is unnecessary.

---

# 2. Connect to the server

From local PowerShell:

```powershell
ssh SSH_USER@SERVER_IP
```

## Optional SSH alias

Open the local SSH config:

```powershell
notepad $HOME\.ssh\config
```

Add:

```sshconfig
Host SSH_ALIAS
    HostName SERVER_IP
    User SSH_USER
    IdentityFile C:\Users\User\.ssh\id_ed25519
```

Then connect with:

```powershell
ssh SSH_ALIAS
```

Windows SSH config location:

```text
C:\Users\User\.ssh\config
```

---

# 3. Configure passwordless SSH login

On the local Windows computer, display the public key:

```powershell
Get-Content $HOME\.ssh\id_ed25519.pub
```

On the server, logged in as the target deployment user:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

Add the public key:

```bash
KEY='PASTE_PUBLIC_KEY_HERE'

grep -qxF "$KEY" ~/.ssh/authorized_keys 2>/dev/null \
  || echo "$KEY" >> ~/.ssh/authorized_keys

chmod 600 ~/.ssh/authorized_keys
```

Test from a new local PowerShell window:

```powershell
ssh -i $HOME\.ssh\id_ed25519 SSH_USER@SERVER_IP
```

---

# 4. Install Node.js

Skip this section when Node.js is already installed.

Check:

```bash
node --version
npm --version
```

Check the operating system:

```bash
cat /etc/os-release
```

Install required tools:

```bash
sudo apt update
sudo apt install -y curl ca-certificates gnupg
```

Add the NodeSource key:

```bash
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  | sudo gpg --dearmor --yes -o /usr/share/keyrings/nodejs.gpg
```

Add the Node.js 24 repository:

```bash
echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/nodejs.gpg] https://deb.nodesource.com/node_24.x nodistro main' \
  | sudo tee /etc/apt/sources.list.d/nodejs.list > /dev/null
```

Install Node.js:

```bash
sudo apt update
sudo apt install -y nodejs
```

Verify:

```bash
node --version
npm --version
```

---

# 5. Create a GitLab deploy token

In GitLab:

```text
Project
→ Settings
→ Repository
→ Deploy tokens
```

Recommended settings:

```text
Name: PROJECT_NAME-server
Scope: read_repository
```

Save both generated values immediately:

```text
Username
Deploy token
```

GitLab will not show the token again.

---

# 6. Configure Git credential storage

Run as the same Linux user who will execute `git pull`:

```bash
git config --global credential.helper store
```

Verify:

```bash
git config --global credential.helper
```

Expected:

```text
store
```

The credentials file belongs to the current user:

```text
~/.git-credentials
```

Examples:

```text
/root/.git-credentials
/home/react-dev/.git-credentials
```

The file does not exist until Git successfully authenticates at least once.

After cloning, check it:

```bash
ls -l ~/.git-credentials
```

Expected permissions:

```text
-rw------- ...
```

Display saved usernames without exposing tokens:

```bash
sed -E 's#(https?://[^:]+):[^@]+@#\1:***@#' ~/.git-credentials
```

> `credential.helper store` saves tokens as plain text. Never send this file, commit it, or include it in screenshots.

---

# 7. Prepare the project directory

Create the directory:

```bash
sudo mkdir -p /var/www/PROJECT_DIR
```

Give the deployment user ownership:

```bash
sudo chown -R "$USER":"$USER" /var/www/PROJECT_DIR
```

Open it:

```bash
cd /var/www/PROJECT_DIR
```

Check ownership:

```bash
ls -ld /var/www/PROJECT_DIR
```

The owner should be the user who will clone, build, and update the project.

---

# 8. Clone the repository

Clone into the current empty directory:

```bash
git clone \
  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git \
  .
```

When Git asks for a password, paste the **deploy token**.

Nothing appears while the token is being pasted. That is normal.

Verify:

```bash
git remote -v
ls -la
ls -l ~/.git-credentials
```

Test future access:

```bash
git pull
```

It should no longer ask for the token.

---

# 9. Create environment files

Check which variables the project expects:

```bash
grep -R "process\.env\." -n src next.config.* vite.config.* 2>/dev/null
```

## Example `.env`

```bash
cat > .env <<'EOF'
NEXT_PUBLIC_API_URL=API_URL
EOF
```

For Vite, public variables usually start with `VITE_`:

```bash
cat > .env <<'EOF'
VITE_API_URL=API_URL
EOF
```

Important:

- Next.js public variables usually start with `NEXT_PUBLIC_`.
- Vite public variables usually start with `VITE_`.
- Rebuild the project after changing environment variables.
- Do not commit secret production values unless the project explicitly requires that.

---

# 10. Install dependencies

When `package-lock.json` exists:

```bash
npm ci
```

Use `npm install` only when intentionally changing dependencies or regenerating the lock file.

Do not blindly run:

```bash
npm audit fix --force
```

It can introduce breaking dependency changes.

---

# Deployment A: Next.js + PM2

# 11A. Build the Next.js project

Normally:

```bash
npm run build
```

If the package script contains Windows-only syntax such as:

```json
"build": "set NODE_OPTIONS=--max-old-space-size=8192 && next build"
```

either fix it locally or run a Linux-compatible command:

```bash
NODE_OPTIONS=--max-old-space-size=1024 npx next build
```

Verify that the build finishes successfully before starting PM2.

---

# 12A. Start Next.js with PM2

Install PM2 once per server:

```bash
sudo npm install -g pm2
```

Verify:

```bash
pm2 --version
```

Choose a free port. Check existing listeners:

```bash
ss -ltnp
```

Start the project:

```bash
cd /var/www/PROJECT_DIR

PORT=PORT pm2 start npm --name PM2_NAME -- start
```

Examples:

```bash
PORT=3000 pm2 start npm --name project-one -- start
PORT=3001 pm2 start npm --name project-two -- start
```

Check status:

```bash
pm2 status
```

Check logs:

```bash
pm2 logs PM2_NAME --lines 50
```

Verify locally:

```bash
curl -I http://127.0.0.1:PORT
```

Expected:

```text
HTTP/1.1 200 OK
```

---

# 13A. Save PM2 and enable autostart

Save all current PM2 processes:

```bash
pm2 save
```

Generate the systemd startup service for the current user:

```bash
pm2 startup systemd -u "$USER" --hp "$HOME"
```

PM2 prints a command. Run that exact command if requested.

Save again:

```bash
pm2 save
```

Verify that the project exists in the PM2 dump:

```bash
grep -n '"name".*"PM2_NAME"' ~/.pm2/dump.pm2
```

Check the generated service:

```bash
systemctl list-unit-files | grep '^pm2-'
```

Typical service names:

```text
pm2-root.service
pm2-react-dev.service
```

Check the relevant service:

```bash
sudo systemctl status pm2-SSH_USER --no-pager
```

---

# 14A. Configure Nginx for Next.js

Create:

```bash
sudo tee /etc/nginx/conf.d/PROJECT_NAME.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name DOMAIN;

    access_log /var/log/nginx/PROJECT_NAME.access.log;
    error_log /var/log/nginx/PROJECT_NAME.error.log;

    location / {
        proxy_pass http://127.0.0.1:PORT;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF
```

Replace these values inside the file:

```text
PROJECT_NAME
DOMAIN
PORT
```

Test Nginx:

```bash
sudo nginx -t
```

Reload:

```bash
sudo systemctl reload nginx
```

Verify:

```bash
curl -I http://DOMAIN
```

---

# Deployment B: Vite + Nginx

# 11B. Build the Vite project

Run:

```bash
npm run build
```

The normal output directory is:

```text
dist
```

Verify:

```bash
ls -la dist
```

Expected files usually include:

```text
dist/index.html
dist/assets
```

PM2 is not needed.

---

# 12B. Configure Nginx for Vite

For a React Router SPA, Nginx must fall back to `index.html`.

Create:

```bash
sudo tee /etc/nginx/conf.d/PROJECT_NAME.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name DOMAIN;

    root /var/www/PROJECT_DIR/dist;
    index index.html;

    access_log /var/log/nginx/PROJECT_NAME.access.log;
    error_log /var/log/nginx/PROJECT_NAME.error.log;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|mjs|json|jpg|jpeg|png|gif|ico|svg|webp|woff|woff2|ttf)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
EOF
```

Replace:

```text
PROJECT_NAME
PROJECT_DIR
DOMAIN
```

Test:

```bash
sudo nginx -t
```

Reload:

```bash
sudo systemctl reload nginx
```

Verify:

```bash
curl -I http://DOMAIN
```

## When the backend developer manages Nginx

Send them:

```text
Project directory: /var/www/PROJECT_DIR
Nginx root: /var/www/PROJECT_DIR/dist
SPA fallback: try_files $uri $uri/ /index.html;
```

Your frontend deployment work is complete after:

```bash
git pull
npm ci
npm run build
```

---

# 15. Standard update flows

## Next.js

```bash
cd /var/www/PROJECT_DIR
git pull
npm ci
npm run build
pm2 restart PM2_NAME --update-env
pm2 save
curl -I http://127.0.0.1:PORT
```

When the server has limited memory, stop only this project before rebuilding:

```bash
pm2 stop PM2_NAME
npm run build
pm2 start PM2_NAME
```

Do not stop unrelated PM2 projects.

## Vite

```bash
cd /var/www/PROJECT_DIR
git pull
npm ci
npm run build
```

Nginx serves the updated `dist` files immediately. It usually does not need to be restarted.

---

# 16. Useful PM2 commands

```bash
pm2 status
pm2 logs
pm2 logs PM2_NAME --lines 50
pm2 restart PM2_NAME
pm2 restart PM2_NAME --update-env
pm2 stop PM2_NAME
pm2 start PM2_NAME
pm2 delete PM2_NAME
pm2 save
```

---

# 17. Useful Nginx commands

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx
sudo systemctl status nginx --no-pager
```

Common config directory:

```text
/etc/nginx/conf.d
```

---

# 18. Troubleshooting

## Permission denied while cloning

Error:

```text
.git: Permission denied
```

Check ownership:

```bash
ls -ld /var/www/PROJECT_DIR
```

Fix:

```bash
sudo chown -R "$USER":"$USER" /var/www/PROJECT_DIR
```

---

## `.git-credentials` does not exist

The file appears only after the first successful HTTPS authentication.

Check the helper:

```bash
git config --global credential.helper
```

Clone or pull once using the deploy-token username and token.

Then check:

```bash
ls -l ~/.git-credentials
```

---

## Cannot access `/root/.git-credentials`

You are not logged in as `root`.

Use the current user's file:

```bash
echo "$HOME"
ls -l ~/.git-credentials
```

---

## Git asks for the token every time

Check:

```bash
git config --global credential.helper
git remote -v
```

The remote must use HTTPS for `credential.helper store`:

```text
https://DEPLOY_TOKEN_USERNAME@gitlab.example.com/group/project.git
```

---

## Next.js returns HTTP 500

Check logs:

```bash
pm2 logs PM2_NAME --lines 100
```

Common causes:

- missing `.env`;
- invalid API URL;
- a server-side request uses a relative URL;
- the API is unreachable;
- the build was created before environment variables were added.

Rebuild after fixing `.env`:

```bash
npm run build
pm2 restart PM2_NAME --update-env
```

---

## Next.js build is killed with `SIGKILL`

Check memory:

```bash
free -h
dmesg -T | tail -30
```

Look for:

```text
OOM killed process
```

Try these steps in order:

```bash
pm2 stop PM2_NAME
NODE_OPTIONS=--max-old-space-size=1024 npx next build
```

Then try Webpack:

```bash
NODE_OPTIONS=--max-old-space-size=1024 npx next build --webpack
```

For supported Next.js versions, try split build modes:

```bash
NODE_OPTIONS=--max-old-space-size=1024 \
  npx next build --webpack --experimental-build-mode=compile
```

Then:

```bash
NODE_OPTIONS=--max-old-space-size=1024 \
  npx next build --webpack --experimental-build-mode=generate
```

Restart only this project after a successful build:

```bash
pm2 restart PM2_NAME
```

A tiny VPS without usable swap may simply need more RAM. No command can negotiate with physics.

---

## Vite routes return 404 after refresh

The Nginx SPA fallback is missing.

Required:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## Port is already in use

Check:

```bash
ss -ltnp 'sport = :PORT'
```

Choose another port or stop the process that owns it.

---

## Nginx config fails

Test:

```bash
sudo nginx -t
```

Inspect the project log:

```bash
sudo tail -100 /var/log/nginx/PROJECT_NAME.error.log
```

Do not reload Nginx until `nginx -t` succeeds.

---

# 19. Security notes

- Use a GitLab deploy token with only `read_repository`.
- Never expose `~/.git-credentials`.
- Keep `.env` permissions restricted when it contains secrets.
- Do not run frontend processes as `root` unless the server setup requires it.
- Do not expose Next.js ports directly to the internet; proxy them through Nginx.
- Do not run `vite dev` or `vite preview` as the production web server.
- Configure HTTPS when the environment requires secure cookies, service workers, geolocation, camera access, or production traffic.

---

# 20. Project deployment checklist

```text
[ ] Correct Linux user owns the project directory
[ ] GitLab deploy token has read_repository
[ ] credential.helper is configured
[ ] Repository cloned successfully
[ ] Token saved in ~/.git-credentials
[ ] .env created
[ ] npm ci completed
[ ] npm run build completed
```

For Next.js:

```text
[ ] Free PORT selected
[ ] PM2 process online
[ ] Local curl returns 200
[ ] pm2 save completed
[ ] PM2 systemd autostart enabled
[ ] Nginx reverse proxy configured
[ ] Domain returns 200
```

For Vite:

```text
[ ] dist/index.html exists
[ ] Nginx root points to dist
[ ] SPA fallback is configured
[ ] Domain returns 200
```
