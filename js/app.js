var catView = {
    init: function() {
        // раскладываем привязки по переменным
        this.catElem = document.getElementById("cat");
        this.catNameElem = document.getElementById("cat-placeholder__name");
        this.catImageElem = document.getElementById("cat-placeholder__img");
        this.catCountElem = document.getElementById("cat-placeholder__clicks");

        // добавляем слушатель кликов по котам
        this.catImageElem.addEventListener("click", function() {
            octopus.incrementCounter();
        });

        // рендерим однократно для отображения результата
        this.render();
    },

    render: function(){
        // присваиваем текущие значения по ДОМ элементам
        var currentCat = octopus.getCurrentCat();
        this.catCountElem.textContent = currentCat.clickCounter;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};


catListView = {
    init: function() {
        // кладем ДОМэлемент для удобства доступа
        this.catListElem = document.getElementById("selection_list");

        // рендерим дом элемент
        this.render();
    },

    render: function() {
        // получаем массив с котами (забираем их из модели)
        var cats = octopus.getCats();

        // очищаем список котов в HTML
        this.catListElem.innerHTML = "";

        // проходим циклом по списку 
        for (var cat of cats) {
            //создаем новый список в HTML
            let elem = document.createElement("li");
            elem.textContent = cat.name;

            //по клику ставим срабатываение ментода setCurrentCat и рендерим catView
            elem.addEventListener("click", (function(cat) {
                return function() {
                    octopus.setCurrentCat(cat);
                    catView.render();
                }
            })(cat));

            //добавляем элемент в список
            this.catListElem.appendChild(elem);
        };
    }
};


var model = {
    currentCat: null,
    cats: [
        {
            name: "Tom",
            clickCounter: 0,
            imgSrc: "img/Tom.jpg"
        },
        {
            name: "Andy",
            clickCounter: 0,
            imgSrc: "img/Andy.jpg"
        },
        {
            name: "Laslo",
            clickCounter: 0,
            imgSrc: "img/Laslo.png"
        },
        {
            name: "Dilan",
            clickCounter: 0,
            imgSrc: "img/Dilan.png"
        },
        {
            name: "Ron",
            clickCounter: 0,
            imgSrc: "img/Ron.jpg"
        }
    ]
};


var octopus = {
    init: function(){
        // текущий кот
        model.currentCat = model.cats[0];
        
        // запускаем приложение
        catListView.init();
        catView.init();
    },

    // upd текущего кота
    getCurrentCat: function() {
        return model.currentCat;
    },

    // upd массива с котами
    getCats: function() {
        return model.cats;
    },

    // upd нового кота
    setCurrentCat: function(cat) {
        return model.currentCat = cat;
    },

    // функция счетчика кликов 
    incrementCounter: function() {
        model.currentCat.clickCounter++;
        catView.render();
    }
};

octopus.init();