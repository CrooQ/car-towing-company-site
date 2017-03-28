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

            $(this).width(videoWidth);

            $('.background-video .video-container video').addClass('fadeIn animated');


        });
    }  

    // ================



    // GALLERY FULL SCREEN
    // =========================== 

    var img = $('.gallery img');
    var body = $('body');
    //console.log(img, body);

    img.each(function(){
        $(this).on('click', function(){
            //console.log('click');
            var src = $(this).attr('src');
            console.log(src);
            var newDiv = $('<div>');
            newDiv.addClass('fullScreen');
            var imgFs = $('<img>');
            imgFs.addClass('animate');
            imgFs.attr('src', src);

            newDiv.append(imgFs);
            body.append(newDiv);
            $('.animate').animate({maxHeight:'80%'},1000);




            newDiv.on('click', function(){
                $('.animate').animate({maxHeight:'0'},1000);
                newDiv.remove();
            })
        })
    })

    // ================



    // CONTACT FORM VALIDATOR
    // ======================    


    $('#contact-form').validator();
    
    
    // CONTACT FORM SUCCESS ALERT
    
    
    var urlMessage = location.search;

    var decodeUrl = decodeURI(urlMessage);
    

    var successMsg = decodeUrl.substr(5, 7);
    
    var errorMsg = decodeUrl.substr(5, 5);
    
        
        if ( successMsg == 'success') {
            
            $('#success_message').css('display', 'block');
        
        } else if ( errorMsg == 'error') { 
                
                $('#error_message').css('display', 'block');
            
        }
    
    // ===============================   

}(jQuery);
