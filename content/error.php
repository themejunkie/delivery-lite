<article <?php hybrid_attr( 'post' ); ?>>

	<header class="entry-header">
		<h1 class="entry-title"><?php _e( 'Nothing found', 'basic' ); ?></h1>
	</header><!-- .entry-header -->

	<div <?php hybrid_attr( 'entry-content' ); ?>>
		<?php wpautop( __( 'Apologies, but no entries were found.', 'basic' ) ); ?>
	</div><!-- .entry-content -->

</article><!-- .entry -->