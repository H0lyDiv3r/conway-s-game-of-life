var grid = []
var tmpGrid = []
var container = document.querySelector('.container');

build(20,20)

function cell(r,c){
    this.r = r;
    this.c = c;
    this.status = Math.floor(Math.random() * 2)
    cell.prototype.getNeighbours = function(){
        //FIRST CORNER
        if(this.r == 0 && this.c == 0){
            n = [grid[this.r][this.c+ 1],
                 grid[this.r + 1][this.c],
                 grid[this.r + 1][this.c+1]];
        }

        //SECOND CORNER CLOCKWISE
        else if (this.r == 0 && this.c == grid[0].length -1){
            n = [grid[this.r][this.c-1],
                 grid[this.r+1][this.c-1],
                 grid[this.r+1][this.c]]
        }        
        // THIRD CORNER CLOCKWISE
        else if (this.r == grid.length -1 && this.c == grid[0].length -1 ) {
            n = [grid[this.r-1][this.c-1],
                 grid[this.r-1][this.c],
                 grid[this.r][this.c-1]] 
        }        
        //FOURTH CORNER CLOCKWISE
        else if (this.r == grid.length -1 && this.c == 0){
            n = [grid[this.r-1][this.c],
                 grid[this.r-1][this.c+1],
                 grid[this.r][this.c+1]] 
        }
        // FIRST ROW
        else if(this.r ==0 && (this.c > 0 && this.c < grid.length - 1)){
            n = [grid[this.r][this.c-1],
                 grid[this.r][this.c+1],
                 grid[this.r+1][this.c-1],
                 grid[this.r+1][this.c],
                 grid[this.r+1][this.c+1]]  
        }
        //LAST ROW
        else if(this.r == grid.length-1 && (this.c > 0 && this.c < grid.length - 1)){
            n = [grid[this.r-1][this.c-1],
                 grid[this.r-1][this.c],
                 grid[this.r-1][this.c+1],
                 grid[this.r][this.c-1],
                 grid[this.r][this.c+1],] 
        }
        //FIRST COLUMN
        else if (this.c == 0 && (this.r > 0 && this.r < grid[0].length - 1)){
            n = [grid[this.r-1][this.c],
                 grid[this.r-1][this.c+1],
                 grid[this.r][this.c+1],
                 grid[this.r+1][this.c],
                 grid[this.r+1][this.c+1]] 
        }
        //LAST COLUMN
        else if (this.c == grid[0].length-1 && (this.r > 0 && this.r < grid[0].length - 1)){
            n = [grid[this.r-1][this.c-1],
                 grid[this.r-1][this.c],
                 grid[this.r][this.c-1],
                 grid[this.r+1][this.c-1],
                 grid[this.r+1][this.c],] 
        }
        else{
            n = [grid[this.r-1][this.c-1],
                 grid[this.r-1][this.c],
                 grid[this.r-1][this.c+1],
                 grid[this.r][this.c-1],
                 grid[this.r][this.c+1],
                 grid[this.r+1][this.c-1],
                 grid[this.r+1][this.c],
                 grid[this.r+1][this.c+1]] 
        }
        return n
    };
    cell.prototype.life = function(){
        total = 0;
        stat = this.status;
        neighbours = this.getNeighbours()
        for(i = 0; i < neighbours.length;i=i+1){
            total = total + neighbours[i].status
        }
        if(total < 2){
            stat = 0
        }
        else if(total > 3){
            stat = 0
        }
        else if(this.status == 0 && total ==3){
            stat = 1
        }
        else if(this.status == 1 && (1>total<4)){
            stat = 1
        }
        else{
            stat = 0
        }
        return stat
    };
 };
function build(y,x){
    tmp = [];
    for(i = 0; i< y ; i = i+1){
        tmp = []
        grid.push(tmp);
        for(j = 0; j< x; j += 1){
            tmp.push(new cell(i,j));
        };
    };
    return grid
};

function generate(){
    container.innerHTML = ""
    for(i = 0 ; i < grid.length ; i ++){
    for(j = 0; j < grid[0].length ; j ++){
        if (grid[i][j].status == 1){
            container.innerHTML =container.innerHTML + "<div class = 'cell alive'></div>"
        }else{
            container.innerHTML =container.innerHTML + "<div class = 'cell dead'></div>"
        } 
    }
}
};
function play(){
    tmpGrid = []
    grid.forEach(function(sub) {
        list = []
        sub.forEach(function(cell){
            list.push(cell.life())
        })
        tmpGrid.push(list)
    });
    for(i = 0 ; i < grid.length ; i++){
        for(j = 0; j < grid[0].length ; j++ ){
            grid[i][j].status = tmpGrid[i][j]
        }
    }
    generate();
};

const startGame = ()=>{
    setInterval(()=>{
        play()
    },200)
}
