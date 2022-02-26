'use strict'

// ПЕРЕМЕННЫЕ
const form = document.forms.feedback
let phoneInput = form.elements.visitorPhoneNumber
let nameInput = form.elements.visitorName
let emailInput = form.elements.visitorEmail

let container = document.querySelector('.container')

const bgVideo = document.querySelector('.video');
const videos = [
   'sources/video/LOR.mp4',
   'sources/video/Landscape.mp4',
   'sources/video/nature.mp4',
   'sources/video/china.mp4'
];
const playPauseButt = document.querySelector('.play-button')

const sliderVideoCovers = document.querySelector('.videos-gallery')
let slidesVideoCover = document.getElementsByClassName('video-cover');

let switchContainer = document.querySelectorAll('.switch')
let sliderLines = document.querySelectorAll('.slide')
let batons = []

let marginSlider = []
for (let i = 0; i < sliderLines.length; i++) marginSlider.push(0);

//calcSlideLine()

window.addEventListener("resize", setWidthToSliderLine);

let scrollButton = document.querySelector('.scroll')

let excCardsGallery = document.querySelector('.exc-slider')
console.log(excCardsGallery)
//#region bg-video
let n = 1;

bgVideo.addEventListener('ended', function () {
   setNextVideo();
})

let clickCount = 0;
playPauseButt.onclick = () => {

   clickCount += 1;
   if (clickCount == 2) {
      bgVideo.play();
      clickCount = 0;
      playPauseButt.src = 'sources/image/play.png';
   } else {
      bgVideo.pause();
      playPauseButt.src = 'sources/image/play-paused.png';
   }
}

function setNextVideo() {
   if (n == videos.length) n = 0;
   bgVideo.src = videos[n];
   leftOffset();
   setTimeout(() => {
      playPauseButt.style.visibility = 'visible'
   }, 1000);
   n++;
}
//#endregion

//#region video-gallery func

function leftOffset() {
   let widthElem = slidesVideoCover[0].scrollWidth + 20;
   let cover = slidesVideoCover[0].cloneNode(true);

   sliderVideoCovers.append(cover);

   slidesVideoCover[0].style.marginLeft = `${-widthElem}px`;
   playPauseButt.style.visibility = 'hidden'

   setTimeout(() => {
      slidesVideoCover[0].remove();
   }, 1000)

   cover.addEventListener('click', () => {
      setNextVideo();
   })
}
//#endregion

//#region sliders
let marginCard = [];

for (let i = 0; i < switchContainer.length; i++) {
   batons.push(switchContainer[i].querySelector('.buttons'));
   marginCard.push(0);
   let cards = switchContainer[i].parentNode.querySelector('.cards');
   batons[i].firstElementChild.onclick = () => {
      rightOffsetCard(cards, batons[i].firstElementChild, batons[i].lastElementChild, i);
      offsetSlider(i)
   }
   batons[i].lastElementChild.onclick = () => {
      leftOffsetCard(cards, batons[i].lastElementChild, batons[i].firstElementChild, i);
      offsetSlider(i)
   }

   cards.addEventListener('pointerdown', function (event) {

      let startPosX = event.clientX;
      let endPosX;

      cards.onpointerup = function (event) {
         onMouseMove(event.clientX)
      };

      function onMouseMove(event) {
         endPosX = event;
         if (endPosX - startPosX < -25) {
            leftOffsetCard(cards, batons[i].lastElementChild, batons[i].firstElementChild, i)
            offsetSlider(i)
         }
         if (endPosX - startPosX > 25) {
            rightOffsetCard(cards, batons[i].firstElementChild, batons[i].lastElementChild, i)
            offsetSlider(i)
         }
      }
   })
}

function leftOffsetCard(cards, btnNext, btnPrev, marginIndex) {
   const scrollWidth = cards.scrollWidth - container.clientWidth;
   const width = cards.firstElementChild.scrollWidth + 20;

   if (marginCard[marginIndex] == -scrollWidth) {
      return;
   }
   btnPrev.classList.remove('disable')

   if (marginCard[marginIndex] - width < -scrollWidth) {
      marginCard[marginIndex] -= marginCard[marginIndex] - width + scrollWidth;
   }

   marginCard[marginIndex] += -width;
   marginSlider[marginIndex]++;
   cards.style.transform = `translateX(${marginCard[marginIndex]}px)`;

   if (marginCard[marginIndex] == -scrollWidth) {
      btnNext.classList.add('disable')
   }
}

