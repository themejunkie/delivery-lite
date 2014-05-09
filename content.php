<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<?php delivery_post_thumbnail(); ?>

	<header class="entry-header entry-header-index">
		<?php the_title( sprintf( '<h1 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>

		<?php if ( 'post' == get_post_type() ) : ?>
			<div class="entry-meta">
				<?php delivery_posted_on(); ?>

				<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
					<span class="comments-link"><?php comments_popup_link( __( '0', 'delivery' ), __( '1', 'delivery' ), __( '%', 'delivery' ) ); ?> <div class="dashicons dashicons-admin-comments"></div></span>
				<?php endif; ?>
			</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	
</article><!-- #post-## -->
