+function ($) {

    // DROPDOWN SUBMENU
    // ================   
    
$(document).ready(function(){
    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
        event.preventDefault(); 
        event.stopPropagation(); 
        $(this).parent().siblings().removeClass('open');
        $(this).parent().toggleClass('open');
    });
});
    
    // ================

    
    
    // RESPONSIVE BACKGROUND VIDEO
    // =========================== 

        // Responsive video
        scaleVideoContainer();

        initBannerVideoSize('.video-container .poster img');
        initBannerVideoSize('.video-container .filter');
        initBannerVideoSize('.video-container video');

        $(window).on('resize', function() {
            scaleVideoContainer();
            scaleBannerVideoSize('.video-container .poster img');
            scaleBannerVideoSize('.video-container .filter');
            scaleBannerVideoSize('.video-container video');
        });



        //Functions


        function scaleVideoContainer() {

            var height = $(window).height();
            var unitHeight = parseInt(height) + 'px';
            $('.background-video').css('height',unitHeight);

        }

        function initBannerVideoSize(element){

            $(element).each(function(){
                $(this).data('height', $(this).height());
                $(this).data('width', $(this).width());
            });

            scaleBannerVideoSize(element);

        }

        function scaleBannerVideoSize(element){

            var windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                videoWidth,
                videoHeight;

            $(element).each(function(){
                var videoAspectRatio = $(this).data('height')/$(this).data('width'),
                    windowAspectRatio = windowHeight/windowWidth;

                if (videoAspectRatio > windowAspectRatio) {
                    videoWidth = windowWidth;
                    videoHeight = videoWidth * videoAspectRatio;
                    $(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
                } else {
                    videoHeight = windowHeight;
                    videoWidth = videoHeight / videoAspectRatio;
                    $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
                }

                $(this).width(videoWidth).height(videoHeight);

                $('.background-video .video-container video').addClass('fadeIn animated');


            });
        }    

    
}(jQuery);
