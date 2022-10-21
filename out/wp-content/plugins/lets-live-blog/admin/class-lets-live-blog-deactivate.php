<?php

/**
 *
 * Let's Live Blog Deactivation Class
 *
 * @since      1.0.0
 *
 * @package    Let's Live Blog
 * @subpackage lets-live-blog/admin
 */

/**
 * Temp cron helper
 *
 * @since    1.0.0
 */
function lets_live_blog_wp_unschedule_hook( $hook ) {
    $crons = _get_cron_array();

    foreach( $crons as $timestamp => $args ) {
        unset( $crons[ $timestamp ][ $hook ] );

        if ( empty( $crons[ $timestamp ] ) ) {
            unset( $crons[ $timestamp ] );
        }
    }

    _set_cron_array( $crons );
}

/**
 * Cron cleanup
 *
 * @since    1.0.0
 */
function lets_live_blog_deactivate() {
    lets_live_blog_wp_unschedule_hook( 'Lets_Live_Blog_Frontend::cron' );
}