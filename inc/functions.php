<?php
/**
 * Sets up custom filters and actions for the theme. This does things like 
 * sets up sidebars, menus, scripts, and lots of other awesome stuff that 
 * WordPress themes do.
 *
 * @package    ThemeName
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

/* Register custom image sizes. */
add_action( 'init', 'basic_register_image_sizes', 5 );

/* Add custom image sizes custom name. */
add_filter( 'image_size_names_choose', 'basic_custom_name_image_sizes', 11, 1 );

/* Register custom menus. */
add_action( 'init', 'basic_register_menus', 5 );

/* Register sidebars. */
add_action( 'widgets_init', 'basic_register_sidebars', 5 );

/* Override the default options.php location. */
add_filter( 'options_framework_location', 'basic_location_override' );

/* Change the theme option text. */
add_filter( 'optionsframework_menu', 'basic_theme_options_text' );

/* Removes default styles set by WordPress recent comments widget. */
add_action( 'widgets_init', 'basic_remove_recent_comments_style' );

/**
 * Registers custom image sizes for the theme.
 *
 * @since  1.0.0
 * @access public
 */
function basic_register_image_sizes() {

	/* Sets the 'post-thumbnail' size. */
	set_post_thumbnail_size( 175, 131, true );

	/* Adds the 'basic-full' image size. */
	add_image_size( 'basic-thumb', 150, 150, false );
}

/**
 * Adds custom image sizes custom name.
 *
 * @since  1.0.0
 * @access public
 */
function basic_custom_name_image_sizes( $sizes ) {
	$sizes['basic-thumb'] = __( 'Small Thumbnail', 'basic' );

	return $sizes;
}

/**
 * Registers nav menu locations.
 *
 * @since  1.0.0
 * @access public
 */
function basic_register_menus() {
	register_nav_menu( 'primary', _x( 'Primary', 'nav menu location', 'basic' ) );
	register_nav_menu( 'social',  _x( 'Social',  'nav menu location', 'basic' ) );
}

/**
 * Registers sidebars.
 *
 * @since  1.0.0
 * @access public
 */
function basic_register_sidebars() {

	hybrid_register_sidebar(
		array(
			'id'          => 'primary',
			'name'        => _x( 'Primary', 'sidebar', 'basic' ),
			'description' => __( 'The main sidebar. It is displayed on either the left or right side of the page based on the chosen layout.', 'basic' )
		)
	);
	
}

/**
 * Override the default options.php location.
 *
 * @since  1.0.0
 * @access public
 */
function basic_location_override() {
	return array( 'inc/admin/options.php' );
}

/**
 * Change the theme options text.
 *
 * @param  array $menu
 * @since  1.0.0
 * @access public
 */
function basic_theme_options_text( $menu ) {
	$menu['page_title'] = __( 'Theme Junkie Settings', 'basic' );
	$menu['menu_title'] = __( 'Theme Settings', 'basic' );

	return $menu;
}

/**
 * Removes default styles set by WordPress recent comments widget.
 *
 * @since  0.0.1
 * @access public
 */
function basic_remove_recent_comments_style() {
	global $wp_widget_factory;
	remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );
}