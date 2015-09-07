<?php
/**
 * Custom categories widget.
 *
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */
class Delivery_Categories extends WP_Widget {

	/**
	 * Sets up the widgets.
	 *
	 * @since 1.0.0
	 */
	function __construct() {

		// Set up the widget options.
		$widget_options = array(
			'classname'   => 'delivery-categories',
			'description' => __( 'Display category list in a custom view.', 'delivery' )
		);

		// Create the widget.
		parent::__construct(
			'delivery-categories',                          // $this->id_base
			__( '&rarr; Delivery Categories', 'delivery' ), // $this->name
			$widget_options                                 // $this->widget_options
		);
	}

	/**
	 * Outputs the widget based on the arguments input through the widget controls.
	 *
	 * @since 1.0.0
	 */
	function widget( $args, $instance ) {
		extract( $args );

		// Output the theme's $before_widget wrapper.
		echo $before_widget;

			// Display the category list.
			echo '<ul>';
				wp_list_categories( array( 'title_li' => '' ) );
			echo '</ul>';

		// Close the theme's widget wrapper.
		echo $after_widget;

	}

}

/**
 * Register the widget.
 *
 * @since  1.0.0
 */
function delivery_register_widgets() {
	register_widget( 'Delivery_Categories' );
}
add_action( 'widgets_init', 'delivery_register_widgets' );