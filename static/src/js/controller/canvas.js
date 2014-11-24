
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
        if (this.options[ 'layout' ] === '2') {
            layout_two(this);
        }
    },

    setMarginTop: function() {
       this.container.css('margin-top', this.options['margin_top'] + 'px');
    },

    align: function() {
        align(this);
    }
});

// layout 1 (1, 1, 2)
var layout_one = function(widget) {
    var cols, col_space, col_width, col_margin, extra_space, unit0, unit0_min; 
    var margin_top, widonw_width, window_height, extra_height, content_height;

    window_width = $(window).width();
    window_height = $(window).height();

    var el = widget.element;
    var col1 = $("<div id='canvas-col-1'>").appendTo(el);
    var col2 = $("<div id='canvas-col-2'>").appendTo(el);
    var col3 = $("<div id='canvas-col-3'>").appendTo(el);

    // let the column side by side
    // let the content of column float 
    el.css('width', '100%')
      .css('margin-left', '-4px')
      .css('margin-right', '-4px')
      .css('text-align', 'center');
    col1.addClass('medium-col')
        .css('padding', '0 8px')
        .css('display', 'inline-block')
        .css('vertical-align', 'top');
    col2.addClass('medium-col')
        .css('padding', '0 8px')
        .css('display', 'inline-block')
        .css('vertical-align', 'top');
    col3.addClass('large-col')
        .css('padding', '0 8px')
        .css('display', 'inline-block')
        .css('vertical-align', 'top');

    // column width
    col_width = 0.24 * window_width;
    el.data('colWidth', col_width);

    //$("<div class='canvas-col-0'></div><div class='canvas-col-1'></div>").append(widget.element);

    //// column
    //cols = widget.options[ 'cols' ];
    //col_space = widget.options[ 'col_space' ];
    //col_margin = 0.5 * col_space;
    //extra_space = col_space * (cols - 1) ,
    //col_width = Math.floor(( window_width * 1.00  - extra_space ) / cols);

    //// basic scale unit0
    //unit0_min = widget.options[ 'unit0_min' ];
    //unit0 = Math.floor(col_width/12);
    //unit0 = unit0 < unit0_min ? unit0_min : unit0;
    //col_width = unit0*12;

    //// height
    //margin_top = widget.options[ 'margin_top' ];
    //if ($("footer")[0] == null) {
        //extra_height = parseInt($("#banner").css("height")) + 2*margin_top;
    //} else {
        //extra_height = parseInt($("#banner").css("height")) + 2*margin_top;
        //extra_height += parseInt($("#footer").css("height"));
    //}
    //content_height = window_height - extra_height;

    //// setup
    //widget.element
        //.css('float', 'right')
        //.css('position', 'relative')
        //.css('left', '-50%')
        //.css('text-align', 'left')
        //.data('colwidth', col_width)
        //.data('contentHeight', content_height)
        //.data('unit0', unit0);
    //widget.container = $("<div></div>")
                //.css('class', 'container-fluid')
                //.css('float', 'left')
                //.css('position', 'relative')
                //.css('left', '50%')
                //.css('margin-top', margin_top+'px')
                //.appendTo(widget.element);

   //[> 
    //var left_div = "<div id='canvas-left'></div>"
    //var right_div = "<div id='canvas-right'></div>"
    //widget.container.append();
    //*/

    //for (var i = 0; i < cols-1; i ++) {
        //var id = "canvas-col-" + i;
        //var el = $("<div id='"+ id + "'></div>");
        //widget.container.append(el);
        //if (i === cols-2) {
            //el.css('width', 2*col_width);
        //} else {
            //el.css('width', col_width);
        //}
    //}
    //widget.container.children()
        //.css('float', 'left')
        //.css('background-color', '#1f1f1f')
        //.css('margin-left', col_margin)
        //.css('margin-right', col_margin);
    //console.log(widget.container);
    //return col_width;
};


// layout bootstrap (3-3-6)
var layout_two = function (widget) {
    var el = widget.element.addClass('container').css('width', '98%');
    var extra_space = 2.0 * parseInt(el.css('padding-left'));
    var col_width = Math.floor(0.25 * (el.width() - extra_space));

    el.data('colWidth', col_width);

    var row = $("<div class='row'>").appendTo(el);
    var col1 = $("<div class='col-xs-12 col-sm-6 col-md-3'>").appendTo(row);
    var col2 = $("<div class='col-xs-12 col-sm-6 col-md-3'>").appendTo(row);
    var col3 = $("<div class='col-xs-12 col-sm-12 col-md-6'>").appendTo(row);


    col1.attr('id', 'canvas-col-0');
    col2.attr('id', 'canvas-col-1');
    col3.attr('id', 'canvas-col-2');

    // collapse empty column
    col1.css('min-height', 0);
    col2.css('min-height', 0);
    col3.css('min-height', 0);

    // column gutter size
    col1.css('padding', '0 8px');
    col2.css('padding', '0 8px');
    col3.css('padding', '0 8px');
    row.css('margin', '0, -8px');

    // height
    var margin_top, extra_height, content_height;
    margin_top = widget.options[ 'margin_top' ];
    if ($("footer")[0] == null) {
        extra_height = parseInt($("#banner").css("height")) + 2*margin_top;
    } else {
        extra_height = parseInt($("#banner").css("height")) + 2*margin_top;
        extra_height += parseInt($("#footer").css("height"));
    }
    content_height = $(window).height() - extra_height;
    el.data('contentHeight', content_height);
}

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

