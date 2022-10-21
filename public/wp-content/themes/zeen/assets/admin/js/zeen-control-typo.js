/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.0.8
 */
(function( $ ) {

    'use strict';
    wp.customize.controlConstructor['zeen-fonts'] = wp.customize.Control.extend({

        ready: function() {

            var control = this,
                fontSubsets = control.container.find('.zeen-font-subsets'),
                fontCat = control.container.find('.zeen-font-cat'),
                fontWeight = control.container.find('.zeen-font-weight');

            control.container.on( 'change', '.zeen-fonts', function( event, ui ) {
                var seData = fontWeight.data(), opData = $(this).find('option:selected').data(), variants = opData.variants.split(','), subsets = opData.subsets.split(',');
                fontWeight.find('option').attr('disabled', 'disabled' );
                for ( var i = 0, len = variants.length; i < len; i++ ) {
                    fontWeight.find('option[value="' + variants[i] + '"]' ).removeAttr('disabled');
                }
                if ( variants.indexOf( seData.defaultWeight.toString() ) > -1 ) {
                    fontWeight.find('option[value="' + seData.defaultWeight + '"]' ).attr('selected', 'selected' );
                     control.settings[1].set( seData.defaultWeight );
                } else {
                    fontWeight.find('option[value="' + variants[0] + '"]' ).attr('selected', 'selected' );
                    control.settings[1].set( variants[0] );
                }
                fontSubsets.find('option').attr('disabled', 'disabled' ).removeAttr('selected');;
                for ( var i = 0, len = subsets.length; i < len; i++ ) {
                    fontSubsets.find('option[value="' + subsets[i] + '"]' ).removeAttr('disabled');
                }
                fontSubsets.find('option[value="latin"]' ).attr('selected', 'selected' );
                control.settings[2].set( ['latin'] );
                control.settings[3].set( opData.category );
            });
        }

    });

} )( jQuery );