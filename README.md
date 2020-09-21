# Contributing Guidelines [Fork-and-Pull Workflow]
1. Fork the repo on GitHub (if you do not own the repo)\
2. Clone the repository to your own machine\
2.1 Copy the URL\ 
2.2 `git clone "web_url"`\
![contributing_clone](https://user-images.githubusercontent.com/48362970/93743747-2e5b1f00-fc23-11ea-9d90-8a286888296a.png)
3. Create a new branch to work on new additions
3. **Commit** changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

# Maze

1. How to color border? 
2. How to split?
- What if split vertically and it's next to L/R?
- What if split horizontally and it's next to T/B?
- What if cell at TR/TL/BR/BL? 
- What if a square appeared? 
Ans: Odd separation. Vertically or Horizontally.
- What if split at a cell spacing?
- What if whole column/row is "1"? That means no split occured?
- What if single column/row?

Things to note:
- grid must be odd length & breadth
