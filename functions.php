<?php
/**
 * Theme functions file
 *
 * Contains all of the Theme's setup functions, custom functions,
 * custom hooks and Theme settings.
 * 
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

// Do theme setup on the 'after_setup_theme' hook.
add_action( 'after_setup_theme', 'delivery_theme_setup' );

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * @since  1.0.0
 */
function delivery_theme_setup() {

	// Set the content width based on the theme's design and stylesheet.
	global $content_width;
	if ( ! isset( $content_width ) ) {
		$content_width = 605; /* pixels */
	}

	// Make the theme available for translation.
	load_theme_textdomain( 'delivery', trailingslashit( get_template_directory() ) . 'languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Enable support for Post Thumbnails.
	add_theme_support( 'post-thumbnails' );

	// Register custom navigation menu.
	register_nav_menus(
		array(
			'primary'   => __( 'Primary Menu', 'delivery' ),
			'secondary' => __( 'Secondary Menu' , 'delivery' ),
		)
	);

	// Add custom stylesheet file to the TinyMCE visual editor.
	add_editor_style( trailingslashit( get_template_directory_uri() ) . 'assets/css/editor-style.css' );

	// Setup the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters( 'delivery_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) )
	);

	// Enable support for HTML5 markup.
	add_theme_support(
		'html5',
		array( 'comment-list', 'search-form', 'comment-form', 'gallery', 'caption' )
	);

}

/**
 * Sets up custom filters and actions for the theme.
 */
require trailingslashit( get_template_directory() ) . 'inc/functions.php';

/**
 * Custom template tags for this theme.
 */
require trailingslashit( get_template_directory() ) . 'inc/template-tags.php';

/**
 * Enqueue scripts and styles.
 */
require trailingslashit( get_template_directory() ) . 'inc/scripts.php';

/**
 * Require and recommended plugins list.
 */
require trailingslashit( get_template_directory() ) . 'inc/plugins.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require trailingslashit( get_template_directory() ) . 'inc/extras.php';

/**
 * Customizer additions.
 */
require trailingslashit( get_template_directory() ) . 'inc/customizer.php';

/**
 * We use some part of Hybrid Core to extends our themes.
 */
require trailingslashit( get_template_directory() ) . 'inc/hybrid.php';

/**
 * Custom categories widget.
 */
require trailingslashit( get_template_directory() ) . 'inc/classes/widget-categories.php';