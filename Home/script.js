//COVER PAGE AND NAV BAR
$(document).ready(function() {
    // Add smooth CSS transitions instead of jQuery animate for better performance
    $('.cover-page').css('transition', 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)');
    
    $(window).scroll(function() {
        var coverpage = $('.cover-page');
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 500 && scrollTop < 900) {
            coverpage.css({
                'width': '30%',
                'bottom': '-803px',
                'height': '90vh',
                'border-top-left-radius': '5%',
                'border-top-right-radius': '5%',
                'border-bottom-right-radius': '5%',
                'border-bottom-left-radius': '5%'
            });
        } else if (scrollTop < 500) {
            coverpage.css({
                'width': '100%',
                'bottom': '0px',
                'height': '100vh',
                'border-top-left-radius': '0%',
                'border-top-right-radius': '0%',
                'border-bottom-right-radius': '0%',
                'border-bottom-left-radius': '0%'
            });
        } else if (scrollTop > 900) {
            coverpage.css({
                'width': '100%',
                'bottom': '-1605px',
                'height': '100vh',
                'border-top-left-radius': '0%',
                'border-top-right-radius': '0%',
                'border-bottom-right-radius': '0%',
                'border-bottom-left-radius': '0%'
            });
        }
    });
});

$(document).ready(function() {
    // Add CSS transition for smoother effects
    $('.Menu-Underline').css('transition', 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)');
    
    var lastScrollPos = 0;
    var ticking = false;
    
    function updateNavbar(scrollPos) {
        // Add subtle shadow when scrolling
        if (scrollPos > 50) {
            $('.Menu-Underline').css({
                'box-shadow': '0 12px 40px rgba(0, 0, 0, 0.3)',
                'background': 'rgba(69, 166, 47, 0.98)'
            });
        } else {
            $('.Menu-Underline').css({
                'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.2)',
                'background': 'rgba(69, 166, 47, 0.95)'
            });
        }
        ticking = false;
    }
    
    $(window).scroll(function() {
        lastScrollPos = $(this).scrollTop();
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNavbar(lastScrollPos);
            });
            ticking = true;
        }
    });
    
    // Smooth scroll for navigation links
    $('.Menu a').on('click', function(e) {
        var target = $(this).attr('href');
        
        // Only apply smooth scroll to anchor links (starting with #)
        if (target && target.startsWith('#')) {
            e.preventDefault();
            
            var targetElement = $(target);
            if (targetElement.length) {
                $('html, body').animate({
                    scrollTop: targetElement.offset().top - 150
                }, 800, 'swing');
            }
        }
    });
});




//BUTTON DOWN CLICK EFFECTS PART ONE
$(document).ready(function() {

    $('.our-menu-link a').addClass('scroll-green');

    $('.Btn-Down-2-Green').click(function(){
        /* RED */
        $('nav').addClass('scroll-red');
        $('.Yellow-Underline').addClass('under-scroll-red');
        
        
        $('.Menu-Name').addClass('scroll-red');
        $('.Recipe-Name').addClass('scroll-red');
        $('.dark-color').addClass('scroll-red');
        $('.light-color').addClass('scroll-red-light');
        $('.dark-dot').addClass('under-scroll-red');
        $('.light-dot').addClass('under-scroll-red-light');

        $('.Btn-Right-1').show();
        $('.Btn-Right-2').hide();
        $('.Btn-Right-3').hide();

        $('.Rotate-Meat').show();
        $('.Rotate-Veggie').hide();
        $('.Rotate-Pescatarian').hide();
        
        $('.cover-page').addClass('cover-page-red');
        $('.Home-Four').addClass('slide-show-red');
        $('.our-menu-link a').addClass('scroll-red');
        

        /* GREEN */
        $('nav').removeClass('scroll-green');
        $('.Yellow-Underline').removeClass('under-scroll-green');


        $('.Menu-Name').removeClass('scroll-green');
        $('.Recipe-Name').removeClass('scroll-green');
        $('.dark-color').removeClass('scroll-green');
        $('.light-color').removeClass('scroll-green-light');
        $('.dark-dot').removeClass('under-scroll-green');
        $('.light-dot').removeClass('under-scroll-green-light');

        $('.cover-page').removeClass('cover-page-green');
        $('.Home-Four').removeClass('slide-show-green');
        $('.our-menu-link a').removeClass('scroll-green');
        
        
        /* BLUE */
        $('nav').removeClass('scroll-blue');
        $('.Yellow-Underline').removeClass('under-scroll-blue');


        $('.Menu-Name').removeClass('scroll-blue');
        $('.Recipe-Name').removeClass('scroll-blue');
        $('.dark-color').removeClass('scroll-blue');
        $('.light-color').removeClass('scroll-blue-light');
        $('.dark-dot').removeClass('under-scroll-blue');
        $('.light-dot').removeClass('under-scroll-blue-light');

        $('.cover-page').removeClass('cover-page-blue');
        $('.Home-Four').removeClass('slide-show-blue');
        $('.our-menu-link a').removeClass('scroll-blue');


        $(window).scroll(function() {
            if ($(this).scrollTop() > 450 && $(this).scrollTop() < 1600) {
                $('nav').addClass('scroll-red');
                $('.Yellow-Underline').addClass('under-scroll-red');

                $('nav').removeClass('scroll-green');
                $('.Yellow-Underline').removeClass('under-scroll-green');
                
                $('nav').removeClass('scroll-blue');
                $('.Yellow-Underline').removeClass('under-scroll-blue');
            } else {
                $('nav').removeClass('scroll-red');
                $('.Yellow-Underline').removeClass('under-scroll-red');

                $('nav').removeClass('scroll-green');
                $('.Yellow-Underline').removeClass('under-scroll-green');
                
                $('nav').removeClass('scroll-blue');
                $('.Yellow-Underline').removeClass('under-scroll-blue');
            }
        });
    })
});


$(document).ready(function() {

    $('.Btn-Down-2-Blue').click(function(){

        /* RED */
        $('nav').removeClass('scroll-red');
        $('.Yellow-Underline').removeClass('under-scroll-red');


        $('.Menu-Name').removeClass('scroll-red');
        $('.Recipe-Name').removeClass('scroll-red');
        $('.dark-color').removeClass('scroll-red');
        $('.light-color').removeClass('scroll-red-light');
        $('.dark-dot').removeClass('under-scroll-red');
        $('.light-dot').removeClass('under-scroll-red-light');

        $('.Btn-Right-1').hide();
        $('.Btn-Right-2').show();
        $('.Btn-Right-3').hide();

        $('.Rotate-Meat').hide();
        $('.Rotate-Veggie').show();
        $('.Rotate-Pescatarian').hide();

        $('.cover-page').removeClass('cover-page-red');
        $('.Home-Four').removeClass('slide-show-red');
        $('.our-menu-link a').removeClass('scroll-red');


        /* GREEN */
        $('nav').addClass('scroll-green');
        $('.Yellow-Underline').addClass('under-scroll-green');


        $('.Menu-Name').addClass('scroll-green');
        $('.Recipe-Name').addClass('scroll-green');
        $('.dark-color').addClass('scroll-green');
        $('.light-color').addClass('scroll-green-light');
        $('.dark-dot').addClass('under-scroll-green');
        $('.light-dot').addClass('under-scroll-green-light');

        $('.cover-page').addClass('cover-page-green');
        $('.Home-Four').addClass('slide-show-green');
        $('.our-menu-link a').addClass('scroll-green');
        
        
        /* BLUE */
        $('nav').removeClass('scroll-blue');
        $('.Yellow-Underline').removeClass('under-scroll-blue');


        $('.Menu-Name').removeClass('scroll-blue');
        $('.Recipe-Name').removeClass('scroll-blue');
        $('.dark-color').removeClass('scroll-blue');
        $('.light-color').removeClass('scroll-blue-light');
        $('.dark-dot').removeClass('under-scroll-blue');
        $('.light-dot').removeClass('under-scroll-blue-light');

        $('.cover-page').removeClass('cover-page-blue');
        $('.Home-Four').removeClass('slide-show-blue');
        $('.our-menu-link a').removeClass('scroll-blue');

        $(window).scroll(function() {
            if ($(this).scrollTop() > 450 && $(this).scrollTop() < 1600) {
                $('nav').addClass('scroll-green');
                $('.Yellow-Underline').addClass('under-scroll-green');

                $('nav').removeClass('scroll-red');
                $('.Yellow-Underline').removeClass('under-scroll-red');
                
                $('nav').removeClass('scroll-blue');
                $('.Yellow-Underline').removeClass('under-scroll-blue');
            } else {
                $('nav').removeClass('scroll-green');
                $('.Yellow-Underline').removeClass('under-scroll-green');

                $('nav').removeClass('scroll-red');
                $('.Yellow-Underline').removeClass('under-scroll-green');
                
                $('nav').removeClass('scroll-blue');
                $('.Yellow-Underline').removeClass('under-scroll-blue');
            }
        });
    })
});


