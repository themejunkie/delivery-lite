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
	load_theme_textdomain( 'delivery-lite', trailingslashit( get_template_directory() ) . 'languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

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
			'primary'   => __( 'Primary Location', 'delivery-lite' ),
			'secondary' => __( 'Secondary Location' , 'delivery-lite' ),
		)
	);

	// Add custom stylesheet file to the TinyMCE visual editor.
	add_editor_style( array( 'assets/css/editor-style.css', delivery_open_sans_font_url() ) );

	// Setup the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'delivery_custom_background_args', array(
		'default-color' => 'ffffff'
	) ) );

	// Enable support for HTML5 markup.
	add_theme_support(
		'html5',
		array( 'comment-list', 'search-form', 'comment-form', 'gallery', 'caption' )
	);

	// This theme uses its own gallery styles.
	add_filter( 'use_default_gallery_style', '__return_false' );

	// Indicate widget sidebars can use selective refresh in the Customizer.
	add_theme_support( 'customize-selective-refresh-widgets' );

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
			'name'          => _x( 'Header', 'sidebar', 'delivery-lite' ),
			'id'            => 'header',
			'description'   => __( 'An optional widget area for your site header.', 'delivery-lite' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h1 class="widget-title">',
			'after_title'   => '</h1>',
		)
	);

	register_sidebar(
		array(
			'name'          => _x( 'Primary', 'sidebar', 'delivery-lite' ),
			'id'            => 'primary',
			'description'   => __( 'The main sidebar, appears on posts and pages.', 'delivery-lite' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h1 class="widget-title">',
			'after_title'   => '</h1>',
		)
	);

	register_sidebar(
		array(
			'name'          => _x( 'Secondary', 'sidebar', 'delivery-lite' ),
			'id'            => 'secondary',
			'description'   => __( 'Secondary(left) sidebar, appears on posts and pages.', 'delivery-lite' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h1 class="widget-title">',
			'after_title'   => '</h1>',
		)
	);

	register_sidebar(
		array(
			'name'          => _x( 'Footer', 'sidebar', 'delivery-lite' ),
			'id'            => 'footer',
			'description'   => __( 'The footer sidebar, appears on the footer of your site.', 'delivery-lite' ),
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
 * Register Open Sans Google fonts.
 *
 * @since  1.0.0
 * @return string
 */
function delivery_open_sans_font_url() {
	$open_sans_font_url = '';

	/* translators: If there are characters in your language that are not supported
	 * by Open Sans, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Open Sans font: on or off', 'delivery-lite' ) ) {
		$subsets = 'latin,latin-ext';

		/* translators: To add an additional Open Sans character subset specific to your language,
		 * translate this to 'greek', 'cyrillic' or 'vietnamese'. Do not translate into your own language.
		 */
		$subset = _x( 'no-subset', 'Open Sans font: add new subset (greek, cyrillic, vietnamese)', 'delivery-lite' );

		if ( 'cyrillic' == $subset ) {
			$subsets .= ',cyrillic,cyrillic-ext';
		} elseif ( 'greek' == $subset ) {
			$subsets .= ',greek,greek-ext';
		} elseif ( 'vietnamese' == $subset ) {
			$subsets .= ',vietnamese';
		}

		$query_args = array(
			'family' => urlencode( 'Open Sans:300italic,400italic,600italic,700italic,300,400,600,700' ),
			'subset' => urlencode( $subsets ),
		);

		$open_sans_font_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );
	}

	return $open_sans_font_url;
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
require trailingslashit( get_template_directory() ) . 'inc/hybrid/attr.php';

/**
 * Custom categories widget.
 */
require trailingslashit( get_template_directory() ) . 'inc/classes/widget-categories.php';

/**
 * Require and recommended plugins list.
 */
require trailingslashit( get_template_directory() ) . 'inc/plugins.php';

// MailOptin integration
require get_template_directory() . '/inc/classes/class-mailoptin.php';
