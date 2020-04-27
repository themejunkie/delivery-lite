<?php if ( is_singular( 'post' ) ) : // If viewing a single post page. ?>

	<div class="loop-nav" role="navigation">
		<?php previous_post_link( '<div class="prev">' . __( 'Previous Post: %link', 'delivery-lite' ) . '</div>', '%title' ); ?>
		<?php next_post_link( '<div class="next">' . __( 'Next Post: %link', 'delivery-lite' ) . '</div>', '%title' ); ?>
	</div><!-- .loop-nav -->

<?php elseif ( is_home() || is_archive() || is_search() ) : // If viewing the blog, an archive, or search results. ?>

	<?php the_posts_pagination(); ?>

<?php endif; // End check for type of page being viewed. ?>