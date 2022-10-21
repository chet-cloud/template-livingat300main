<?php
/**
 * Let's Social Count helpers
 *
 */

/**
 * Facebook
 *
 * @since 1.0.0
 */
function lets_social_count_fb( $args ) {

	$facebookid = ! empty( $args['facebookid'] ) ? $args['facebookid'] : '';
	$facebookappsecret = ! empty( $args['facebookappsecret'] ) ? $args['facebookappsecret'] : '';
	$facebookappid = ! empty( $args['facebookappid'] ) ? $args['facebookappid'] : '';

	if ( empty( $facebookid ) || empty( $facebookappid ) || empty( $facebookappsecret ) ) {
		return;
	}

	$output = array();

	$trans = get_transient( 'lets-social-count-stats-fb-' . $facebookid );

	if ( empty( $trans ) ) {
		$trans = wp_remote_get( 'https://graph.facebook.com/' . $facebookid . '?access_token=' . $facebookappid . '|' . $facebookappsecret . '&fields=fan_count' );

		if ( is_wp_error( $trans ) ) {
			return;
		}

		$trans = wp_remote_retrieve_body( $trans );
		$data = json_decode( $trans );

		if ( empty( $data->fan_count ) ) {
			$output['error'] = 'Facebook ' . esc_html__( 'Error: Please check the details entered.', 'lets-social-count' );
			return $output;
		}

		$trans = $data->fan_count;

		set_transient( 'lets-social-count-stats-fb-' . $facebookid, $trans, DAY_IN_SECONDS );
	}

	$output['count'] = $trans;
	$output['icon'] = 'tipi-i-facebook lsc-facebook';
	$output['url'] = 'https://facebook.com/' . $facebookid;

	return $output;

}

/**
 * Twitter
 *
 * @since 1.0.0
 */
function lets_social_count_tw( $args ) {

	if ( empty( $args['twitterid'] ) || empty( $args['consumerkey'] ) || empty( $args['consumersecret'] ) || empty( $args['accesstoken'] ) || empty( $args['accesstokensecret'] ) ) {
		return;
	}

	$trans = get_transient( 'lets-social-count-stats-tw-' . $args['twitterid'] );

	if ( empty( $trans ) ) {

		require plugin_dir_path( __FILE__ ) . '/resources/twitter-exchange.php';

		$settings = array(
			'oauth_access_token' => $args['accesstoken'],
			'oauth_access_token_secret' => $args['accesstokensecret'],
			'consumer_key' => $args['consumerkey'],
			'consumer_secret' => $args['consumersecret'],
		);

		$ta_url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
		$getfield = '?screen_name=' . $args['twitterid'] ;
		$request_method = 'GET';
		$twitter = new TwitterAPIExchange( $settings );
		$follow_count = $twitter->setGetfield( $getfield )
		->buildOauth( $ta_url, $request_method )
		->performRequest( true, array(
			CURLOPT_CAINFO => plugin_dir_path( __FILE__ ) . '/resources/cacert.pem',
		) );
		$data = json_decode( $follow_count, true );

		if ( empty( $data[0]['user']['followers_count'] ) ) {
			$output['error'] = 'Twitter ' . esc_html__( 'Error: Please check the details entered.', 'lets-social-count' );
			return $output;
		}

		$followers_count = $data[0]['user']['followers_count'];
		$trans = $followers_count;

		set_transient( 'lets-social-count-stats-tw-' . $args['twitterid'], $trans, DAY_IN_SECONDS );
	}

	$output['count'] = $trans;
	$output['icon'] = 'tipi-i-twitter lsc-twitter';
	$output['url'] = 'https://twitter.com/intent/follow?screen_name=' . $args['twitterid'];

	return $output;

}

/**
 * Youtube
 *
 * @since 1.0.0
 */
function lets_social_count_yt( $args ) {

	if ( empty( $args['channelid'] ) || empty( $args['apikey'] ) || empty( $args['channelurl'] ) ) {
		return;
	}

	$trans = get_transient( 'lets-social-count-stats-yt-' . $args['channelid'] );

	if ( empty( $trans ) ) {

		$trans = wp_remote_get( ' https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' . $args['channelid'] . '&key=' . $args['apikey'] );

		if ( is_wp_error( $trans ) ) {
			return;
		}

		$trans = wp_remote_retrieve_body( $trans );
		$data = json_decode( $trans );
		if ( empty( $data->items[0]->statistics->subscriberCount ) ) {
			$output['error'] = 'YouTube ' . esc_html__( 'Error: Please check the details entered.', 'lets-social-count' );
			return $output;
		}
		$trans = $data->items[0]->statistics->subscriberCount;
		if ( ! empty( $trans ) ) {
			set_transient( 'lets-social-count-stats-yt-' . $args['channelid'], $trans, DAY_IN_SECONDS );
		}
	}

	$output['count'] = $trans;
	$output['icon'] = 'tipi-i-youtube-play lsc-youtube-play';
	$output['url'] = $args['channelurl'];

	return $output;

}

/**
 * Instagram
 *
 * @since 1.0.0
 */
function lets_social_count_in( $args ) {

	if ( empty( $args['username'] ) ) {
		return;
	}

	$trans = get_transient( 'lets-social-count-stats-in-' . $args['username'] );

	if ( empty( $trans ) ) {

		$trans = wp_remote_get( 'https://www.instagram.com/' . $args['username'] );

		if ( is_wp_error( $trans ) ) {
			return;
		}

		$trans = wp_remote_retrieve_body( $trans );

		$doc = new DOMDocument();
		libxml_use_internal_errors( true );
		$doc->loadHTML( $trans );
		libxml_use_internal_errors( false );
		$selector = new DOMXPath( $doc );
		$qry = $selector->query( '//meta[@property="og:description"]/@content' );

		if ( empty( $qry->length ) ) {
			$output['error'] = 'Instagram ' . esc_html__( 'Error: Please check the details entered.', 'lets-social-count' );
			return $output;
		}

		foreach ( $qry as $key ) {
			$trans = explode( ' ', $key->value, 2 );
			$trans = $trans[0];
			break;
		}
		set_transient( 'lets-social-count-stats-in-' . $args['username'], $trans, DAY_IN_SECONDS );
	}

	$output['count'] = $trans;
	$output['icon'] = 'tipi-i-instagram lsc-instagram';
	$output['url'] = 'https://www.instagram.com/' . $args['username'];

	return $output;

}

/**
 * Pinterest
 *
 * @since 1.0.0
 */
function lets_social_count_pi( $args ) {

	if ( empty( $args['username'] ) ) {
		return;
	}

	$trans = get_transient( 'lets-social-count-stats-pi-' . $args['username'] );
	if ( empty( $trans ) ) {
		$trans = get_meta_tags( 'http://pinterest.com/' . $args['username'] );
		$trans = $trans['pinterestapp:followers'];
		if ( empty( $trans ) ) {
			$output['error'] = 'Pinterest ' . esc_html__( 'Error: Please check the details entered.', 'lets-social-count' );
			return $output;
		}
		set_transient( 'lets-social-count-stats-pi-' . $args['username'], $trans, DAY_IN_SECONDS );
	}

	$output['count'] = $trans;
	$output['icon'] = 'tipi-i-pinterest lsc-pinterest';
	$output['url'] = 'https://www.pinterest.com/' . $args['username'];

	return $output;

}
