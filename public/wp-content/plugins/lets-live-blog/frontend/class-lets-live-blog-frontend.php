<?php
/**
 *
 * Frontend Class
 *
 * @since      1.0.0
 *
 * @package    Let's Live Blog
 * @subpackage lets-live-blog/frontend
 */
namespace letsliveblog;

class Lets_Live_Blog_Frontend {

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	*/
	public function __construct( $slug, $version, $url ) {
		$this->slug = $slug;
		$this->version = $version;
		$this->url = $url;
	}

	/**
	 * Editor Load
	 *
	 * @since 1.0.0
	 *
	*/
	function editor_load() {
		return 'tinymce';
	}

	/**
	 * Default Editor
	 *
	 * @since 1.0.0
	 *
	*/
	function default_editor() {
		if ( ! is_admin() && self::is_live_blog() ) {
			add_filter( 'wp_default_editor', array( $this, 'editor_load' ) );
		}
	}

	/**
	 * Load scripts frontend
	 *
	 * @since    1.0.0
	 */
	public function frontend_scripts() {

		$data = array(
			'pid'          => get_the_ID(),
			'timeInterval' => apply_filters( 'lets_live_blog_time_interval', 10000 ),
		);

		wp_enqueue_style( 'lets-live-blog', esc_url( $this->url . 'frontend/css/style.min.css' ), array(), $this->version );
		$theme = wp_get_theme();
		if ( 'Zeen' != $theme->name ) {
			wp_enqueue_style( 'lets-live-blog-icons', esc_url( $this->url . 'frontend/css/fonts/style.css' ), array(), $this->version );
		}

		if ( is_user_logged_in() ) {
			return;
		}

		wp_enqueue_script( 'lets-live-blog-js', esc_url( $this->url . 'frontend/js/functions.min.js' ), array( 'jquery' ), $this->version, true );

		$data['i18n'] = self::i18n_data();

		wp_localize_script( 'lets-live-blog-js', 'letsLiveBlogJs',
			array(
				'root'         => esc_url_raw( rest_url() ),
				'nonce'        => wp_create_nonce( 'wp_rest' ),
				'root_point'   => 'codetipi-lets-live-blog/v1',
				'root_full'    => esc_url_raw( rest_url() ) . 'codetipi-lets-live-blog/v1/',
				'pagiRoot'     => $_SERVER['REQUEST_URI'],
				'data'         => $data,
			)
		);

	}

	/**
	 * Title Append
	 *
	 * @since 1.0.0
	 *
	*/
	public function title_append( $title, $id ) {

		if ( self::is_broadcasting( $id ) ) {
			return apply_filters( 'lets_live_blog_title_append', $title . ' (' . esc_attr__( 'Live', 'lets-live-blog' ) . ')' );
		}
		return $title;

	}

	/**
	 * Is broadcasting
	 *
	 * @since 1.0.0
	 *
	*/
	public static function is_broadcasting( $pid = '' ) {
		if ( is_customize_preview() ) {
			return false;
		}
		$pid = empty( $pid ) ? get_the_ID() : $pid;
		return get_post_meta( $pid, 'lets_live_blog_bc', true ) == 'on';
	}

	/**
	 * Is Live Blog
	 *
	 * @since 1.0.0
	 *
	*/
	public static function is_live_blog( $pid = '' ) {
		$pid = empty( $pid ) ? get_the_ID() : $pid;
		return get_post_meta( $pid, 'lets_live_blog_enabled', true ) == 'on';
	}

	/**
	 * Date formatting
	 *
	 * @since 1.0.0
	 *
	*/
	public static function date_format( $pid = '' ) {
		$pid = empty( $pid ) ? get_the_ID() : $pid;
		return self::is_broadcasting( $pid ) && self::user_can() ? 1 : get_post_meta( $pid, 'lets_live_blog_date', true );
	}

