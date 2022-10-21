/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.0.8
 */
(function( $ ) {

    'use strict';
    wp.customize.controlConstructor['zeen-multi-select'] = wp.customize.Control.extend({

        ready: function() {

            var input = this.container.find('.tipi-multi-on');
                
            if ( ! input.hasClass('zeen-sorted') ) {
                input.addClass('zeen-sorted').searchableOptionList();
            }

        }

    });

} )( jQuery );