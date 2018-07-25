let catArr = [];
class Cat {
    constructor(name) {
        this.name = name;
        this.clicksNumber = 0;
        this.imgSource = "http://99px.ru/sstorage/86/2015/09/image_861809151414179543807.gif";
        this.clickCount = function(event) {
            console.log(this, event.target, this.clicksNumber);
            this.clicksNumber += 1;
            (this.clicksNumber < 10) ? 
            event.target.nextSibling.nextSibling.querySelector(`.${this.name} .clicks__displayed`).innerHTML = `0${this.clicksNumber}` : 
            event.target.nextSibling.nextSibling.querySelector(`.${this.name} .clicks__displayed`).innerHTML = `${this.clicksNumber}`;
            console.log(`${this}, ${this.clicksNumber}`);

        }
    }
    
    // clickCount() {
    //     (this.clicksNumber < 10) ? 
    //     this.nextSibling.nextSibling.querySelector(".clicks__displayed").innerHTML = `0${this.clicksNumber}` : 
    //     this.nextSibling.nextSibling.querySelector(".clicks__displayed").innerHTML = `${this.clicksNumber}`;
    //     console.log(`${this}, ${this.clicksNumber}`);
    // }
}

function catInit(name) {
    const cat = new Cat(name);
    
    //убираем кота в котомассив
    catArr.push(cat);

    let desk = document.querySelector("body"),
        fragment = document.createDocumentFragment(),
        card = document.createElement("div");

    card.classList.add(`card`, `${cat.name}`);
    card.innerHTML = `
    <h3>${cat.name} the Cat</h3>
    <img class="card__img" src=${cat.imgSource} alt="Tom the cat dancing in cabaret show" width=300>
    <div class="card__description">
    <p class="card__fact">Outnumber the number of clicks performed by clicking this cat in this "Cat-Clicker" project</p>
    <ul class="card__specs">
    <li class="card__specs_item"><span class="card__specs_item_name">CLICKS performed:</span><span class="clicks__displayed card__specs_item_name">00</span></li>
    </ul>
    </div>`;
    fragment.appendChild(card);
    desk.appendChild(fragment);

    cat.clickListener = document.querySelector(`.${cat.name} .card__img`);
    // console.log(`click listener is: ${cat.clickListener}`);
    cat.clickListener.addEventListener('click', cat.clickCount, false);
    console.log(`${cat.name} initialized`);
}

catInit("Tom");
catInit("Groover");