$(document).ready(function() {

    $('.Btn-Down-2-Red').click(function(){
        $('nav').addClass('scroll-blue');
        $('.Yellow-Underline').addClass('under-scroll-blue');


        $('.Menu-Name').addClass('scroll-blue');
        $('.Recipe-Name').addClass('scroll-blue');
        $('.dark-color').addClass('scroll-blue');
        $('.light-color').addClass('scroll-blue-light');
        $('.dark-dot').addClass('under-scroll-blue');
        $('.light-dot').addClass('under-scroll-blue-light');

        $('.Btn-Right-1').hide();
        $('.Btn-Right-2').hide();
        $('.Btn-Right-3').show();

        $('.Rotate-Meat').hide();
        $('.Rotate-Veggie').hide();
        $('.Rotate-Pescatarian').show();

        $('.cover-page').addClass('cover-page-blue');
        $('.Home-Four').addClass('slide-show-blue');
        $('.our-menu-link a').addClass('scroll-blue');
        

        $(window).scroll(function() {
            if ($(this).scrollTop() > 450 && $(this).scrollTop() < 1600) {
                $('nav').addClass('scroll-blue');
                $('.Yellow-Underline').addClass('under-scroll-blue');
            } else {
                $('nav').removeClass('scroll-blue');
                $('.Yellow-Underline').removeClass('under-scroll-blue');
            }
        });
    })
});




//BUTTON DOWN CLICK EFFECTS PART TWO
$(document).ready(function() {
    $('.Word-E').css('color', '#45A62F');

    $('.Menu-List-Name-V-T').css('opacity', '100%');
    $('.Menu-List-Name-V-L').css('opacity', '0%');
    $('.Menu-List-Name-V-R').css('opacity', '0%');
    $('.Menu-List-Name-V-B').css('opacity', '0%');

    $('.Menu-List-Name-M-T').css('opacity', '0%');
    $('.Menu-List-Name-M-L').css('opacity', '0%');
    $('.Menu-List-Name-M-R').css('opacity', '0%');
    $('.Menu-List-Name-M-B').css('opacity', '0%');

    $('.Menu-List-Name-P-T').css('opacity', '0%');
    $('.Menu-List-Name-P-L').css('opacity', '0%');
    $('.Menu-List-Name-P-R').css('opacity', '0%');
    $('.Menu-List-Name-P-B').css('opacity', '0%');

    
    $('.Recipe-One-V-T').css('opacity', '100%');
    $('.Recipe-One-V-L').css('opacity', '0%');
    $('.Recipe-One-V-R').css('opacity', '0%');
    $('.Recipe-One-V-B').css('opacity', '0%');

    $('.Recipe-One-M-T').css('opacity', '0%');
    $('.Recipe-One-M-L').css('opacity', '0%');
    $('.Recipe-One-M-R').css('opacity', '0%');
    $('.Recipe-One-M-B').css('opacity', '0%');

    $('.Recipe-One-P-T').css('opacity', '0%');
    $('.Recipe-One-P-L').css('opacity', '0%');
    $('.Recipe-One-P-R').css('opacity', '0%');
    $('.Recipe-One-P-B').css('opacity', '0%');


    $('.Recipe-Two-V-T').css('opacity', '100%');
    $('.Recipe-Two-V-L').css('opacity', '0%');
    $('.Recipe-Two-V-R').css('opacity', '0%');
    $('.Recipe-Two-V-B').css('opacity', '0%');

    $('.Recipe-Two-M-T').css('opacity', '0%');
    $('.Recipe-Two-M-L').css('opacity', '0%');
    $('.Recipe-Two-M-R').css('opacity', '0%');
    $('.Recipe-Two-M-B').css('opacity', '0%');

    $('.Recipe-Two-P-T').css('opacity', '0%');
    $('.Recipe-Two-P-L').css('opacity', '0%');
    $('.Recipe-Two-P-R').css('opacity', '0%');
    $('.Recipe-Two-P-B').css('opacity', '0%');


    $('.Recipe-Three-V-T').css('opacity', '100%');
    $('.Recipe-Three-V-L').css('opacity', '0%');
    $('.Recipe-Three-V-R').css('opacity', '0%');
    $('.Recipe-Three-V-B').css('opacity', '0%');

    $('.Recipe-Three-M-T').css('opacity', '0%');
    $('.Recipe-Three-M-L').css('opacity', '0%');
    $('.Recipe-Three-M-R').css('opacity', '0%');
    $('.Recipe-Three-M-B').css('opacity', '0%');

    $('.Recipe-Three-P-T').css('opacity', '0%');
    $('.Recipe-Three-P-L').css('opacity', '0%');
    $('.Recipe-Three-P-R').css('opacity', '0%');
    $('.Recipe-Three-P-B').css('opacity', '0%');

    $('.Recipe-Four-V-T').css('opacity', '100%');
    $('.Recipe-Four-V-L').css('opacity', '0%');
    $('.Recipe-Four-V-R').css('opacity', '0%');
    $('.Recipe-Four-V-B').css('opacity', '0%');

    $('.Recipe-Four-M-T').css('opacity', '0%');
    $('.Recipe-Four-M-L').css('opacity', '0%');
    $('.Recipe-Four-M-R').css('opacity', '0%');
    $('.Recipe-Four-M-B').css('opacity', '0%');

    $('.Recipe-Four-P-T').css('opacity', '0%');
    $('.Recipe-Four-P-L').css('opacity', '0%');
    $('.Recipe-Four-P-R').css('opacity', '0%');
    $('.Recipe-Four-P-B').css('opacity', '0%');
});

$(document).ready(function() {
    $('.Btn-Down-2-Red').click(function(){
        $('.Menu-List-Meat').animate({
            top: '130px'
        });
        
        $('.Menu-List-Veggie').animate({
            top: '-65px'
        });

        $('.Menu-List-Pescatarian').animate({
            top: '-65px'
        });

        $('.Menu-List-Veggie').css('opacity', '0%');
        $('.Menu-List-Pescatarian').css('opacity', '100%');
        $('.Menu-List-Meat').css('opacity', '100%');

        $('.Word-E').css('color', '#187BFF');

        $('.Menu-List-Name-V-T').css('opacity', '0%');
        $('.Menu-List-Name-V-L').css('opacity', '0%');
        $('.Menu-List-Name-V-R').css('opacity', '0%');
        $('.Menu-List-Name-V-B').css('opacity', '0%');

        $('.Menu-List-Name-M-T').css('opacity', '0%');
        $('.Menu-List-Name-M-L').css('opacity', '0%');
        $('.Menu-List-Name-M-R').css('opacity', '0%');
        $('.Menu-List-Name-M-B').css('opacity', '0%');

        $('.Menu-List-Name-P-T').css('opacity', '100%');
        $('.Menu-List-Name-P-L').css('opacity', '0%');
        $('.Menu-List-Name-P-R').css('opacity', '0%');
        $('.Menu-List-Name-P-B').css('opacity', '0%');

        $('.Recipe-One-V-T').css('opacity', '0%');
        $('.Recipe-One-V-L').css('opacity', '0%');
        $('.Recipe-One-V-R').css('opacity', '0%');
        $('.Recipe-One-V-B').css('opacity', '0%');
    
        $('.Recipe-One-M-T').css('opacity', '0%');
        $('.Recipe-One-M-L').css('opacity', '0%');
        $('.Recipe-One-M-R').css('opacity', '0%');
        $('.Recipe-One-M-B').css('opacity', '0%');
    
        $('.Recipe-One-P-T').css('opacity', '100%');
        $('.Recipe-One-P-L').css('opacity', '0%');
        $('.Recipe-One-P-R').css('opacity', '0%');
        $('.Recipe-One-P-B').css('opacity', '0%');
    
    
        $('.Recipe-Two-V-T').css('opacity', '0%');
        $('.Recipe-Two-V-L').css('opacity', '0%');
        $('.Recipe-Two-V-R').css('opacity', '0%');
        $('.Recipe-Two-V-B').css('opacity', '0%');
    
        $('.Recipe-Two-M-T').css('opacity', '0%');
        $('.Recipe-Two-M-L').css('opacity', '0%');
        $('.Recipe-Two-M-R').css('opacity', '0%');
        $('.Recipe-Two-M-B').css('opacity', '0%');
    
        $('.Recipe-Two-P-T').css('opacity', '100%');
        $('.Recipe-Two-P-L').css('opacity', '0%');
        $('.Recipe-Two-P-R').css('opacity', '0%');
        $('.Recipe-Two-P-B').css('opacity', '0%');
    
    
        $('.Recipe-Three-V-T').css('opacity', '0%');
        $('.Recipe-Three-V-L').css('opacity', '0%');
        $('.Recipe-Three-V-R').css('opacity', '0%');
        $('.Recipe-Three-V-B').css('opacity', '0%');
    
        $('.Recipe-Three-M-T').css('opacity', '0%');
        $('.Recipe-Three-M-L').css('opacity', '0%');
        $('.Recipe-Three-M-R').css('opacity', '0%');
        $('.Recipe-Three-M-B').css('opacity', '0%');
    
        $('.Recipe-Three-P-T').css('opacity', '100%');
        $('.Recipe-Three-P-L').css('opacity', '0%');
        $('.Recipe-Three-P-R').css('opacity', '0%');
        $('.Recipe-Three-P-B').css('opacity', '0%');
    
        $('.Recipe-Four-V-T').css('opacity', '0%');
        $('.Recipe-Four-V-L').css('opacity', '0%');
        $('.Recipe-Four-V-R').css('opacity', '0%');
        $('.Recipe-Four-V-B').css('opacity', '0%');
    
        $('.Recipe-Four-M-T').css('opacity', '0%');
        $('.Recipe-Four-M-L').css('opacity', '0%');
        $('.Recipe-Four-M-R').css('opacity', '0%');
        $('.Recipe-Four-M-B').css('opacity', '0%');
    
        $('.Recipe-Four-P-T').css('opacity', '100%');
        $('.Recipe-Four-P-L').css('opacity', '0%');
        $('.Recipe-Four-P-R').css('opacity', '0%');
        $('.Recipe-Four-P-B').css('opacity', '0%');
    })
});

