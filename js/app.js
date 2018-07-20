const clickListener = document.querySelector(".card__img");
let clicksPlaceholder = document.querySelector(".clicks__displayed").innerHTML,
    clicksNumber = 0;

function clickIncreased(event) {  
  if (event.target.nodeName === "IMG") {
    clicksNumber += 1;
    (clicksNumber < 10) ? document.querySelector(".clicks__displayed").innerHTML = `0${clicksNumber}` : document.querySelector(".clicks__displayed").innerHTML = `${clicksNumber}`;
    console.log(clicksNumber);
  }
}

clickListener.addEventListener('click', clickIncreased, false);
