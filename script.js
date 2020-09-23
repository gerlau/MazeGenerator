// IMPORTANT TO UNDERSTAND THE DIFFERENCE
// Screen size : screen.height      | screen.width
// Window size : window.outerHeight | window.outerWidth
// Content size: window.innerHeight | window.innerWidth

// NEXT TERM
// Visualize the animations of cells 

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
   
    var row_pt = 0;
    var col_pt = 0;

    var table = document.querySelector("table");

    if(orient == 0){
        // determine Point of Division 
        // if divide horizontally, it cannot take place at the first and last row
        row_pt = getRandInteger(min_row + 1, max_row - 1);

        var abv_row_pt = (row_pt - min_row) % 2;
        var bel_row_pt = (max_row - row_pt) % 2;
        
        if(abv_row_pt != 1 || bel_row_pt != 1){

            console.log("Even column(s)!");
            
            // to avoid 4-celled squares, divide with odd rows on both sides
            // Generate random integer to determine whether to minus or plus 1
            var temp = getRandInteger(0, 1);

            if(temp == 0){
                row_pt = row_pt - 1;
            }
            else{
                row_pt = row_pt + 1;
            }
        } 

        // determine the gap 
        col_pt = getRandInteger(min_col, max_col);

        var lhs_len = (col_pt - min_col) % 2;
        var rhs_len = (max_col - col_pt) % 2;

        if(lhs_len != 0 || rhs_len != 0){

            console.log("Odd column(s)!");
            
            // to avoid a square division, the gap should be left with even cols on both sides
            // generate random integer to determine whether to minus or plus 1
            var temp = getRandInteger(0, 1);

            if(temp == 0){
                col_pt = col_pt - 1;
            }
            else{
                col_pt = col_pt + 1;
            }
        }

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
        // determine Point of Division 
        // if divide vertically, it cannot take place at the first and last column
        col_pt = getRandInteger(min_col + 1, max_col - 1);

        var bef_col_pt = (col_pt - min_col) % 2;
        var aft_col_pt = (max_col - col_pt) % 2;
        
        if(bef_col_pt != 1 || aft_col_pt != 1){

            console.log("Even column(s)!");
            
            // to avoid 4-celled squares, divide with odd columns on both sides
            // Generate random integer to determine whether to minus or plus 1
            var temp = getRandInteger(0, 1);

            if(temp == 0){
                col_pt = col_pt - 1;
            }
            else{
                col_pt = col_pt + 1;
            }
        }

        // determine the gap 
        row_pt = getRandInteger(min_row, max_row);

        var top_len = (row_pt - min_row) % 2;
        var bot_len = (max_row - row_pt) % 2;

        if(top_len != 0 || bot_len != 0){

            console.log("Odd row(s)!");
            
            // to avoid a square division, the gap should be left with even rows on both sides
            // generate random integer to determine whether to minus or plus 1
            var temp = getRandInteger(0, 1);

            if(temp == 0){
                row_pt = row_pt - 1;
            }
            else{
                row_pt = row_pt + 1;
            }
        }

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

    // CELL DIMENSION "26 x 26"
    const cell_size = 26;

    const num_cols = Math.floor(250/cell_size);
    const num_rows = Math.floor(250/cell_size);

    // the current maze must be of odd height & length 
    console.log("Height of grid: " + num_cols);
    console.log("Length of grid: " + num_rows);

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

            var top = i == 0;
            var bot = i == num_rows - 1;
            var lef = j == 0;
            var rig = j == num_cols - 1;

            if(top || bot || lef || rig){
                // painting border
                maze_2DArray[i][j] = "0";

                cell.style.background = "rgb(255,0,0)";
            }
            else{
                // current maze 
                maze_2DArray[i][j] = "1";
            }
        }
    }  

    container.appendChild(table);

    const min_row = 1;
    const min_col = 1;
    const max_row = num_rows - 2;
    const max_col = num_cols - 2;

    recursiveDivisionAlgorithm(maze_2DArray, min_row, min_col, max_row, max_col);
}


