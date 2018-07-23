define("page/search",function(require, exports, module) {
	require("com/conf");//公共函数
	function search(){
		var val=$(this).val().trim();
		if(val!=''){
			$.getJSON(U.sea+'?searchname='+val+'&game_from=2&callback=?',function(result){
				if(!result.data.length){
				 	$main.html(tpl("cate",{catCls:'cate-btn1',resp:result.data.gamelist}))
				}else{

				}
			})
		}
	}
	exports.init=function (){
		//console.log(window.history.length)
		$head.html(tpl("search",{}))
		$('#search-input').on('input',search);
		//
		$main.html('')
		
	}
});