$(document).foundation();

$(document).ready(function(){



    // TO DO - FIX IMAGE REPOSITIONING WHEN RESIZING THE WINDOW

    function HomepageImageFollower(){
        //Variables for our image
        var $el = $('#hero');
        var $image = $('#image');
        var imageWidth = 2000;
        var imageHeight = 1339;
        var scrollableX = imageWidth - $(window).width();
        var scrollableY = imageHeight - $el.height();
        var percentageHorizontal = 0;
        var percentageVertical = 0;
        var destinationX = 0;
        var destinationY = 0;
        var currentX = 0;
        var currentY = 0;

        //Variables for our globe
        var $globe = $('#circleText');
        var destinationGlobeX = 0;
        var destinationGlobeY = 0;

        var currentGlobeX = 0;
        var currentGlobeY = 0;


        // Nice init to prevent instatiotion of followng function before we're ready

        function init(){

            // Preset these to ensure image is horizontally center on load
            currentX = -((imageWidth - $(window).width())/2)
            destinationX = (scrollableX * .5);

            // Make sure our container has the correct with and stating postion
            $image.css('width',imageWidth);
            $image.css('height',imageHeight);
            $image.css('translate',currentX +',0');

            // Now add all mousemoving, animationFrame and other eventss
            addEvents();
        }

        // Keeps track of the mouseX and -Y and caculates the relative pan-amount

        function setDestination(e){

            // Percentage of the mouse cursor in relation to the bounding box
            percentageHorizontal = (e.pageX / $el.width());
            percentageVertical = (e.pageY / $el.height());

            // Calculate to where the image should scroll
            destinationX = (scrollableX * percentageHorizontal);
            destinationY = (scrollableY * percentageVertical);

            destinationY = (300 * percentageVertical);
            console.log(destinationGlobeY);
        }

        // Let's go and animate this sucker

        function animate(){

            // Simle easing equation (Thanks to mister @robpenner)
            // First calculate the difference between the current and wanted postion
            var distanceX = destinationX - currentX;
            var distanceY = destinationY - currentY;

            var distanceGlobeX = destinationX - currentGlobeX;
            var distanceGlobeY = destinationY - currentGlobeY;


            // Increment the position with a ratio based on the differen between current and wanted position
            var translateX = ((destinationX + currentX) === 0) ? currentX : 0-((currentX + (distanceX/10)));
            var translateY = 0-((currentY + (distanceY/10)));

            var translateGlobeX = ((currentGlobeX + (distanceGlobeX/10)));
            var translateGlobeY = ((currentGlobeY + (distanceGlobeY/20)));


            // When the window resizes beyond the size of the image
            if((imageWidth - currentX) < $(window).width()){
                //translateX = $(window).width() - imageWidth;
            }

            // Actually position the image
            var translateXY = translateX + ',' + translateY;
            var translateGlobeXY = translateGlobeX + ',' + translateGlobeY;

            $image.css('translate',translateXY);
            $globe.css('translate',translateGlobeXY);

            // Reset the variables to reflect current image position
            currentX = Math.abs(parseInt($image.css('translate').split(',')[0]));
            currentY = Math.abs(parseInt($image.css('translate').split(',')[1]));
            currentGlobeX = Math.abs(parseInt($globe.css('translate').split(',')[0]));
            currentGlobeY = Math.abs(parseInt($globe.css('translate').split(',')[1]));

        }


        // Please add all needed events here

        function addEvents(){
            $('#hero').mousemove(function(e){
                setDestination(e)
            });

            window.requestAnimFrame = (function(){
                return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
            })();

            (function animloop(){
                requestAnimFrame(animloop);
                animate();
            })();
        }


        // Hey-ho, let's go!

        init();

        // Our public functions

        return{
            init:init
        }
    }

    var homepageImageFollower = new HomepageImageFollower();


})
