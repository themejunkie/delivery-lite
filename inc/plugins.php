<?php
/**
 * TGM Plugin Lists
 *
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

// Include the TGM_Plugin_Activation class.
require trailingslashit( get_template_directory() ) . 'inc/classes/class-tgm-plugin-activation.php';

add_action( 'tgmpa_register', 'delivery_register_plugins' );
/**
 * Register required and recommended plugins.
 *
 * @since  1.0.0
 */
function delivery_register_plugins() {

	$plugins = array(

		array(
			'name'     => 'Theme Junkie Custom CSS',
			'slug'     => 'theme-junkie-custom-css',
			'required' => false,
		),

		array(
			'name'     => 'Jetpack by WordPress.com',
			'slug'     => 'jetpack',
			'required' => false,
		),

		array(
			'name'     => 'WordPress SEO by Yoast',
			'slug'     => 'wordpress-seo',
			'required' => false,
		),

		array(
			'name'     => 'Ninja Forms',
			'slug'     => 'ninja-forms',
			'required' => false,
		),

	);

	$config = array(
		'id'           => 'tgmpa',
		'default_path' => '',
		'menu'         => 'tgmpa-install-plugins',
		'has_notices'  => true,
		'dismissable'  => true,
		'dismiss_msg'  => '',
		'is_automatic' => false,
		'message'      => '',
	);

	tgmpa( $plugins, $config );

}