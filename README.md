# Maze Generation
## 1. What is this project about?
Generating a maze based on recursive division algorithm with Javascript/HTML.

## 2. Specifications. 

Specs 2.1: Divide the current space into odd cols/rows

<img style="float: left;" width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94023241-9313a680-fde8-11ea-9ba6-80b381aa33b6.png" alt="9_cell" />

:warning: ```Failure to do that will lead to a 4-cell square situation```
- A 4-cell square situation puts the program in a dilemma on where to split.
<img style="float: left;" width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94020755-dcaec200-fde5-11ea-88e1-c32756236bf8.png" alt="4_cell" />

Specs 2.2: Create the gap on even cols/rows 

<img style="float: left;" width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94023391-be969100-fde8-11ea-94ef-51f0b06a3896.png" alt="not_blocking_gap" />

:warning: ```Failure to do that will block the path```
- A division can take place randomly in the current space and there is a chance to divide at another divider's gap, blocking the path. 

<img style="float: left;" width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94020357-6ad67880-fde5-11ea-9682-343dd222e9a1.png" alt="blocking_gap" />