$(document).ready(function() {
    $('.Btn-Down-2-Green').click(function(){
        $('.Menu-List-Veggie').animate({
            top: '65px'
        });
        
        $('.Menu-List-Pescatarian').animate({
            top: '-130px'
        });

        $('.Menu-List-Meat').animate({
            top: '65px'
        });

        $('.Menu-List-Veggie').css('opacity', '100%');
        $('.Menu-List-Pescatarian').css('opacity', '0%');
        $('.Menu-List-Meat').css('opacity', '100%');

        $('.Word-E').css('color', '#D21515');

        $('.Menu-List-Name-V-T').css('opacity', '0%');
        $('.Menu-List-Name-V-L').css('opacity', '0%');
        $('.Menu-List-Name-V-R').css('opacity', '0%');
        $('.Menu-List-Name-V-B').css('opacity', '0%');

        $('.Menu-List-Name-M-T').css('opacity', '100%');
        $('.Menu-List-Name-M-L').css('opacity', '0%');
        $('.Menu-List-Name-M-R').css('opacity', '0%');
        $('.Menu-List-Name-M-B').css('opacity', '0%');

        $('.Menu-List-Name-P-T').css('opacity', '0%');
        $('.Menu-List-Name-P-L').css('opacity', '0%');
        $('.Menu-List-Name-P-R').css('opacity', '0%');
        $('.Menu-List-Name-P-B').css('opacity', '0%');

        $('.Recipe-One-V-T').css('opacity', '0%');
        $('.Recipe-One-V-L').css('opacity', '0%');
        $('.Recipe-One-V-R').css('opacity', '0%');
        $('.Recipe-One-V-B').css('opacity', '0%');
    
        $('.Recipe-One-M-T').css('opacity', '100%');
        $('.Recipe-One-M-L').css('opacity', '0%');
        $('.Recipe-One-M-R').css('opacity', '0%');
        $('.Recipe-One-M-B').css('opacity', '0%');
    
        $('.Recipe-One-P-T').css('opacity', '0%');
        $('.Recipe-One-P-L').css('opacity', '0%');
        $('.Recipe-One-P-R').css('opacity', '0%');
        $('.Recipe-One-P-B').css('opacity', '0%');
    
    
        $('.Recipe-Two-V-T').css('opacity', '0%');
        $('.Recipe-Two-V-L').css('opacity', '0%');
        $('.Recipe-Two-V-R').css('opacity', '0%');
        $('.Recipe-Two-V-B').css('opacity', '0%');
    
        $('.Recipe-Two-M-T').css('opacity', '100%');
        $('.Recipe-Two-M-L').css('opacity', '0%');
        $('.Recipe-Two-M-R').css('opacity', '0%');
        $('.Recipe-Two-M-B').css('opacity', '0%');
    
        $('.Recipe-Two-P-T').css('opacity', '0%');
        $('.Recipe-Two-P-L').css('opacity', '0%');
        $('.Recipe-Two-P-R').css('opacity', '0%');
        $('.Recipe-Two-P-B').css('opacity', '0%');
    
    
        $('.Recipe-Three-V-T').css('opacity', '0%');
        $('.Recipe-Three-V-L').css('opacity', '0%');
        $('.Recipe-Three-V-R').css('opacity', '0%');
        $('.Recipe-Three-V-B').css('opacity', '0%');
    
        $('.Recipe-Three-M-T').css('opacity', '100%');
        $('.Recipe-Three-M-L').css('opacity', '0%');
        $('.Recipe-Three-M-R').css('opacity', '0%');
        $('.Recipe-Three-M-B').css('opacity', '0%');
    
        $('.Recipe-Three-P-T').css('opacity', '0%');
        $('.Recipe-Three-P-L').css('opacity', '0%');
        $('.Recipe-Three-P-R').css('opacity', '0%');
        $('.Recipe-Three-P-B').css('opacity', '0%');
    
        $('.Recipe-Four-V-T').css('opacity', '0%');
        $('.Recipe-Four-V-L').css('opacity', '0%');
        $('.Recipe-Four-V-R').css('opacity', '0%');
        $('.Recipe-Four-V-B').css('opacity', '0%');
    
        $('.Recipe-Four-M-T').css('opacity', '100%');
        $('.Recipe-Four-M-L').css('opacity', '0%');
        $('.Recipe-Four-M-R').css('opacity', '0%');
        $('.Recipe-Four-M-B').css('opacity', '0%');
    
        $('.Recipe-Four-P-T').css('opacity', '0%');
        $('.Recipe-Four-P-L').css('opacity', '0%');
        $('.Recipe-Four-P-R').css('opacity', '0%');
        $('.Recipe-Four-P-B').css('opacity', '0%');

      
    })
});

$(document).ready(function() {
    $('.Btn-Down-2-Blue').click(function(){
        $('.Menu-List-Veggie').animate({
            top: '0px'
        });
        
        $('.Menu-List-Pescatarian').animate({
            top: '0px'
        });

        $('.Menu-List-Meat').animate({
            top: '0px'
        });

        $('.Menu-List-Veggie').css('opacity', '100%');
        $('.Menu-List-Pescatarian').css('opacity', '100%');
        $('.Menu-List-Meat').css('opacity', '0%');

        $('.Word-E').css('color', '#45A62F');

        $('.Menu-List-Name-V-T').css('opacity', '100%');
        $('.Menu-List-Name-V-L').css('opacity', '0%');
        $('.Menu-List-Name-V-R').css('opacity', '0%');
        $('.Menu-List-Name-V-B').css('opacity', '0%');

        $('.Menu-List-Name-M-T').css('opacity', '0%');
        $('.Menu-List-Name-M-L').css('opacity', '0%');
        $('.Menu-List-Name-M-R').css('opacity', '0%');
        $('.Menu-List-Name-M-B').css('opacity', '0%');

        $('.Menu-List-Name-P-T').css('opacity', '0%');
        $('.Menu-List-Name-P-L').css('opacity', '0%');
        $('.Menu-List-Name-P-R').css('opacity', '0%');
        $('.Menu-List-Name-P-B').css('opacity', '0%');
    

        $('.Recipe-One-V-T').css('opacity', '100%');
        $('.Recipe-One-V-L').css('opacity', '0%');
        $('.Recipe-One-V-R').css('opacity', '0%');
        $('.Recipe-One-V-B').css('opacity', '0%');
    
        $('.Recipe-One-M-T').css('opacity', '0%');
        $('.Recipe-One-M-L').css('opacity', '0%');
        $('.Recipe-One-M-R').css('opacity', '0%');
        $('.Recipe-One-M-B').css('opacity', '0%');
    
        $('.Recipe-One-P-T').css('opacity', '0%');
        $('.Recipe-One-P-L').css('opacity', '0%');
        $('.Recipe-One-P-R').css('opacity', '0%');
        $('.Recipe-One-P-B').css('opacity', '0%');
    
    
        $('.Recipe-Two-V-T').css('opacity', '100%');
        $('.Recipe-Two-V-L').css('opacity', '0%');
        $('.Recipe-Two-V-R').css('opacity', '0%');
        $('.Recipe-Two-V-B').css('opacity', '0%');
    
        $('.Recipe-Two-M-T').css('opacity', '0%');
        $('.Recipe-Two-M-L').css('opacity', '0%');
        $('.Recipe-Two-M-R').css('opacity', '0%');
        $('.Recipe-Two-M-B').css('opacity', '0%');
    
        $('.Recipe-Two-P-T').css('opacity', '0%');
        $('.Recipe-Two-P-L').css('opacity', '0%');
        $('.Recipe-Two-P-R').css('opacity', '0%');
        $('.Recipe-Two-P-B').css('opacity', '0%');
    
    
        $('.Recipe-Three-V-T').css('opacity', '100%');
        $('.Recipe-Three-V-L').css('opacity', '0%');
        $('.Recipe-Three-V-R').css('opacity', '0%');
        $('.Recipe-Three-V-B').css('opacity', '0%');
    
        $('.Recipe-Three-M-T').css('opacity', '0%');
        $('.Recipe-Three-M-L').css('opacity', '0%');
        $('.Recipe-Three-M-R').css('opacity', '0%');
        $('.Recipe-Three-M-B').css('opacity', '0%');
    
        $('.Recipe-Three-P-T').css('opacity', '0%');
        $('.Recipe-Three-P-L').css('opacity', '0%');
        $('.Recipe-Three-P-R').css('opacity', '0%');
        $('.Recipe-Three-P-B').css('opacity', '0%');
    
        $('.Recipe-Four-V-T').css('opacity', '100%');
        $('.Recipe-Four-V-L').css('opacity', '0%');
        $('.Recipe-Four-V-R').css('opacity', '0%');
        $('.Recipe-Four-V-B').css('opacity', '0%');
    
        $('.Recipe-Four-M-T').css('opacity', '0%');
        $('.Recipe-Four-M-L').css('opacity', '0%');
        $('.Recipe-Four-M-R').css('opacity', '0%');
        $('.Recipe-Four-M-B').css('opacity', '0%');
    
        $('.Recipe-Four-P-T').css('opacity', '0%');
        $('.Recipe-Four-P-L').css('opacity', '0%');
        $('.Recipe-Four-P-R').css('opacity', '0%');
        $('.Recipe-Four-P-B').css('opacity', '0%');
    })
});



