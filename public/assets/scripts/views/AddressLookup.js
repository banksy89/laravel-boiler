define(['Backbone', '../plugins/crafty_postcode.class'], function (Backbone) {

    return Backbone.View.extend({

        initialize: function () {

            this.cp_obj = CraftyPostcodeCreate();

            this.cp_obj.set("debug_mode",   "1");

            this.cp_obj.set("access_token", "");
            this.cp_obj.set("form", 'js-paf-finder');
            this.cp_obj.set("result_elem_id", "crafty_postcode_result_display");
            this.cp_obj.set("elem_postcode" , "full-postcode");
            this.cp_obj.set("busy_img_url", '/assets/images/ajax-loader.gif');
            this.cp_obj.set("elem_street1"  , "address");
            this.cp_obj.set("elem_street2"  , "address_two");
            this.cp_obj.set("elem_town", "town");
            this.cp_obj.set("elem_county", "county");
            this.cp_obj.set("res_autoselect"  , "0");
            this.cp_obj.set("first_res_line"  , "Please select address");
            this.cp_obj.set("max_width"  , "395px");
            this.cp_obj.set("on_result_ready"  , function() {

                var elem = $('#crafty_postcode_lookup_result_option1');

                elem.before('<label class="form__label form__label--text form__label--alt-font form__label--alt-size"> </label>');
                elem.addClass('form__select form__select--border');
            });
            
        },
        
        el: $('body'),
        
        events: {
            'click .js-find-address'        : 'find_address'
        },

        find_address: function (e) {

            this.cp_obj.doLookup();

            e.preventDefault();

        }
        
    });
});