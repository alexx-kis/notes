# 0. Prerequisites (so you don’t get random “it broke” errors)

- Install Node.js LTS (recommended).

- Check versions:

```
  node -v
  npm -v
```

- If node is ancient, update it. Vite/Next are not here to babysit old Node.

# A. Next.js from your GitHub template (recommended way)

## 1. Create the project

- Run:

```
npx create-next-app@latest '<my-next-app>' -e https://github.com/alexx-kis/next_template
```

- Replace `<my-next-app>` with your new project name.

- -e means “use this repo as the template”.

## 2. Go into the folder

```
cd my-next-app
```

## 3. Install dependencies (if it didn’t already)

`npm install`

## 4. Run dev server

`npm run dev`

- Open the URL it prints (usually http://localhost:3000).

## 5. Connect to your own GitHub repo (optional but usually needed)

- If the template already has .git, you might want to reset history:

```
rm -rf .git
git init
git add .
git commit -m "Initial commit"
```

- Then add your remote:

```
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

# B. Vite from your GitHub template (works way: degit)


## 1. Create from template using degit

`npx degit alexx-kis/vite_template my-vite-app`

## 2. Go into the folder

`cd my-vite-app`

## 3. Install dependencies

`npm install`

## 4. Run dev server
npm run dev

Vite will print something like http://localhost:5173.

## 5. Init your own git repo (recommended)
```
git init
git add .
git commit -m "Initial commit"
```

- Then push to your repo:

```
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```


Tiny cheat sheet

### Next from template:

`npx create-next-app@latest NAME -e https://github.com/alexx-kis/next_template`


### Vite from template:

`npx degit alexx-kis/vite_template NAME`