	/**
	 *  User permission
	 *
	 * @since 1.0.0
	 *
	*/
	public static function user_can() {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Load scripts frontend
	 *
	 * @since    1.0.0
	 */
	public function frontend_scripts_logged() {

		$data = array(
			'pid' => get_the_ID(),
		);
		if ( ! is_user_logged_in() || ! self::is_live_blog( $data['pid'] ) || ! is_singular() ) {
			return;
		}

		wp_enqueue_style( 'lets-live-blog-app', esc_url( $this->url . 'frontend/app/assets/css/style.min.css' ), array(), $this->version, 'all' );
		wp_enqueue_script( 'lets-live-blog-vendor', esc_url( $this->url . 'frontend/app/assets/js/vendor.js' ), array(), $this->version, true );
		wp_enqueue_script( 'lets-live-blog-app', esc_url( $this->url . 'frontend/app/assets/js/main.js' ), array( 'lets-live-blog-vendor' ), $this->version, true );

		$aid = get_current_user_id();
		$url = get_the_author_meta( 'url', $aid );
		$author = get_the_author_meta( 'display_name', $aid );
		$email = get_the_author_meta( 'publicemail', $aid );

		$data['i18n'] = self::i18n_data();

		$data['user'] = array(
			'aid'    => $aid,
			'author' => $author,
			'url'    => $url,
			'email'  => $email,
		);

		wp_localize_script( 'lets-live-blog-app', 'letsLiveBlogJs', array(
			'root'         => esc_url_raw( rest_url() ),
			'nonce'        => wp_create_nonce( 'wp_rest' ),
			'root_point'   => 'codetipi-lets-live-blog/v1',
			'root_full'    => esc_url_raw( rest_url() ) . 'codetipi-lets-live-blog/v1/',
			'pagiRoot'     => $_SERVER['REQUEST_URI'],
			'data'         => $data,
		) );

	}

	/**
	 * I18n
	 *
	 * @since 1.0.0
	 *
	*/
	static function i18n_data() {
		return array(
			'ok'       => esc_attr__( 'OK', 'lets-live-blog' ),
			'warning'  => esc_attr__( 'Warning', 'lets-live-blog' ),
			'delete'   => esc_attr__( 'Delete', 'lets-live-blog' ),
			'jumphl'   => esc_attr__( 'Jump to highlight', 'lets-live-blog' ),
			'edit'     => esc_attr__( 'Edit', 'lets-live-blog' ),
			'live'     => esc_attr__( 'Live', 'lets-live-blog' ),
			'ended'    => esc_attr__( 'Finished', 'lets-live-blog' ),
			'starting' => esc_attr__( 'Not started', 'lets-live-blog' ),
			'disabled' => esc_attr__( 'Broadcasting Off', 'lets-live-blog' ),
			'publish'  => esc_attr__( 'Publish', 'lets-live-blog' ),
			'cancel'   => esc_attr__( 'Cancel', 'lets-live-blog' ),
			'success'  => esc_attr__( 'Success', 'lets-live-blog' ),
			'successD' => esc_attr__( 'Entry was deleted.', 'lets-live-blog' ),
			'confirmD' => esc_attr__( 'This will permanently delete this entry. Continue?', 'lets-live-blog' ),
			'update'   => esc_attr__( 'Update', 'lets-live-blog' ),
			'start'    => esc_attr__( 'Start broadcast', 'lets-live-blog' ),
			'stop'     => esc_attr__( 'Stop broadcast', 'lets-live-blog' ),
			'highlight' => esc_attr__( 'Highlight', 'lets-live-blog' ),
			'highlightinput' => esc_attr__( 'Summary of highlight', 'lets-live-blog' ),
		);
	}

	/**
	 * Editor
	 *
	 * @since    1.0.0
	 */
	public function editor() {
		$editor_id = 'letsLiveBlog';
		$settings = array(
			'media_buttons' => true,
			'textarea_name' => $editor_id,
			'textarea_rows' => 6,
			'editor_class' => 'lets-live-blog-editor',
			'teeny' => true,
			'quicktags' => array( 'buttons' => 'close' ),
			'drag_drop_upload' => true,
		);
		wp_editor( '', $editor_id, $settings );
	}

	/**
	 * Editor Teeny
	 *
	 * @since 1.0.0
	 *
	*/
	function editor_teeny( $buttons, $editor_id ) {

		if ( 'letsLiveBlog' == $editor_id ) {
			return array( 'bold', 'italic', 'underline', 'blockquote', 'bullist', 'numlist', 'undo', 'redo', 'link' );
		}
		return $buttons;
	}

	/**
	 * Editor QT
	 *
	 * @since 1.0.0
	 *
	*/
	function editor_qt( $qtInit, $editor_id ) {
		if ( 'letsLiveBlog' == $editor_id ) {
			return array( 'buttons' => '' );
		}
		return $qtInit;
	}

	/**
	 * Frontend
	 *
	 * @since    1.0.0
	 */
	public function append( $content ) {

		$pid = get_the_ID();

		if ( ! self::is_live_blog( $pid ) || ( ! is_singular() && empty( $_GET['ipl'] ) ) || ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) ) {
			return $content;
		}

		$status_class = self::is_broadcasting( $pid ) ? 2 : 1;
		$design = get_post_meta( $pid, 'lets_live_blog_design', true );
		$design = empty( $design ) ? 1 : $design;
		$animation = get_post_meta( $pid, 'lets_live_blog_animation', true );
		$animation = empty( $animation ) ? 1 : $animation;

		$output = '<div id="lets-live-blog-wrap-' . $pid . '" class="lets-live-blog-wrap lets-live-blog-design-' . intval( $design ) . ' lets-live-blog-animation-' . intval( $animation ) . ' cf" data-status="' . intval( $status_class ) . '">';
		ob_start();
		if ( self::user_can() && empty( $_GET['ipl'] ) ) {
			self::feed_header( array( 'user' => 'admin', 'pid' => $pid ) );
			?>
			<div class="lets-live-blog-editor">
				<div class="cf">
					<div class="publishing-as-wrap editor-title-block">
						<span class="editor-title publishing-as"><?php esc_attr_e( 'Publishing as', 'lets-live-blog' ); ?></span>
						<?php $user = wp_get_current_user(); ?>
						<div class="author-meta live-hidden">
							<div class="live-avatar"><?php echo get_avatar( $user->ID, 60 ); ?></div>
							<div class="live-author"><?php echo esc_attr( $user->display_name ); ?></div>
						</div>
					</div>
					<div class="current-time-wrap editor-title-block">
						<span class="editor-title current-time"><?php esc_attr_e( 'Current Time', 'lets-live-blog' ); ?></span>
						<div id="current-time"><p class="live-hidden">{{ theTime }}</p></div>
					</div>
				</div>
				<?php $this->editor(); ?>
				<div id="lets-live-blog-publish">

				</div>
			</div>
			<div id="lets-live-blog-stream"></div>
			<?php

		} else {
			self::feed_header( array( 'user' => 'visitor', 'pid' => $pid  ) );
			self::get_highlights( array( 'pid' => $pid  ) );
			echo self::looper( array( 'pid' => $pid ) );
		}

		$output .= ob_get_clean();
		$output .= '</div>';

		return $content . $output;
	}

