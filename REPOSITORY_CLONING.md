cspell:disable

# Clone a Private GitLab Repository Using a Deploy Token

- this instruction covers only the Git cloning setup for a private GitLab repository using a **Deploy Token**

- it covers two cases:

1. A fresh server/user where Git credentials have never been configured.
2. `~/.git-credentials` already exists because this Linux user already has deploy tokens saved for other repositories.

- replace these placeholders:

```
PROJECT_DIR
REPOSITORY_PATH
DEPLOY_TOKEN_USERNAME
```

- example:

```
PROJECT_DIR=weba-site
REPOSITORY_PATH=advline/weba-site
DEPLOY_TOKEN_USERNAME=weba-site
```

- the GitLab server in the examples is: `gitlab.advline.ru`

---

# 1. Create a GitLab Deploy Token

- in GitLab open:

```
Project
→ Settings
→ Repository
→ Deploy tokens
```

- create a token

- recommended settings:

```
Name: PROJECT_NAME-server
Scope: read_repository
```

- gitLab gives you two values:
  - Username
  - Deploy token

- for example:

```
Username:
weba-site

Deploy token:
xxxxxxxxxxxxxxxxxxxx
```

- save the token immediately

- gitLab normally does not show the token again after you leave the page

- for deployment you normally need only: `read_repository`

- do not give the token write permissions unless the server actually needs to push to GitLab

---

# 2. Log In as the Correct Linux User

- this is important because Git credentials are stored **per Linux user**

- check:

```bash
whoami
echo "$HOME"
```

- for example:

```
whoami
nextjs-weba-net

HOME
/home/nextjs-weba-net
```

- then Git credentials for this user will normally be stored here: `/home/nextjs-weba-net/.git-credentials`

- for `root`: `/root/.git-credentials`

- so: `~/.git-credentials` always means the credentials file of the **current Linux user**

- do not configure Git as `root` and then expect another deployment user to automatically have access to those credentials

---

# 3. Enable Git Credential Storage

- run:

```bash
git config --global credential.helper store
```

Verify:

```bash
git config --global credential.helper
```

- expected: `store`

- this tells Git:

> After successful HTTPS authentication, save the credentials so future `git pull` commands do not ask for the deploy token again.

- the credentials are stored in: `~/.git-credentials`

- important: `credential.helper store` stores credentials as **plain text**

- never:

```
send this file
upload it
commit it
paste it into chat
include it in screenshots
```

---

# 4. Check Whether `.git-credentials` Already Exists

- run:

```bash
ls -l ~/.git-credentials
```

- there are two possible situations

## Case A — the file does not exist

- you may see:

```
ls: cannot access '/home/USER/.git-credentials': No such file or directory
```

- this is completely normal
- git will create the file after the first successful authentication
- continue to the cloning section

## Case B — the file already exists

- for example:

```
-rw------- 1 user user 123 Aug 19 12:00 /home/user/.git-credentials
```

- this usually means this Linux user already has Git credentials stored

- **Do not delete or overwrite the file**

- it can contain credentials for multiple repositories, usernames, or Git servers

- to inspect it without exposing the actual tokens:

```bash
sed -E 's#(https?://[^:]+):[^@]+@#\1:***@#' ~/.git-credentials
```

- example safe output:

```
https://project-one-server:***@gitlab.advline.ru
https://project-two-server:***@gitlab.advline.ru
```

- the real file internally contains the actual tokens

---

# 5. Prepare the Project Directory

- for our deployments we normally keep projects under:

```
/var/www/
```

- create the directory:

```bash
sudo mkdir -p /var/www/PROJECT_DIR
```

- for example:

```bash
sudo mkdir -p /var/www/weba-site
```

- give the current deployment user ownership:

```bash
sudo chown -R "$USER":"$USER" /var/www/PROJECT_DIR
```

- then enter it:

```bash
cd /var/www/PROJECT_DIR
```

- check:

```bash
pwd
ls -ld .
```

- the directory should belong to the Linux user that will later run:

```bash
git pull
npm ci
npm run build
```

- do **not** normally use:

```bash
sudo git clone ...
```

- otherwise `.git` and project files may become owned by `root`, creating permission problems later

---

# 6. Make Sure the Directory Is Empty

- before cloning into `.` check:

```bash
ls -la
```

- a fresh directory should contain only:

```
.
..
```

- if it contains actual files, do not blindly clone into it

`git clone ... .` expects the destination directory to be empty

---

# 7. Clone the Repository

- use this URL format:

```bash
git clone \
  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git \
  .
```

- for example:

