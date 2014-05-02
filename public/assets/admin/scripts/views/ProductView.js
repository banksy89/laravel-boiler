define( [ '../utils/hogan', 'Backbone' ], function( hogan ) {

    return Backbone.View.extend({

        initialize: function() {},
        
        el: $('body'),
        
        events: {
            'click .js-add-att'           : 'add_custom_attribute',
            'click .js-custom-att-delete' : 'remove_custom_attribute',
            'change #js-main-category'    : 'main_category',
            'click .js-condition'         : 'toggle_used_condition'
        },

        toggle_used_condition: function( e ) {

            var target = $( e.target ),
                type = $( target ).val(),
                area = $( '#js-used-condition-area' );

            if( type == 'Used' ) {
                area.show();
            }
            else {
                area.hide();
            }
        },

        add_custom_attribute: function( e ) {

            var customAtts = $('.js-custom-atts');
            var fields = {};
            var add = true;

            $.each(customAtts, function(index, input) {
                if (!!input.value) {
                    fields[index] = input.value;
                    input.value = '';
                } else {
                    add = false;
                }
            });

            console.log( fields );

            if (add) {

                $.ajax({
                    url: window.site_path + '_admin/assets/templates/product-custom-atts.txt',
                    dataType: 'html',
                    async: false,
                    success: function (tmp) {
                        var template = hogan.compile(tmp);
                            template = template.render(fields);

                        console.log( template );

                        $( '#js-product-custom-atts' ).append(template);
                    }
                });
            }

            e.preventDefault();
        },

        remove_custom_attribute: function( e ) {

            var elem = $(e.target);
            elem.parent().remove();
        },

        main_category: function( e ) {

            var value = $( e.target ).find( ':selected' ).val(),
                container = $( '#js-sub-categories' );
            
            $.ajax({ url: window.site_path + 'admin/ajax/sub_categories',
                     data: { id: value },
                     dataType: 'JSON',
                     type: 'POST',
                     success: function( data ) {

                        if( data[ 'status' ] == 200 ) {

                            $.ajax({
                                url: window.site_path + '_admin/assets/templates/product-sub-category.txt',
                                dataType: 'html',
                                async: false,
                                success: function (tmp) {
                                    var template = hogan.compile(tmp);
                                        template = template.render({ categories : data[ 'data' ] });

                                    $( '#js-sub-categories-area' ).html(template);
                                    container.show();
                                }
                            });

                        }
                        else {
                            container.hide();
                        }
                     }
            });
        }
    });
});