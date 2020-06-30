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

function recursiveDivisionAlgo(maze_2Darray) {

    console.log("recursiveDivisionAlgo()");

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
    // Remove values that have been split from the back of the array 
    // Insert new values to the end of the array!!

    var stack = [];

    stack.push(`${min_row},${max_row},${min_col},${max_col}`);

    var count = 5;

    while(count > 0){

        for(var i=0; i<stack.length; i++){

            console.log(stack[i]);
        }

        var size = stack[stack.length - 1].split(",");

        min_row = size[0] * 1;
        max_row = size[1] * 1;
        min_col = size[2] * 1;
        max_col = size[3] * 1;

        // Validations -----
        // What if single row/column? 
        // Split will lead to dead end
        var cond1 = (max_row - min_row == 0);
        var cond2 = (max_col - min_col == 0);

        if(cond1 || cond2){

            console.log("LOOP!");
            stack.pop();
            continue;
        }

        // Validations -----
        // What if a square is formed? 

        var split = false;

        while(split == false){

            // Find random cell within the border [random cell = cell spacing]
            var rand_col = getRandInteger(min_col, max_col); 
            var rand_row = getRandInteger(min_row, max_row);

            console.log("rand_col: " + rand_col);
            console.log("rand_row: " + rand_row);

            // Validations -----
            // What if cell at TR/TL/BR/BL?
            var c1 = rand_col == min_col && rand_row == min_row;
            var c2 = rand_col == max_col && rand_row == min_row;
            var c3 = rand_col == min_col && rand_row == max_row;
            var c4 = rand_col == max_col && rand_row == max_row;

            if(c1 || c2 || c3 || c4){

                console.log("LOOP!");
                split = false;
                continue;
            }

            // Determine orientation 
            // 1 means expand vertically
            // 0 means expand horizontal
            var rand_orientation = getRandInteger(0, 1);

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

            console.log("rand_orientation: " + rand_orientation);

            var table = document.querySelector("table");

            if(rand_orientation == 1){

                var wall_count = 0;

                for(var i=min_row; i<=max_row; i++){
    
                    // If one cell above the min_row is "1" then min_row cell will be "1"
                    var above = i == min_row && maze_2Darray[i - 1][rand_col] == "1";
            
                    // If one cell below the max_row is "1" then max_row cell will be "1"
                    var below = i == max_row && maze_2Darray[i + 1][rand_col] == "1";
    
                    let selected = table.rows[i].cells[rand_col];
            
                    if(!(above || i == rand_row || below )){
            
                        selected.style.background = "rgb(255, 0, 0)";
            
                        maze_2Darray[i][rand_col] = "0";

                        wall_count++;
                    }
                }

                if(wall_count == 0){

                    console.log("LOOP!");
                    split = false;
                    continue;
                }
                else{
                    split = true;

                    // First remove the grid space that is successfully split at the end of the array
                    stack.pop();
        
                    // Then Insert new grid space that is divided
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
            }
            else{

                var wall_count_two = 0;

                for(var i=min_col; i<=max_col; i++){
    
                    // If one cell before min_col is "1" then min_col cell will be "1"
                    var before = i == min_col && maze_2Darray[rand_row][i - 1] == "1";
    
                    // If one cell before max_col is "1" then max_col cell will be "1"
                    var after = i == max_col && maze_2Darray[rand_row][i + 1] == "1";
    
                    let selected = table.rows[rand_row].cells[i];
                
                    if(!(before || i == rand_col || after)){
    
                        selected.style.background = "rgb(255,0,0)";
    
                        maze_2Darray[rand_row][i] = "0";

                        wall_count_two++;
                    }
                }

                if(wall_count_two == 0){

                    console.log("LOOP!");
                    split = false;
                    continue;
                }
                else{

                    split = true;

                    // First remove the grid space that is successfully split at the end of the array
                    stack.pop();

                    // Then insert new grid space that is divided
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
            }
        }

        count--;
    }
}
 
function populateBorder(maze_2Darray) {

    console.log("populateBorder()");

    var table = document.querySelector("table");

    // var num_rows = table.rows.length;
    // var num_cols = table.rows[0].cells.length;

    for(var i=0; i<maze_2Darray.length; i++){

        for(var j=0; j<maze_2Darray[i].length; j++){

            let cond1 = i == 0 || i == maze_2Darray.length - 1;
            let cond2 = j == 0 || j == maze_2Darray[i].length - 1;

            let selected = table.rows[i].cells[j];

            if(cond1 || cond2){

                selected.style.background = "rgb(255,0,0)";

                maze_2Darray[i][j] = "0";
            }   
            else{

                selected.style.background = "rgb(255, 255, 255)";
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
            cell.id = `${j},${i}`;

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


