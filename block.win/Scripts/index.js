
$(document).ready(function () {
	$(".title-tabs-pc").hover(function(){
		$(this).css('background','#e5e6e6');
		$(this).find('.top-imgs-pc').attr('src','/images/blockchain-blue-text.png');
		$(this).find('.title-tabs-pc ul li a').css('color','#799eb2');
		$(this).addClass('transition');
	},function(){
		$(this).css('background','none');
		$(this).find('.top-imgs-pc').attr('src','/images/blockchain-wrate-text.png');
		$(this).find('.title-tabs-pc ul li a').css('color','#fff');
	});
	// pc mob tabs
	var ce;
	$('.langular-title-user').on('click',function(){
		clearTimeout(ce);
		if($('.top-ul-mob').css('display')=='none'){
			if($('.choose-langular').css('display')=='none'){
				$('.choose-langular').slideDown(300);
				ce=setTimeout(function(){
					$('.choose-langular').slideUp(300);
				},2000)
			}else{
				$('.choose-langular').slideUp(300);
			}
		}
	})
	// choose language
	$('.langular-lis').click(function(){
		// mob
        $('.langular-title-mob').attr('src',$(this).find('img').attr('src'));
        $('.langular-title-mob').attr('title',$(this).find('img').attr('title'));
		// pc
		$('.langular-title-lis').find('img').attr('src',$(this).find('img').attr('src'))
		$('.langular').html($(this).find('a').html());
		$('.langular').html($(this).find('img').attr('title'));
		$('.choose-langular').hide();
	});


	// pc mob scoll top sings
	var imgtop=$('.imgHeight').css('height').substring(0,3);
	$(window).scroll(function () {
		if($(document).scrollTop()>(imgtop-100)){
			$(".title-tabs-pc").css('background','#e5e6e6');
			$(".title-tabs-pc").find('.top-imgs-pc').attr('src','/images/blockchain-blue-text.png');
			$(".title-tabs-pc").find('.title-tabs-pc ul li a').css('color','#799eb2');
			$(".title-tabs-pc").addClass('transition');
		}else{
			$(".title-tabs-pc").css('background','none');
			$(".title-tabs-pc").find('.top-imgs-pc').attr('src','/images/blockchain-wrate-text.png');
			$(".title-tabs-pc").find('.title-tabs-pc ul li a').css('color','#fff');
		}
	})
	//mob top click sings
	var cs;
	$('.mob-show-tab').on('click',function(){
		clearTimeout(cs);
		if($('.choose-langular').css('display')=='none'){
			if($('.top-ul-mob').css('display')=='none'){
				$('.top-ul-mob').slideDown(300);
				cs=setTimeout(function(){
					$('.top-ul-mob').slideUp(300);
				},2000)
			}else{
				$('.top-ul-mob').slideUp(300);
			}
		}
    })
});





function IsPlaying(player)
{
    return player.currentTime > 0 && !player.paused && !player.ended
    && player.readyState > 2;
}

window.onload = function () {
    var media = document.getElementById("media");
    var media2 = document.getElementById("media2");
    media.controls = false;
    media2.controls = false;

    function play1(){
		if(media2.paused){
    		if (media.paused) {
	            media.play();
	            $('#main').removeClass('m-t--51').css('margin-top','10px');
	            $('.mediaVideo1').css({'z-index':'99','position':'relative','top':'17px','background':'none'})
                $('#media').css('margin-top', '-18px');
	        } else {
	            media.pause();
	            $('.mediaVideo1').css({'position':'','top':'0'});
	             $('#main').css('margin-top','-7px');
                 $('#media').css('margin-top', '0px');
                 $('.mediaVideo1').css( 'background', 'none')
	            media.poster="/images/home-banner.jpg";
	        }
    	}else{
     		media2.pause();
            media.play();
            $('#video2-play .video-img').show().next().hide();
            $('#main').removeClass('m-t--51').css('margin-top','10px');
            $('.mediaVideo1').css({ 'z-index': '99', 'position': 'relative', 'top': '17px','background': 'none'})
            $('#media').css('margin-top','-18px');
    	}
	}
    document.getElementById("media").onclick = function () {
      	play1()
    }
    document.getElementById("aideoPlay1").onclick = function () {
      	play1()
    }
    document.getElementById("video2-play").onclick = function () {
    	if(media.paused){
    		if (media2.paused) {
	            media2.play();
	            $('#video2-play .video-img').hide().next().show();
	        } else {
	            media2.pause();
	            $('#video2-play .video-img').show().next().hide();
	        }
    	}else{
    		media.pause();
    		media2.play();
    		$('#video2-play .video-img').hide().next().show();
    	}
    }
    
}