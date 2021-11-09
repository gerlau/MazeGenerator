# What is this project about?
![alt text](/images/project-image.png?raw=true)

Learning how to generate a maze with HTML+Javascript+CSS
- Based on recursive division algorithm

# What do we need to get started?
## Pre-requisites 
> Note: In this guide, we will be using Chrome browser.
- Basic knowledge of HTML, JS, CSS

# How did we do it?
1. Create a html file "index.html" 
- Create a div tag to contain the table we're going to create in "script.js"
- Link to "script.js" 

```
<!DOCTYPE html>
<head>
</head>
<body>
  <div id="gridSpace"></div>
  <script src="script.js"></script>
</body>
```
---
2. Write Javascript internally in "index.html" 
- window.onload will create the table on load
- Use HTML DOM to construct a table 

```
window.onload = function() {

    const container = document.getElementById("gridSpace");
    const table = document.createElement("table");
    table.setAttribute("id", "maze");

    const num_cols = 53;
    const num_rows = 13;

    for(var i=0; i<num_rows; i++){

        const row = document.createElement("tr");
        table.appendChild(row);

        for(var j=0; j<num_cols; j++){

            const cell = document.createElement("td");
            cell.id = `${j},${i}`;
            row.appendChild(cell);
        }
    }  

    container.appendChild(table);
};

```
---
3. Create an external Javascript file "script.js" 
- Build the border
- 2D Array to keep track of each table cell status (colored/notcolored)
- Implement the algorithm to build the maze

```
function generate() {
  ...
  maze_2DArray[i] = [];
  ...
  maze_2DArray[i][j] = "0";
  maze_2DArray[i][j] = "1";
  ...
  recursiveDivisionAlgorithm(maze_2DArray, ...);
  ...
}
```
---
4. Create a function "recursiveDivisionAlgorithm" in "script.js" to construct the maze based on recursive division algorithm
- The function will take in the 2D array and current size of available space as arguments
- The following are things to take note when dividing available space recursively : 

> :warning: Dividing each current space resulting in even cols/rows will create a 4-cell square situation that puts the program in a dilema on where to split.

<img width="200" height="200" src="/images/project-constraints-1.png"/> 

> :white_check_mark: Divide each current space into odd cols/rows instead.

<img width="200" height="200" src="/images/project-solutions-1.png"/>

> :warning: A division can take place randomly in the current space, where there is a chance to divide at another divider's gap, blocking the path. 

<img width="200" height="200" src="/images/project-constraints-2.png"/>

> :white_check_mark: Create the gap on even cols/rows instead.

<img width="200" height="200" src="/images/project-solutions-2.png"/>

# Acknowledgements
- https://clementmihailescu.github.io/Pathfinding-Visualizer/#








