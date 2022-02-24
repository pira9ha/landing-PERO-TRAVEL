'use strict'

// ПЕРЕМЕННЫЕ
const form = document.forms.feedback
let phoneInput = form.elements.visitorPhoneNumber
let nameInput = form.elements.visitorName
let emailInput = form.elements.visitorEmail

let body = document.querySelector('body')
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

let switchContainer = document.querySelectorAll('.switch')
let sliderLines = document.querySelectorAll('.slide')
let batons = []

let marginSlider = []
for (let i = 0; i < sliderLines.length; i++) marginSlider.push(0);

calcSlideLine()

window.addEventListener("resize", setWidthToSliderLine);

let scrollButton = document.querySelector('.scroll')

console.log(window.innerWidth)
console.log(switchContainer[0].parentNode.querySelector('.cards').scrollWidth)
//#region bg-video
let n = 1;

bgVideo.addEventListener('ended', function () {

   if (n == videos.length) n = 0;
   this.src = videos[n];
   leftOffset();
   setTimeout(() => {
      playPauseButt.style.visibility = 'visible'
   }, 1000);
   n++;
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
//#endregion

//#region video-gallery func

function leftOffset() {
   let slidesVideoCover = document.querySelectorAll('.video-cover');
   let widthElem = slidesVideoCover[0].scrollWidth + 20;
   let cover = slidesVideoCover[0].cloneNode(true);

   sliderVideoCovers.append(cover);
   slidesVideoCover[0].style.marginLeft = `${-widthElem}px`;
   playPauseButt.style.visibility = 'hidden'

   setTimeout(() => {
      slidesVideoCover[0].remove();
   }, 1000)

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
   body.classList.toggle('body-hidden')
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

form.addEventListener("submit", function (event) {
   if (!phoneInput.value || !nameInput.value || !emailInput.value) {
      event.preventDefault();
   }
})
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
function calcSlideLine() {
   for (let i = 0; i < sliderLines.length; i++) {
      sliderLines[i].removeAttribute("style")
      let cards = switchContainer[i].parentNode.querySelector('.cards')
      container = document.querySelector('.container')
      sliderLines[i].style.width = `${sliderLines[i].parentElement.scrollWidth / (Math.round((cards.scrollWidth - container.clientWidth) / (cards.firstElementChild.clientWidth+20)) + 1)}px`;
   }
}
//#endregion