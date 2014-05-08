<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<header class="entry-header">
		<h1 class="entry-title"><?php the_title(); ?></h1>

		<div class="entry-meta">
			<?php delivery_posted_on(); ?>

			<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
				<span class="comments-link"><?php comments_popup_link( __( '0', 'delivery' ), __( '1', 'delivery' ), __( '%', 'delivery' ) ); ?> <div class="dashicons dashicons-admin-comments"></div></span>
			<?php endif; ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'delivery' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php
			/* translators: used between list items, there is a space after the comma */
			$category_list = get_the_category_list( __( ', ', 'delivery' ) );

			/* translators: used between list items, there is a space after the comma */
			$tag_list = get_the_tag_list( '', __( ', ', 'delivery' ) );

			if ( ! delivery_categorized_blog() ) {
				// This blog only has 1 category so we just need to worry about tags in the meta text
				if ( '' != $tag_list ) {
					$meta_text = '<span class="entry-tag">' . __( 'Tagged: %2$s', 'delivery' ) . '</span>';
				} 

			} else {
				// But this blog has loads of categories so we should probably display them here
				if ( '' != $tag_list ) {
					$meta_text = '<span class="entry-cat">' . __( 'Posted in: %1$s', 'delivery' ) . '</span>';
					$meta_text = '<span class="entry-tag">' . __( 'Tagged: %2$s', 'delivery' ) . '</span>';
				} else {
					$meta_text = '<span class="entry-cat">' . __( 'Posted in: %1$s', 'delivery' ) . '</span>';
				}

			} // end check for categories on this blog

			printf(
				$meta_text,
				$category_list,
				$tag_list,
				get_permalink()
			);
		?>

		<?php edit_post_link( __( 'Edit', 'delivery' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-footer -->
	
</article><!-- #post-## -->
