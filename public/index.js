$(function(){
	var mySwiper = new Swiper('.swiper-container',{
	    pagination: '.pagination',
	    loop:true,
	    grabCursor: true,
	    paginationClickable: true,
	    autoplay: 3000
	  });
	  var mySwiper1 = new Swiper('.swiper-containerBar',{
	  	 mode: 'vertical',
	    loop:true,
//	    grabCursor: true,
	    paginationClickable: true,
	    autoplay: 3000
	  });
	  $("#shopList ul li").on("click",function(){
	  		javascript:Android.toHyg("123");
	  })
});
