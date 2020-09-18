// IMPORTANT TO UNDERSTAND THE DIFFERENCE
// Screen size : screen.height      | screen.width
// Window size : window.outerHeight | window.outerWidth
// Content size: window.innerHeight | window.innerWidth

// CONTINUE NEXT HOLIDAY SEMESTER!!!
// ** EACH PATH SHOULD BE ONE COLUMN/ROW WIDE

function getRandInteger(min, max) {
    // Inclusive of min & max
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function recursiveDivisionAlgorithm(maze_2DArray, min_row, min_col, max_row, max_col){

    console.log("recursiveDivisionAlgorithm()");

    console.log("min_row: " + min_row);
    console.log("min_col: " + min_col);
    console.log("max_row: " + max_row);
    console.log("max_col: " + max_col);

    // Recursively divide the grid until current grid cannot be divided
    var single_hori = (max_row == min_row);
    var single_vert = (max_col == min_col);

    if(single_hori || single_vert){

        console.log("single line error");
        return;
    }

    // Determine Orientation  
    // 0 : Horizontal
    // 1 : Vertical 
    var orient = 0;

    var length = (max_col - min_col) + 1;
    var height = (max_row - min_row) + 1;

    if(length > height){
        // if space is horizontally longer, divide vertically
        orient = 1;
    }
    else if(height > length){
        // if space is vertically longer, divide horizontally
        orient = 0;
    }
    else{
        // if space is a square, generate a random orientation number
        orient = getRandInteger(0, 1);
    }

    console.log("orient: " + orient);

    // Determine Point of Division & Gap   
    var row_pt = 0;
    var col_pt = 0;

    var table = document.querySelector("table");

    if(orient == 0){
        // if divide horizontally, it cannot take place at the first and last row
        row_pt = getRandInteger(min_row + 1, max_row - 1);
        col_pt = getRandInteger(min_col, max_col);

        console.log("row_pt: " + row_pt);
        console.log("col_pt: " + col_pt);

        // color & mark the occupied cells 
        for(var i=min_col;i<=max_col;i++){
            
            var selected = table.rows[row_pt].cells[i];

            if(i != col_pt){
                // if not gap, then color red & mark
                selected.style.background = "rgb(255,0,0)";

                maze_2DArray[row_pt][i] = "0";
            }
        }

        // Recursive Implementation 
        recursiveDivisionAlgorithm(maze_2DArray, min_row, min_col, row_pt - 1, max_col);
        recursiveDivisionAlgorithm(maze_2DArray, row_pt + 1, min_col, max_row, max_col);
    }
    else{
        // if divide vertically, it cannot take place at the first and last column
        row_pt = getRandInteger(min_row, max_row);
        col_pt = getRandInteger(min_col + 1, max_col - 1);

        console.log("row_pt: " + row_pt);
        console.log("col_pt: " + col_pt);

        // color & mark the occupied cells 
        for(var i=min_row;i<=max_row;i++){
            
            var selected = table.rows[i].cells[col_pt];

            if(i != row_pt){
                // if not gap, then color red & mark
                selected.style.background = "rgb(255,0,0)";

                maze_2DArray[i][col_pt] = "0";
            }
        }

        // Recursive Implementation 
        recursiveDivisionAlgorithm(maze_2DArray, min_row, min_col, max_row, col_pt - 1);
        recursiveDivisionAlgorithm(maze_2DArray, min_row, col_pt + 1, max_row, max_col);
    }
}

window.onload = function() {

    const container = document.getElementById("gridSpace");
    const table = document.createElement("table");

    // CELL DIMENSION "25 x 25"
    const cell_size = 25;

    const num_cols = Math.floor(250/cell_size);
    const num_rows = Math.floor(250/cell_size);

    console.log(num_cols);
    console.log(num_rows);

    // Initialize a 2D array to keep track of cell status
    // Cell status "1" : Available 
    // Cell status "0" : Blocked
    var maze_2DArray = [];

    for(var i=0; i<num_rows; i++){
        
        const row = document.createElement("tr");

        table.appendChild(row);

        maze_2DArray[i] = [];

        for(var j=0; j<num_cols; j++){
            
            const cell = document.createElement("td");
            
            cell.id = `${j},${i}`;

            row.appendChild(cell);

            maze_2DArray[i][j] = "1";
        }
    }  

    container.appendChild(table);

    // recursiveDivisionAlgorithm(2DArray, min_row, min_col, max_row, max_col)
    recursiveDivisionAlgorithm(maze_2DArray, 0, 0, num_rows - 1, num_cols - 1);
}