```bash
git clone \
  https://weba-site@gitlab.advline.ru/advline/weba-site.git \
  .
```

- notice something important:

```
https://USERNAME@gitlab...
```

contains the **deploy-token username**, but does **not** contain the deploy token itself

- this is intentional

- do not write: `https://USERNAME:TOKEN@gitlab...` directly in the command.

- putting the token in the command can expose it through shell history, logs, copy/paste, screenshots, etc.

---

# 8. Enter the Deploy Token

- git will ask something similar to:

```
Password for 'https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru':
```

- paste the **Deploy Token**, not your GitLab account password.

- when you paste it, the terminal displays nothing

- paste the token and press `Enter`

- if authentication succeeds, Git starts cloning:

```
Cloning into '.'...
remote: Enumerating objects...
remote: Counting objects...
Receiving objects...
Resolving deltas...
```

---

# 9. What Happens After the First Successful Clone

- because we configured:

```bash
git config --global credential.helper store
```

- git stores the successful credentials in:

```
~/.git-credentials
```

- check:

```bash
ls -l ~/.git-credentials
```

- recommended permissions are:

```
-rw-------
```

- you can enforce them with:

```bash
chmod 600 ~/.git-credentials
```

Again, do not use: `cat ~/.git-credentials` on a shared screen because it exposes the real deploy tokens.

- use the masked version instead:

```bash
sed -E 's#(https?://[^:]+):[^@]+@#\1:***@#' ~/.git-credentials
```

---

# 10. Verify the Clone

- check that the repository exists:

```bash
ls -la
```

- you should see:

```
.git
package.json
src
...
```

- check Git:

```bash
git status
```

- typical output:

```
On branch main
Your branch is up to date with 'origin/main'.
```

- check the remote:

```bash
git remote -v
```

- expected format:

```
origin  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git (fetch)
origin  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git (push)
```

- for example:

```
origin  https://weba-site@gitlab.advline.ru/advline/weba-site.git (fetch)
origin  https://weba-site@gitlab.advline.ru/advline/weba-site.git (push)
```

- the deploy **token itself should not appear in the remote URL**

---

# 11. Test That Future Authentication Works

- run:

```bash
git pull
```

- expected: `Already up to date`

- or Git downloads new commits

- the important part is that Git should **not ask for the deploy token again**

- if that works, the setup is complete

- from now on the normal update command is simply:

```bash
git pull
```

---

# 12. When `.git-credentials` Already Exists

- this is the common situation when one server user manages several projects.

- suppose: `ls -l ~/.git-credentials` already returns:

```
-rw------- 1 user user ... ~/.git-credentials
```

- do **not** recreate the file

- do **not** run something like:

```bash
echo "..." > ~/.git-credentials
```

- because `>` would overwrite the existing credentials and potentially break Git access for other repositories

- first make sure the credential helper is enabled:

```bash
git config --global credential.helper
```

- expected:

```
store
```

- if nothing is returned:

```bash
git config --global credential.helper store
```

- then clone normally:

```bash
git clone \
  https://NEW_DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git \
  .
```

### If the matching deploy token is already saved

- git can use the existing stored credential and cloning may start immediately without asking for a password

### If this is a new deploy-token username

- git asks:

```
Password for 'https://NEW_DEPLOY_TOKEN_USERNAME@gitlab.advline.ru':
```

- paste the new deploy token

- after successful authentication Git adds the credential to the existing credential store

- the existing credentials should remain there

- this means one deployment user can have, for example:

```
project-a-server → token A
project-b-server → token B
project-c-server → token C
```

- stored in the same:

```
~/.git-credentials
```

---

# 13. Why the Username Should Be Included in the Remote URL

- prefer:

```
https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/group/project.git
```

- instead of only:

```
https://gitlab.advline.ru/group/project.git
```

- the username helps Git select the correct stored credential.

- this is particularly useful when the same server user has several GitLab deploy tokens.

- for example:

```
https://weba-site-server@gitlab.advline.ru/advline/weba-site.git

https://webagaming-server@gitlab.advline.ru/advline/webagaming.git
```

- both repositories are on: `gitlab.advline.ru` but use different deploy-token usernames.

---

# 14. If Git Keeps Asking for the Token

- check the credential helper:

```bash
git config --global credential.helper
```

- it should return: `store`

- then check the remote:

```bash
git remote -v
```

- it should contain the deploy-token username:

```
https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git
```

- if necessary, correct it:

```bash
git remote set-url origin \
  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git
```

- then:

```bash
git pull
```

- enter the deploy token once.

- after successful authentication it should be saved.

---

