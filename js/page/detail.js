define("page/detail",function(require, exports, module) {
	require("com/conf");//公共函数

	exports.init=function (id){//,isCache
		/*tool.getData({
			isCache:false,
			url:U.deta+'?game_from=2&gameid='+id+'&callback=?',//'./js/wgt/test.json'
			//sessKey:'detaInit',
			fn:function(result){
				var bigimg=tool.arraySlice(result.data.bigimage,2);
				$head.html(tpl("head",{isShow:'aui-invisible',isBack:'',title:'游戏详情',isNav:false}))
				$main.html(tpl("detail",{resp:result.data,bigimg:bigimg}))
				var navSlide=new auiSlide({
					container:document.getElementById("img-slide"),
					// "width":300,
					"height":247,
					"speed":300,
					"autoPlay": 0,
					"pageShow":false,
					//"pageStyle":'line',
					"loop":false,
					'dotPosition':'center'
				})
			}
		})*/
		$.getJSON(U.deta+'?game_from=2&gameid='+id+'&callback=?',function(result){
			var bigimg=tool.arraySlice(result.data.bigimage,2);
				$head.html(tpl("head",{isShow:'aui-invisible',title:'游戏详情'}))
				$main.html(tpl("detail",{resp:result.data,bigimg:bigimg}))
				var navSlide=new auiSlide({
					container:document.getElementById("img-slide"),
					// "width":300,
					//"height":250,
					"speed":300,
					"autoPlay": 0,
					"pageShow":false,
					//"pageStyle":'line',
					"loop":false,
					'dotPosition':'center'
				})
		})
	}
});