

$(function(){

	//搜索
	//显示搜索
	$('.qw-search-box').on('click',function(){
 
		$('.qw-search-popups').show();
		$('.qw-search-popups-head-box input').focus();
	})

	//关闭
	$('.qw-search-popups-cancel-btn').on('click',function(){
		$('.qw-search-popups').hide();
	})

	//清空文本框
	$(".qw-search-popups-anew-btn").on("click",function(){
		$("#searchInput").val("");
		$("#searchBtn").text("搜索情感问答广场");
	})



	//搜索内容
	$("#searchInput").on("input",function(){
		var self = $(this);
		var oVal = self.val();
		if(oVal == ""){
			$("#searchBtn").text("搜索情感问答广场");
		}else{
			$("#searchBtn").text(oVal);
		}
		
		setTimeout(function(){
			var nVal = self.val();
			if(nVal != oVal){
				return false;
			}else{
				MY.POSTjson("qa/search",{
					title:nVal
				}).done(function(res){
					$(".qw-search-none").hide();
					if(res.status){
						var tpl ='';
						for(var i=0;i<res.result.length;i++){
							tpl+='<li class="qw-search-popups-item">'+
			                        '<a href="/question/'+ res.result[i].qid+'/">'+
			                            '<span class="qw-search-popups-item-details">'+res.result[i].question_title+'</span>'+
			                        '</a>'+
			                    '</li>';
						}
						$(".qw-search-popups-list").html(tpl)
						if(res.result.length==0){
							$(".qw-search-none").show();
						}
					}
				})
			}
		},500)
		
	})

	//ajax 获取轮播内容
	var query = {
        page: 1,
        num: 10,
    }

    //请求通知列表的后台接口
    MY.POSTjson("notices/list",query)
        	  .done(function(res){ //请求成功后
        	  		if(res.status){ //如果成功执行下面
                        var fbData = res.result; //fbData等于返回数据的result
                
                        var result = ''; //声明result
                        var arrLen = fbData.length; //声明arrLen等于返回的result的长度
                        if(arrLen > 0){ //判断当arrLen大于0时
                            $.each(fbData,function(i){ //循环fbData的内容
                               	result +=   '<div class="qw-user-feedback-passage-banner swiper-slide swiper-no-swiping">'+ fbData[i].user_nickname+ " : " + fbData[i].content +'</div>';           
                            })

                            // 插入数据到页面，放到最后面
                            $(".qw-user-feedback-passage").html(result)

                            //通知轮播
							var BSwiper = $('.qw-user-feedback .swiper-container').swiper({
						        direction: 'horizontal',
						        loop: true,
						        speed: 1000,
						        autoplay: 3000,
						    })

                        }
                    }

                });










	//顶部轮播
	var BSwiper = $('.qw-home-banner-view-wrapper .swiper-container').swiper({
        direction: 'horizontal',
        loop: true,
        speed: 1000,
        autoplay: 3500,
        autoplayDisableOnInteraction : false,
        pagination: '.swiper-pagination',
        paginationClickable :true,
    })

	//情感问答
    var QASwiper = $('.qw-emotion-qa .swiper-container').swiper({
        direction: 'horizontal',
        loop: true,
        speed: 1000,
        autoplay: 3500,
        autoplayDisableOnInteraction : false,
        pagination: '.swiper-pagination',
        paginationClickable :true,
    })

    //导师团队
    var TSwiper = $('.qw-tutor-team .swiper-container').swiper({
        direction: 'horizontal',
        speed: 1000,
        slidesPerView : 2,
        
    })

})