//BUTTON RIGHT EFFECTS
$(document).ready(function() {
    $('.Btn-Right-1').click(function(){
        $(".Rotate-Meat-Top").css("opacity", 1);
        $(".Rotate-Meat-Left").css("opacity", 0);
        $(".Rotate-Meat-Right").css("opacity", 0);
        $(".Rotate-Meat-Bottom").css("opacity", 0);

        $('.Menu-List-Name-M-T').css('opacity', '100%');
        $('.Menu-List-Name-M-L').css('opacity', '0%');
        $('.Menu-List-Name-M-R').css('opacity', '0%');
        $('.Menu-List-Name-M-B').css('opacity', '0%');
    
        $('.Recipe-One-M-T').css('opacity', '100%');
        $('.Recipe-One-M-L').css('opacity', '0%');
        $('.Recipe-One-M-R').css('opacity', '0%');
        $('.Recipe-One-M-B').css('opacity', '0%');
    
        $('.Recipe-Two-M-T').css('opacity', '100%');
        $('.Recipe-Two-M-L').css('opacity', '0%');
        $('.Recipe-Two-M-R').css('opacity', '0%');
        $('.Recipe-Two-M-B').css('opacity', '0%');
    
        $('.Recipe-Three-M-T').css('opacity', '100%');
        $('.Recipe-Three-M-L').css('opacity', '0%');
        $('.Recipe-Three-M-R').css('opacity', '0%');
        $('.Recipe-Three-M-B').css('opacity', '0%');
    
        $('.Recipe-Four-M-T').css('opacity', '100%');
        $('.Recipe-Four-M-L').css('opacity', '0%');
        $('.Recipe-Four-M-R').css('opacity', '0%');
        $('.Recipe-Four-M-B').css('opacity', '0%');

        if($('.Rotate-Meat-Top').css("top") == "0px" && $('.Rotate-Meat-Top').css("left") == "0px"){
            
            $(".Rotate-Meat-Top").css("opacity", 0);
            $(".Rotate-Meat-Left").css("opacity", 1);
            $(".Rotate-Meat-Right").css("opacity", 0);
            $(".Rotate-Meat-Bottom").css("opacity", 0);

            $('.Menu-List-Name-M-T').css('opacity', '0%');
            $('.Menu-List-Name-M-L').css('opacity', '100%');
            $('.Menu-List-Name-M-R').css('opacity', '0%');
            $('.Menu-List-Name-M-B').css('opacity', '0%');  
            
            $('.Recipe-One-M-T').css('opacity', '0%');
            $('.Recipe-One-M-L').css('opacity', '100%');
            $('.Recipe-One-M-R').css('opacity', '0%');
            $('.Recipe-One-M-B').css('opacity', '0%'); 
            
            $('.Recipe-Two-M-T').css('opacity', '0%');
            $('.Recipe-Two-M-L').css('opacity', '100%');
            $('.Recipe-Two-M-R').css('opacity', '0%');
            $('.Recipe-Two-M-B').css('opacity', '0%');
            
            $('.Recipe-Three-M-T').css('opacity', '0%');
            $('.Recipe-Three-M-L').css('opacity', '100%');
            $('.Recipe-Three-M-R').css('opacity', '0%');
            $('.Recipe-Three-M-B').css('opacity', '0%');

            $('.Recipe-Four-M-T').css('opacity', '0%');
            $('.Recipe-Four-M-L').css('opacity', '100%');
            $('.Recipe-Four-M-R').css('opacity', '0%');
            $('.Recipe-Four-M-B').css('opacity', '0%');

            $('.Rotate-Meat-Top').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Meat-Top').animate({
                top: '350px',
                left: '500px'
            });

            $('.Rotate-Meat-Left').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Meat-Left').animate({
                top: '-200px',
                left: '0px'
            });

            $('.Rotate-Meat-Right').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Meat-Right').animate({
                top: '300px',
                left: '0px'
            });

            $('.Rotate-Meat-Bottom').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Meat-Bottom').animate({
                top: '-250px',
                left: '-500px'
            });

        }
        
        else if($('.Rotate-Meat-Top').css("top") == "350px" && $('.Rotate-Meat-Top').css("left") == "500px"){
            
            $(".Rotate-Meat-Top").css("opacity", 0);
            $(".Rotate-Meat-Left").css("opacity", 0);
            $(".Rotate-Meat-Right").css("opacity", 0);
            $(".Rotate-Meat-Bottom").css("opacity", 1);

            $('.Menu-List-Name-M-T').css('opacity', '0%');
            $('.Menu-List-Name-M-L').css('opacity', '0%');
            $('.Menu-List-Name-M-R').css('opacity', '0%');
            $('.Menu-List-Name-M-B').css('opacity', '100%');  
            
            $('.Recipe-One-M-T').css('opacity', '0%');
            $('.Recipe-One-M-L').css('opacity', '0%');
            $('.Recipe-One-M-R').css('opacity', '0%');
            $('.Recipe-One-M-B').css('opacity', '100%'); 
            
            $('.Recipe-Two-M-T').css('opacity', '0%');
            $('.Recipe-Two-M-L').css('opacity', '0%');
            $('.Recipe-Two-M-R').css('opacity', '0%');
            $('.Recipe-Two-M-B').css('opacity', '100%');
            
            $('.Recipe-Three-M-T').css('opacity', '0%');
            $('.Recipe-Three-M-L').css('opacity', '0%');
            $('.Recipe-Three-M-R').css('opacity', '0%');
            $('.Recipe-Three-M-B').css('opacity', '100%');

            $('.Recipe-Four-M-T').css('opacity', '0%');
            $('.Recipe-Four-M-L').css('opacity', '0%');
            $('.Recipe-Four-M-R').css('opacity', '0%');
            $('.Recipe-Four-M-B').css('opacity', '100%');

            $('.Rotate-Meat-Top').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Meat-Top').animate({
                top: '700px',
                left: '0px'
            });

            $('.Rotate-Meat-Left').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Meat-Left').animate({
                top: '150px',
                left: '500px'
            });

            $('.Rotate-Meat-Right').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Meat-Right').animate({
                top: '-50px',
                left: '-500px'
            });

            $('.Rotate-Meat-Bottom').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Meat-Bottom').animate({
                top: '-600px',
                left: '0px'
            }); 
        }
        
        else if($('.Rotate-Meat-Top').css("top") == "700px" && $('.Rotate-Meat-Top').css("left") == "0px"){
            
            $(".Rotate-Meat-Top").css("opacity", 0);
            $(".Rotate-Meat-Left").css("opacity", 0);
            $(".Rotate-Meat-Right").css("opacity", 1);
            $(".Rotate-Meat-Bottom").css("opacity", 0);

            $('.Menu-List-Name-M-T').css('opacity', '0%');
            $('.Menu-List-Name-M-L').css('opacity', '0%');
            $('.Menu-List-Name-M-R').css('opacity', '100%');
            $('.Menu-List-Name-M-B').css('opacity', '0%');  
            
            $('.Recipe-One-M-T').css('opacity', '0%');
            $('.Recipe-One-M-L').css('opacity', '0%');
            $('.Recipe-One-M-R').css('opacity', '100%');
            $('.Recipe-One-M-B').css('opacity', '0%'); 
            
            $('.Recipe-Two-M-T').css('opacity', '0%');
            $('.Recipe-Two-M-L').css('opacity', '0%');
            $('.Recipe-Two-M-R').css('opacity', '100%');
            $('.Recipe-Two-M-B').css('opacity', '0%');
            
            $('.Recipe-Three-M-T').css('opacity', '0%');
            $('.Recipe-Three-M-L').css('opacity', '0%');
            $('.Recipe-Three-M-R').css('opacity', '100%');
            $('.Recipe-Three-M-B').css('opacity', '0%');

            $('.Recipe-Four-M-T').css('opacity', '0%');
            $('.Recipe-Four-M-L').css('opacity', '0%');
            $('.Recipe-Four-M-R').css('opacity', '100%');
            $('.Recipe-Four-M-B').css('opacity', '0%');

            $('.Rotate-Meat-Top').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Meat-Top').animate({
                top: '350px',
                left: '-500px'
            });

            $('.Rotate-Meat-Left').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Meat-Left').animate({
                top: '500px',
                left: '0px'
            });

            $('.Rotate-Meat-Right').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Meat-Right').animate({
                top: '-400px',
                left: '0px'
            });

            $('.Rotate-Meat-Bottom').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Meat-Bottom').animate({
                top: '-250px',
                left: '500px'
            }); 
        }

        else if($('.Rotate-Meat-Top').css("top") == "350px" && $('.Rotate-Meat-Top').css("left") == "-500px"){
            
            $(".Rotate-Meat-Top").css("opacity", 1);
            $(".Rotate-Meat-Left").css("opacity", 0);
            $(".Rotate-Meat-Right").css("opacity", 0);
            $(".Rotate-Meat-Bottom").css("opacity", 0);

            $('.Menu-List-Name-M-T').css('opacity', '100%');
            $('.Menu-List-Name-M-L').css('opacity', '0%');
            $('.Menu-List-Name-M-R').css('opacity', '0%');
            $('.Menu-List-Name-M-B').css('opacity', '0%');  
            
            $('.Recipe-One-M-T').css('opacity', '100%');
            $('.Recipe-One-M-L').css('opacity', '0%');
            $('.Recipe-One-M-R').css('opacity', '0%');
            $('.Recipe-One-M-B').css('opacity', '0%'); 
            
            $('.Recipe-Two-M-T').css('opacity', '100%');
            $('.Recipe-Two-M-L').css('opacity', '0%');
            $('.Recipe-Two-M-R').css('opacity', '0%');
            $('.Recipe-Two-M-B').css('opacity', '0%');
            
            $('.Recipe-Three-M-T').css('opacity', '100%');
            $('.Recipe-Three-M-L').css('opacity', '0%');
            $('.Recipe-Three-M-R').css('opacity', '0%');
            $('.Recipe-Three-M-B').css('opacity', '0%');

            $('.Recipe-Four-M-T').css('opacity', '100%');
            $('.Recipe-Four-M-L').css('opacity', '0%');
            $('.Recipe-Four-M-R').css('opacity', '0%');
            $('.Recipe-Four-M-B').css('opacity', '0%');

            $('.Rotate-Meat-Top').css({
                transform: 'rotate(0deg)'
            });

            $('.Rotate-Meat-Top').animate({
                top: '0px',
                left: '0px'
            });

            $('.Rotate-Meat-Left').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Meat-Left').animate({
                top: '150px',
                left: '-500px'
            });

            $('.Rotate-Meat-Right').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Meat-Right').animate({
                top: '-50px',
                left: '500px'
            });

            $('.Rotate-Meat-Bottom').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Meat-Bottom').animate({
                top: '100px',
                left: '0px'
            }); 
        }
    })

});

