document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Enter your name please ?");

  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "Unknown user";
    document.querySelector(".name span").style.color = "red";
  } else {
    document.querySelector(".name span").innerHTML = `Hello ${yourName} 🤠 `;
  }
  document.querySelector(".control-buttons").remove();
};
let duration = 500;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function flipBlock(selectedCard) {
  selectedCard.classList.add("is-flipped");
  // Collect all the flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // If two blocks has been selected:
  if (allFlippedBlocks.length === 2) {
    stopClick();
    // Check if the two cards are matched
    checkMatchedCards(allFlippedBlocks[0], allFlippedBlocks[1]);
  }

  function stopClick() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
      blocksContainer.classList.remove("no-clicking");
    }, duration);
  }
}

const triesElement = document.querySelector(".tries span");

function checkMatchedCards(firstCard, secondCard) {
  if (firstCard.dataset.technology === secondCard.dataset.technology) {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");

    firstCard.classList.add("has-match");
    secondCard.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(function () {
      firstCard.classList.remove("is-flipped");
      secondCard.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();

    // triesCounter();
    victory();
  }
}

function victory() {
  const cards = document.querySelectorAll(".game-block");
  let matchedCards = document.querySelectorAll(".has-match");
  console.log(cards.length);
  console.log(matchedCards.length);
  if (cards.length === matchedCards.length) {
    console.log("Bravooo");
    document.getElementById("victory").play();
  }
}

function triesCounter() {
  if (triesElement.innerHTML > 2) {
    console.log("Game Over");
    gameOver();
  }
}


function gameOver() {
  // var txt;
  if (confirm("Press a button!")) {
    console.log("Press a button")
    // txt = "You pressed OK!";
  } else {
    console.log('You pressed Cancel!')
    // txt = "You pressed Cancel!";
  }
}


function shuffle(arr) {
  let current = arr.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;
  }
  return arr;
}
