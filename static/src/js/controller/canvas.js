
    //var $ = require('jquery');
    require('../helper');
    
    $.widget('nt.canvas',{
        options: {
            rows: 20,
            cols: 6,
            layout: '1',
            margin_top:  20,
            col_space: 12 
        },

        _create: function() {
            console.log('_create::');
            this.set_layout();
        },

        _init: function() {
            console.log('_init::');
        },

        _setOption: function(key, value) {
            console.log('_setOption::', key, value);
            var self = this,
                prev = this.options[ key ],
                fnMap = {
                    'layout': function() {
                        self.set_layout();
                    },
                    'margin_top': function() {
                        self.setMarginTop();
                    }
                };

            this._super(key, value);
            if (key in fnMap) fnMap[key]();
        },

        set_layout: function() {
            if (this.options[ 'layout' ] === '1') {
                var unit0 = layout_one(this);
                this._setOption('unit0', unit0);
            }
        },

        setMarginTop: function() {
           this.container.css('margin-top', this.options['margin_top'] + 'px');
        },

        align: function() {
            align(this);
        }
    });

    var layout_one = function(widget) {
        console.log('layout_one::');
        //widget.element.empty();
        //

        var cols = widget.options[ 'cols' ],
            col_space = widget.options[ 'col_space' ],
            margin_top = widget.options[ 'margin_top' ];

        var col_margin = 0.5 * col_space;
        
        var window_width = $(window).width(),
            extra_space = col_space * (cols - 1) + 10,
            unitX = Math.floor(( window_width * 0.98 - extra_space ) / cols);
        var unit0 = Math.floor(unitX/12);
        unitX = unit0*12;

        console.log(unitX);

        widget.element
            .css('float', 'right')
            .css('position', 'relative')
            .css('left', '-50%')
            .css('text-align', 'left')
            .data('colwidth', unitX);
        widget.container = $("<div></div>")
                    .css('float', 'left')
                    .css('position', 'relative')
                    .css('left', '50%')
                    .css('margin-top', margin_top+'px')
                    .appendTo(widget.element);

        for (var i = 0; i < cols-1; i ++) {
            var id = "canvas-col-" + i;
            var el = $("<div id='"+ id + "'></div>");
            widget.container.append(el);
            if (i === cols-2) {
                el.css('width', 2*unitX);
            } else {
                el.css('width', unitX);
            }
        }
        widget.container.children()
            //.css('width', unitX)
            .css('float', 'left')
            .css('background-color', '#1f1f1f')
            .css('margin-left', col_margin)
            .css('margin-right', col_margin);
        console.log(widget.container);
        return unitX;
    };

    // set margin size so that canvas is vertically center-alinged 
    var align = function (widget) {
        console.log('align:: ');
        if (window.innerHeight / screen.height > 0.88) {
            var margin = window.innerHeight 
                            - $('#banner').height()
                            - widget.container.height();
            if ( margin > 0 ) {
                widget._setOption('margin_top', Math.round( margin/2 ));
            }
        }
    }