$(document).ready(function() {
    $(".Rotate-Veggie-Top").css("opacity", 1);
    $(".Rotate-Veggie-Left").css("opacity", 0);
    $(".Rotate-Veggie-Right").css("opacity", 0);
    $(".Rotate-Veggie-Bottom").css("opacity", 0);

    $('.Menu-List-Name-V-T').css('opacity', '100%');
    $('.Menu-List-Name-V-L').css('opacity', '0%');
    $('.Menu-List-Name-V-R').css('opacity', '0%');
    $('.Menu-List-Name-V-B').css('opacity', '0%');

    $('.Recipe-One-V-T').css('opacity', '100%');
    $('.Recipe-One-V-L').css('opacity', '0%');
    $('.Recipe-One-V-R').css('opacity', '0%');
    $('.Recipe-One-V-B').css('opacity', '0%');

    $('.Recipe-Two-V-T').css('opacity', '100%');
    $('.Recipe-Two-V-L').css('opacity', '0%');
    $('.Recipe-Two-V-R').css('opacity', '0%');
    $('.Recipe-Two-V-B').css('opacity', '0%');

    $('.Recipe-Three-V-T').css('opacity', '100%');
    $('.Recipe-Three-V-L').css('opacity', '0%');
    $('.Recipe-Three-V-R').css('opacity', '0%');
    $('.Recipe-Three-V-B').css('opacity', '0%');

    $('.Recipe-Four-V-T').css('opacity', '100%');
    $('.Recipe-Four-V-L').css('opacity', '0%');
    $('.Recipe-Four-V-R').css('opacity', '0%');
    $('.Recipe-Four-V-B').css('opacity', '0%');   


    $('.Btn-Right-2').click(function(){
        if($('.Rotate-Veggie-Top').css("top") == "0px" && $('.Rotate-Veggie-Top').css("left") == "0px"){
            
            $(".Rotate-Veggie-Top").css("opacity", 0);
            $(".Rotate-Veggie-Left").css("opacity", 1);
            $(".Rotate-Veggie-Right").css("opacity", 0);
            $(".Rotate-Veggie-Bottom").css("opacity", 0);

            $('.Menu-List-Name-V-T').css('opacity', '0%');
            $('.Menu-List-Name-V-L').css('opacity', '100%');
            $('.Menu-List-Name-V-R').css('opacity', '0%');
            $('.Menu-List-Name-V-B').css('opacity', '0%');  
            
            $('.Recipe-One-V-T').css('opacity', '0%');
            $('.Recipe-One-V-L').css('opacity', '100%');
            $('.Recipe-One-V-R').css('opacity', '0%');
            $('.Recipe-One-V-B').css('opacity', '0%'); 
            
            $('.Recipe-Two-V-T').css('opacity', '0%');
            $('.Recipe-Two-V-L').css('opacity', '100%');
            $('.Recipe-Two-V-R').css('opacity', '0%');
            $('.Recipe-Two-V-B').css('opacity', '0%');
            
            $('.Recipe-Three-V-T').css('opacity', '0%');
            $('.Recipe-Three-V-L').css('opacity', '100%');
            $('.Recipe-Three-V-R').css('opacity', '0%');
            $('.Recipe-Three-V-B').css('opacity', '0%');

            $('.Recipe-Four-V-T').css('opacity', '0%');
            $('.Recipe-Four-V-L').css('opacity', '100%');
            $('.Recipe-Four-V-R').css('opacity', '0%');
            $('.Recipe-Four-V-B').css('opacity', '0%');

            $('.Rotate-Veggie-Top').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Veggie-Top').animate({
                top: '350px',
                left: '300px'
            });

            $('.Rotate-Veggie-Left').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Veggie-Left').animate({
                top: '-200px',
                left: '0px'
            });

            $('.Rotate-Veggie-Right').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Veggie-Right').animate({
                top: '300px',
                left: '0px'
            });

            $('.Rotate-Veggie-Bottom').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Veggie-Bottom').animate({
                top: '-250px',
                left: '-500px'
            });
        }

        
        else if($('.Rotate-Veggie-Top').css("top") == "350px" && $('.Rotate-Veggie-Top').css("left") == "300px"){
            $(".Rotate-Veggie-Top").css("opacity", 0);
            $(".Rotate-Veggie-Left").css("opacity", 0);
            $(".Rotate-Veggie-Right").css("opacity", 0);
            $(".Rotate-Veggie-Bottom").css("opacity", 1);

            $('.Menu-List-Name-V-T').css('opacity', '0%');
            $('.Menu-List-Name-V-L').css('opacity', '0%');
            $('.Menu-List-Name-V-R').css('opacity', '0%');
            $('.Menu-List-Name-V-B').css('opacity', '100%');
            
            $('.Recipe-One-V-T').css('opacity', '0%');
            $('.Recipe-One-V-L').css('opacity', '0%');
            $('.Recipe-One-V-R').css('opacity', '0%');
            $('.Recipe-One-V-B').css('opacity', '100%'); 
            
            $('.Recipe-Two-V-T').css('opacity', '0%');
            $('.Recipe-Two-V-L').css('opacity', '0%');
            $('.Recipe-Two-V-R').css('opacity', '0%');
            $('.Recipe-Two-V-B').css('opacity', '100%');
            
            $('.Recipe-Three-V-T').css('opacity', '0%');
            $('.Recipe-Three-V-L').css('opacity', '0%');
            $('.Recipe-Three-V-R').css('opacity', '0%');
            $('.Recipe-Three-V-B').css('opacity', '100%');

            $('.Recipe-Four-V-T').css('opacity', '0%');
            $('.Recipe-Four-V-L').css('opacity', '0%');
            $('.Recipe-Four-V-R').css('opacity', '0%');
            $('.Recipe-Four-V-B').css('opacity', '100%');

            $('.Rotate-Veggie-Top').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Veggie-Top').animate({
                top: '700px',
                left: '0px'
            });

            $('.Rotate-Veggie-Left').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Veggie-Left').animate({
                top: '150px',
                left: '500px'
            });

            $('.Rotate-Veggie-Right').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Veggie-Right').animate({
                top: '-50px',
                left: '-500px'
            });

            $('.Rotate-Veggie-Bottom').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Veggie-Bottom').animate({
                top: '-600px',
                left: '0px'
            }); 
        }

        
        else if($('.Rotate-Veggie-Top').css("top") == "700px" && $('.Rotate-Veggie-Top').css("left") == "0px"){
            $(".Rotate-Veggie-Top").css("opacity", 0);
            $(".Rotate-Veggie-Left").css("opacity", 0);
            $(".Rotate-Veggie-Right").css("opacity", 1);
            $(".Rotate-Veggie-Bottom").css("opacity", 0);

            $('.Menu-List-Name-V-T').css('opacity', '0%');
            $('.Menu-List-Name-V-L').css('opacity', '0%');
            $('.Menu-List-Name-V-R').css('opacity', '100%');
            $('.Menu-List-Name-V-B').css('opacity', '0%');  
            
            $('.Recipe-One-V-T').css('opacity', '0%');
            $('.Recipe-One-V-L').css('opacity', '0%');
            $('.Recipe-One-V-R').css('opacity', '100%');
            $('.Recipe-One-V-B').css('opacity', '0%'); 
            
            $('.Recipe-Two-V-T').css('opacity', '0%');
            $('.Recipe-Two-V-L').css('opacity', '0%');
            $('.Recipe-Two-V-R').css('opacity', '100%');
            $('.Recipe-Two-V-B').css('opacity', '0%'); 
            
            $('.Recipe-Three-V-T').css('opacity', '0%');
            $('.Recipe-Three-V-L').css('opacity', '0%');
            $('.Recipe-Three-V-R').css('opacity', '100%');
            $('.Recipe-Three-V-B').css('opacity', '0%');

            $('.Recipe-Four-V-T').css('opacity', '0%');
            $('.Recipe-Four-V-L').css('opacity', '0%');
            $('.Recipe-Four-V-R').css('opacity', '100%');
            $('.Recipe-Four-V-B').css('opacity', '0%');

            $('.Rotate-Veggie-Top').css({
                transform: 'rotate(-90deg)'
            });
            $('.Rotate-Veggie-Top').animate({
                top: '350px',
                left: '-500px'
            });

            $('.Rotate-Veggie-Left').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Veggie-Left').animate({
                top: '500px',
                left: '0px'
            });

            $('.Rotate-Veggie-Right').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Veggie-Right').animate({
                top: '-400px',
                left: '0px'
            });

            $('.Rotate-Veggie-Bottom').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Veggie-Bottom').animate({
                top: '-250px',
                left: '500px'
            }); 
        }

        
        else if($('.Rotate-Veggie-Top').css("top") == "350px" && $('.Rotate-Veggie-Top').css("left") == "-500px"){
            $(".Rotate-Veggie-Top").css("opacity", 1);
            $(".Rotate-Veggie-Left").css("opacity", 0);
            $(".Rotate-Veggie-Right").css("opacity", 0);
            $(".Rotate-Veggie-Bottom").css("opacity", 0);

            $('.Menu-List-Name-V-T').css('opacity', '100%');
            $('.Menu-List-Name-V-L').css('opacity', '0%');
            $('.Menu-List-Name-V-R').css('opacity', '0%');
            $('.Menu-List-Name-V-B').css('opacity', '0%');            

            $('.Recipe-One-V-T').css('opacity', '100%');
            $('.Recipe-One-V-L').css('opacity', '0%');
            $('.Recipe-One-V-R').css('opacity', '0%');
            $('.Recipe-One-V-B').css('opacity', '0%');

            $('.Recipe-Two-V-T').css('opacity', '100%');
            $('.Recipe-Two-V-L').css('opacity', '0%');
            $('.Recipe-Two-V-R').css('opacity', '0%');
            $('.Recipe-Two-V-B').css('opacity', '0%');
            
            $('.Recipe-Three-V-T').css('opacity', '100%');
            $('.Recipe-Three-V-L').css('opacity', '0%');
            $('.Recipe-Three-V-R').css('opacity', '0%');
            $('.Recipe-Three-V-B').css('opacity', '0%');

            $('.Recipe-Four-V-T').css('opacity', '100%');
            $('.Recipe-Four-V-L').css('opacity', '0%');
            $('.Recipe-Four-V-R').css('opacity', '0%');
            $('.Recipe-Four-V-B').css('opacity', '0%');

            $('.Rotate-Veggie-Top').css({
                transform: 'rotate(0deg)'
            });

            $('.Rotate-Veggie-Top').animate({
                top: '0px',
                left: '0px'
            });

            $('.Rotate-Veggie-Left').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Veggie-Left').animate({
                top: '150px',
                left: '-500px'
            });

            $('.Rotate-Veggie-Right').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Veggie-Right').animate({
                top: '-50px',
                left: '500px'
            });

            $('.Rotate-Veggie-Bottom').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Veggie-Bottom').animate({
                top: '100px',
                left: '0px'
            }); 
        }
    })

});

