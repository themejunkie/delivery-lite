<?php
/**
 * Delivery Lite Theme Customizer.
 *
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @since 1.0.0
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function delivery_customize_register( $wp_customize ) {

	// Enable live preview.
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';

	// Adds "Delivery Settings" section to the Theme Customization screen.
	$wp_customize->add_section(
		'delivery_settings',
		array(
			'title'    => __( 'Delivery Lite Settings', 'delivery-lite' ),
			'priority' => 150,
		)
	);

	// Logo setting.
	$wp_customize->add_setting(
		'delivery_logo',
		array(
			'sanitize_callback' => 'esc_url',
			'capability'        => 'edit_theme_options'
		)
	);

		// Logo control.
		$wp_customize->add_control(
			new WP_Customize_Image_Control( $wp_customize, 'delivery_logo_control',
			array(
				'label'    => esc_html__( 'Upload Logo', 'delivery-lite' ),
				'section'  => 'delivery_settings',
				'settings' => 'delivery_logo'
			)
		) );

	// Featured Posts setting.
	$wp_customize->add_setting(
		'delivery_featured_posts',
		array(
			'default'           => 'featured',
			'sanitize_callback' => 'sanitize_text_field',
			'capability'        => 'edit_theme_options'
		)
	);

		// Featured Posts control.
		$wp_customize->add_control(
			'delivery_featured_posts_control',
			array(
				'label'    => esc_html__( 'Tag slug for featured post', 'delivery-lite' ),
				'section'  => 'delivery_settings',
				'settings' => 'delivery_featured_posts'
			)
		);

	// Featured Posts setting.
	$wp_customize->add_setting(
		'delivery_featured_posts_num',
		array(
			'default'           => 4,
			'sanitize_callback' => 'absint',
			'capability'        => 'edit_theme_options'
		)
	);

		// Featured Posts control.
		$wp_customize->add_control(
			'delivery_featured_posts_num_control',
			array(
				'label'    => esc_html__( 'Number of featured posts to show.', 'delivery-lite' ),
				'section'  => 'delivery_settings',
				'settings' => 'delivery_featured_posts_num'
			)
		);

}
add_action( 'customize_register', 'delivery_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 *
 * @since 1.0.0
 */
function delivery_customize_preview_js() {
	wp_enqueue_script( 'delivery_customizer', trailingslashit( get_template_directory_uri() ) . 'assets/js/customizer.js', array( 'customize-preview' ), null, true );
}
add_action( 'customize_preview_init', 'delivery_customize_preview_js' );