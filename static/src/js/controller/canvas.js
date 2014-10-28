
//var $ = require('jquery');
require('../helper');

$.widget('nt.canvas',{
    options: {
        rows: 20,
        cols: 4,
        layout: '1',
        margin_top:  20,
        col_space: 10,
        unit0_min: 22
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
        self = this,
        prev = this.options[ key ];
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

// layout 1
var layout_one = function(widget) {
    var cols, col_space, col_width, col_margin, extra_space, unit0, unit0_min; 
    var margin_top, widonw_width, window_height, extra_height, content_height;

    window_width = $(window).width();
    window_height = $(window).height();

    // column
    cols = widget.options[ 'cols' ];
    col_space = widget.options[ 'col_space' ];
    col_margin = 0.5 * col_space;
    extra_space = col_space * (cols - 1) ,
    col_width = Math.floor(( window_width * 1.00  - extra_space ) / cols);

    // basic scale unit0
    unit0_min = widget.options[ 'unit0_min' ];
    unit0 = Math.floor(col_width/12);
    unit0 = unit0 < unit0_min ? unit0_min : unit0;
    col_width = unit0*12;

    // height
    margin_top = widget.options[ 'margin_top' ];
    if ($("footer")[0] == null) {
        extra_height = parseInt($("#banner").css("height")) + 2*margin_top;
    } else {
        extra_height = parseInt($("#banner").css("height")) + 2*margin_top;
        extra_height += parseInt($("#footer").css("height"));
    }
    content_height = window_height - extra_height;

    // setup
    widget.element
        .css('float', 'right')
        .css('position', 'relative')
        .css('left', '-50%')
        .css('text-align', 'left')
        .data('colwidth', col_width)
        .data('contentHeight', content_height)
        .data('unit0', unit0);
    widget.container = $("<div></div>")
                .css('class', 'container-fluid')
                .css('float', 'left')
                .css('position', 'relative')
                .css('left', '50%')
                .css('margin-top', margin_top+'px')
                .appendTo(widget.element);

   /* 
    var left_div = "<div id='canvas-left'></div>"
    var right_div = "<div id='canvas-right'></div>"
    widget.container.append();
    */

    for (var i = 0; i < cols-1; i ++) {
        var id = "canvas-col-" + i;
        var el = $("<div id='"+ id + "'></div>");
        widget.container.append(el);
        if (i === cols-2) {
            el.css('width', 2*col_width);
        } else {
            el.css('width', col_width);
        }
    }
    widget.container.children()
        .css('float', 'left')
        .css('background-color', '#1f1f1f')
        .css('margin-left', col_margin)
        .css('margin-right', col_margin);
    console.log(widget.container);
    return col_width;
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

