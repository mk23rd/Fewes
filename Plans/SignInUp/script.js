$(document).ready(function() {

    /* $('body').focusout(function(){
        $('.password-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.username-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.email-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.password-confirm-label-signin').stop().animate({
            left: '0px'
        },'ease');
    }) */

    $('.username-input-signin').focusin(function(){
        $('.username-label-signin').stop().animate({
            left: '350px'
        },'ease');

        /* $('.email-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.password-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.password-confirm-label-signin').stop().animate({
            left: '0px'
        },'ease'); */
    })

    $('.email-input-signin').focusin(function(){
        $('.email-label-signin').stop().animate({
            left: '400px'
        },'ease');

        /* $('.username-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.password-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.password-confirm-label-signin').stop().animate({
            left: '0px'
        },'ease'); */
    })

    $('.password-input-signin').focusin(function(){
        $('.password-label-signin').stop().animate({
            left: '370px'
        },'ease');

        /* $('.username-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.email-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.password-confirm-label-signin').stop().animate({
            left: '0px'
        },'ease'); */
    })

    $('.password-confirm-input-signin').focusin(function(){
        $('.password-confirm-label-signin').stop().animate({
            left: '300px'
        },'ease');

       /*  $('.username-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.email-label-signin').stop().animate({
            left: '0px'
        },'ease');

        $('.password-label-signin').stop().animate({
            left: '0px'
        },'ease'); */
    })
});