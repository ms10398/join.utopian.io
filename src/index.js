import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'gsap';
import './index.css';
import './sliders';
import './sliders.css';

const $ = require('jquery');
const helpers = require('./helpers');

const contributionCategories = $('#contribution-categories');
const projectOwnerCategories = $('#project-owner-categories');

// contribution categories

let stopLeaveContributionCategory = false,
    hoveringContributionCategory = false;
$(document).on('mouseenter', '#contribution-categories .circle', function() {
  stopLeaveContributionCategory = true;
  hoveringContributionCategory = true;
  TweenMax.to(contributionCategories.find('.text'), .2, {opacity: 0, onComplete: () => {
    TweenMax.to(contributionCategories.find('.text-' + $(this).data('toggle')), .2, {opacity: 1, onComplete: () => {
      stopLeaveContributionCategory = false;
      if (!hoveringContributionCategory) {
        TweenMax.to(contributionCategories.find('.text'), .2, {opacity: 0, onComplete: () => {
          TweenMax.to(contributionCategories.find('.text-main'), .2, {opacity: 1, onComplete: () => {
            stopLeaveContributionCategory = false;
          }});
        }});
      }
    }});
  }});
});

$(document).on('mouseleave', '#contribution-categories .circle', function() {
  hoveringContributionCategory = false;
  if (!stopLeaveContributionCategory) {
    TweenMax.to(contributionCategories.find('.text'), .2, {opacity: 0, onComplete: () => {
      TweenMax.to(contributionCategories.find('.text-main'), .2, {opacity: 1, onComplete: () => {
        stopLeaveContributionCategory = false;
      }});
    }});
  }
});

// project owner categories
let stopLeaveProjectOwnerCategory = false,
    hoveringProjectOwnerCategory = false;
$(document).on('mouseenter', '#project-owner-categories .circle', function() {
  stopLeaveProjectOwnerCategory = true;
  hoveringProjectOwnerCategory = true;
  TweenMax.to(projectOwnerCategories.find('.text'), .2, {opacity: 0, onComplete: () => {
    TweenMax.to(projectOwnerCategories.find('.text-' + $(this).data('toggle')), .2, {opacity: 1, onComplete: () => {
      stopLeaveProjectOwnerCategory = false;
      if (!hoveringProjectOwnerCategory) {
        TweenMax.to(projectOwnerCategories.find('.text'), .2, {opacity: 0, onComplete: () => {
          TweenMax.to(projectOwnerCategories.find('.text-main'), .2, {opacity: 1, onComplete: () => {
            stopLeaveProjectOwnerCategory = false;
          }});
        }});
      }
    }});
  }});
});

$(document).on('mouseleave', '#project-owner-categories .circle', function() {
  hoveringProjectOwnerCategory = false;
  if (!stopLeaveProjectOwnerCategory) {
    TweenMax.to(projectOwnerCategories.find('.text'), .2, {opacity: 0, onComplete: () => {
      TweenMax.to(projectOwnerCategories.find('.text-main'), .2, {opacity: 1, onComplete: () => {
        stopLeaveProjectOwnerCategory = false;
      }});
    }});
  }
});

// generate upvotes on steem logo...
for (let i = 0; i < 6; i++) {
  let bubble = document.createElement('span');
  bubble.classList.add('upvote');
  bubble.innerHTML = '<svg style="width: 20px; height: 20px;" viewBox="0 0 24 24"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>';
  TweenLite.set(bubble, {
    left: helpers.randomNumberBetween(0, 100) + '%',
    bottom: helpers.randomNumberBetween(0, 100) + '%',
    scale: helpers.randomNumberBetween(.5, 2)
  });
  document.getElementById('steem-logo-container').appendChild(bubble);
}

// ...and animate them
let upvotesTimeline = new TimelineMax({repeat: -1});
upvotesTimeline
  .staggerFrom('.upvote', .5, {scale: 0, opacity: 0, ease: Back.easeOut.config(4)}, 1)
  .staggerTo('.upvote', 2, {bottom: "+=25", opacity: 0, ease: Power1.easeInOut}, 1, '-=5');


// faq
$.get('https://api.utopian.io/api/faq', (response) => {
  let faq = {};
  for (let i = 0; i < response.results.length; i++) {
    if (!faq.hasOwnProperty(response.results[i]['category'])) {
      faq[response.results[i]['category']] = [];
    }

    faq[response.results[i]['category']].push(response.results[i]);
  }

  helpers.renderFaq('general', 'General', faq);
  helpers.renderFaq('earning_rewards', 'Earning Rewards', faq);
  helpers.renderFaq('sharing_contributions', 'Sharing Contributions', faq);
  helpers.renderFaq('managing_projects', 'Managing Projects', faq);
});

// projects/contributions sliders

