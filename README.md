# What is this project about?

![Output](https://user-images.githubusercontent.com/48362970/101325287-78f54a80-38a6-11eb-8698-0c01f9eb5fe2.png)

Generating a maze with Javascript/HTML
* Based on recursive division algorithm

# How are we going to do it?
1. Create a html file "index.html" 
* Create a div tag to contain the table we're going to create in "script.js"
* Link to "script.js" 

```
<!DOCTYPE html>
<head>
</head>
<body>
  <div id="gridSpace"></div>
  <script src="script.js"></script>
</body>
```

2. Create a Javascript file "script.js"
* Use HTML DOM to get the div tag by it's ID
* Use HTML DOM to construct a table 
* Create a 2D array based on the dimensions of the table constructed

```
window.onload = function() {
  const container = document.getElementById("gridSpace");
  const table = document.createElement("table");
  ...
  maze_2DArray[i] = [];
  const row = document.createElement("tr");
  table.appendChild(row);
  ...
  maze_2DArray[i][j] = "0";
  maze_2DArray[i][j] = "1";
  const cell = document.createElement("td");
  row.appendChild(cell);
  ...
  container.appendChild(table);
}
```

3. Create a function "recursiveDivisionAlgorithm" in "script.js" to construct the maze based on recursive division algorithm
* The function will take in the 2D array and current size of available space as arguments
* The following are things to take note when dividing available space recursively : 
> :warning: Dividing each current space resulting in even cols/rows will create a 4-cell square situation that puts the program in a dilema on where to split.

<img width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94020755-dcaec200-fde5-11ea-88e1-c32756236bf8.png"/> 

> :white_check_mark: Divide each current space into odd cols/rows instead.

<img width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94023241-9313a680-fde8-11ea-9ba6-80b381aa33b6.png"/>

> :warning: A division can take place randomly in the current space, where there is a chance to divide at another divider's gap, blocking the path. 

<img width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94020357-6ad67880-fde5-11ea-9682-343dd222e9a1.png" alt="blocking_gap" />

> :white_check_mark: Create the gap on even cols/rows instead.

<img width="200" height="200" src="https://user-images.githubusercontent.com/48362970/94023391-be969100-fde8-11ea-94ef-51f0b06a3896.png" alt="not_blocking_gap" />










