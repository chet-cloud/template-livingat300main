<?php
/**
 * Let's Social Count
 *
 * @since 1.0.0
 *
 * @see WP_Widget
 */

class LetsSocialCount extends WP_Widget {

	/**
	 * Sets up a new widget instance.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		$widget_ops = array(
			'classname' => 'lets_social_count',
			'description' => esc_html__( 'Promote your social pages with count statistics.', 'lets-social-count' ),
			'customize_selective_refresh' => true,
		);

		parent::__construct( 'lets_social_count', esc_html__( "Let's Social Count", 'lets-social-count' ), $widget_ops );

	}

	/**
	 * Outputs the content for the current widget instance.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param array $args     Display arguments including 'before_title', 'after_title',
	 *                        'before_widget', and 'after_widget'.
	 * @param array $instance Settings for the current widget instance.
	 */
	public function widget( $args, $instance ) {

		/** This filter is documented in wp-includes/widgets/class-wp-widget-pages.php */
		$title                          = apply_filters( 'widget_title', empty( $instance['title'] ) ? '' : $instance['title'], $instance, $this->id_base );
		$theme                          = ! empty( $instance['theme'] ) ? $instance['theme'] : 1;
		$tooltip                        = ! empty( $instance['tooltip'] ) ? 1 : 0;
		$nofollow                       = ! empty( $instance['nofollow'] ) ? 1 : 0;
		$format                       = ! empty( $instance['format'] ) ? $instance['format'] : 1;
		$facebookid                     = ! empty( $instance['facebookid'] ) ? $instance['facebookid'] : '';
		$facebookappsecret              = ! empty( $instance['facebookappsecret'] ) ? $instance['facebookappsecret'] : '';
		$facebookappid                  = ! empty( $instance['facebookappid'] ) ? $instance['facebookappid'] : '';
		 $twitter_id                    = empty( $instance['twitterid'] ) ? '' : $instance['twitterid'];
		$twitter_consumer_key           = empty( $instance['twitterconsumerkey'] ) ? '' : $instance['twitterconsumerkey'];
		$twitter_consumer_secret        = empty( $instance['twitterconsumersecret'] ) ? '' : $instance['twitterconsumersecret'];
		$twitter_access_token           = empty( $instance['twitteraccesstoken'] ) ? '' : $instance['twitteraccesstoken'];
		$twitter_access_token_secret    = empty( $instance['twitteraccesstokensecret'] ) ? '' : $instance['twitteraccesstokensecret'];
		$youtube_id                     = empty( $instance['youtubeid'] ) ? '' : $instance['youtubeid'];
		$youtube_url                    = empty( $instance['youtubeurl'] ) ? '' : $instance['youtubeurl'];
		$youtube_api                    = empty( $instance['youtubeapikey'] ) ? '' : $instance['youtubeapikey'];
		$instagram_username             = empty( $instance['instagram_username'] ) ? '' : $instance['instagram_username'];
		$pinterest_username             = empty( $instance['pinterest_username'] ) ? '' : $instance['pinterest_username'];
		$rss_count             = empty( $instance['rss_count'] ) ? '' : $instance['rss_count'];
		$output                         = array();

		echo ( $args['before_widget'] );
		if ( ! empty( $title ) ) {
			echo ( $args['before_title'] . $title . $args['after_title'] );
		}

		if ( ! empty( $rss_count ) ) {
			$output['rss'] = array(
				'count' => $rss_count,
				'icon' => 'tipi-i-rss fa-rss',
				'url' => get_bloginfo( 'rss_url' ),
			);
		}

		$output['fb'] = lets_social_count_fb( array( 'facebookid' => $facebookid, 'facebookappsecret' => $facebookappsecret, 'facebookappid' => $facebookappid ) );

		$output['in'] = lets_social_count_in( array(
			'username' => $instagram_username,
		) );

		$output['pi'] = lets_social_count_pi( array(
			'username' => $pinterest_username,
		) );

		$output['tw'] = lets_social_count_tw( array(
			'twitterid' => $twitter_id,
			'consumerkey' => $twitter_consumer_key,
			'consumersecret' => $twitter_consumer_secret,
			'accesstoken' => $twitter_access_token,
			'accesstokensecret' => $twitter_access_token_secret,
		) );

		$output['yt'] = lets_social_count_yt( array(
			'channelid' => $youtube_id,
			'channelurl' => $youtube_url,
			'apikey' => $youtube_api,
		) );
		?>
		<ul class="lets-social-count-wrap lets-social-count-<?php echo intval( $theme ); ?> clearfix">
		<?php foreach ( array_filter( $output ) as $network => $value ) { ?>
			<?php 
				if ( ! isset( $value['count'] ) ) {
					continue;
				}
			?>
			<?php
			if ( strpos( strtoupper( $value['count'] ), 'K' ) != false ) {
				$value['count'] = rtrim( $value['count'], 'kK' );
				$value['count'] = $value['count'] * 1000;
			} else if ( strpos( strtoupper( $value['count'] ), 'M' ) != false ) {
				$value['count'] = rtrim( $value['count'], 'mM' );
				$value['count'] = $value['count'] * 1000000;
			}
			?>
			<li class="network-option network-<?php echo esc_attr( $network ); ?>">
				<?php if ( !empty( $value['error'] ) ) {
					echo esc_attr( $value['error'] );
					continue;
				} ?>
				<a href="<?php echo esc_url( $value['url'] ); ?>" target="_blank"><span class="icon-wrap"><i class="<?php echo esc_attr( $value['icon'] ); ?>"></i></span><span class="icon-content"><span class="icon-action"><?php
				if ( 'in' == $network || 'tw' == $network || 'pi' == $network ) {
					esc_attr_e( 'Follow', 'lets-social-count' );
				} elseif ( 'fb' == $network ) {
					esc_attr_e( 'Like', 'lets-social-count' );
				} elseif ( 'yt' == $network || 'rss' == $network ) {
					esc_attr_e( 'Subscribe', 'lets-social-count' );
				}
				?></span><span class="icon-count"><?php
				if ( 1 == $format ) {
					echo number_format( $value['count'] );
				} elseif ( 2 == $format ) {
					echo number_format( $value['count'], 0, '.', '.' );
				} elseif ( 3 == $format ) {
					echo number_format( $value['count'], 0, '.', '' );
				} elseif ( 4 == $format ) {
					if ( $value['count'] > 1000 ) {
						echo number_format( $value['count'] / 1000, 1 ) . 'k';
					} else {
						echo intval( $value['count'] );
					}
				}
				?></span><?php
				echo '<span class="icon-title">';
				if ( 'in' == $network || 'tw' == $network || 'pi' == $network ) {
					esc_attr_e( 'Followers', 'lets-social-count' );
				} elseif ( 'fb' == $network ) {
					esc_attr_e( 'Fans', 'lets-social-count' );
				} elseif ( 'yt' == $network || 'rss' == $network ) {
					esc_attr_e( 'Subscribers', 'lets-social-count' );
				}
				echo '</span>';
				?>
				</span>
			</a>
			</li>
		<?php } ?>
		</ul>

		<?php
		echo ( $args['after_widget'] );

	}

