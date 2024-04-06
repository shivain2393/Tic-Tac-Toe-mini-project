let boxes = document.querySelectorAll(".box");
let newButton = document.querySelector("#newBtn");
let msg =  document.querySelector(".msg-container");
let turnText = document.querySelector("#turn-text")

let turnO = true;


let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const showTurnText = () => {
    if(turnO){
        turnText.innerText = "O's turn";
    }
    else{
        turnText.innerText = "X's turn";
    }
}

showTurnText();

const resetGame = () => {
    turnText.style.display = "block";
    msg.style.display = "none";
    turnO = true;
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    })
}

const printResult = (isWinner, winner = null) => {
    turnText.style.display = "none"
    if(isWinner){
        msg.style.display = "block";
        let Winner = document.querySelector("#winner");
        Winner.innerText =  winner;
        Winner.style.color = "#CDACA1"
    }
    else{
        msg.innerText = `The game is a Draw!`;
        msg.style.display = "block";
    }
}

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    })
}

const checkWinner = () =>{

    let isDraw = true;

    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                disableBoxes();
                printResult(true, pos1);
                return;
            }
        }
        else{
            isDraw = false;
        }
    }

    if(isDraw){
        disableBoxes();
        printResult(false);
    }
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
            showTurnText();
        }
        else{
            box.innerText = "X";
            turnO = true;
            showTurnText();
        }
        box.disabled = true;

        checkWinner();
    })
})


newButton.addEventListener("click", () => {
    resetGame();
    showTurnText();
})
