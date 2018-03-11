const helpers = {};

const $ = require('jquery');
const moment = require('moment');

helpers.randomNumberBetween = (min, max) => {
  return min + Math.random() * (max - min);
};

helpers.renderFaq = (categoryId, categoryName, faq) => {
  let template = `
<div class="card">
    <div class="card-header">
        <h5 class="mb-0">
            <a href="#collapse${categoryId}" class="btn btn-link" data-toggle="collapse">
                ${categoryName}
            </a>
        </h5>
    </div>

    <div id="collapse${categoryId}" class="collapse" data-parent="#faq-accordion">
        <div class="card-body">
          <div id="faq-accordion-${categoryId}"></div>
        </div>
    </div>
</div>
`;

  $('#faq-accordion').append(template);
  helpers.renderFaqQuestions(categoryId, faq[categoryId]);
};

helpers.renderFaqQuestions = (categoryId, questions) => {
  for (let i = 0; i < questions.length; i++) {
    let template = `
<div class="card">
    <div class="card-header">
        <h5 class="mb-0">
            <a href="#collapse${questions[i].hash}" class="btn btn-link" data-toggle="collapse">
                ${questions[i].title}
            </a>
        </h5>
    </div>

    <div id="collapse${ questions[i].hash }" class="collapse" data-parent="#faq-accordion-${categoryId}">
        <div class="card-body">
          ${questions[i].html}
        </div>
    </div>
</div>
`;

    $('#faq-accordion-' + categoryId).append(template);
  }
};

helpers.getProjects = () => {
  return new Promise(function(resolve, reject) {
    $.get('projects.json', (projects) => {
      resolve(projects);
    });
  })
};

helpers.getContributionsByGitHubId = (gitHubId) => {
  return new Promise((resolve, reject) => {
      $.get('https://api.utopian.io/api/posts/?limit=10&section=project&sortBy=votes&platform=github&projectId=' + gitHubId, (contributions) => {
        resolve(contributions.results);
      });
  });
};

helpers.getContributionHtml = (contribution) => {
  let categoryLabel = '',
    icon = '';
  switch (contribution.json_metadata.type) {
    case 'ideas':
    case 'task-ideas':
      categoryLabel = 'Suggestion';
      icon = 'bulb1';
      break;
    case 'sub-projects':
    case 'task-sub-projects':
      categoryLabel = 'Sub-Project';
      icon = 'copy1';
      break;
    case 'development':
    case 'task-development':
      categoryLabel = 'Development';
      icon = 'codesquare';
      break;
    case 'bug-hunting':
    case 'task-bug-hunting':
      categoryLabel = 'Bug Hunting';
      icon = 'eyeo';
      break;
    case 'translations':
    case 'task-translations':
      categoryLabel = 'Translation';
      icon = 'flag';
      break;
    case 'graphics':
    case 'task-graphics':
      categoryLabel = 'Graphics';
      icon = 'layout';
      break;
    case 'analysis':
    case 'task-analysis':
      categoryLabel = 'Analysis';
      icon = 'dotchart';
      break;
    case 'social':
    case 'task-social':
      categoryLabel = 'Visibility';
      icon = 'sharealt';
      break;
    case 'documentation':
    case 'task-documentation':
      categoryLabel = 'Documentation';
      icon = 'book';
      break;
    case 'tutorials':
    case 'task-tutorials':
      categoryLabel = 'Tutorials';
      icon = 'unknowfile1';
      break;
    case 'video-tutorials':
    case 'task-video-tutorials':
      categoryLabel = 'Video-Tutorials';
      icon = 'videocamera';
      break;
  }

  if (contribution.json_metadata.type.indexOf('task-') !== -1) {
    categoryLabel += ' Request'
  }

  return `<div class="contribution"><div class="contribution-inner">
  <div class="category ${contribution.json_metadata.type}">
      <i class="anticon icon-${icon}"></i>
      ${categoryLabel}
  </div>
  <div class="user clearfix">
      <img class="profile-image" src="https://img.busy.org/@${contribution.author}?s=30"/>
      <a class="username" href="https://utopian.io/@${contribution.author}">${contribution.author}</a>
      <span class="reputation">${helpers.calculateReputation(contribution.author_reputation)}</span>
      <span class="date">${moment.utc(contribution.created).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'))}</span>
  </div>
  <div class="title">
      <a href="https://utopian.io${contribution.url}">${contribution.title}</a>
  </div>
  <div class="stats clearfix">
      <div class="float-left mr-2">
          <i class="anticon icon-like1"></i>
          ${contribution.net_votes}
      </div>
      <div class="float-left">
          <i class="anticon icon-message1"></i>
          ${contribution.children}
      </div>
      <div class="float-right">
          $${helpers.getPostPayout(contribution)}
      </div>
  </div>
</div></div>`;
};

helpers.getPostPayout = (post) => {
  if (post.last_payout === '1970-01-01T00:00:00') {
    let payout = post.pending_payout_value.replace(' SBD', '');
    return parseFloat(payout);
  }

  let authorPayout = post.total_payout_value.replace(' SBD', '');
  let curatorPayout = post.curator_payout_value.replace(' SBD', '');

  return (parseFloat(authorPayout) + parseFloat(curatorPayout)).toFixed(2);
};

helpers.calculateReputation = (rep) => {
  let reputation = ((((Math.log10(Math.abs(rep))) - 9) * 9) + 25);

  return (rep < 0 ? '-' : '') + Math.floor(reputation);
};

module.exports = helpers;