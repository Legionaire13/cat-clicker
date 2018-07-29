// view
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
            // создаем новый список в HTML
            let elem = document.createElement("li");
            elem.textContent = cat.name;

            // closure & event listiner 
            elem.addEventListener("click", (function(cat) {
                return function() {
                    octopus.setCurrentCat(cat);
                    catView.render();
                }
            })(cat));

            // добавляем элемент в список
            this.catListElem.appendChild(elem);
        };
    }
};

var adminView = {
    init: function() {
        // кладем поля по переменным
        // this.catName = document.getElementById("name_admin");
        // this.catUrl = document.getElementById("url_admin");
        // this.catClicks = document.getElementById("clicks_admin");
        this.adminButton = document.getElementById("admin-button");

        //fire при клике на кнопку admin и забирает параметры c текущего кота
        this.adminButton.addEventListener("click", function() {
            adminView.render();
        });
    },

    render: function() {
        let fields = octopus.getFields(),
            adminSection = document.querySelector(".admin form"),
            cat = octopus.getCurrentCat();
            adminSection.innerHTML = "";
        
        // 1. render циклом пройти по adminFields и вывести весь список имеющихся полей
        for (var field of fields) {
            let label = document.createElement("label");
            let input = document.createElement("input");
            
            label.textContent = field.labelText;
            label.setAttribute("for", field.name);
            input.setAttribute("id", field.id);

            // смотим на id поля и записываем соответствующий value
            if (field.id === "name_admin") {
                input.setAttribute("value", cat.name);
            } else if (field.id === "url_admin") {
                input.setAttribute("value", cat.imgSrc);
            } else if (field.id === "clicks_admin") {
                input.setAttribute("value", cat.clickCounter);
            }
            
            // слушатель на каждое поле
            input.addEventListener("input", (function(field) {
                return function() {
                    if (field.id === "name_admin") {
                        cat.name = octopus.getInputValue(field);
                    } else if (field.id === "url_admin") {
                        cat.imgSrc = octopus.getInputValue(field);
                    } else if (field.id === "clicks_admin") {
                        cat.clickCounter = octopus.getInputValue(field);
                    }

                    // рендерим кота с новыми данными
                    octopus.setCurrentCat(cat);
                    catView.render();
                }
            })(field));

            // добавляем элементы в админсекцию
            adminSection.appendChild(label);
            adminSection.appendChild(input);
        }
    }
}

// model
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
            imgSrc: "img/Andy.png"
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
    ],
    adminFields: [
        {
            id: "name_admin",
            name:"name",
            labelText: "Change Cat's name"
        },
        {
            id: "url_admin",
            name:"url",
            labelText: "Change Cat's url"
        },
        {
            id: "clicks_admin",
            name:"clicks",
            labelText: "Change Cat's clicks"
        }
    ]
};

// view - model связь
var octopus = {
    init: function(){
        // текущий кот
        model.currentCat = model.cats[0];
        
        // запускаем приложение
        catListView.init();
        catView.init();
        adminView.init();
    },

    //функция забора из модели имеющиххся полей
    getFields: function() {
        return model.adminFields;
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
    },

    // установка введного в инпуты
    getInputValue: function(field) {
        return document.getElementById(field.id).value;
    }
};

octopus.init();