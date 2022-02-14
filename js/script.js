//#region bg-video
let bgVideo = document.querySelector('.video');
const videos = [
   'sources/video/LOR.mp4',
   'sources/video/Landscape.mp4',
   'sources/video/nature.mp4',
   'sources/video/china.mp4'
];

let playPauseButt = document.querySelector('.play-button');

bgVideo.addEventListener('ended', function () {

   if (n == videos.length) n = 0;
   bgVideo.src = videos[n];
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

//#region video-gallery
let sliderVideoCovers = document.querySelector('.videos-gallery')
let slider = [];

let n = 1;
let index = 0;
let position = 0;

function leftOffset() {
   let slidesVideoCover = document.querySelectorAll('.video-cover');
   let widthElem = slidesVideoCover[0].scrollWidth + 20;

   sliderVideoCovers.style.marginLeft = `${-widthElem}px`;
   let cover = slidesVideoCover[0];

   setTimeout(() => {

      slidesVideoCover[0].remove();
      sliderVideoCovers.append(cover);
      sliderVideoCovers.style.marginLeft = `0`;

   }, 600)
   // }

}
//#endregion

//#region sliders
const excursionCardImages = [];

let switchContainer = document.querySelectorAll('.switch');
let buttNext = document.querySelectorAll('.next');
let batons = [];
console.log(switchContainer);

let marginCard = [];

for (let i = 0; i < switchContainer.length; i++) {
   batons.push(switchContainer[i].querySelector('.buttons'));
   marginCard.push(0);
   console.log(batons[i].firstElementChild);
   const cards = switchContainer[i].parentNode.querySelector('.cards');
   batons[i].firstElementChild.onclick = () => {
      rightOffsetCard(cards, batons[i].firstElementChild, batons[i].lastElementChild, i);
   }
   batons[i].lastElementChild.onclick = () => {
      leftOffsetCard(cards, batons[i].lastElementChild, batons[i].firstElementChild, i);
   }
}


function leftOffsetCard(cards, btnNext, btnPrev, marginIndex) {
   const width = cards.childNodes[3].scrollWidth + 20;
   if (marginCard[marginIndex] - width < -(cards.childElementCount - 1) * width) {
      return;
   }
   btnPrev.style.backgroundImage = 'url(sources/image/prev-col.svg)';
   if (marginCard[marginIndex] - width < -(cards.childElementCount - 2) * width) {
      btnNext.style.backgroundImage = 'url(sources/image/next.svg)';
   }
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
   marginCard[marginIndex] += width;
   cards.style.marginLeft = `${marginCard[marginIndex]}px`;
}
//#endregion

const btnMenuOpen = document.querySelector('.menu-button')
const btnCloseMenu = document.querySelector('.cross-stand-alone')

btnCloseMenu.addEventListener('click', function () {
   let menu = document.querySelector('.open-menu');
   menu.style.transform = 'translateX(100%)';
})

btnMenuOpen.addEventListener('click', function () {
   let menu = document.querySelector('.open-menu');
   menu.style.transform = 'translateX(0)';
})