	/**
	 * Feed Header
	 *
	 * @since 1.0.0
	 *
	*/
	private static function feed_header( $args ) {
		?>
		<div class="live-header cf">
		<?php
			if ( $args['user'] == 'admin' ) {
			} else {
			}

			$event = get_post_meta( $args['pid'], 'lets_live_blog_event_title', true );
			$event_location = get_post_meta( $args['pid'], 'lets_live_blog_event_location', true );
			$event_start = get_post_meta( $args['pid'], 'lets_live_blog_event_start', true );

			if ( ! empty( $event ) ) {
				echo '<div class="event-box-wrap">';
				echo '<div class="box-pre-title">' . esc_attr__( 'Event', 'lets-live-blog' ) . '</div>';
				echo '<div class="box-title">' . $event . '</div>';
				echo '</div>';
			}
			if ( ! empty( $event_location ) ) {
				echo '<div class="event-box-wrap">';
				echo '<div class="box-pre-title">' . esc_attr__( 'Location', 'lets-live-blog' ) . '</div>';
				echo '<div class="box-title">' . $event_location . '</div>';
				echo '</div>';
			}
			if ( ! empty( $event_start ) ) {
				echo '<div class="event-box-wrap">';
				echo '<div class="box-pre-title">' . esc_attr__( 'Start time', 'lets-live-blog' ) . '</div>';
				echo '<div class="box-title">' . $event_start . '</div>';
				echo '</div>';
			}

			?>
			<div class="event-box-wrap">
				<div class="box-pre-title"><?php esc_attr_e( 'Event status', 'lets-live-blog' ); ?></div>

				<div class="box-title live-status">
				<?php if ( self::user_can() && empty( $_GET['ipl'] ) ) { ?>
					<div id="lets-live-blog-onoff"></div>
				<?php } else { ?>
					<?php if ( self::is_broadcasting( $args['pid'] ) ) { ?>
						<div class="status-circle"></div> <?php esc_attr_e( 'Live', 'lets-live-blog' ); ?>
					<?php } else { ?>
						<?php if ( self::has_entries( $args['pid'] ) ) {
								esc_attr_e( 'Finished', 'lets-live-blog' );
							} else {
								esc_attr_e( 'Not started', 'lets-live-blog' );
							} ?>
					<?php } ?>
				<?php } ?>
				</div>
			</div>
			<?php
		?>
		</div>

		<?php

	}

