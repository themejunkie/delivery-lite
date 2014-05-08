<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 *
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

function optionsframework_option_name() {

	// This gets the theme name from the stylesheet
	$themename = wp_get_theme();
	$themename = preg_replace("/\W/", "_", strtolower( $themename ) );

	$optionsframework_settings = get_option( 'optionsframework' );
	$optionsframework_settings['id'] = $themename;
	update_option( 'optionsframework', $optionsframework_settings );

}

/**
 * Defines an array of options that will be used to generate the settings page 
 * and be saved in the database.
 *
 * @since  1.0.0
 * @access public
 */
function optionsframework_options() {

	$options = array();

	$options[] = array(
		'name' => __( 'Basic Settings', 'delivery' ),
		'type' => 'heading'
	);

	$options[] = array(
		'name' => __( 'Input Text', 'delivery' ),
		'desc' => __( 'A text input field.', 'delivery' ),
		'id'   => 'example_text',
		'std'  => __( 'Default Value', 'delivery' ),
		'type' => 'text'
	);

	/* Return the theme settings data. */
	return $options;
}