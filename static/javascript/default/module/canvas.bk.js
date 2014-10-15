;define(['jquery', 'jquery-ui', 'ractive', 'helper'], function($){
    $.widget('nt.canvas',{
        options: {
            rows: 10,
            cols: 20,
            grid: false,
            layout: '1'
        },

        _create: function() {
            console.log('_create::');
            this.element.addClass('canvas');
            this.set_layout();
            // initial grid
            gridblocks.render(this.element);
            this.blocks = gridblocks;
            this.toggle_grid();
        },

        _init: function() {
            console.log('_init::');
            //this.layout();
        },

        _setOption: function(key, value) {
            var self = this,
                prev = this.options[ key ],
                fnMap = {
                    'grid': function() {
                        self.toggle_grid();
                    },
                    'layout': function() {
                        self.set_layout();
                    },
                    'rows': function() {
                        self.set_layout();
                        self.toggle_grid();
                    }
                };
            this._super(key, value);
            console.log('_setOption::', key, value);
            if (key in fnMap) fnMap[key]();
        },

        _setOptions: function(op) {
            // When 'cols' is set, trigger set_layout() via setting 'rows'
            if (('cols' in op) & !('rows' in op)) {
                op['rows'] = this.options['rows'];
            }
            this._super(op);
        },

        set_layout: function() {
            if (this.options[ 'layout' ] === '1') {
                var unit0 = layout_one(this);
                this._setOption('unit0', unit0);
            }
        },

        toggle_grid: function() {
            toggle_grid(this);
        }
    });

    var gridblocks = new Ractive({
        template: '{{#blocks:id}}'
                    +'<div class="grid" style="width: {{unit}}px; height: {{unit}}px">'
                    +'{{Math.floor(id/cols)}}<br>{{id%cols}}'
                    +'</div>'
                    +'{{/blocks}}',
    });

    var toggle_grid = function(widget) {
        console.log('widget.toggle_grid:', widget.options.grid);
        if (widget.options.grid) {
            widget.blocks.set('blocks', 
                fillArray({unit: widget.options.unit0, rows: widget.options.rows, cols: widget.options.cols},
                    widget.options.rows*widget.options.cols));
        } else {
            widget.blocks.set('blocks', []);
        }
    }

    var layout_one = function(widget) {
        console.log('layout_one::');
        //widget.element.empty();
        var extra_height = 0;
        widget.element.siblings().each(function() {
                extra_height += $(this).css('height').toNum();
        });
        var width = $(window).width(),
            height = $(window).height() - extra_height;
        // TODO set minimal height
        //if (height < 600) height = 600 - extra_height;
        var cols = widget.options[ 'cols' ],
            rows = widget.options[ 'rows' ],
            wgt = Math.floor(width * 0.98),
            hgt = Math.floor(height * 0.98 - 6),
            unitX = Math.round(wgt / cols),
            unitY = Math.round(hgt / rows),
            unit0 = (unitY < unitX) ? unitY : unitX,
            margintop = (height - unit0*rows)/2. - widget.element.css('border').toNum();
        console.log(height, unit0, rows, widget.element.css('border').toNum(), margintop);
        widget.element.css('margin-top', margintop+'px')
                      .css('width', cols*unit0 + 'px')
                      .css('height', rows*unit0 + 'px');
        //console.log(width, height);
        //console.log(wgt, hgt, unit0, margintop);
        return unit0;
    };
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
 */


