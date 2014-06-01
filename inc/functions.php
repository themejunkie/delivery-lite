<?php
/**
 * Sets up custom filters and actions for the theme.
 *
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

// Register custom image sizes.
add_action( 'init', 'delivery_register_image_sizes', 5 );

// Add custom image sizes custom name.
add_filter( 'image_size_names_choose', 'delivery_custom_name_image_sizes', 11, 1 );

// Register sidebars.
add_action( 'widgets_init', 'delivery_register_sidebars' );

/**
 * Registers custom image sizes for the theme.
 *
 * @since 1.0.0
 * @link  http://codex.wordpress.org/Function_Reference/add_image_size
 */
function delivery_register_image_sizes() {
	add_image_size( 'delivery-post'    , 110, 100, true );
	add_image_size( 'delivery-archive' , 150, 150, true );
	add_image_size( 'delivery-featured', 605, 345, true );
	add_image_size( 'delivery-thumb'   , 90 , 50 , true );
}

/**
 * Adds custom image sizes custom name.
 *
 * @since 1.0.0
 */
function delivery_custom_name_image_sizes( $sizes ) {
	$sizes['delivery-post']     = __( 'Post Thumbnail'          , 'delivery' );
	$sizes['delivery-archive']  = __( 'Archive Thumbnail'       , 'delivery' );
	$sizes['delivery-featured'] = __( 'Featured Thumbnail'      , 'delivery' );
	$sizes['delivery-thumb']    = __( 'Small Featured Thumbnail', 'delivery' );
	
	return $sizes;
}

/**
 * Registers sidebars.
 *
 * @since 1.0.0
 * @link  http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function delivery_register_sidebars() {

	register_sidebar(
		array(
			'name'          => _x( 'Header', 'sidebar', 'delivery' ),
			'id'            => 'header',
			'description'   => __( 'An optional widget area for your site header.', 'delivery' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h1 class="widget-title">',
			'after_title'   => '</h1>',
		)
	);

	register_sidebar(
		array(
			'name'          => _x( 'Primary', 'sidebar', 'delivery' ),
			'id'            => 'primary',
			'description'   => __( 'The main sidebar, appears on posts and pages.', 'delivery' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h1 class="widget-title">',
			'after_title'   => '</h1>',
		)
	);

	register_sidebar(
		array(
			'name'          => _x( 'Home', 'sidebar', 'delivery' ),
			'id'            => 'home',
			'description'   => __( 'Secondary(left) sidebar, it only displayed on home page.', 'delivery' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h1 class="widget-title">',
			'after_title'   => '</h1>',
		)
	);

	register_sidebar(
		array(
			'name'          => _x( 'Footer', 'sidebar', 'delivery' ),
			'id'            => 'footer',
			'description'   => __( 'The footer sidebar, appears on the footer of your site.', 'delivery' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h1 class="widget-title">',
			'after_title'   => '</h1>',
		)
	);
	
}