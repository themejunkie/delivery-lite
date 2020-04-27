<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> <?php hybrid_attr( 'post' ); ?>>
	
	<?php delivery_post_thumbnail(); ?>

	<header class="entry-header entry-header-index">
		<?php the_title( sprintf( '<h1 class="entry-title" ' . hybrid_get_attr( 'entry-title' ) . '><a href="%s" itemprop="url" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>

		<div class="entry-meta">
			<?php if ( 'post' == get_post_type() ) : ?>
				<?php delivery_posted_on(); ?>
			<?php endif; ?>

			<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
				<span class="comments-link"><?php comments_popup_link( __( '0', 'delivery-lite' ), __( '1', 'delivery-lite' ), __( '%', 'delivery-lite' ) ); ?> <div class="dashicons dashicons-admin-comments"></div></span>
			<?php endif; ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-summary" <?php hybrid_attr( 'entry-summary' ); ?>>
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	
</article><!-- #post-## -->