$(document).ready(function() {
        $(".Rotate-Pescatarian-Top").css("opacity", 1);
        $(".Rotate-Pescatarian-Left").css("opacity", 0);
        $(".Rotate-Pescatarian-Right").css("opacity", 0);
        $(".Rotate-Pescatarian-Bottom").css("opacity", 0);

    $('.Btn-Right-3').click(function(){

        $(".Rotate-Pescatarian-Top").css("opacity", 0);
        $(".Rotate-Pescatarian-Left").css("opacity", 1);
        $(".Rotate-Pescatarian-Right").css("opacity", 0);
        $(".Rotate-Pescatarian-Bottom").css("opacity", 0);

        $('.Menu-List-Name-P-T').css('opacity', '0%');
        $('.Menu-List-Name-P-L').css('opacity', '100%');
        $('.Menu-List-Name-P-R').css('opacity', '0%');
        $('.Menu-List-Name-P-B').css('opacity', '0%');
    
        $('.Recipe-One-P-T').css('opacity', '0%');
        $('.Recipe-One-P-L').css('opacity', '100%');
        $('.Recipe-One-P-R').css('opacity', '0%');
        $('.Recipe-One-P-B').css('opacity', '0%');
    
        $('.Recipe-Two-P-T').css('opacity', '0%');
        $('.Recipe-Two-P-L').css('opacity', '100%');
        $('.Recipe-Two-P-R').css('opacity', '0%');
        $('.Recipe-Two-P-B').css('opacity', '0%');
    
        $('.Recipe-Three-P-T').css('opacity', '0%');
        $('.Recipe-Three-P-L').css('opacity', '100%');
        $('.Recipe-Three-P-R').css('opacity', '0%');
        $('.Recipe-Three-P-B').css('opacity', '0%');
    
        $('.Recipe-Four-P-T').css('opacity', '0%');
        $('.Recipe-Four-P-L').css('opacity', '100%');
        $('.Recipe-Four-P-R').css('opacity', '0%');
        $('.Recipe-Four-P-B').css('opacity', '0%');      

        if($('.Rotate-Pescatarian-Top').css("top") == "0px" && $('.Rotate-Pescatarian-Top').css("left") == "0px"){
            
            $('.Rotate-Pescatarian-Top').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Pescatarian-Top').animate({
                top: '350px',
                left: '500px'
            });

            $('.Rotate-Pescatarian-Left').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Pescatarian-Left').animate({
                top: '-200px',
                left: '0px'
            });

            $('.Rotate-Pescatarian-Right').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Pescatarian-Right').animate({
                top: '300px',
                left: '0px'
            });

            $('.Rotate-Pescatarian-Bottom').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Pescatarian-Bottom').animate({
                top: '-250px',
                left: '-500px'
            });
        }
        
        else if($('.Rotate-Pescatarian-Top').css("top") == "350px" && $('.Rotate-Pescatarian-Top').css("left") == "500px"){
            
            $(".Rotate-Pescatarian-Top").css("opacity", 0);
            $(".Rotate-Pescatarian-Left").css("opacity", 0);
            $(".Rotate-Pescatarian-Right").css("opacity", 0);
            $(".Rotate-Pescatarian-Bottom").css("opacity", 1);

            $('.Menu-List-Name-P-T').css('opacity', '0%');
            $('.Menu-List-Name-P-L').css('opacity', '0%');
            $('.Menu-List-Name-P-R').css('opacity', '0%');
            $('.Menu-List-Name-P-B').css('opacity', '100%');
        
            $('.Recipe-One-P-T').css('opacity', '0%');
            $('.Recipe-One-P-L').css('opacity', '0%');
            $('.Recipe-One-P-R').css('opacity', '0%');
            $('.Recipe-One-P-B').css('opacity', '100%');
        
            $('.Recipe-Two-P-T').css('opacity', '0%');
            $('.Recipe-Two-P-L').css('opacity', '0%');
            $('.Recipe-Two-P-R').css('opacity', '0%');
            $('.Recipe-Two-P-B').css('opacity', '100%');
        
            $('.Recipe-Three-P-T').css('opacity', '0%');
            $('.Recipe-Three-P-L').css('opacity', '0%');
            $('.Recipe-Three-P-R').css('opacity', '0%');
            $('.Recipe-Three-P-B').css('opacity', '100%');
        
            $('.Recipe-Four-P-T').css('opacity', '0%');
            $('.Recipe-Four-P-L').css('opacity', '0%');
            $('.Recipe-Four-P-R').css('opacity', '0%');
            $('.Recipe-Four-P-B').css('opacity', '100%');

            $('.Rotate-Pescatarian-Top').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Pescatarian-Top').animate({
                top: '700px',
                left: '0px'
            });

            $('.Rotate-Pescatarian-Left').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Pescatarian-Left').animate({
                top: '150px',
                left: '500px'
            });

            $('.Rotate-Pescatarian-Right').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Pescatarian-Right').animate({
                top: '-50px',
                left: '-500px'
            });

            $('.Rotate-Pescatarian-Bottom').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Pescatarian-Bottom').animate({
                top: '-600px',
                left: '0px'
            }); 
        }

        
        else if($('.Rotate-Pescatarian-Top').css("top") == "700px" && $('.Rotate-Pescatarian-Top').css("left") == "0px"){
            
            $(".Rotate-Pescatarian-Top").css("opacity", 0);
            $(".Rotate-Pescatarian-Left").css("opacity", 0);
            $(".Rotate-Pescatarian-Right").css("opacity", 1);
            $(".Rotate-Pescatarian-Bottom").css("opacity", 0);

            $('.Menu-List-Name-P-T').css('opacity', '0%');
            $('.Menu-List-Name-P-L').css('opacity', '0%');
            $('.Menu-List-Name-P-R').css('opacity', '100%');
            $('.Menu-List-Name-P-B').css('opacity', '0%');
        
            $('.Recipe-One-P-T').css('opacity', '0%');
            $('.Recipe-One-P-L').css('opacity', '0%');
            $('.Recipe-One-P-R').css('opacity', '100%');
            $('.Recipe-One-P-B').css('opacity', '0%');
        
            $('.Recipe-Two-P-T').css('opacity', '0%');
            $('.Recipe-Two-P-L').css('opacity', '0%');
            $('.Recipe-Two-P-R').css('opacity', '100%');
            $('.Recipe-Two-P-B').css('opacity', '0%');
        
            $('.Recipe-Three-P-T').css('opacity', '0%');
            $('.Recipe-Three-P-L').css('opacity', '0%');
            $('.Recipe-Three-P-R').css('opacity', '100%');
            $('.Recipe-Three-P-B').css('opacity', '0%');
        
            $('.Recipe-Four-P-T').css('opacity', '0%');
            $('.Recipe-Four-P-L').css('opacity', '0%');
            $('.Recipe-Four-P-R').css('opacity', '100%');
            $('.Recipe-Four-P-B').css('opacity', '0%');           

            $('.Rotate-Pescatarian-Top').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Pescatarian-Top').animate({
                top: '350px',
                left: '-500px'
            });

            $('.Rotate-Pescatarian-Left').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Pescatarian-Left').animate({
                top: '500px',
                left: '0px'
            });

            $('.Rotate-Pescatarian-Right').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Pescatarian-Right').animate({
                top: '-400px',
                left: '0px'
            });

            $('.Rotate-Pescatarian-Bottom').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Pescatarian-Bottom').animate({
                top: '-250px',
                left: '500px'
            }); 
        }

        else if($('.Rotate-Pescatarian-Top').css("top") == "350px" && $('.Rotate-Pescatarian-Top').css("left") == "-500px"){
            
            $(".Rotate-Pescatarian-Top").css("opacity", 1);
            $(".Rotate-Pescatarian-Left").css("opacity", 0);
            $(".Rotate-Pescatarian-Right").css("opacity", 0);
            $(".Rotate-Pescatarian-Bottom").css("opacity", 0);

            $('.Menu-List-Name-P-T').css('opacity', '100%');
            $('.Menu-List-Name-P-L').css('opacity', '0%');
            $('.Menu-List-Name-P-R').css('opacity', '0%');
            $('.Menu-List-Name-P-B').css('opacity', '0%');
        
            $('.Recipe-One-P-T').css('opacity', '100%');
            $('.Recipe-One-P-L').css('opacity', '0%');
            $('.Recipe-One-P-R').css('opacity', '0%');
            $('.Recipe-One-P-B').css('opacity', '0%');
        
            $('.Recipe-Two-P-T').css('opacity', '100%');
            $('.Recipe-Two-P-L').css('opacity', '0%');
            $('.Recipe-Two-P-R').css('opacity', '0%');
            $('.Recipe-Two-P-B').css('opacity', '0%');
        
            $('.Recipe-Three-P-T').css('opacity', '100%');
            $('.Recipe-Three-P-L').css('opacity', '0%');
            $('.Recipe-Three-P-R').css('opacity', '0%');
            $('.Recipe-Three-P-B').css('opacity', '0%');
        
            $('.Recipe-Four-P-T').css('opacity', '100%');
            $('.Recipe-Four-P-L').css('opacity', '0%');
            $('.Recipe-Four-P-R').css('opacity', '0%');
            $('.Recipe-Four-P-B').css('opacity', '0%');

            $('.Rotate-Pescatarian-Top').css({
                transform: 'rotate(0deg)'
            });

            $('.Rotate-Pescatarian-Top').animate({
                top: '0px',
                left: '0px'
            });

            $('.Rotate-Pescatarian-Left').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Pescatarian-Left').animate({
                top: '150px',
                left: '-500px'
            });

            $('.Rotate-Pescatarian-Right').css({
                transform: 'rotate(90deg)'
            });
            $('.Rotate-Pescatarian-Right').animate({
                top: '-50px',
                left: '500px'
            });

            $('.Rotate-Pescatarian-Bottom').css({
                transform: 'rotate(180deg)'
            });
            $('.Rotate-Pescatarian-Bottom').animate({
                top: '100px',
                left: '0px'
            }); 
        }
    })

});



