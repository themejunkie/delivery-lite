<?php
/**
 * Register support of a certain Hybrid Core and WordPress features.
 *
 * @package    ThemeName
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

/* Add support certain features. */
add_action( 'after_setup_theme', 'basic_theme_supports', 5 );

/**
 * Add Hybrid Core and WordPress theme support features.
 *
 * @since  1.0.0
 * @access public
 */
function basic_theme_supports() {

	/* Load widgets. */
	add_theme_support( 'hybrid-core-widgets' );

	/* Theme layouts. */
	add_theme_support( 
		'theme-layouts', 
		array(
			'1c'        => __( '1 Column Wide',                'basic' ),
			'1c-narrow' => __( '1 Column Narrow',              'basic' ),
			'2c-l'      => __( '2 Columns: Content / Sidebar', 'basic' ),
			'2c-r'      => __( '2 Columns: Sidebar / Content', 'basic' )
		)
	);

	/* Load stylesheets. */
	add_theme_support(
		'hybrid-core-styles',
		array( 'gallery', 'parent', 'style' )
	);

	/* Enable custom template hierarchy. */
	add_theme_support( 'hybrid-core-template-hierarchy' );

	/* The best thumbnail/image script ever. */
	add_theme_support( 'get-the-image' );

	/* Breadcrumbs. Yay! */
	add_theme_support( 'breadcrumb-trail' );

	/* Pagination. */
	add_theme_support( 'loop-pagination' );

	/* Better captions for themes to style. */
	add_theme_support( 'cleaner-caption' );

	/* Automatically add feed links to <head>. */
	add_theme_support( 'automatic-feed-links' );

	/* Post formats. */
	add_theme_support( 
		'post-formats', 
		array( 'aside', 'audio', 'chat', 'image', 'gallery', 'link', 'quote', 'status', 'video' ) 
	);

}