Create repository from computer

 - open terminal
 - go to directory, where to create a repository

        cd <directory name>

 - create a new directory - the repository

        mkdir <project name>

 - go to this new directory

        cd <project name>

 - initialize the repository

        git init

 - create a file, for example, readme.md

        touch readme.md

 - add files into staging area

        git add .

 - create the first commit

        git commit -m '<text of the commit>'

 - go to github, create a new repository with the same name

          <project name>

 - in terminal, create a remote origin

        git remote add origin git@github.com:<имя пользователя>/<имя проекта>.git

for example:

        git remote add origin git@github.com:alexx-kis/new-test.git

 - push changes to remote repository

        git push