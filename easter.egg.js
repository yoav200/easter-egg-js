/**
 * @author Yoav Alhalel
 * @since 08/07/2014
 *
 * An easter bunny!
 * listenning to key press and show lights when a sequance of charecters is typed. Esc remove the bunny.
 *
 * Inspired from: http://jsfiddle.net/nndd9/1/ or http://jsfiddle.net/ramapriya/xeYnv/1/
 */
var easter  =(function(easter, $, undefined) {
    // make sure jQuery is loaded
    if ($ === undefined) {
        log("jQuery is not loaded!");
        // addJQuery(); ??
        return;
    }

    /******************************************************************************************************************
     * Private members
     * */
    var timeOutHolder;
    var columns = 40;
    var width = (100 / columns);

    var sequence = {
        counter : 0,
        lastKeyPress : 0,
        result : "",
        secret : "hellobunny"
    }
    // since easter adds style to body, it uses this members to keep original css
    var bodyStyleExist = {"height" : "100%", "padding" : "0", "margin" : "0", "overflow" : "hidden"};
    var bodyStyleNeed = {"height" : "100%", "padding" : "0", "margin" : "0", "overflow" : "hidden"};
    /*****************************************************************************************************************/

    var layout = function () {
        // set needed css to body
        $("body").css(bodyStyleNeed);
        // create the container element
        var $container = $("<div />", {
            style : "position: absolute; top:0; right:0; bottom:0; left:0; height: 100%; padding: 0; margin: 0; overflow: hidden; z-index: 1001;",
            id : 'easterContainer'
        });
        // add to body
        $("body").prepend($container);
        // create rows and columns elements
        for (var ii = 0; ii < columns; ii++) {
            var $row = $("<div />").css("height", width + "%");
            for (var i = 0; i < columns; i++) {
                var $col = $("<div />", {
                    class: "col",
                    style : "display: inline-block; outline: 1px solid purple; background: " + getRandomColor() + "; width: " + width + "%;height: 100%; padding: 0; margin: 0; overflow: hidden;",
                    id : ii + "-" + i
                });
                $row.append($col);
            }
            // add row to container
            $container.append($row);
        }
    }

    var blink = function () {
        for (var i = 0; i < 10; i++) {
            $('.col').eq(Math.round(Math.random() * (40 * 40))).fadeOut('fast').fadeIn('fast');
        }
        timeOutHolder = setTimeout(blink, 100);
    }

    var show = function () {
        bodyStyleExist.height = $("body").css("height");
        bodyStyleExist.padding = $("body").css("padding");
        bodyStyleExist.margin = $("body").css("margin");
        bodyStyleExist.overflow = $("body").css("overflow");
        // set layout
        layout();
        // start blinking
        blink();
    }

    var hide = function () {
        clearTimeout(timeOutHolder);
        $("#easterContainer").remove();
        $("body").css(bodyStyleExist);
    }

    /******************************************************************************************************************
     * Private functions
     * */
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

    function addJQuery() {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "http://code.jquery.com/jquery-1.11.0.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function log () {
        if (window.console) {
            // Only run on the first time through - reset this function to the appropriate console.log helper
            if (Function.prototype.bind) {
                log = Function.prototype.bind.call(console.log, console);
            } else {
                log = function() {
                    Function.prototype.apply.call(console.log, console, arguments);
                };
            }
            log.apply(this, arguments);
        }
    }
    /*****************************************************************************************************************/

    /******************************************************************************************************************
     * start listening to key press
     * */
    $(document).keyup(function(e) {
        // Esc
        if (e.keyCode == 27) {
            hide();
        } else {
            var now = new Date().getTime();
            // allow 1 second between key type
            if( sequence.lastKeyPress == 0 || (now - sequence.lastKeyPress) < (1000 * 1)) {
                sequence.lastKeyPress = now;
                sequence.counter++;
                sequence.result = sequence.result + String.fromCharCode(e.keyCode);
            } else {
                sequence.lastKeyPress = 0;
                sequence.counter = 0;
                sequence.result  = String.fromCharCode(e.keyCode);
            }

            // log(sequence);

            if(sequence.result.toLowerCase().trim() === sequence.secret) {
                show();
            }
        }
    });
    /*****************************************************************************************************************/

}(window.easter = window.easter || {}, window.jQuery));
