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
		$this->WP_Widget(
			'delivery-categories',                   // $this->id_base
			__( 'Delivery Categories', 'delivery' ), // $this->name
			$widget_options                          // $this->widget_options
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

		// If the title not empty, display it.
		if ( $instance['title'] ) {
			echo $before_title . apply_filters( 'widget_title',  $instance['title'], $instance, $this->id_base ) . $after_title;
		}

		// Display the category list.
		echo '<ul>';
			wp_list_categories( array( 'title_li' => '' ) );
		echo '</ul>';

		// Close the theme's widget wrapper.
		echo $after_widget;

	}

	/**
	 * Updates the widget control options for the particular instance of the widget.
	 *
	 * @since 1.0.0
	 */
	function update( $new_instance, $old_instance ) {
		$instance = $new_instance;
		$instance['title'] = strip_tags( $new_instance['title'] );
		return $instance;
	}

	/**
	 * Displays the widget control options in the Widgets admin screen.
	 *
	 * @since 1.0.0
	 */
	function form( $instance ) {

		// Default.
		$instance = wp_parse_args( (array) $instance, array( 'title' => '' ) );
	?>

		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>">
				<?php _e( 'Title:', 'delivery' ); ?>
			</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>

	<?php

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