//SCROLL UP AND DOWN FOOD EFFECTS
$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Rotate-Veggie');


        if ($(this).scrollTop() > 500) {
            changingDiv.stop().animate({
                top: '80px'
            }, 250, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '-450px'
            }, 250, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Rotate-Meat');


        if ($(this).scrollTop() > 500) {
            changingDiv.stop().animate({
                top: '80px'
            }, 250, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '-490px'
            }, 250, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Rotate-Pescatarian');


        if ($(this).scrollTop() > 500) {
            changingDiv.stop().animate({
                top: '80px'
            }, 250, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '-490px'
            }, 250, 'linear'); // 300ms animation duration
        }
    });
});


//SALAD FALLING PART

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-1');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '350px',
                left: '60px'
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '30px',
                left: '40px'
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-2');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '360px',
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '150px'
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-3');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '340px',
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '30px',
                right: '50px',
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-4');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '240px',
                left: '20px'
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '10px',
                left: '0px'
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-5');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '225px',
                right: '0px'
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '90px',
                right: '5px'
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-6');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '220px',
                right: '50px'
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                right: '10px',
                top: '15px'
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-7');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '100px',
                left: '50px'
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                left: '10px',
                top: '0px'
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-8');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '100px'
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '50px'
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});

$(document).ready(function() {
    $(window).scroll(function() {
        var changingDiv = $('.Falling-9');


        if ($(this).scrollTop() > 0) {
            changingDiv.stop().animate({
                top: '90px',
                left: '-10px'
            }, 150, 'linear'); // 300ms animation duration
        } else {
            changingDiv.stop().animate({
                top: '0px',
                left: '0px'
            }, 150, 'linear'); // 300ms animation duration
        }
    });
});