	/**
	 * Has Entries
	 *
	 * @since 1.0.0
	 *
	*/
	public static function has_entries( $pid ) {
		return get_post_meta( $pid, 'lets_live_blog_has_entries', true );
	}

	/**
	 * Start Stopper
	 *
	 * @since 1.0.0
	 *
	*/
	public static function startstop( $args ) {
		self::cron_setup_clean( $args );
		return update_post_meta( $args->pid, 'lets_live_blog_bc', $args->startstop );
	}

	/**
	 * Cron Clean
	 *
	 * @since 1.0.0
	 *
	*/
	public static function cron_setup_clean( $args ) {

		if ( empty( $args->startstop ) ) {
			wp_schedule_single_event( time() + 1800, 'letsliveblogclean', array( (string) $args->pid ) );
		} else {
			if ( wp_next_scheduled( 'letsliveblogclean', array( (string) $args->pid ) ) ) {
				wp_clear_scheduled_hook( 'letsliveblogclean', array( (string) $args->pid ) );
			}
		}
	}

	/**
	 * Cron Clean
	 *
	 * @since 1.0.0
	 *
	*/
	function cron_clean( $pid ) {
		delete_post_meta( $pid, 'lets_live_blog_history' );
	}

	/**
	 * Cron
	 *
	 * @since 1.0.0
	 *
	*/
	function cron( $pid ) {
		update_post_meta( $pid, 'lets_live_blog_bc', false );
	}

	/**
	 * Highlights
	 *
	 * @since 1.0.0
	 *
	*/
	private static function get_highlights( $args ) {
		$highlights = self::qry( array(
			'pid' => $args['pid'],
			'meta_key' => 'highlight',
			'meta_value' => true,
		) );

		echo '<div id="lets-live-blog-highlights" class="lets-live-blog-highlights">';
		if ( ! empty( $highlights ) ) {
			echo '<div class="box-pre-title">' . esc_attr__( 'Jump to highlight', 'lets-live-blog' ) . '</div>';
		}
		echo '<div class="lets-live-blog-entry-hl-wrap">';
		if ( ! empty( $highlights ) ) {
			echo self::looper_hl( $highlights );
		}
		echo '</div>';
		echo '</div>';
	}

	/**
	 * Looper
	 *
	 * @since 1.0.0
	 *
	*/
	private static function looper( $args = array() ) {

		$qry = self::qry( $args );
		$output = '<div class="lets-live-blog-entry-wrap">';
		foreach ( $qry as $key ) {
			$output .= self::looper_ind( $key );
		}
		$output .= '</div>';
		return $output;
	}

	/**
	 * Looper Highlights
	 *
	 * @since 1.0.0
	 *
	*/
	private static function looper_hl( $loop ) {
		$output = '';
		foreach ( $loop as $key ) {
			$output .= self::looper_ind_hl( $key );
		}
		return $output;
	}

	/**
	 * Looper Ind Highlights
	 *
	 * @since 1.0.0
	 *
	*/
	static function looper_ind_hl( $entry ) {
		$output = '<div class="lets-live-blog-entry-hl lets-live-blog-ani cf" id="live-feed-hl-' . intval( $entry->comment_ID ) . '">';
		$output .= '<a href="#live-feed-' . intval( $entry->comment_ID ) . '">' . get_comment_meta( $entry->comment_ID, 'highlight_title', true ) . '</a>';
		$output .= '</div>';
		return $output;
	}

	/**
	 * Query
	 *
	 * @since 1.0.0
	 *
	*/
	static function qry( $args ) {
		$defaults = array(
			'post_id' => $args['pid'],
			'orderby' => 'comment_date_gmt',
			'order'   => 'DESC',
			'type'    => 'lets_live_blog',
			'status'  => 'lets_live_blog',
		);
		$args     = wp_parse_args( $args, $defaults );
		return get_comments( $args );
	}

