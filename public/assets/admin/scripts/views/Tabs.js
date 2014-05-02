require(['jquery'], function($) {

    var tabs = {
            /**
             * The main tab menu item
             * This would usually be the UL
             *
             * @access public
             * @param string 
             */
            tabsMenuClass : 'js-tab',    

            /**
             * The class for the actual tabs area
             * 
             * @access public
             * @param string
             */
            tabsContentClass : 'js-tab-content',

            /**
             * The main tab content identifer
             * 
             * @access public
             * @param string
             */
            hashIdentifer : 'tab',

            /**
             * Active class for the current tab
             * menu item
             * 
             * @access public
             * @param string
             */
            tabsActiveClass : 'tabs__item--active',

            /**
             * Instantiated jquery object of 
             * the tabs menu items
             *
             * @param object
             */
            tabsMenu : '',  

            /**
             * Instantiated jquery object of 
             * the first tabs item
             *
             * @param object
             */  
            tabsMenuFirst : '',

            /**
             * Instantiated jquery object of
             * all main tab content areas
             *
             * @param object
             */
            tabsContent : '',

            /**
             * Instatiated jquery object of 
             * the first tabs content
             * 
             * @param object
             */
            firstTabContent : '',

            /**
             * Holds the value of the current hash
             * within the URL
             *
             * @param string
             */
            hash : '',
            
            /**
             * Sets up all objects with set object settings
             */
            setup : function () {

                // Set all the objects within the class
                this.tabsMenu = $('.'+this.tabsMenuClass);
                this.tabsMenuFirst = $(this.tabsMenu[0]);
                this.tabsContent = $('.'+this.tabsContentClass);
                this.firstTabContent = $(this.tabsContent[0]);
                this.hash = this.getHash();
                this.tabsMenuFirst = $(this.tabsMenu[0]);

                // Action the first tab defaults
                this.tabsContent.hide();
                this.firstTabContent.show();

                this.tabsMenuFirst.addClass(this.tabsActiveClass);

                this.displayTabByHash();
            },

            /**
             * Reveals a tab by the set hash within the URL
             */
            displayTabByHash : function () {

                if (!!this.hash) {
                    var hash = this.hash;
                    var currentTab = hash.replace(this.hashIdentifer+'-', '');
                    var currentTabElem = $(this.tabsMenu[currentTab-1]); 
                    
                    this.setTabActive(currentTabElem);

                    this.displayTabContent(hash);
                }
            },

            /**
             * Retrieve the current hash within the URL
             *
             * @return string 
             */
            getHash : function () {
                return window.location.hash.substring(1);
            },

            /**
             * Sets the hash, or overwrites an existing
             * one from within the URL
             *
             * @param string elem
             */
            changeURLHash : function (elem) {
                location.href = location.href+'#'+elem;  

                var hash = this.getHash();

                // If there is a hash we reset the hash within the URL 
                // to the new one
                if (!!hash) {
                    location.href = location.href.replace(hash, elem);
                }
            },

            /**
             * Sets a tab menu item to be active
             *
             * @param string tabItem
             */
            setTabActive : function (tabItem) {
                this.tabsMenu.removeClass(this.tabsActiveClass);
                tabItem.addClass(this.tabsActiveClass);
            },

            /**
             * Reveals a given tab areas content
             *
             * @param string tab
             */
            displayTabContent : function (tab) {
                this.tabsContent.hide();
                $('#'+tab).show();
            },

            /**
             * Start the tabs object and watches for the click
             * even upon a tab menu item
             */
            init : function () {

                this.setup();
                
                _this = this;

                this.tabsMenu.on('click', function(e) {

                    var elem = $(e.target);
                    var tabId = elem.attr('data-id');
                    var tabElem = _this.hashIdentifer+'-'+tabId;

                    _this.setTabActive(elem);
                    _this.displayTabContent(tabElem);
                    _this.changeURLHash(tabElem);
                    
                    e.preventDefault();
                });

            }

    };

    tabs.init();

});