//ROTATE PHOTOS
$(document).ready(function() {
    let currentRotationOne = 0;
    let currentRotationTwo = 0;
    let currentRotationThree = 0;
    let currentRotationFour = 0;
    let currentRotationFive = 0;
    let currentRotationSix = 0;

    $('.semonu-text-choice').hide();

    $('.semonu-text-choice-sambusa').css('opacity', '100%');
    $('.semonu-text-choice-burger').css('opacity', '100%');
    $('.semonu-text-choice-fish').css('opacity', '100%');
    $('.semonu-text-choice-beyayenet').css('opacity', '100%'); 
    $('.semonu-text-choice-kitfo').css('opacity', '100%');
    $('.semonu-text-choice-pizza').css('opacity', '100%');    

    $('.rotate-image-one').mouseenter(function(){

        currentRotationOne += 90;

        $('.rotate-image-one').css({
            transform: 'rotate('+ currentRotationOne + 'deg) scale(1.2)'
        });

        $('.semonu-text-choice').fadeIn("slow").css({
            transform: 'translateX(-1160px)'
        });

        $('.semonu-text-special').css({
            transform: 'translateX(-900px) scale(1, 1.1)'
        });

        $('.semonu-text-choice-sambusa').css('opacity', '100%');
        $('.semonu-text-choice-burger').css('opacity', '0%');
        $('.semonu-text-choice-fish').css('opacity', '0%');
        $('.semonu-text-choice-beyayenet').css('opacity', '0%'); 
        $('.semonu-text-choice-kitfo').css('opacity', '0%');
        $('.semonu-text-choice-pizza').css('opacity', '0%'); 
        
    })

    $('.rotate-image-one').mouseleave(function(){

        currentRotationOne += 0;

        $('.rotate-image-one').css({
            transform: 'rotate('+ currentRotationOne + 'deg) scale(1)'
        });

        $('.semonu-text-choice').css({
            transform: 'translateX(1160px)'
        }).fadeOut("fast");

        $('.semonu-text-special').css({
            transform: 'translateX(0px) scale(1, 1.1)'
        });    
    })

    $('.rotate-image-two').mouseenter(function(){

        currentRotationTwo += 90;

        $('.rotate-image-two').css({
            transform: 'rotate('+ currentRotationTwo + 'deg) scale(1.2)'
        });

        $('.semonu-text-choice').fadeIn("slow").css({
            transform: 'translateX(-1160px)'
        });

        $('.semonu-text-special').css({
            transform: 'translateX(-900px) scale(1, 1.1)'
        });

        $('.semonu-text-choice-sambusa').css('opacity', '0%');
        $('.semonu-text-choice-burger').css('opacity', '100%');
        $('.semonu-text-choice-fish').css('opacity', '0%');
        $('.semonu-text-choice-beyayenet').css('opacity', '0%'); 
        $('.semonu-text-choice-kitfo').css('opacity', '0%');
        $('.semonu-text-choice-pizza').css('opacity', '0%'); 
    })

    $('.rotate-image-two').mouseleave(function(){

        currentRotationTwo += 0;

        $('.rotate-image-two').css({
            transform: 'rotate('+ currentRotationTwo + 'deg) scale(1)'
        });

        $('.semonu-text-choice').css({
            transform: 'translateX(1160px)'
        }).fadeOut("fast");

        $('.semonu-text-special').css({
            transform: 'translateX(0px) scale(1, 1.1)'
        });    
    })

    $('.rotate-image-three').mouseenter(function(){

        currentRotationThree += 90;

        $('.rotate-image-three').css({
            transform: 'rotate('+ currentRotationThree + 'deg) scale(1.2)'
        });

        $('.semonu-text-choice').fadeIn("slow").css({
            transform: 'translateX(-1160px)'
        });

        $('.semonu-text-special').css({
            transform: 'translateX(-900px) scale(1, 1.1)'
        });

        $('.semonu-text-choice-sambusa').css('opacity', '0%');
        $('.semonu-text-choice-burger').css('opacity', '0%');
        $('.semonu-text-choice-fish').css('opacity', '100%');
        $('.semonu-text-choice-beyayenet').css('opacity', '0%'); 
        $('.semonu-text-choice-kitfo').css('opacity', '0%');
        $('.semonu-text-choice-pizza').css('opacity', '0%'); 
    })

    $('.rotate-image-three').mouseleave(function(){

        currentRotationThree += 0;

        $('.rotate-image-three').css({
            transform: 'rotate('+ currentRotationThree + 'deg) scale(1)'
        });

        $('.semonu-text-choice').css({
            transform: 'translateX(1160px)'
        }).fadeOut("fast");

        $('.semonu-text-special').css({
            transform: 'translateX(0px) scale(1, 1.1)'
        });      
    })

    $('.rotate-image-four').mouseenter(function(){

        currentRotationFour += 90;

        $('.rotate-image-four').css({
            transform: 'rotate('+ currentRotationFour + 'deg) scale(1.2)'
        });

        $('.semonu-text-choice').fadeIn("slow").css({
            transform: 'translateX(-1180px)'
        });

        $('.semonu-text-special').css({
            transform: 'translateX(-900px) scale(1, 1.1)'
        });

        $('.semonu-text-choice-sambusa').css('opacity', '0%');
        $('.semonu-text-choice-burger').css('opacity', '0%');
        $('.semonu-text-choice-fish').css('opacity', '0%');
        $('.semonu-text-choice-beyayenet').css('opacity', '100%'); 
        $('.semonu-text-choice-kitfo').css('opacity', '0%');
        $('.semonu-text-choice-pizza').css('opacity', '0%'); 
    })

    $('.rotate-image-four').mouseleave(function(){

        currentRotationFour += 0;

        $('.rotate-image-four').css({
            transform: 'rotate('+ currentRotationFour + 'deg) scale(1)'
        });

        $('.semonu-text-choice').css({
            transform: 'translateX(1160px)'
        }).fadeOut("fast");

        $('.semonu-text-special').css({
            transform: 'translateX(0px) scale(1, 1.1)'
        });   
    })

    $('.rotate-image-five').mouseenter(function(){

        currentRotationFive += 90;

        $('.rotate-image-five').css({
            transform: 'rotate('+ currentRotationFive + 'deg) scale(1.2)'
        });

        $('.semonu-text-choice').fadeIn("slow").css({
            transform: 'translateX(-1160px)'
        });

        $('.semonu-text-special').css({
            transform: 'translateX(-900px) scale(1, 1.1)'
        });

        $('.semonu-text-choice-sambusa').css('opacity', '0%');
        $('.semonu-text-choice-burger').css('opacity', '0%');
        $('.semonu-text-choice-fish').css('opacity', '0%');
        $('.semonu-text-choice-beyayenet').css('opacity', '0%'); 
        $('.semonu-text-choice-kitfo').css('opacity', '100%');
        $('.semonu-text-choice-pizza').css('opacity', '0%'); 
    })

    $('.rotate-image-five').mouseleave(function(){

        currentRotationFive += 0;

        $('.rotate-image-five').css({
            transform: 'rotate('+ currentRotationFive + 'deg) scale(1)'
        });

        $('.semonu-text-choice').css({
            transform: 'translateX(1160px)'
        }).fadeOut("fast");

        $('.semonu-text-special').css({
            transform: 'translateX(0px) scale(1, 1.1)'
        });  
    })

    $('.rotate-image-six').mouseenter(function(){

        currentRotationSix += 90;

        $('.rotate-image-six').css({
            transform: 'rotate('+ currentRotationSix + 'deg) scale(1.2)'
        });

        $('.semonu-text-choice').fadeIn("slow").css({
            transform: 'translateX(-1160px)'
        });

        $('.semonu-text-special').css({
            transform: 'translateX(-900px) scale(1, 1.1)'
        });

        $('.semonu-text-choice-sambusa').css('opacity', '0%');
        $('.semonu-text-choice-burger').css('opacity', '0%');
        $('.semonu-text-choice-fish').css('opacity', '0%');
        $('.semonu-text-choice-beyayenet').css('opacity', '0%'); 
        $('.semonu-text-choice-kitfo').css('opacity', '0%');
        $('.semonu-text-choice-pizza').css('opacity', '100%'); 
    })

    $('.rotate-image-six').mouseleave(function(){

        currentRotationSix += 0;

        $('.rotate-image-six').css({
            transform: 'rotate('+ currentRotationSix + 'deg) scale(1)'
        });

        $('.semonu-text-choice').css({
            transform: 'translateX(1160px)'
        }).fadeOut("fast");

        $('.semonu-text-special').css({
            transform: 'translateX(0px) scale(1, 1.1)'
        }); 
    })
});



//SPIN ME
$(document).ready(function() {
        function moveDiv() {
            $(".rotate-logo").animate({
              top: "+=30px" // Adjust the distance as needed
            }, 1000, function() {
              // Animation complete, move it back to the right
              $(this).animate({
                top: "-=30px" // Adjust the distance as needed
              }, 1000, moveDiv);
            });
          }

          // Start the initial movement
          moveDiv();
});

//SLIDE SHOW
const mainMenu = document.querySelector(".main-menus");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".arrow-btn");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens =[...carousel.children];

let isDragging=false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(card=>{
    carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
});

carouselChildrens.slice(0, -cardPerView).forEach(card=>{
    carousel.insertAdjacentHTML("beforeend",card.outerHTML);
});

arrowBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        carousel.scrollLeft += btn.id==="prev-btn" ? -firstCardWidth : firstCardWidth;
    })

});

const dragStart =(e)=>{
    isDragging=true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft=carousel.scrollLeft;
}

const dragging = (e)=>{
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft-(e.pageX-startX);
}
const dragStop =()=>{
    isDragging=false;
    carousel.classList.remove("dragging");
}
const autoPlay = ()=>{
    if(window.innerWidth<800){
        return;
    }
    timeoutId=setTimeout(()=> carousel.scrollLeft += firstCardWidth,2000)
}
autoPlay();

const infinteScroll = ()=>{
    if(carousel.scrollLeft === 0){

        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");

    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!mainMenu.matches(":hover")){
        autoPlay();
    }
}
carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll",infinteScroll);
mainMenu.addEventListener("mouseenter",() =>clearTimeout(timeoutId));
mainMenu.addEventListener("mouseleave",autoPlay);
