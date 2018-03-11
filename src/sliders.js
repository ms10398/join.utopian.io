import 'gsap';
import 'slick-carousel';

const helpers = require('./helpers');
const $ = require('jquery');

const projectsContainer = $('#projects-container');
const contributionsContainer = $('#contributions-container');

projectsContainer.slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  centerMode: true,
  infinite: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
}).on('beforeChange', async (e, slick, currentSlide, nextSlide) => {
  if (currentSlide !== nextSlide) {
    let gitHubId = $(slick.$slides[nextSlide]).data('githubid');
    let contributions = await helpers.getContributionsByGitHubId(gitHubId);

    TweenMax.to(contributionsContainer, .3, {opacity: 0, onComplete: () => {
      contributionsContainer.slick('slickRemove', null, null, true);
      for (let i = 0; i < contributions.length; i++) {
        contributionsContainer.slick('slickAdd', helpers.getContributionHtml(contributions[i]));
      }
      TweenMax.to(contributionsContainer, .3, {opacity: 1});
    }});
  }
});

contributionsContainer.slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  focusOnSelect: true,
  dots: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});


(async function() {
  let projects = await helpers.getProjects();
  let contributions = await helpers.getContributionsByGitHubId(projects[0].github.id);

  // add projects
  for (let i = 0; i < projects.length; i++) {
    projectsContainer.slick('slickAdd','<div class="project" data-githubid="' + projects[i].github.id + '"><img class="cover-image" src="' + projects[i].image + '"/><h4>' + projects[i].name + '</h4><p>' + projects[i].teaser + '</p></div>');
  }

  for (let i = 0; i < contributions.length; i++) {
    contributionsContainer.slick('slickAdd', helpers.getContributionHtml(contributions[i]));
  }
})();

// get projects and fill projects slider
// $.ajax({
//   url: 'projects.json',
//   success: (projects) => {
    // projects carousel
    // projectsContainer.slick({
    //   slidesToShow: 5,
    //   slidesToScroll: 1,
    //   centerMode: true,
    //   infinite: true,
    //   focusOnSelect: true,
    //   responsive: [
    //     {
    //       breakpoint: 1200,
    //       settings: {
    //         slidesToShow: 3
    //       }
    //     },
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 1
    //       }
    //     }
    //   ]
    // }).on('beforeChange', (e, slick, currentSlide, nextSlide) => {
    //   if (currentSlide !== nextSlide) {
    //     contributionsContainer.slick('slickRemove', null, null, true);
    //     contributionsContainer.find('.slick-dots').css('display', 'none');
    //     $.ajax({
    //       url: 'https://api.utopian.io/api/posts/?limit=10&section=project&sortBy=votes&platform=github&projectId=' + $(slick.$slides[nextSlide]).data('githubid'),
    //       success: (data) => {
    //         let contributions = data.results;
    //         for (let i = 0; i < contributions.length; i++) {
    //           contributionsContainer.slick('slickAdd', helpers.getContributionHtml(contributions[i]));
    //         }
    //         contributionsContainer.find('.slick-dots').css('display', 'block');
    //       }
    //     });
    //   }
    // });

    // add projects
    // for (let i = 0; i < projects.length; i++) {
    //   projectsContainer.slick('slickAdd','<div class="project" data-githubid="' + projects[i].github.id + '"><img class="cover-image" src="' + projects[i].image + '"/><h4>' + projects[i].name + '</h4><p>' + projects[i].teaser + '</p></div>');
    // }

    // contributions
    // $.ajax({
    //   url: 'https://api.utopian.io/api/posts/?limit=10&section=project&sortBy=votes&platform=github&projectId=' + projects[0].github.id,
    //   success: (data) => {
    //     let contributions = data.results;
    //
    //     for (let i = 0; i < contributions.length; i++) {
    //       contributionsContainer.slick('slickAdd', helpers.getContributionHtml(contributions[i]));
    //     }
    //   }
    // });
//   }
// });