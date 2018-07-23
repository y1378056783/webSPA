define("com/conf",function(require, exports, module) {
    var sPath = (document.domain=='h5.midoogame.com') ? "//api.midoogame.com" : "//api.midoyx.com";
	require("com/tool");//工具函数
	window.$ = require('lib/zepto');
	window.tpl=require("html/build/template");//模版引擎
    //window.touchs = require("wgt/touch").touchAngle;滑动检测
    window.$ban = $('#banner');
    window.$main = $('#main');
    window.$head = $('#head');
    window.$body = $('body');
    //window.channel=tool.ua(false);
    window.U = {
        "index":sPath+"/h5/games/index",//首页
        "cate":sPath+"/stat/gamelist",//分类
        "sea":sPath+"/stat/gamesearch",//搜索
        "deta":sPath+"/stat/gameinfo",//详情
        "code":"//www.midoogame.com/wapauth/sendmobilecode"//获取短信验证码
    }
    //require("com/api");接口地址
});