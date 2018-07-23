define("page/cate",function(require, exports, module) {
	require("com/conf");//公共函数
	
	function navHandler(){
		var $self=$(this),tid=sessionStorage.tid=$self.data('id');
		$self.addClass('active').siblings().removeClass('active')
		getDataByTypeId(tid)
		//console.log(par)
	}
	function liTpl(result){
		return tpl("cateChild",{catCls:'cate-btn1',resp:result.data.gamelist});
	}
	function getDataByTypeId(tid){
		var $wrap=$('.aui-list'),li=null;
		$.getJSON(U.cate+'?game_from=2&type='+tid+'&callback=?',function(result){
			if(!result.data.length){
				li=liTpl(result);
				$wrap.html(li).removeClass('aui-empty');
			}else{
				$wrap.html('').addClass('aui-empty');
			} 
		})
	}
	function loading(isload){
		var loading='',$wrap=$('.dropload-down');
		if(isload){
			//console.log('有数据')
			loading='<div class="dropload-load"><span class="loading"></span>加载中...</div>';
		}else{
			//console.log('没数据')
			loading='<div class="dropload-refresh">没有更多数据！</div>'
		}
		$wrap.html(loading).removeClass('aui-invisible');
		setTimeout(function(){
			$wrap.addClass('aui-invisible');
		},2000)
	}
	function loadMore(){
		var touch=require("wgt/dropload"),//加载更多
			page=2,
			li=null,
			lock=true,
			id=sessionStorage.tid||0;
			new touch({
				targets:'.aui-list',
				callback:{
					up:function(dom){//'./js/wgt/test.json?page='+page
				    	if(lock){
					    	$.getJSON(U.cate+'?game_from=2&type='+id+'&page='+page+'&callback=?',function(result){
					    		if(!result.data.length){
					    			++page;
					    			lock=true;
									li=liTpl(result);
									$(dom).append(liHtml);
									loading(lock);
								}else{
									lock=false;
									loading(lock);
								}
							})
				    	}
					}
				}
			})
	}
	var num=0;
	function step(){
		var val=num+=15,$nav=$('.nav');
		if(val<255){
			requestAnimationFrame(step);
		}
		$nav.scrollLeft(val);
		//console.log(val)
		//return ;
	}
	exports.init=function (id){//,isCache
		/*tool.getData({
			isCache:true,
			url:U.cate+'?game_from=2&type='+id+'&callback=?',//'./js/wgt/test.json'
			//sessKey:'cateInit',
			fn:function(result){
				var tlist=result.data.typearr||sessionStorage.typelist,navRes=tool.arraySlice(tlist,6);
					//console.log(mainHtml)
					$head.html(tpl("head",{isShow:'',isBack:'',title:'分类',isNav:true,resp:navRes}));
				if(result.data.length!=0){
					$main.html(tpl("cate",{catCls:'cate-btn1',isloading:true,padCls:'',marCls:'f-mt45',resp:result.data.gamelist}));
					$('.aui-row div').on('click',navHandler)
					var navSlide=new auiSlide({
						container:document.getElementById("nav-slide"),
						// "width":300,
						"height":45,
						"speed":300,
						"autoPlay": 0,
						"pageShow":false,
						//"pageStyle":'line',
						"loop":false,
						'dotPosition':'center'
					})
					loadMore();
				}
			}
		})*/
		$.getJSON(U.cate+'?game_from=2&type='+id+'&callback=?',function(result){
			var tlist=result.data.typearr||[{"id": 0,"name": "全部"}, {"id": "1","name": "角色"}, {"id": "2","name": "格斗"}, {"id": "3","name": "休闲"}, {"id": "4","name": "动作"}, {"id": "5","name": "策略"}, {"id": "6","name": "射击"}, {"id": "8","name": "回合"}, {"id": "9","name": "卡牌"}, {"id": "10","name": "竞技"}, {"id": "12","name": "经营"}, {"id": "13","name": "其他"}],
				navId=id==9||id==10||id==8?id-1:id;
				//console.log(navRes)
				$head.html(tpl("head",{title:'分类'}));
			if(!result.data.length){
				$main.html(tpl("cate",{catCls:'cate-btn1',isloading:true,cateNav:tlist,isNav:true,pfxCls:'f-pf',resp:result.data.gamelist}));
				loadMore();
			}else{
				$main.html(tpl("cate",{catCls:'cate-btn1',isloading:true,isEmpty:'aui-empty',cateNav:tlist,isNav:true}));
			}
			$('.nav > li').on('click',navHandler).eq(navId).addClass('active').siblings().removeClass('active');
			if(id>6) requestAnimationFrame(step);
					/*var navSlide=new auiSlide({
					container:document.getElementById("nav-slide"),
					// "width":300,
					"height":45,
					"speed":300,
					"autoPlay": 0,
					"pageShow":false,
					//"pageStyle":'line',
					"loop":false,
					'dotPosition':'center'
				})
				*/
		})
	}
});