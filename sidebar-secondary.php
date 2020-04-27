<?php if ( is_active_sidebar( 'secondary' ) ) : // Check, if secondary sidebar at least has one widget and on secondary page. ?>
	<div id="secondary-sidebar" class="widget-area widget-secondary" aria-label="<?php echo esc_attr_x( 'Secondary Sidebar', 'Sidebar aria label', 'delivery-lite' ); ?>" <?php hybrid_attr( 'sidebar', 'secondary' ); ?>>
		<?php dynamic_sidebar( 'secondary' ); ?>
	</div><!-- #secondary-sidebar -->
<?php endif; ?>
