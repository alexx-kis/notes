# Create repository from computer

- open terminal
- go to directory, where to create a repository

```bash
cd <directory name>
```

- create a new directory - the repository

```bash
mkdir <project name>
```

- go to this new directory

```bash
cd <project name>
```

- initialize the repository

```bash
git init
```

- create a file, for example, readme.md

```bash
touch readme.md
```

- add files into staging area

```bash
git add .
```

- create the first commit

```bash
        git commit -m '<text of the commit>'
```

- go to github, create a new repository with the same name

```bash
<project name>
```

- in terminal, create a remote origin

```bash
git remote add origin git@github.com:<имя пользователя>/<имя проекта>.git
```

for example:

```bash
git remote add origin git@github.com:alexx-kis/new-test.git
```

- push changes to remote repository

```bash
git push
```
