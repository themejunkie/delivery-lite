	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo" <?php hybrid_attr( 'footer' ); ?>>
		<div class="footer-item">

			<?php get_sidebar( 'footer' ); // Loads the sidebar-footer.php template. ?>

			<div class="site-info">
				<a class="powered" href="<?php echo esc_url( __( 'http://wordpress.org/', 'delivery-lite' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'delivery-lite' ), 'WordPress' ); ?></a>
				<?php printf( __( 'Theme: %1$s by %2$s.', 'delivery-lite' ), 'Delivery Lite', '<a href="http://www.theme-junkie.com/" rel="designer">Theme Junkie</a>' ); ?>
			</div><!-- .site-info -->

		</div><!-- .footer-item -->
	</footer><!-- #colophon -->
	
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