	/**
	 * Handles updating settings for the current widget instance.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param array $new_instance New settings for this instance as input by the user via
	 *                            WP_Widget::form().
	 * @param array $old_instance Old settings for this instance.
	 * @return array Settings to save or bool false to cancel saving.
	 */
	public function update( $new_instance, $old_instance ) {

		$instance = $old_instance;
		$instance['title']      = sanitize_text_field( $new_instance['title'] );
		$instance['facebookid']   = sanitize_text_field( $new_instance['facebookid'] );
		$instance['facebookappsecret']   = sanitize_text_field( $new_instance['facebookappsecret'] );
		$instance['facebookappid']   = sanitize_text_field( $new_instance['facebookappid'] );
		$instance['twitterid']   = esc_url( $new_instance['twitterid'] );
		$instance['twittercon']   = esc_url( $new_instance['twittercon'] );
		$instance['twitterid'] = sanitize_text_field( $new_instance['twitterid'] );
		$instance['twitterconsumerkey'] = sanitize_text_field( $new_instance['twitterconsumerkey'] );
		$instance['twitterconsumersecret'] = sanitize_text_field( $new_instance['twitterconsumersecret'] );
		$instance['twitteraccesstoken'] = sanitize_text_field( $new_instance['twitteraccesstoken'] );
		$instance['twitteraccesstokensecret'] = sanitize_text_field( $new_instance['twitteraccesstokensecret'] );
		$instance['instagram_username']   = sanitize_text_field( $new_instance['instagram_username'] );
		$instance['pinterest_username']   = sanitize_text_field( $new_instance['pinterest_username'] );
		$instance['youtubeid']   = sanitize_text_field( $new_instance['youtubeid'] );
		$instance['youtubeurl']   = esc_url( $new_instance['youtubeurl'] );
		$instance['youtubeapikey']   = sanitize_text_field( $new_instance['youtubeapikey'] );
		$instance['nofollow'] = $new_instance['nofollow'] ? 1 : 0;
		$instance['format'] = $new_instance['format'] ? intval( $new_instance['format'] ) : 0;
		$instance['rss_count'] = $new_instance['rss_count'] ? intval( $new_instance['rss_count'] ) : 0;
		$instance['theme'] = in_array( $new_instance['theme'], array( 1, 2, 3, 4, 5, 6 ) ) ? $new_instance['theme'] : 1;

		return $instance;

	}

