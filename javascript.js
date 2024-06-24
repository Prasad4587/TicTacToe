let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#Reset");
let new_btn = document.querySelector("#new");
let msg_Con = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");
let currentTurnDisplay = document.querySelector("#currentTurn");


let turnO = true;
let count = 0;
let draw1 =true;

const winpatterns = [
    [0,1,2],
    [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [2,4,6],
    [3,4,5], [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        
        if(turnO){
            
            box.innerText="O";
            turnO = false;
            currentTurnDisplay.innerText = "Current Turn: X";
        }
        else{
            
            box.innerText = "X";
            turnO = true;
            currentTurnDisplay.innerText = "Current Turn: O";
        }
        
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const disabledboxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        
        box.innerText = "";
    }
    count = 0;
    draw1 = true;
};

const resetGame =() =>{
    
    enableboxes();
    msg_Con.classList.add("hide");
}

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msg_Con.classList.remove("hide");
    
};

const showWinner = (winner)=> {
    msg.innerText = `Congratulations, Winner is  ${winner}`;
    msg_Con.classList.remove("hide");
    draw1 = false;
    disabledboxes();
}

const checkWinner =() => {
    for(let pattern of winpatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !="" && pos1Val=== pos2Val && pos2Val === pos3Val  ){
                showWinner(pos1Val);
                return true;
        }
    }
};



new_btn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