# 15. If an Old or Wrong Token Is Stored

- symptoms may include: `HTTP Basic: Access denied` or repeated authentication failures.

- do not delete the entire credentials file if it contains credentials for other projects.

-remove only the credential for the affected username:

```bash
printf 'protocol=https\nhost=gitlab.advline.ru\nusername=DEPLOY_TOKEN_USERNAME\n\n' \
  | git credential reject
```

- then retry:

```bash
git pull
```

- git should ask for the password again

- paste the new deploy token

- after successful authentication the new token will be stored

---

# 16. If the Repository Was Already Cloned with the Wrong Remote

- you do not need to clone everything again

- check:

```bash
git remote -v
```

- change the remote:

```bash
git remote set-url origin \
  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git
```

- then:

```bash
git pull
```

- git asks for the new deploy token if it is not already stored

- for example:

```bash
git remote set-url origin \
  https://weba-site@gitlab.advline.ru/advline/weba-site.git

git pull
```

---

# 17. `Permission denied` While Cloning

- if you get something similar to:

```
fatal: could not create work tree dir
Permission denied
```

- or: `.git: Permission denied` check the project directory:

```bash
ls -ld /var/www/PROJECT_DIR
```

- fix ownership:

```bash
sudo chown -R "$USER":"$USER" /var/www/PROJECT_DIR
```

- then:

```bash
cd /var/www/PROJECT_DIR
```

- and retry the clone

---

# 18. `Repository not found` or `Access denied`

- check these four things

### 1. Repository path

- the path: `REPOSITORY_PATH` must match GitLab exactly

- for example:

```
advline/weba-site
```

- produces:

```
https://gitlab.advline.ru/advline/weba-site.git
```

### 2. Deploy-token username

- use the username generated by GitLab for that deploy token

- do not use your personal GitLab username unless you intentionally created a different authentication setup

### 3. Deploy-token scope

- the token needs: `read_repository`

### 4. Token expiration

- check whether the deploy token has expired or been revoked in GitLab

---

# 19. Fresh Server — Complete Command Sequence

- assuming the GitLab deploy token has already been created:

```bash
# Check current user
whoami
echo "$HOME"

# Enable persistent Git credentials
git config --global credential.helper store

# Create project directory
sudo mkdir -p /var/www/PROJECT_DIR

# Give current deployment user ownership
sudo chown -R "$USER":"$USER" /var/www/PROJECT_DIR

# Enter directory
cd /var/www/PROJECT_DIR

# Clone
git clone \
  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git \
  .

# Verify
git status
git remote -v

# Check credential file
ls -l ~/.git-credentials

# Test future authentication
git pull
```

- during `git clone`, Git asks for a password

- paste the **deploy token**

---

# 20. Existing `.git-credentials` — Complete Command Sequence

- if this Linux user already has Git credentials stored:

```bash
# Check current user
whoami
echo "$HOME"

# Check credential helper
git config --global credential.helper

# Check existing credentials without exposing tokens
sed -E 's#(https?://[^:]+):[^@]+@#\1:***@#' ~/.git-credentials

# Create project directory
sudo mkdir -p /var/www/PROJECT_DIR
sudo chown -R "$USER":"$USER" /var/www/PROJECT_DIR

# Enter directory
cd /var/www/PROJECT_DIR

# Clone using the deploy-token username
git clone \
  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git \
  .

# Verify
git status
git remote -v

# Test saved authentication
git pull
```

- if Git already has a matching credential, no password prompt may appear

- if it does not, Git asks once for the deploy token and then stores it alongside the existing credentials

---

# 21. Short Version

- for a new Linux user:

```bash
git config --global credential.helper store

sudo mkdir -p /var/www/PROJECT_DIR
sudo chown -R "$USER":"$USER" /var/www/PROJECT_DIR
cd /var/www/PROJECT_DIR

git clone \
  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git \
  .

git pull
```

- for a user who already has `~/.git-credentials`:

```bash
git config --global credential.helper

cd /var/www/PROJECT_DIR

git clone \
  https://DEPLOY_TOKEN_USERNAME@gitlab.advline.ru/REPOSITORY_PATH.git \
  .

git pull
```

- the critical rules are:
  1. Clone as the deployment Linux user
  2. Use a deploy token with read_repository
  3. Put the deploy-token USERNAME in the Git URL
  4. Do not put the actual TOKEN in the Git URL
  5. Let Git ask for the token interactively
  6. Use credential.helper store if automatic future git pull is required
  7. Never overwrite ~/.git-credentials when it already exists
  8. Verify the setup with git pull