	/**
	 * Outputs the widget settings form.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param array $instance Current settings.
	 */
	public function form( $instance ) {
		$instance   = wp_parse_args( (array) $instance, array( 'title' => '', 'theme' => 1, 'format' => 2, 'facebookid' => '', 'facebookappid' => '', 'facebookappsecret' => '', 'twitterid' => '', 'twitteraccesstoken' => '', 'twitteraccesstokensecret' => '', 'twitterconsumerkey' => '', 'twitterconsumersecret' => '', 'instagram_username' => '', 'pinterest_username' => '', 'youtubeid' => '', 'youtubeurl' => '', 'youtubeapikey' => '', 'rss_count' => '', 'nofollow' => '' ) );
		$themes = array(
			1 => array( 'url' => 'lets-social-count-1.png' ),
			2 => array( 'url' => 'lets-social-count-2.png' ),
			3 => array( 'url' => 'lets-social-count-3.png' ),
			4 => array( 'url' => 'lets-social-count-4.png' ),
			5 => array( 'url' => 'lets-social-count-5.png' ),
			6 => array( 'url' => 'lets-social-count-6.png' ),
		);
		$current_value = 1;
		?>

		<p><label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e( 'Title', 'lets-social-count' ); ?></label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['title'] ) ); ?>" /></p>
		<p>
			<?php esc_html_e( 'Color theme', 'lets-social-count' ); ?>
			<span class="lets-social-count-radio-images lets-social-count-cf">
				<?php
				$i = 1;
				foreach ( $themes as $key => $value ) {
					$value['url'] = rtrim( $value['url'], '/' );
					$ext = substr( $value['url'] , -3 );
					$retina = substr_replace( $value['url'], '@2x', -4, 0 );
					?>
					<span class="lets-social-count-radio-image radio-image-<?php echo intval( $i ); ?> clearfix">
						<label class="clearfix">
							<input type="radio" value="<?php echo esc_attr( $key );?>" <?php checked( $instance['theme'], $key ); ?> class="lets-social-count-input-val" name="<?php echo esc_attr( $this->get_field_name( 'theme' ) ); ?>">
							<img src="<?php echo esc_url( plugins_url( 'assets/img/' . $value['url'], dirname(__FILE__) ) ); ?>" alt="" <?php if ( ! empty ( $retina ) ) { ?>srcset="<?php echo esc_url( plugins_url( 'assets/img/' . $retina, dirname(__FILE__) ) ); ?> 2x" <?php } ?>>
						</label>
					</span>
				<?php $i++; ?>
				<?php if ( $i == 3 ) { $i = 1; } ?>
				<?php } ?>
			</span>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'format' ) ); ?>"><?php esc_html_e( 'Number format', 'lets-social-count' ); ?></label>
			<select name="<?php echo esc_attr( $this->get_field_name( 'format' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'format' ) ); ?>" class="widefat">
				<option value="1"<?php selected( $instance['format'], 1 ); ?>>10,000</option>
				<option value="2"<?php selected( $instance['format'], 2 ); ?>>10.000</option>
				<option value="3"<?php selected( $instance['format'], 3 ); ?>>10000</option>
				<option value="4"<?php selected( $instance['format'], 4 ); ?>>10k</option>
			</select>
		</p>
		<p class="lets-social-count-title lets-social-count-title-fb">Facebook</p>
		<p><label for="<?php echo esc_attr( $this->get_field_id( 'facebookid' ) ); ?>">Facebook Page ID</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'facebookid' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'facebookid' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['facebookid'] ) ); ?>" /><br><small><?php esc_html_e( 'Enter page ID (name)', 'lets-social-count' ); ?></small></p>

		<p><label for="<?php echo esc_attr( $this->get_field_id( 'facebookappid' ) ); ?>">Facebook App ID</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'facebookappid' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'facebookappid' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['facebookappid'] ) ); ?>" /><br><small><?php esc_html_e( 'You need to go to https://developers.facebook.com/  to create an "app" to get the needed App Secret.', 'lets-social-count' ); ?></small></p>

		<p><label for="<?php echo esc_attr( $this->get_field_id( 'facebookappsecret' ) ); ?>">Facebook App Secret</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'facebookappsecret' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'facebookappsecret' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['facebookappsecret'] ) ); ?>" /><br><small><?php esc_html_e( 'You need to go to https://developers.facebook.com/  to create an "app" to get the needed App ID.', 'lets-social-count' ); ?></small></p>

		 <p class="lets-social-count-title lets-social-count-title-tw">Twitter</p>
		<p><label for="<?php echo esc_attr( $this->get_field_id( 'twitterid' ) ); ?>">Twitter Username</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'twitterid' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'twitterid' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['twitterid'] ) ); ?>" /><br><small><?php esc_html_e( 'Enter Twitter Handle', 'lets-social-count' ); ?></small></p>

		<p><label for="<?php echo esc_attr( $this->get_field_id( 'twitterconsumerkey' ) ); ?>">Consumer Key</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'twitterconsumerkey' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'twitterconsumerkey' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['twitterconsumerkey'] ) ); ?>" /><br><small><?php esc_html_e( 'To get this you need to visit https://dev.twitter.com/apps/ and create an "app" to get the needed information.', 'lets-social-count' ); ?></small></p>

		<p><label for="<?php echo esc_attr( $this->get_field_id( 'twitterconsumersecret' ) ); ?>">Consumer Secret</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'twitterconsumersecret' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'twitterconsumersecret' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['twitterconsumersecret'] ) ); ?>" /><br><small><?php esc_html_e( 'To get this you need to visit https://dev.twitter.com/apps/ and create an "app" to get the needed information.', 'lets-social-count' ); ?></small></p>

		<p><label for="<?php echo esc_attr( $this->get_field_id( 'twitteraccesstoken' ) ); ?>">Access Token</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'twitteraccesstoken' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'twitteraccesstoken' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['twitteraccesstoken'] ) ); ?>" /><br><small><?php esc_html_e( 'To get this you need to visit https://dev.twitter.com/apps/ and create an "app" to get the needed information.', 'lets-social-count' ); ?></small></p>

		<p><label for="<?php echo esc_attr( $this->get_field_id( 'twitteraccesstokensecret' ) ); ?>">Access Token Secret</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'twitteraccesstokensecret' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'twitteraccesstokensecret' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['twitteraccesstokensecret'] ) ); ?>" /><br><small><?php esc_html_e( 'To get this you need to visit https://dev.twitter.com/apps/ and create an "app" to get the needed information.', 'lets-social-count' ); ?></small></p>

		<p class="lets-social-count-title lets-social-count-title-in">Instagram</p>
		<p><label for="<?php echo esc_attr( $this->get_field_id( 'instagram_username' ) ); ?>">Instagram</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'instagram_username' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'instagram_username' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['instagram_username'] ) ); ?>" /><br><small><?php esc_html_e( 'Enter username only', 'lets-social-count' ); ?></small></p>

		<p class="lets-social-count-title lets-social-count-title-rss">RSS</p>
		<p><label for="<?php echo esc_attr( $this->get_field_id( 'rss_count' ) ); ?>">RSS</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'rss_count' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'rss_count' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['rss_count'] ) ); ?>" /><br><small><?php esc_html_e( 'Enter RSS subscriber count', 'lets-social-count' ); ?></small></p>

		<p class="lets-social-count-title lets-social-count-title-pi">Pinterest</p>
		<p><label for="<?php echo esc_attr( $this->get_field_id( 'pinterest_username' ) ); ?>">Pinterest</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'pinterest_username' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'pinterest_username' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['pinterest_username'] ) ); ?>" /><br><small><?php esc_html_e( 'Enter username only', 'lets-social-count' ); ?></small></p>

		<p class="lets-social-count-title lets-social-count-title-yt">YouTube</p>
		<p><label for="<?php echo esc_attr( $this->get_field_id( 'youtubeurl' ) ); ?>">YouTube Channel URL</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'youtubeurl' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'youtubeurl' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['youtubeurl'] ) ); ?>" /><br><small><?php esc_html_e( 'Enter the full url of your channel', 'lets-social-count' ); ?></small></p>
		 <p><label for="<?php echo esc_attr( $this->get_field_id( 'youtubeid' ) ); ?>">YouTube Channel ID</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'youtubeid' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'youtubeid' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['youtubeid'] ) ); ?>" /><br><small><?php esc_html_e( 'Find your channel id by visiting: https://support.google.com/youtube/answer/3250431', 'lets-social-count' ); ?></small></p>
		<p><label for="<?php echo esc_attr( $this->get_field_id( 'youtubeapikey' ) ); ?>">YouTube API Key</label>
		<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'youtubeapikey' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'youtubeapikey' )); ?>" type="text" value="<?php echo esc_attr( sanitize_text_field( $instance['youtubeapikey'] ) ); ?>" /><br><small><?php esc_html_e( 'To get this you need to visit https://console.developers.google.com/project and create an "app". Then in Credentials you can create a new key.', 'lets-social-count' ); ?></small></p>
		<p>
			<input class="checkbox" type="checkbox"<?php checked( $instance['nofollow'] ); ?> id="<?php echo esc_attr( $this->get_field_id( 'nofollow' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'nofollow' )); ?>" /> <label for="<?php echo esc_attr( $this->get_field_id( 'nofollow' )); ?>"><?php esc_html_e( 'Make links nofollow', 'lets-social-count' ); ?></label>
		</p>
		<?php
	}
}