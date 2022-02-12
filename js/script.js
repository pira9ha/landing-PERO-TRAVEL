let bgVideo = document.querySelector('.video');
let videos = [
   '/sources/video/LOR.mp4',
   '/sources/video/Landscape.mp4',
   '/sources/video/nature.mp4',
   '/sources/video/china.mp4'
];

let playPauseButt = document.querySelector('.play');
let slidesVideoCover = document.querySelectorAll('.video-cover');
let slider = [];

let n = 1;
let index = 0;
let position = 0;

for (let i = 0; i < slidesVideoCover.length; i++) {
   slider[i] = slidesVideoCover[i].src;
   slidesVideoCover[i].remove();
}

let i = 0;
while (i < 4) {
   drawCovers();
   i++;
}

let clickCount = 0;
playPauseButt.onclick = () => {
   let buttImg = playPauseButt.querySelector('.play-button');
   clickCount += 1;
   if (clickCount == 2) {
      bgVideo.play();
      clickCount = 0;
      buttImg.src = '/sources/image/play.png';
   } else {
      bgVideo.pause();
      buttImg.src = '/sources/image/play-paused.png';
   }
}

bgVideo.addEventListener('ended', function () {

   if (n == videos.length) n = 0;
   bgVideo.src = videos[n];
   drawCovers();
   leftOffset('.video-cover');
   setTimeout(() => {
      playPauseButt.style.visibility = 'visible'
   }, 1000);
   n++;
})

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

function drawCovers() {
   position = position == 4 ? 2 : position;
   index = index == slider.length ? 0 : index;
   let img = document.createElement('img');
   img.src = slider[index];
   img.style.left = position * 380 + 'px';
   img.classList.add('video-cover');
   document.querySelector('.videos-gallery').appendChild(img);
   index++;
   position++;
}

function leftOffset(selector, elem = document) {
   let offset = 0;
   let sliderElements = elem.querySelectorAll(selector);
   const widthElem = sliderElements[0].scrollWidth + 20;

   for (let i = 0; i < sliderElements.length; i++) {
      sliderElements[i].style.left = offset * widthElem - widthElem + 'px';
      if (selector == '.video-cover') playPauseButt.style.visibility = 'hidden';
      offset++;
   }

   if (selector == '.video-cover') {
      setTimeout(() => {
         sliderElements[0].remove();

      }, 1000);
   }

}

function leftOffsetCard(cards, btnNext, btnPrev, marginIndex) {
   const width = cards.childNodes[3].scrollWidth + 20;
   if (marginCard[marginIndex] - width < -(cards.childElementCount - 1) * width) {
      return;
   }
   btnPrev.style.backgroundImage = 'url(/sources/image/prev-col.svg)';
   if (marginCard[marginIndex] - width < -(cards.childElementCount - 2) * width) {
      btnNext.style.backgroundImage = 'url(/sources/image/next.svg)';
   }
   marginCard[marginIndex] += -width;
   cards.style.marginLeft = `${marginCard[marginIndex]}px`;
}

function rightOffsetCard(cards, btnPrev, btnNext, marginIndex) {
   const width = cards.childNodes[3].scrollWidth + 20;
   if (marginCard[marginIndex] + width > 0) {
      return;
   }
   btnNext.style.backgroundImage = 'url(/sources/image/next-col.svg)';
   if (marginCard[marginIndex] + width == 0) {
      btnPrev.style.backgroundImage = 'url(/sources/image/prev.svg)';
   }
   marginCard[marginIndex] += width;
   cards.style.marginLeft = `${marginCard[marginIndex]}px`;
}




// butt.addEventListener('onclick', function () {
//    const cards = butt.parentElement.childNodes[1];
//    leftOffset('.exc-card', cards);
// });
// console.log(butt.parentElement.childNodes[1].querySelectorAll('.exc-card')); // получаем все карточки для листания
// console.log(butt.parentElement.childNodes[1].querySelectorAll('.exc-card')); // получаем все карточки для листания