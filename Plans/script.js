$(document).ready(function() {
    // Plan selector toggle
    $('.selector-btn').click(function() {
        const plan = $(this).data('plan');
        
        // Update active button
        $('.selector-btn').removeClass('active');
        $(this).addClass('active');
        
        // Toggle price display
        if (plan === 'weekly') {
            $('.weekly-price, .weekly-text').show();
            $('.monthly-price, .monthly-text').hide();
        } else {
            $('.weekly-price, .weekly-text').hide();
            $('.monthly-price, .monthly-text').show();
        }
    });
    
    // Plan button click
    $('.plan-btn').click(function() {
        const planName = $(this).closest('.plan-card').find('h2').text();
        const isMonthly = $('.selector-btn[data-plan="monthly"]').hasClass('active');
        const planType = isMonthly ? 'Monthly' : 'Weekly';
        
        // Add animation
        $(this).text('Selected!').css('background', '#92d714');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            $(this).text('Get Started').css('background', 'linear-gradient(135deg, #45a62f 0%, #92d714 100%)');
        }, 2000);
        
        console.log(`Selected ${planName} plan (${planType})`);
        // Add your plan selection logic here
    });
    
    // FAQ accordion
    $('.faq-question').click(function() {
        const faqItem = $(this).closest('.faq-item');
        
        // Toggle current item
        faqItem.toggleClass('active');
        
        // Close other items
        $('.faq-item').not(faqItem).removeClass('active');
    });
});
