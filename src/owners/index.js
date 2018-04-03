import 'babel-polyfill';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import ModalVideo from 'modal-video';
import 'modal-video/css/modal-video.min.css';
import 'hamburgers';
import 'hamburgers/dist/hamburgers.min.css';
import './../smoothscroll'
import './../index.css';
import './../mobile.css';
import './index.css';
import './mobile.css';

const $ = require('jquery');

// enable bootstrap tooltips
$('[data-toggle="tooltip"]').tooltip();

// enable video modals
new ModalVideo('.video-button');

// change hamburger button state
const hamburger = $('.hamburger--minus');
$('#navbarSupportedContent').on('hide.bs.collapse', function () {
  hamburger.removeClass('is-active');
}).on('show.bs.collapse', function () {
  hamburger.addClass('is-active');
});

// remove cover
$(() => {
  $('#cover').fadeOut(function () {
    $(this).remove();
  });
});

Cookies.set('lp_visited', true, {domain: window.location.host.replace('join.', '')});