/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.0.8
 */
(function( $ ) {

    'use strict';
    wp.customize.controlConstructor['zeen-radio-image'] = wp.customize.Control.extend({

        ready: function() {
            var control = this;
            this.container.on( 'click touch', '.zeen-radio-image > input', function() {
                if ( wp.customize.value(control.id)() !== $( this ).val() ) {
                    control.setting.set( $( this ).val() );
                }

            });
        }

    });

} )( jQuery );