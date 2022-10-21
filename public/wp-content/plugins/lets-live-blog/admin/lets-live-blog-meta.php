<?php
/**
 * Metaboxes
 *
 * @package 	Lets_Live_Blog
 * @copyright   Copyright Codetipi
 * @since 		1.0.0
 */

/**
 * Metabox Class init
 *
 * @since  1.0.0
 */
function lets_live_blog_meta( $src_uri ) {

	$post_types = get_post_types(
		array(
			'public'   => true,
			'_builtin' => false,
		)
	);

	$post_types[] = 'post';
	$post_types_formats = $post_types;
	unset( $post_types['product'] );

	return array(
		'src_uri'       => $src_uri,
		'post_type'     => $post_types,
		'prefix'        => 'lets_live_blog',
		'id'            => 'lets-live-blog-options',
		'title'         => esc_html__( "Let's Live Blog Options", 'lets-live-blog' ),
		'args'          => array(
			array(
				'control'       => 'on-off',
				'id'            => 'enabled',
				'title'         => esc_html__( 'Enable Live Blog', 'lets-live-blog' ),
				'default'       => '',
			),
			array(
				'control'       => 'text',
				'id'            => 'event-title',
				'title'         => esc_html__( 'Event Title', 'lets-live-blog' ),
				'default'       => '',
				'required'      => array(
					'id'        => 'enabled',
					'value'     => 'on',
				),
			),
			array(
				'control'       => 'text',
				'id'            => 'event-location',
				'title'         => esc_html__( 'Event Location', 'lets-live-blog' ),
				'default'       => '',
				'required'      => array(
					'id'        => 'enabled',
					'value'     => 'on',
				),
			),
			array(
				'control'       => 'text',
				'id'            => 'event-start',
				'class'			=> 'lets-live-blog-date-field',
				'title'         => esc_html__( 'Event Start Time', 'lets-live-blog' ),
				'default'       => '',
				'required'      => array(
					'id'        => 'enabled',
					'value'     => 'on',
				),
			),
			array(
				'control'       => 'select',
				'id'            => 'date',
				'title'         => esc_html__( 'Date Format', 'lets-live-blog' ),
				'description'   => esc_html__( 'The date format visitors see. Authors doing the live blog will always see date & time.', 'lets-live-blog' ),
				'default'       => 1,
				'choices'       => array(
					1 => esc_html__( 'Date + Time' , 'lets-live-blog' ),
					2 => esc_html__( 'Time' , 'lets-live-blog' ),
					3 => esc_html__( 'X Minutes Ago' , 'lets-live-blog' ),
				),
				'required'      => array(
					'id'        => 'enabled',
					'value'     => 'on',
				),
			),
			array(
				'control'       => 'radio-images',
				'id'            => 'design',
				'title'         => esc_html__( 'Entry Design', 'lets-live-blog' ),
				'default'       => 1,
				'choices'       => array(
					1 => array( 'url'   => 'design-1.png' ),
					2 => array( 'url'   => 'design-2.png' ),
				),
				'required'      => array(
					'id'        => 'enabled',
					'value'     => 'on',
				),
			),
			array(
				'control'    => 'radio-images',
				'id'         => 'animation',
				'title'      => esc_html__( 'Animation', 'lets-live-blog' ),
				'default'    => 1,
				'choices'    => array(
					1 => array( 'url'   => 'animation-1.gif' ),
					2 => array( 'url'   => 'animation-2.gif' ),
				),
				'required'      => array(
					'id'        => 'enabled',
					'value'     => 'on',
				),
			),
		),
	);

}


function lets_live_blog_sanitize_wp_kses( $data ) {

	return wp_kses( $data, array(
		'a' => array(
			'href'  => array(),
			'title' => array(),
		),
		'span' => array(
			'class' => array(),
			'id'    => array(),
		),
		'img' => array(
			'src'    => array(),
			'srcset' => array(),
			'alt'    => array(),
		),
		'i' => array(
			'class' => array(),
			'id'    => array(),
		),
		'div' => array(
			'class' => array(),
			'id'    => array(),
		),
		'br'     => array(),
		'em'     => array(),
		'strong' => array(),
		'italic' => array(),
	));

}


function lets_live_blog_sanitize_titles( $data ) {

	return wp_kses( $data, array(
		'span' => array(
			'class' => array(),
		),
		'div' => array(
			'class' => array(),
		),
		'br'     => array(),
		'em'     => array(),
		'strong' => array(),
	));

}

/**
 * Sanitizer Commas
 *
 * @since  1.0.0
 */
function lets_live_blog_sanitize_num_commas( $data ) {

	$data = filter_var( $data, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION | FILTER_FLAG_ALLOW_THOUSAND );
	return $data;

}

/**
 * Sanitizer Array
 *
 * @since  1.0.0
 */
function lets_live_blog_sanitize_array( $array ) {

	if ( ! is_array( $array ) ) {
		return array();
	}

	foreach ( $array as $key => $value ) {

		if ( is_array( $value ) ) {
			$array[ $key ] = lets_live_blog_sanitize_array( $value );
		} else {
			$array[ $key ] = esc_attr( $value );
		}
	}

	return $array;
}

/**
 * Sanitizer Floats
 *
 * @since  1.0.0
 */
function lets_live_blog_sanitizer_float( $data ) {
	return floatval( $data );
}
