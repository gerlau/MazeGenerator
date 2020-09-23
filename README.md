# Maze Generation

## 1. Recursive Division Algorithm  

Issue 1.1: Avoid 4-cell square 
- A 4-cell square situation puts the program in a dilemma on where to split. 
- Resolve this situation by dividing the current space into odd cols/rows.

<img style="float: left;" width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94020755-dcaec200-fde5-11ea-88e1-c32756236bf8.png" alt="4_cell" />

Issue 1.2: Avoid blocking gap
- A division can take place randomly in the current space and there is a chance to divide at another divider's gap, blocking the path. 
- Resolve this situation by creating the gap on even cols/rows where it will not encounter a division. 

<img style="float: left;" width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94020357-6ad67880-fde5-11ea-9682-343dd222e9a1.png" alt="blocking_gap" />





