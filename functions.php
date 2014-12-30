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

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 605; /* pixels */
}

if ( ! function_exists( 'delivery_theme_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * @since  1.0.0
 */
function delivery_theme_setup() {

	// Make the theme available for translation.
	load_theme_textdomain( 'delivery', trailingslashit( get_template_directory() ) . 'languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Enable support for Post Thumbnails.
	add_theme_support( 'post-thumbnails' );

	// Declare image sizes.
	add_image_size( 'delivery-post'    , 110, 100, true );
	add_image_size( 'delivery-archive' , 150, 150, true );
	add_image_size( 'delivery-featured', 605, 345, true );
	add_image_size( 'delivery-thumb'   , 90 , 50 , true );

	// Register custom navigation menu.
	register_nav_menus(
		array(
			'primary'   => __( 'Primary Menu', 'delivery' ),
			'secondary' => __( 'Secondary Menu' , 'delivery' ),
		)
	);

	// Add custom stylesheet file to the TinyMCE visual editor.
	add_editor_style( array( 'assets/css/editor-style.css' ) );

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

	// This theme uses its own gallery styles.
	add_filter( 'use_default_gallery_style', '__return_false' );

}
endif; // delivery_theme_setup
add_action( 'after_setup_theme', 'delivery_theme_setup' );

if ( ! function_exists( 'delivery_register_sidebars' ) ) :
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
endif; // delivery_register_sidebars
add_action( 'widgets_init', 'delivery_register_sidebars' );

/**
 * Register Droid Sans Google fonts.
 *
 * @since  1.0.0
 * @return string
 */
function delivery_droid_sans_font_url() {
	$droid_sans_font_url = '';

	/* translators: If there are characters in your language that are not supported
	   by Droid Sans, translate this to 'off'. Do not translate into your own language. */
	if ( 'off' !== _x( 'on', 'Droid Sans font: on or off', 'delivery' ) ) {

		$droid_sans_font_url = add_query_arg( 'family', urlencode( 'Droid Sans:400,700' ), "//fonts.googleapis.com/css" );
	}

	return $droid_sans_font_url;
}

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
require trailingslashit( get_template_directory() ) . 'inc/hybrid/breadcrumb-trail.php';
require trailingslashit( get_template_directory() ) . 'inc/hybrid/loop-pagination.php';

/**
 * Custom categories widget.
 */
require trailingslashit( get_template_directory() ) . 'inc/classes/widget-categories.php';