$(document).ready(function() {
    // Filter functionality
    $('.filter-btn').click(function() {
        const filter = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter cards
        if (filter === 'all') {
            $('.menu-card').removeClass('hidden').show();
        } else {
            $('.menu-card').each(function() {
                const category = $(this).data('category');
                if (category === filter) {
                    $(this).removeClass('hidden').show();
                } else {
                    $(this).addClass('hidden').hide();
                }
            });
        }
    });
    
    // Add to cart functionality
    $('.add-btn').click(function() {
        const card = $(this).closest('.menu-card');
        const dishName = card.find('h3').text();
        const price = card.find('.price').text();
        
        // Add animation
        $(this).text('Added!').css('background', '#92d714');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            $(this).text('Add to Cart').css('background', 'linear-gradient(135deg, #45a62f 0%, #92d714 100%)');
        }, 2000);
        
        // You can add actual cart functionality here
        console.log(`Added ${dishName} for ${price} to cart`);
    });
});
