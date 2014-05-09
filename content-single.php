<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

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
			$categories_list = get_the_category_list( __( ', ', 'delivery' ) );
			if ( $categories_list && delivery_categorized_blog() ) :
		?>
			<span class="cat-links">
				<?php printf( __( 'Posted in: %1$s', 'delivery' ), $categories_list ); ?>
			</span>
		<?php endif; // End if categories ?>

		<?php
			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', __( ', ', 'delivery' ) );
			if ( $tags_list ) :
		?>
			<span class="tags-links">
				<?php printf( __( 'Tagged: %1$s', 'delivery' ), $tags_list ); ?>
			</span>
		<?php endif; // End if $tags_list ?>

		<?php edit_post_link( __( 'Edit', 'delivery' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-footer -->
	
</article><!-- #post-## -->
