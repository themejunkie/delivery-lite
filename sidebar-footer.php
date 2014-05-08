<?php if ( is_active_sidebar( 'footer' ) ) : // Check, if footer sidebar at least has one widget ?>
	<div id="footer-sidebar" class="widget-footer">
		<?php dynamic_sidebar( 'footer' ); ?>
	</div><!-- #footer-sidebar -->
<?php endif; ?>
