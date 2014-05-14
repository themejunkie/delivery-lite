var $ = jQuery.noConflict();
$(document).ready(function(){

	/**
	 * mmenu
	 */
	$('#primary-navigation').clone().attr('id', 'primary-menu').insertBefore('#primary-navigation');
	$('#primary-navigation ul').removeClass('sf-menu');
	$('#primary-navigation').mmenu();
	
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

	/**
	 * Turn navigation into mobile navigation
	 */
	$("#secondary-navigation .menu-secondary-items").tinyNav({
		active: 'current-menu-item'
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