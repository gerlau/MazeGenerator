# Maze Generation
## 1. What is this project about?
Generating a maze based on recursive division algorithm with Javascript/HTML.

## 2. Problems faced

> :warning: Dividing each current space resulting in even cols/rows will create a 4-cell square situation that puts the program in a dilema on where to split.

<img width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94020755-dcaec200-fde5-11ea-88e1-c32756236bf8.png"/> 

> :white_check_mark: Divide each current space into odd cols/rows instead.

<img width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94023241-9313a680-fde8-11ea-9ba6-80b381aa33b6.png"/>

> :warning: A division can take place randomly in the current space, where there is a chance to divide at another divider's gap, blocking the path. 

<img width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94020357-6ad67880-fde5-11ea-9682-343dd222e9a1.png" alt="blocking_gap" />

> :white_check_mark: Create the gap on even cols/rows instead.

<img width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94023391-be969100-fde8-11ea-94ef-51f0b06a3896.png" alt="not_blocking_gap" />










