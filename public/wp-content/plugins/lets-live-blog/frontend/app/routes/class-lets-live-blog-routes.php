<?php
/**
 * Routes
 *
 * @package Lets_Live_Blog
 * @since 1.0.0
 */
namespace letsliveblog;
class Lets_Live_Blog_Routes {

	/**
	 * Data
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_publish( $request ) {

		$body = $request->get_body();
		$body = json_decode( $body );
		$pub = Lets_Live_Blog_Frontend::publish( $body );
		$output = Lets_Live_Blog_Frontend::get_entry( $pub );
		return $output;

	}

	/**
	 * Update
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_update( $request ) {

		$body = $request->get_body();
		$body = json_decode( $body );
		$pub = Lets_Live_Blog_Frontend::update( $body );
		$output = Lets_Live_Blog_Frontend::get_entry( $pub );
		return $output;

	}

	/**
	 * Del
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_del( $request ) {

		$body = $request->get_body();
		$body = json_decode( $body );
		$output = Lets_Live_Blog_Frontend::del( $body );
		return array( $output );

	}

	/**
	 * Entries
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_entries( $request ) {

		$parameters = $request->get_query_params();
		$pid = $parameters['pid'];
		$output = Lets_Live_Blog_Frontend::get_entries( array(
			'pid' => $pid,
		) );
		return $output;

	}

	/**
	 * Entry
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_entry( $request ) {

		$body = $request->get_query_params();
		$output = array();
		$output[] = Lets_Live_Blog_Frontend::get_entry( $body['add'] );
		return $output;

	}

	/**
	 * History
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_history( $request ) {

		$parameters = $request->get_query_params();
		$pid = $parameters['pid'];
		return get_post_meta( intval( $pid ), 'lets_live_blog_history', true );

	}

	/**
	 * Start Stop
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_startstop( $request ) {

		$body = $request->get_body();
		$body = json_decode( $body );
		return Lets_Live_Blog_Frontend::startstop( $body );
	}

	/**
	 * Is broadcasting
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_is_broadcasting( $request ) {

		$parameters = $request->get_query_params();
		$pid = $parameters['pid'];
		return get_post_meta( intval( $pid ), 'lets_live_blog_bc', true );
	}

	/**
	 * Routes
	 *
	 * @since 1.0.0
	*/
	function lets_live_blog_routes() {

		register_rest_route( 'codetipi-lets-live-blog/v1', '/entries', array(
			'methods' => array( 'GET' ),
			'callback' => array( $this, 'lets_live_blog_entries' ),
		) );

		register_rest_route( 'codetipi-lets-live-blog/v1', '/entry', array(
			'methods' => array( 'GET' ),
			'callback' => array( $this, 'lets_live_blog_entry' ),
		) );

		register_rest_route( 'codetipi-lets-live-blog/v1', '/history', array(
			'methods' => array( 'GET' ),
			'callback' => array( $this, 'lets_live_blog_history' ),
		) );

		register_rest_route( 'codetipi-lets-live-blog/v1', '/isbroadcasting', array(
			'methods' => array( 'GET' ),
			'callback' => array( $this, 'lets_live_blog_is_broadcasting' ),
		) );

		register_rest_route( 'codetipi-lets-live-blog/v1', '/update', array(
			'methods' => array( 'GET', 'POST' ),
			'callback' => array( $this, 'lets_live_blog_update' ),
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		) );

		register_rest_route( 'codetipi-lets-live-blog/v1', '/del', array(
			'methods' => array( 'GET', 'POST' ),
			'callback' => array( $this, 'lets_live_blog_del' ),
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		) );

		register_rest_route( 'codetipi-lets-live-blog/v1', '/startstop', array(
			'methods' => array( 'GET', 'POST' ),
			'callback' => array( $this, 'lets_live_blog_startstop' ),
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		) );

		register_rest_route( 'codetipi-lets-live-blog/v1', '/publish', array(
			'methods' => array( 'GET', 'POST' ),
			'callback' => array( $this, 'lets_live_blog_publish' ),
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		) );
	}
}