	/**
	 * Loooper Ind
	 *
	 * @since 1.0.0
	 *
	*/
	static function looper_ind( $entry ) {
		$url = get_permalink( $entry->comment_post_ID );
		$output = '<div class="lets-live-blog-entry lets-live-blog-ani cf" id="live-feed-' . intval( $entry->comment_ID ) . '">';

		$output .= '<div class="live-meta">';
		$author = '<div class="live-author-wrap">';
		$author .=  '<div class="live-avatar">' . get_avatar( $entry->user_id, 30 ) . '</div>';
		$author .=  '<div class="live-author">' . get_the_author_meta( 'display_name', $entry->user_id ) . '</div>';
		$author .= '</div>';
		$output .= apply_filters( 'lets_live_blog_show_author', $author );
		$output .= '<div class="live-date-wrap">';
		switch ( self::date_format( $entry->comment_post_ID ) ) {
			case 2:
				$output .= '<div class="time">' . get_comment_date(  get_option( 'time_format' ), $entry->comment_ID ) . '</div>';
				break;
			case 3:
				$d = get_comment_date( 'U', $entry->comment_ID );
				$output .= sprintf( '%1$s %2$s',
					self::lets_live_blog_human_time_diff( $d, current_time( 'timestamp' ) ),
					esc_html__( 'ago', 'lets-live-blog' )
				);
				break;
			default:
				$output .= '<div class="date">' . get_comment_date(  get_option( 'date_format' ), $entry->comment_ID ) . '</div>';
				$output .= '<div class="time">' . get_comment_date(  get_option( 'time_format' ), $entry->comment_ID ) . '</div>';
				break;
		}

		$output .= '</div>';
		$output .= '<div class="lets-live-blog-sharer">';
		$output .= '<a href="https://www.facebook.com/sharer/sharer.php?u=' . esc_attr( $url ) . '%23live-feed-' . intval( $entry->comment_ID ) . '"><i class="tipi-i-facebook"></i></a>';
		$output .= '<a href="https://twitter.com/share?url=' . esc_attr( $url ) . '%23live-feed-' . intval( $entry->comment_ID ) . '"><i class="tipi-i-twitter"></i></a>';
		$output .= '</div>';

		$output .= '</div>';

		$output .= '<div class="lets-live-blog-entry-content">';
		$output .= do_shortcode( $entry->comment_content );
		$output .= '</div>';

		$output .= '</div>';
		return $output;
	}

	/**
	 * Publish It
	 *
	 * @since 1.0.0
	 *
	*/
	private static function publish_it( $data, $do_entries = true ) {
		$time = empty( $data->time ) ?  current_time('mysql') : $data->time;
		$args = array(
			'comment_post_ID' => $data->pid,
			'comment_author' => $data->user->author,
			'comment_author_email' => $data->user->email,
			'comment_author_url' => $data->user->url,
			'comment_content' => wp_filter_post_kses( $data->content ),
			'comment_type' => 'lets_live_blog',
			'comment_date' => $time,
			'user_id' => $data->user->aid,
			'comment_approved' => 'lets_live_blog',
		);
		$cid = wp_insert_comment( $args );
		$hl = false;
		update_post_meta( $data->pid, 'lets_live_blog_has_entries', true );
		if ( ! empty( $data->highlightTitle ) && ! empty( $data->highlight ) ) {
			update_comment_meta( $cid, 'highlight_title', $data->highlightTitle );
			update_comment_meta( $cid, 'highlight', true );
			$hl = true;
		}

		if ( empty( $cid ) ) {
			return new WP_Error( 'comment-insert', esc_attr__( 'Could not publish entry.', 'lets-live-blog' ) );
		}

		if ( ! empty( $do_entries ) ) {
			self::do_entries( 'add', $data->pid, $cid, '', $hl );
		}
		self::cron_do( $data->pid, true );

		return $cid;
	}

	/**
	 * Cron Do
	 *
	 * @since 1.0.0
	 *
	*/
	static function cron_do( $pid, $setter = true ) {
		if ( wp_next_scheduled( 'letsliveblogjob', array( (string) $pid ) ) ) {
			wp_clear_scheduled_hook( 'letsliveblogjob', array( (string) $pid ) );
		}
		if ( empty( $setter ) ) {
			return;
		}
		wp_schedule_single_event( time() + 3600, 'letsliveblogjob', array( (string) $pid ) );
	}

	/**
	 * Delete
	 *
	 * @since 1.0.0
	 *
	*/
	static function del( $data ) {
		$cid = wp_delete_comment( $data->cid );
		self::do_entries( 'del', $data->pid, $data->cid );
		return $cid;
	}