function rightOffsetCard(cards, btnPrev, btnNext, marginIndex) {
   const width = cards.firstElementChild.scrollWidth + 20;
   if (marginCard[marginIndex] == 0) {
      return;
   }
   btnNext.classList.remove('disable')

   if (marginCard[marginIndex] + width > 0) {
      marginCard[marginIndex] = 0;
   } else marginCard[marginIndex] += width;

   marginSlider[marginIndex]--;
   cards.style.transform = `translateX(${marginCard[marginIndex]}px)`;
   if (marginCard[marginIndex] == 0) {
      btnPrev.classList.add('disable')
   }
}

function offsetSlider(index) {
   let sliderWidth = sliderLines[index].scrollWidth
   sliderLines[index].style.transform = `translateX(${marginSlider[index] * sliderWidth}px)`
}


//#endregion

//#region menu
const btnMenuOpen = document.querySelector('.btn')

btnMenuOpen.addEventListener('click', function () {
   let menu = document.querySelector('.open-menu');
   this.classList.toggle('active')
   this.classList.toggle('not-active')
   if (btnMenuOpen.classList.contains('active')) {
      menu.style.transform = 'translateY(0)';
      this.style.right = `calc(((100vw - ${this.parentElement.clientWidth}px) / 2))`
   } else {
      menu.style.transform = 'translateY(-100%)';
      this.style.right = `0`
   }
   document.body.classList.toggle('body-hidden')
})
//#endregion

//#region slider-width
function setWidthToSliderLine() {
   for (let i = 0; i < sliderLines.length; i++) {
      calcSlideLine()
      marginCard[i] = 0;
      marginSlider[i] = 0;
      let cards = switchContainer[i].parentNode.querySelector('.cards')
      cards.removeAttribute("style")
      cards.transform = `translateX(0)`
      batons[i].firstElementChild.classList.add('disable')
      batons[i].lastElementChild.classList.remove('disable')
   }
}
//#endregion

//#region form
var maskOptions = {
   mask: '+{7}(000)000-00-00'
};
var mask = IMask(phoneInput, maskOptions);
let validationText = document.createElement('span');
validationText.className = "invalid-error-text";
validationText.innerHTML = 'Поле не должно быть пустым!';

form.addEventListener("submit", function (event) {
   if (!phoneInput.value || !nameInput.value || !emailInput.value) {

      if (!phoneInput.value) {
         phoneInput.classList.add('invalid-input-value');
         phoneInput.after(validationText.cloneNode(true));
      }
      if (!nameInput.value) {
         nameInput.classList.add('invalid-input-value');
         nameInput.after(validationText.cloneNode(true));
      }
      if (!emailInput.value) {
         emailInput.classList.add('invalid-input-value');
         emailInput.after(validationText.cloneNode(true));
      }
      event.preventDefault();
   }
})

phoneInput.addEventListener('focus', function () {
   this.classList.remove('invalid-input-value');
   if (this.nextSibling != emailInput) {
      this.nextSibling.remove();
   }
});

nameInput.addEventListener('focus', function () {
   this.classList.remove('invalid-input-value');
   if (this.nextSibling != phoneInput) {
      this.nextSibling.remove();
   }
});

emailInput.addEventListener('focus', function () {
   this.classList.remove('invalid-input-value');
   if (this.nextSibling != document.querySelector('[type="submit"]')) {
      this.nextSibling.remove();
   }
});
//#endregion

//#region scroll button
scrollButton.addEventListener('click', function () {
   window.scrollTo({
      top: 0,
      behavior: "smooth"
   })
})

window.addEventListener('scroll', function () {
   if (window.pageYOffset > 500) {
      scrollButton.classList.remove('scroll-hidden')
   } else scrollButton.classList.add('scroll-hidden');
})
//#endregion

//#region helpers

