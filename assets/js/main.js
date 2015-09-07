var $ = jQuery.noConflict();
$(document).ready(function(){

	// Mobile menu
	$('#menu-primary-items').slicknav({
		prependTo: '#primary-navigation',
		allowParentLinks: true
	});

	// Mobile menu
	$('#menu-secondary-items').slicknav({
		prependTo: '#secondary-navigation',
		allowParentLinks: true
	});
	
	/**
	 * Superfish + Supersubs
	 */
	$('ul.sf-menu').supersubs({
		minWidth:   12,
		maxWidth:   27,
		extraWidth: 1
	}).superfish({
		delay:      50,
		animation:  {opacity:'show', height:'show'},
		speed:      'fast'
	});

	// Scroll to top
	$.scrollUp({
		scrollText: '<span class="dashicons dashicons-arrow-up-alt2"></span>'
	});

});

$(window).load(function() {

	$(document).imagesLoaded(function(){

		/**
		 * Flexslider
		 */
		$('#carousel').flexslider({
			animation: "slide",
			controlNav: false,
			directionNav: false,
			animationLoop: false,
			slideshow: false,
			itemWidth: 109.5,
			minItems: 4,
			asNavFor: '#slider'
		});
		   
		$('#slider').flexslider({
			animation: "slide",
			controlNav: false,
			directionNav: false,
			animationLoop: false,
			slideshowSpeed: 5000,
			sync: "#carousel"
		});

	});

});