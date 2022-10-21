/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.0.8
 */
 (function( $ ) {

    'use strict';
    wp.customize.controlConstructor['zeen-on-off'] = wp.customize.Control.extend({

        ready: function() {

            var control = this;

            control.container.on( 'change', '.zeen-on-off > input', function() {
                if ( $( this).is( ':checked' ) ) {
                    control.setting.set( true );
                } else {
                    control.setting.set( false );
                }

            });
        }

    });

} )( jQuery );