//#region objects
let excCards = [{
      backgroundImage: 'sources/image/exc-1.png',
      type: "Автобусный тур",
      title: "Обзорная по Сочи (из Адлера)",
      time: "6 часов",
      price: "618",
      description: `Приглашаем вас на экскурсию<br>
      "Обзорная по Большому Сочи": <br>
         Экскурсия начнется с подъёма на гору Большой Ахун - это высшая точка(665 метров) на побережьи
      Сочи.На вершине горы Большой Ахун есть смотровая башня, построенная в 1935 - 36 годах по проекту
      архитектора С.И.Воробьева...`
   },
   {
      backgroundImage: 'sources/image/exc-2.png',
      type: "Конный тур",
      title: "Конные прогулки",
      time: "1,5 часа",
      price: "1 809",
      description: `Конные прогулки проходят в Лазурной долине. С долины открывается красивый вид на море, горы и
      лес.На всем пути следования экскурсии вас будут сопровождать опытные инструктора.Катание на
      лошадях или иппотерапия очень полезна для детей и взрослых...`
   }, {
      backgroundImage: 'sources/image/exc-3.png',
      type: "Квадротур",
      title: "Пасть дракона",
      time: "2,5 часа",
      price: "3 515",
      description: `Маршрут на Квадроциклах проходит по горной реке Мзымта вдоль белых скал и самшитовый лес к
                        водопаду Глубокий Яр или "Пасть Дракона" (экскурсионное название).
                        <br>
                        Высота водопада 41,5 метр - это один из самых высоких водопадов Большого Сочи...`
   }, {
      backgroundImage: 'sources/image/exc-4.png',
      type: "Автобусный тур",
      title: "Женский монастырь",
      time: "4 часа",
      price: "618",
      description: `Троице - Георгиевский женский монастырь расположен в селе Лесное в живописном месте, в котором
                        гармонично сочетаются красота природы и красота архитектуры сотворенная руками человека.
                        <br>
                        Это удивительное место расположено совсем недалеко от Чёрного моря - всего в 20 километрах`
   }, {
      backgroundImage: 'sources/image/exc-5.png',
      type: "Автобусный тур",
      title: "Женский монастырь",
      time: "4 часа",
      price: "999",
      description: `Троице - Георгиевский женский монастырь расположен в селе Лесное в живописном месте, в котором
                        гармонично сочетаются красота природы и красота архитектуры сотворенная руками человека.
                        <br>
                        Это удивительное место расположено совсем недалеко от Чёрного моря - всего в 20 километрах`
   }, {
      backgroundImage: 'sources/image/exc-6.png',
      type: "Автобусный тур",
      title: "Женский монастырь",
      time: "2 часа",
      price: "549",
      description: `Троице - Георгиевский женский монастырь расположен в селе Лесное в живописном месте, в котором
                        гармонично сочетаются красота природы и красота архитектуры сотворенная руками человека.
                        <br>
                        Это удивительное место расположено совсем недалеко от Чёрного моря - всего в 20 километрах`
   },
]
//#endregion

//#region load data
excCards.forEach(item =>
   excCardsGallery.insertAdjacentHTML('beforeend', `
<div class="exc-card card">
                  <div class="exc-card__background align-center">
                     <div class="shade-gradient"></div>
                     <img src = "${item.backgroundImage}"
                     alt = "">
                  </div>
                  <div class="desc">
                     <span class="exc-type">${item.type}</span>
                     <span class="exc-name">${item.title}</span>
                     <div class="desc-numbers">
                        <span class="desc-number">
                           <img src="sources/image/clock.svg" alt="Delay">
                           ${item.time}
                        </span>
                        <span class="desc-number">
                           <img src="sources/image/coins.svg" alt="Price">
                           ${item.price} ₽
                        </span>
                     </div>
                     <p>
                        ${item.description}
                     </p>
                     <a href="#" class="basic-button">
                        Подробнее
                     </a>
                  </div>
               </div>
`))

calcSlideLine()
//#endregion

function calcSlideLine() {
   for (let i = 0; i < sliderLines.length; i++) {
      sliderLines[i].removeAttribute("style")
      let cards = switchContainer[i].parentNode.querySelector('.cards')
      container = document.querySelector('.container')
      sliderLines[i].style.width = `${sliderLines[i].parentElement.scrollWidth / (Math.round((cards.scrollWidth - container.clientWidth) / (cards.firstElementChild.clientWidth+20)) + 1)}px`;
   }
}

for (let i = 0; i < slidesVideoCover.length; i++) {
   slidesVideoCover[i].addEventListener('click', () => {
      n = [...slidesVideoCover].indexOf(slidesVideoCover[i]);
      setNextVideo();
   })
}

//#endregion