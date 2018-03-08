import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'gsap';
import './index.css';

// generate upvotes on steem logo...
for (let i = 0; i < 6; i++) {
  let bubble = document.createElement('span');
  bubble.classList.add('upvote');
  bubble.innerHTML = '<svg style="width: 20px; height: 20px;" viewBox="0 0 24 24"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>';
  TweenLite.set(bubble, {
    left: randomNumberBetween(0, 100) + '%',
    bottom: randomNumberBetween(0, 100) + '%',
    scale: randomNumberBetween(.5, 2)
  });
  document.getElementById('steem-logo-container').appendChild(bubble);
}

// ...and animate them
let upvotesTimeline = new TimelineMax({repeat: -1});
upvotesTimeline
  .staggerFrom('.upvote', .5, {scale: 0, opacity: 0, ease: Back.easeOut.config(4)}, 1)
  .staggerTo('.upvote', 2, {bottom: "+=25", opacity: 0, ease: Power1.easeInOut}, 1, '-=5');

function randomNumberBetween(min, max) {
  return min + Math.random() * (max - min);
}