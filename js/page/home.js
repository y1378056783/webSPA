define("page/home",function(require, exports, module) {
	require('com/conf');
	exports.init=function (isCache){
		$head.html(tpl("head",{title:'首页',isHome:'true'}))//isBack:'aui-invisible',
		tool.getData({
			isCache:isCache,
			url:U.index+'?callback=?',
			sessKey:'homeInit',
			fn:function(result){
				sessionStorage.typelist=JSON.stringify(result.data.typelist);
				var list=tool.arraySlice(result.data.typelist,10),play=tool.stora();
				$main.html(tpl("home",{data:result,catCls:'cate-btn2',padCls:'f-pl0',tlist:list,play:play,caro:result.data.h5carousel,resp:result.data.hoth5game}))
				//console.log();
				var advert=new auiSlide({
					container:document.getElementById("advert-slide"),
					// "width":300,
					//"height":130,
					"speed":500,
					"autoPlay": 3000,
					"pageShow":true,
					"pageStyle":'dot',
					"loop":true,
					'dotPosition':'center'
				})
				/*console.log();
				var play=new auiSlide({
					container:document.getElementById("play-slide"),
					// "width":300,
					"height":115,
					"speed":300,
					"autoPlay": 0,
					"pageShow":false,
					//"pageStyle":'line',
					"loop":false,
					'dotPosition':'center'
				})*/
			}
		})
	}
	
	/*exports.more=function (id){
		$head.html(tpl("head",{isShow:'aui-hide',isBack:'',title:'首页分类'}))
		console.log('更多:'+id)
	}*/
});