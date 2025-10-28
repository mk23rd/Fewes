$(document).ready(function() {
    $('.first-img').click(function(){
        $('.first-box').stop().animate({
            width: '600px',
            height: '600px'
        },'ease');
        $('.second-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.third-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.fourth-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.fifth-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');

        $('.first-box .small').hide();
        $('.second-box .small').show();
        $('.third-box .small').show();
        $('.fourth-box .small').show();
        $('.fifth-box .small').show();


        $('.first-box .big').show();
        $('.second-box .big').hide();
        $('.third-box .big').hide();
        $('.fourth-box .big').hide();
        $('.fifth-box .big').hide();
    })

    $('.second-img').click(function(){
        $('.second-box').stop().animate({
            width: '600px',
            height: '600px'
        },'ease');
        $('.first-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.third-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.fourth-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.fifth-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');

        $('.second-box .small').hide();
        $('.first-box .small').show();
        $('.third-box .small').show();
        $('.fourth-box .small').show();
        $('.fifth-box .small').show();

        $('.second-box .big').show();
        $('.first-box .big').hide();
        $('.third-box .big').hide();
        $('.fourth-box .big').hide();
        $('.fifth-box .big').hide();
    })

    $('.third-img').click(function(){
        $('.third-box').stop().animate({
            width: '600px',
            height: '600px'
        },'ease');
        $('.second-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.first-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.fourth-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.fifth-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');

        $('.third-box .small').hide();
        $('.second-box .small').show();
        $('.first-box .small').show();
        $('.fourth-box .small').show();
        $('.fifth-box .small').show();

        $('.third-box .big').show();
        $('.second-box .big').hide();
        $('.first-box .big').hide();
        $('.fourth-box .big').hide();
        $('.fifth-box .big').hide();
    })

    $('.fourth-img').click(function(){
        $('.fourth-box').stop().animate({
            width: '600px',
            height: '600px'
        },'ease');
        $('.second-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.third-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.first-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.fifth-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');

        $('.fourth-box .small').hide();
        $('.second-box .small').show();
        $('.third-box .small').show();
        $('.first-box .small').show();
        $('.fifth-box .small').show();

        $('.fourth-box .big').show();
        $('.second-box .big').hide();
        $('.third-box .big').hide();
        $('.first-box .big').hide();
        $('.fifth-box .big').hide();
    })

    $('.fifth-img').click(function(){
        $('.fifth-box').stop().animate({
            width: '600px',
            height: '600px'
        },'ease');
        $('.second-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.third-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.fourth-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');
        $('.first-box').stop().animate({
            width: '160px',
            height: '200px'
        },'ease');

        $('.fifth-box .small').hide();
        $('.second-box .small').show();
        $('.third-box .small').show();
        $('.fourth-box .small').show();
        $('.first-box .small').show();

        $('.fifth-box .big').show();
        $('.second-box .big').hide();
        $('.third-box .big').hide();
        $('.fourth-box .big').hide();
        $('.first-box .big').hide();
    })
});