var $ = jQuery.noConflict();
$(document).ready(function(){
	
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
		speed:      'fast',
	});

});