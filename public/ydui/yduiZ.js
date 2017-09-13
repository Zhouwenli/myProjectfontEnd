/**
 * main
 */
!function(window){
	"use strict";
	var doc=window.document,
		ydui={};
		
	/**
	 * 直接绑定FastClick  为了解决iphone中点击事件300ms延迟的问题
	 */
	
	$(window).on('load',function(){
		typeof FastClick == 'function' && FastClick.attach(doc.body);
	});
	
	var util = ydui.util ={
		/**
		 * 格式化参数
		 */
		parseOptions:function(string){
			if($.isPlainObject(string)){
				return string;
			}
			var start = (string ? string.indexOf('{') : -1),
				options={};
				
			if (start != -1) {
                try {
                    options = (new Function('', 'var json = ' + string.substr(start) + '; return JSON.parse(JSON.stringify(json));'))();
                } catch (e) {
                }
            }
            return options;
		},
		
		/**
		 * 页面滚动方法
		 * @type{{lock，unlock}}
		 * lock：禁止页面滚动, unlock：释放页面滚动
		 */
		pageScroll: function(){
			var fn=function(e){
				e.preventDefault();
				e.stopPropagation();
			};
			var islock=false;
			
			return {
				lock:function(){
					if(islock)return;
					islock=true;
					doc.addEventListener('touchmove',fn);
				},
				unlock:function(){
					islock=false;
					doc.removeEventListener('touchmove',fn);
				}
			};
		}(),
		/**
		 * 本地存储
		 */
		localStorage :function(){
			return storage(window.localStorage);
		}(),
		 /**
         * Session存储
         */
        sessionStorage: function () {
            return storage(window.sessionStorage);
        }(),
	}
		
		
		
}(window);
