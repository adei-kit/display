;define(['jquery', 'jquery-ui', 'ractive', 'helper'], function($){
    $.widget('nt.canvas',{
        options: {
            rows: 20,
            cols: 6,
            layout: '1',
            margin_top:  20,
            col_space: 10
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

        var cols = widget.options[ 'cols' ],
            col_space = widget.options[ 'col_space' ],
            margin_top = widget.options[ 'margin_top' ];
        
        var window_width = $(window).width(),
            extra_space = col_space * (cols - 1),
            unitX = Math.floor(( window_width * 0.98 - extra_space ) / cols);

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
            var id = "canvas-div-" + i;
            widget.container.append("<div id='"+ id + "'></div>");
        }
        widget.container.children()
            .css('float', 'left')
            .css('background-color', '#1f1f1f')
            .css('margin-left', 5 + 'px')
            .css('margin-right', 5 + 'px');
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
});
/*
 *    var show_grid = function (value, prev, widget) {
 *        console.log('show_grid::', value, prev)
 *        if (prev !== value) {
 *            if (value === true) {
 *                $('.grid').each(function() {
 *                    $(this).css('display', 'inline-block');
 *                });
 *            } else if (value === false) {
 *                $('.grid').each(function() {
 *                    $(this).css('display', 'none');
 *                });
 *            } else {
 *                console.log('what?')
 *            }
 *        }
 *    };
 *
 *    var add_grid = function(widget) {
 *        for (var i = 0; i < widget.options.rows * widget.options.cols; i++) {
 *            var div = $('<div></div>')
 *                        .addClass('grid')
 *                        .css("width", widget.options.unit0)
 *                        .css("height", widget.options.unit0)
 *                        .html(Math.floor(i/widget.options.cols) + ',<br>' +  i%widget.options.cols);
 *            widget.element.append(div);
 *        }
 *    };
 *
 *    var remove_grid = function(widget) {
 *        widget.element.children('.grid').remove();
 *    }
 *
 */

/*
 *    var gridblocks = new Ractive({
 *        template: '{{#blocks:id}}'
 *                    +'<div class="grid" style="width: {{unit}}px; height: {{unit}}px">'
 *                    +'{{Math.floor(id/cols)}}<br>{{id%cols}}'
 *                    +'</div>'
 *                    +'{{/blocks}}',
 *    });
 *
 *    var toggle_grid = function(widget) {
 *        console.log('widget.toggle_grid:', widget.options.grid);
 *        if (widget.options.grid) {
 *            widget.blocks.set('blocks', 
 *                fillArray({unit: widget.options.unit0, rows: widget.options.rows, cols: widget.options.cols},
 *                    widget.options.rows*widget.options.cols));
 *        } else {
 *            widget.blocks.set('blocks', []);
 *        }
 *    }
 *
 */
/*
 *        _setOptions: function(op) {
 *            // When 'cols' is set, trigger set_layout() via setting 'rows'
 *            if (('cols' in op) & !('rows' in op)) {
 *                op['rows'] = this.options['rows'];
 *            }
 *            this._super(op);
 *        },
 *
 */

