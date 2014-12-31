<?php if ( is_active_sidebar( 'footer' ) ) : // Check, if footer sidebar at least has one widget ?>
	<div id="footer-sidebar" class="widget-footer" aria-label="<?php echo esc_attr_x( 'Footer Sidebar', 'Sidebar aria label', 'delivery' ); ?>" <?php hybrid_attr( 'sidebar', 'footer' ); ?>>
		<?php dynamic_sidebar( 'footer' ); ?>
	</div><!-- #footer-sidebar -->
<?php endif; ?>
