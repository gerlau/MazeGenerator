*Disclaimer The following work was inspired byfirstcontributions.github.io to understand and learn better how markdown works.  

<img align="right" width="300" height="150" src="https://user-images.githubusercontent.com/48362970/93747425-4766ce80-fc29-11ea-86d4-1d2b8d411001.png" alt="fork this repository" />

## 1. Fork this repository on GitHub

Fork this repository by clicking on the fork button on the top of this page. 
Once you have forked a repo, you own your forked copy. This means that you can edit the contents of your forked repository without impacting the parent repo.

## 2. Clone the repository to your local machine

<img align="right" width="300" src="https://user-images.githubusercontent.com/48362970/93743747-2e5b1f00-fc23-11ea-9d90-8a286888296a.png" alt="clone this repository" />

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, *click on the code button and then click the copy to clipboard icon*.

Open a terminal and run the following git command:
```
git clone "web_url"
```
where "web_url" (without the quotation marks) is the url to this repository (your fork of this project). 

**For example:**
```
git clone "https://github.com/gerlau/Maze.git"
```
Here you're copying the contents of the first-contributions repository on GitHub to your computer.

# 4. Add a remote origin 
Open a terminal and run the following git command:
```
git remote add origin "web_url"
```
The git remote command is one piece of the broader system which is responsible for syncing changes.

# 4. Create a branch 
4.1 Change to the repository directory on your computer (if you are not already there):
```
cd "the repository_name"/
```
4.2 Now create a branch using the following git command:
```
git checkout -b new-branch
```

# 5. Make the necessary changes and commit those changes to your current branch    
:bulb: Tips: `git status` to view the changes | `git branch` to check which branch you are on.

5.1 Add those changes to the branch you just created by executing the following git command:
```
git add .
```

Note: `git add .` tells Git that you want to include updates to a particular file in the next commit. However, git add doesn't really affect the repository in any significant way—changes are not actually recorded until you run git commit. 

5.2 Commit those changes by executing the following git command:
```
git commit -m "Create README.md" -m "Some desc"
```

# 6. Push changes to GitHub
6.1 Push your changes by executing the following git command:
```
git push -u origin branch
```

# 6. Submit your changes for review
6.1 If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button.  
6.2 Now submit the pull request by clicking `Create pull request` button.   
6.3 If all conversation are resolved then click `Merge pull request` and `Confirm Merge` buttons.    
6.4 Once merged, update your local machine repo  
```
git checkout master  
git pull
```

NOTE: Be sure to merge the latest from "upstream" before making a pull request!
