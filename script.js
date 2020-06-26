// IMPORTANT TO UNDERSTAND THE DIFFERENCE
// Screen size : screen.height      | screen.width
// Window size : window.outerHeight | window.outerWidth
// Content size: window.innerHeight | window.innerWidth

function getRandInteger(min, max) {
    // Inclusive of min & max
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function recursiveDivisionAlgo(maze_2Darray) {

    console.log("recursiveDivisionAlgo() working");

    // Recursive Division Maze Generator
    // 1: Split the grid into 2 randomly [vertically/horizontally] with a cell spacing 
    // 1.1: Find out how big the grid is within the border 

    var min_row = 0;
    var max_row = 0;
    var min_col = 0;
    var max_col = 0;

    var col_searched = false;
    var col_searching = false;
    var row_searching = false;

    for(var i=0; i<maze_2Darray.length; i++){

        for(var j=0; j<maze_2Darray[i].length; j++){

            if(maze_2Darray[i][j] == "1" && col_searching == false){

                min_col = j;

                col_searching = true;
            }
            else if(maze_2Darray[i][j] == "0" && col_searching == true){

                max_col = j - 1;

                col_searching = false;

                col_searched = true;

                break;
            }
        }

        if(col_searched == true)
            break;
    }

    for(var i=0; i<maze_2Darray.length; i++){

        if(maze_2Darray[i][min_col] == "1" && maze_2Darray[i][max_col] == "1" && row_searching == false){

            min_row = i;

            row_searching = true;
        }
        else if(maze_2Darray[i][min_col] == "0" && maze_2Darray[i][max_col] == "0" && row_searching == true){

            max_row = i - 1;

            row_searching = false;

            break;
        }
    }

    // Array Stack 
    var stack = [];

    stack.push(`${min_row},${max_row},${min_col},${max_col}`);

    var count = 5;

    while(count > 0){

        min_row = Number.parseInt(stack[stack.length - 1].split(",")[0]);
        max_row = Number.parseInt(stack[stack.length - 1].split(",")[1]);
        min_col = Number.parseInt(stack[stack.length - 1].split(",")[2]);
        max_col = Number.parseInt(stack[stack.length - 1].split(",")[3]);

        // ** What if whole column/row is "1". That means the space did not get split at all. 
        // var split = true;

        // 1.2: Find random cell within the border [random cell = cell spacing]
        var rand_col = getRandInteger(min_col, max_col); 
        var rand_row = getRandInteger(min_row, max_row);

        console.log("rand_col: " + rand_col);
        console.log("rand_row: " + rand_row);

        // What if cell at TR/TL/BR/BL?
        var e1 = rand_col == min_col && rand_row == min_row;
        var e2 = rand_col == max_col && rand_row == min_row;
        var e3 = rand_col == min_col && rand_row == max_row;
        var e4 = rand_col == max_col && rand_row == max_row;

        while(e1 || e2 || e3 || e4)
        {
            rand_col = getRandInteger(min_col, max_col); 
            rand_row = getRandInteger(min_row, max_row);
        }


        // 1.3: Determine orientation 
        // 1 means expand vertically
        // 0 means expand horizontal
        var rand_orientation = getRandInteger(0, 1);

        console.log("rand_orientation: " + rand_orientation);

        var invalid_vert_orien = (rand_col == min_col || rand_col == max_col) && rand_orientation == 1;
        var invalid_hori_orien = (rand_row == min_row || rand_row == max_row) && rand_orientation == 0;

        if(invalid_vert_orien){

            // If random cell is chosen next to a left or right wall, it should expand horizontally only
            rand_orientation = 0;
        }
        else if(invalid_hori_orien){

            // If random cell is chosen next to a top or bottom wall, it should expand vertically only
            rand_orientation = 1;
        }
        
        var table = document.querySelector("table");

        if(rand_orientation == 1){

            for(var i=min_row; i<=max_row; i++){

                // If one cell above the min_row is "1" then min_row cell will be "1"
                var above = i == min_row && maze_2Darray[i - 1][rand_col] == "1";
        
                // If one cell below the max_row is "1" then max_row cell will be "1"
                var below = i == max_row && maze_2Darray[i + 1][rand_col] == "1";
        
                if(above || below || i == rand_row){
        
                    table.rows[i].cells[rand_col].style.background = "rgb(255, 255, 255)";
                }
                else{
                            
                    table.rows[i].cells[rand_col].style.background = "rgb(255, 0, 0)";
        
                    maze_2Darray[i][rand_col] = "0";
                }
            }
        
            // less than rand_col
            // min_row = min_row
            // max_row = max_row
            // min_col = min_col
            // max_col = rand_col - 1

            stack.push(`${min_row},${max_row},${min_col},${rand_col - 1}`);

            // more than rand_col 
            // min_row = min_row
            // max_row = max_row
            // min_col = rand_col + 1
            // max_col = max_col

            stack.push(`${min_row},${max_row},${rand_col + 1},${max_col}`);
        }
        else{

            for(var i=min_col; i<=max_col; i++){

                // If one cell before min_col is "1" then min_col cell will be "1"
                var before = i == min_col && maze_2Darray[rand_row][i - 1] == "1";

                // If one cell before max_col is "1" then max_col cell will be "1"
                var after = i == max_col && maze_2Darray[rand_row][i + 1] == "1";
            
                if(before || after || i == rand_col){

                    table.rows[rand_row].cells[i].style.background = "rgb(255, 255, 255)";
                }
                else{

                    table.rows[rand_row].cells[i].style.background = "rgb(255,0,0)";

                    maze_2Darray[rand_row][i] = "0";
                }
            }

            // less than rand_row
            // min_row = min_row
            // max_row = rand_row - 1
            // min_col = min_col
            // max_col = max_col

            stack.push(`${min_row},${rand_row - 1},${min_col},${max_col}`);

            // more than rand_row
            // min_row = rand_row + 1
            // max_row = max_row
            // min_col = min_col
            // max_col = max_col

            stack.push(`${rand_row + 1},${max_row},${min_col},${max_col}`);
        }
        stack.pop();

        count--;
    }
}
 
function populateBorder(maze_2Darray) {

    console.log("populateBorder() working");

    var table = document.querySelector("table");

    // var num_rows = table.rows.length;
    // var num_cols = table.rows[0].cells.length;

    for(var i=0; i<maze_2Darray.length; i++){

        for(var j=0; j<maze_2Darray[i].length; j++){

            var cond1 = i == 0 || i == maze_2Darray.length - 1;
            var cond2 = j == 0 || j == maze_2Darray[i].length - 1;

            if(cond1 || cond2){

                table.rows[i].cells[j].style.background = "rgb(255,0,0)";
                maze_2Darray[i][j] = "0";
            }   
        }
    }
}

function init(maze_2Darray) {

    populateBorder(maze_2Darray);

    recursiveDivisionAlgo(maze_2Darray);
}

window.onload = function() {

    const container = document.getElementById("gridSpace");

    const table = document.createElement("table");

    // SET CELL DIMEN. HERE " 25 x 25 "
    const cell_size = 25;

    // var num_cols = Math.floor(window.innerWidth/cell_size);
    // var num_rows = Math.floor(window.innerHeight/cell_size);
    var num_cols = Math.floor(500/cell_size);
    var num_rows = Math.floor(500/cell_size);

    // SET UP A 2D ARRAY 
    // 0: Blocked and Cannot be crossed   
    // 1: Available path                 
    var maze_2Darray = [];

    for(var i=0; i<num_rows; i++){
        
        const row = document.createElement("tr");

        table.appendChild(row);

        maze_2Darray[i] = [];

        for(var j=0; j<num_cols; j++){
            
            const cell = document.createElement("td");
            cell.id = `${i},${j}`;

            row.appendChild(cell);

            maze_2Darray[i][j] = "1";
        }
    }  

    container.appendChild(table);

    console.log(window.innerWidth);
    console.log(window.innerHeight);
    console.log(num_cols);
    console.log(num_rows);

    init(maze_2Darray);
}


