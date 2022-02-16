'use strict'

// ВСЕ ПЕРЕМЕННЫЕ

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
// for (let i = 0; i < sliderLines.length; i++) marginSlider.push(0);

// for (let i = 0; i < sliderLines.length; i++) {
//    sliderLines[i].style.width = `${sliderLines[i].parentElement.scrollWidth / switchContainer[i].parentNode.querySelector('.cards').childElementCount}px`;
// }

// window.addEventListener("resize", setWidthToSliderLine);

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

// for (let i = 0; i < switchContainer.length; i++) {
//    batons.push(switchContainer[i].querySelector('.buttons'));
//    marginCard.push(0);
//    console.log(batons[i].firstElementChild);
//    const cards = switchContainer[i].parentNode.querySelector('.cards');
//    batons[i].firstElementChild.onclick = () => {
//       rightOffsetCard(cards, batons[i].firstElementChild, batons[i].lastElementChild, i);
//       offsetSlider(i)
//    }
//    batons[i].lastElementChild.onclick = () => {
//       leftOffsetCard(cards, batons[i].lastElementChild, batons[i].firstElementChild, i);
//       offsetSlider(i)
//    }
// }

function leftOffsetCard(cards, btnNext, btnPrev, marginIndex) {
   const width = cards.childNodes[3].scrollWidth + 20;
   if (marginCard[marginIndex] - width < -(cards.childElementCount - 1) * width) {
      return;
   }
   btnPrev.style.backgroundImage = 'url(sources/image/prev-col.svg)';
   if (marginCard[marginIndex] - width < -(cards.childElementCount - 2) * width) {
      btnNext.style.backgroundImage = 'url(sources/image/next.svg)';
   }
   marginSlider[marginIndex]++;
   marginCard[marginIndex] += -width;
   cards.style.marginLeft = `${marginCard[marginIndex]}px`;

}

function rightOffsetCard(cards, btnPrev, btnNext, marginIndex) {
   const width = cards.childNodes[3].scrollWidth + 20;
   if (marginCard[marginIndex] + width > 0) {
      return;
   }
   btnNext.style.backgroundImage = 'url(sources/image/next-col.svg)';
   if (marginCard[marginIndex] + width == 0) {
      btnPrev.style.backgroundImage = 'url(sources/image/prev.svg)';
   }
   marginSlider[marginIndex]--;
   marginCard[marginIndex] += width;
   cards.style.marginLeft = `${marginCard[marginIndex]}px`;
}

function offsetSlider(index) {
   let sliderWidth = sliderLines[index].scrollWidth
   sliderLines[index].style.marginLeft = `${marginSlider[index] * sliderWidth}px`
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
      this.style.right = `calc(((100vw - ${this.parentElement.clientWidth}px) / 2) - 8px)`
   } else {
      menu.style.transform = 'translateY(-100%)';
      this.style.right = `0`
   }
})
//#endregion

//#region slider-width
function setWidthToSliderLine() {
   for (let i = 0; i < sliderLines.length; i++) {
      sliderLines[i].style.width = `${sliderLines[i].parentElement.scrollWidth / switchContainer[i].parentNode.querySelector('.cards').childElementCount}px`;
      sliderLines[i].style.margin = `0`;
      marginCard[i] = 0;
      marginSlider[i] = 0;
      switchContainer[i].parentNode.querySelector('.cards').style.marginLeft = '0'
      batons[i].firstElementChild.style.backgroundImage = 'url(sources/image/prev.svg)';
      batons[i].lastElementChild.style.backgroundImage = 'url(sources/image/next-col.svg)';
   }
}
//#endregion

const swiperExc = new Swiper('.exc-slider', {
   slidesPerView: "auto",
   slidesPerGroup: 1,
   centeredSlides: false,
   // Navigation arrows
   navigation: {
      nextEl: '.exc-next',
      prevEl: '.exc-prev',
   },

   // And if we need scrollbar
   scrollbar: {
      el: '.swiper-scrollbar-exc',
   },
});

const swiperRew = new Swiper('.reviews-slider', {
   slidesPerView: "auto",
   centeredSlides: false,
   // Navigation arrows
   navigation: {
      nextEl: '.rev-next',
      prevEl: '.rev-prev',
   },

   // And if we need scrollbar
   scrollbar: {
      el: '.swiper-scrollbar',
   },
});