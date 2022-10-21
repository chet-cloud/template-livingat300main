/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.0.8
 */
(function( $ ) {

    'use strict';

    wp.customize.controlConstructor['zeen-multi-checkbox'] = wp.customize.Control.extend({

        ready: function() {

            var control = this,
                input = control.container.find('input');
                

            control.container.on( 'change', '.zeen-val', function() {
                var values = [];
                $( this ).closest( '.customize-control' ).find( 'input[type="checkbox"]:checked' ).each(function () {
                    values.push($(this).val());
                });

               control.setting.set( values.join(',') );

            });
        }

    });

} )( jQuery );