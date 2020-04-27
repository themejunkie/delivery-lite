<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> <?php hybrid_attr( 'post' ); ?>>
	
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title" ' . hybrid_get_attr( 'entry-title' ) . '>', '</h1>' ); ?>

		<div class="entry-meta">
			<?php delivery_posted_on(); ?>

			<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
				<span class="comments-link"><?php comments_popup_link( __( '0', 'delivery-lite' ), __( '1', 'delivery-lite' ), __( '%', 'delivery-lite' ) ); ?> <div class="dashicons dashicons-admin-comments"></div></span>
			<?php endif; ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-content" <?php hybrid_attr( 'entry-content' ); ?>>
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'delivery-lite' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( __( ', ', 'delivery-lite' ) );
			if ( $categories_list && delivery_categorized_blog() ) :
		?>
			<span class="cat-links" <?php hybrid_attr( 'entry-terms', 'category' ); ?>>
				<?php printf( __( 'Posted in: %1$s', 'delivery-lite' ), $categories_list ); ?>
			</span>
		<?php endif; // End if categories ?>

		<?php
			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', __( ', ', 'delivery-lite' ) );
			if ( $tags_list ) :
		?>
			<span class="tags-links" <?php hybrid_attr( 'entry-terms', 'post_tag' ); ?>>
				<?php printf( __( 'Tagged: %1$s', 'delivery-lite' ), $tags_list ); ?>
			</span>
		<?php endif; // End if $tags_list ?>

		<?php edit_post_link( __( 'Edit', 'delivery-lite' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-footer -->
	
</article><!-- #post-## -->