	/**
	 * Update
	 *
	 * @since 1.0.0
	 *
	*/
	static function update( $data ) {
		$cid = self::publish_it( $data, false );
		self::do_entries( 'update', $data->pid, $cid, $data->pos, $data->highlight, $data->cid );
		return $cid;
	}

	/**
	 * Do Entries
	 *
	 * @since 1.0.0
	 *
	*/
	static function do_entries( $action = 'add', $pid, $cid, $pos = '', $hl = '', $old = '' ) {

		$history = get_post_meta( $pid, 'lets_live_blog_history', true );

		if ( empty( $history ) ) {
			$history = array();
		}

		$history[] = array( $action, $cid, $pos, $hl, $old );
		update_post_meta( $pid, 'lets_live_blog_history', $history );
	}

	/**
	 * Publish
	 *
	 * @since 1.0.0
	 *
	*/
	public static function publish( $data ) {
		return self::publish_it( $data );
	}

	/**
	 * Get Entries
	 *
	 * @since 1.0.0
	 *
	*/
	public static function get_entries( $data ) {
		$qry = self::qry( $data );

		$output = array();
		if ( empty( $qry ) ) {

		}
		foreach ( $qry as $key ) {
			$output[] = array(
				'rendered' 			=> self::looper_ind( $key ),
				'data'				=> $key,
				'renderedHl'		=> self::looper_ind_hl( $key ),
				'highlight'			=> get_comment_meta( $key->comment_ID, 'highlight', true ),
				'highlightTitle'	=> get_comment_meta( $key->comment_ID, 'highlight_title', true )
			);
		}

		return $output;
	}

	/**
	 * Get Entry
	 *
	 * @since 1.0.0
	 *
	*/
	public static function get_entry( $cid ) {
		$entry = get_comment( $cid );

		$output = array(
			'rendered'       => self::looper_ind( $entry ),
			'renderedHl'     => self::looper_ind_hl( $entry ),
			'data'           => $entry,
			'highlight'      => get_comment_meta( $cid, 'highlight', true ),
			'highlightTitle' => get_comment_meta( $cid, 'highlight_title', true ),
		);

		return $output;
	}

	/**
	 * Time Diff
	 *
	 * @since 1.0.0
	 *
	*/
	static function lets_live_blog_human_time_diff( $from, $to ) {

		$diff = (int) abs( $to - $from );
		if ( $diff < 60 ) {
			$since = sprintf( _n( '%s second', '%s seconds', $diff ), $diff );
		} elseif ( $diff < HOUR_IN_SECONDS ) {
			$mins = round( $diff / MINUTE_IN_SECONDS );
			if ( $mins <= 1 ) {
				$mins = 1;
			}
			$since = sprintf( _n( '%s min', '%s mins', $mins ), $mins );
		} elseif ( $diff < DAY_IN_SECONDS && $diff >= HOUR_IN_SECONDS ) {
			$hours = round( $diff / HOUR_IN_SECONDS );
			if ( $hours <= 1 ) {
				$hours = 1;
			}
			$since = sprintf( _n( '%s hour', '%s hours', $hours ), $hours );
		} elseif ( $diff < WEEK_IN_SECONDS && $diff >= DAY_IN_SECONDS ) {
			$days = round( $diff / DAY_IN_SECONDS );
			if ( $days <= 1 ) {
				$days = 1;
			}
			$since = sprintf( _n( '%s day', '%s days', $days ), $days );
		} elseif ( $diff < MONTH_IN_SECONDS && $diff >= WEEK_IN_SECONDS ) {
			$weeks = round( $diff / WEEK_IN_SECONDS );
			if ( $weeks <= 1 ) {
				$weeks = 1;
			}
			$since = sprintf( _n( '%s week', '%s weeks', $weeks ), $weeks );
		} elseif ( $diff < YEAR_IN_SECONDS && $diff >= MONTH_IN_SECONDS ) {
			$months = round( $diff / MONTH_IN_SECONDS );
			if ( $months <= 1 ) {
				$months = 1;
			}
			$since = sprintf( _n( '%s month', '%s months', $months ), $months );
		} elseif ( $diff >= YEAR_IN_SECONDS ) {
			$years = round( $diff / YEAR_IN_SECONDS );
			if ( $years <= 1 ) {
				$years = 1;
			}
			$since = sprintf( _n( '%s year', '%s years', $years ), $years );
		}

		return apply_filters( 'lets_live_blog_human_time_diff', $since, $diff, $from, $to );
	}

}
