define(function(require, exports, module) {
    var tool = {};
    tool.os = navigator.userAgent;
    tool.ua = function(isDown){
        var weixin=/MicroMessenger/gi.test(this.os),
            and=this.os.indexOf('Android') > -1 || this.os.indexOf('Linux') > -1,
            iph=this.os.indexOf('iPhone') > -1,
            bet=0;
        if(weixin&&iph){//微信中苹果
            if(isDown){//苹果下载页面弹提示
                bet=3
            }else{
                bet=2
            }
            return bet;
        }else if(weixin&&and){//微信中安卓
            return 1;
        }else if(and){//普通浏览器
            //Android
            return 1;
        }else if(iph){//普通浏览器
            //iPhone
            if(isDown){//苹果下载页面弹提示
                bet=3
            }else{
                bet=2
            }
            return bet;
        }else{
            return bet;
        }
    };
    tool.goBack=function(isHome){
        if(window.Android&&isHome=='true'){
            window.Android.finishActivity();
        }else{
            window.history.length>1 ? window.history.go(-1):window.location.href="/#/home/home"
        }/**/
    };
    tool.arraySlice=function(arr,num){
        var navRes = [];
        for(var i=0,len=arr.length;i<len;i+=num){
           navRes.push(arr.slice(i,i+num));
        }
        return navRes;
    };
    tool.stora=function(arg){
        var data={},isCac=true,temp=localStorage.playgame?JSON.parse(localStorage.playgame):[];
        if(arg){
            if(localStorage.playgame){
                temp.forEach(function(v){
                    if(v.id==arg.id){
                        isCac=false;
                    }
                })
                if(temp.length>3) temp.pop()
            }
            if(isCac){
                data.id=arg.id;
                data.imgurl=arg.imgurl;
                data.name=arg.name;
                data.link=arg.link;
                temp.unshift(data);
                localStorage.playgame=JSON.stringify(temp);
            }
            window.location.href=arg.link;
        }else{
            return (temp!=0)?temp:null;
        }

    };
    tool.getData=function(arg){
        if(arg.isCache){
            $.getJSON(arg.url,function(res){render(res,arg.sessKey,arg.fn)});
        }else{
            render(null,arg.sessKey,arg.fn);
        }
    };
    function render(res,key,fn){
        var result=null;
        if(res){
            console.log('请求初始化数据');
            result=res;
            sessionStorage[key]=JSON.stringify(res);
        }else{
            console.log('读取本地数据');
            result=JSON.parse(sessionStorage[key])
        }
        fn(result);
    }
    tool.count = function(time,obj){
        var curtime = time || 80,
        timer=setInterval(countDown,1000);
        function countDown(){
            var inittime=0,ctime;
            if(inittime < curtime){
                curtime--;
                ctime=curtime<10?'0'+curtime:curtime;
                obj.val(ctime).attr('disabled',true);
            }else{
                obj.val('重新发送').removeAttr('disabled');
               clearInterval(timer);
            }
        }
    };
    tool.errMsg = function(txt){
        var $tip = $("#tip"),$verify=$("#verify");
        $verify.attr('disabled',true);
        $tip.removeClass('visHide').text(txt);
        setTimeout(function(){
            $tip.addClass('visHide');
            $verify.removeAttr('disabled');
        },800);
    };
    tool.loadHide = function(flag,msg){//提示信息
        var $load=$('#loading');
        $load.show();
        flag && $load.text(msg);
        setTimeout(function(){
            $load.hide();
        },400);
    };
    tool.countDown = function(e, t, n, a){
        var i = 1e3 * (t - e),
            self = this
          , o = Math.floor(i / 864e5)
          , r = Math.floor(i / 36e5) % 24
          , s = Math.floor(i / 6e4) % 60
          , l = Math.floor(i / 1e3) % 60;
        if (o = o < 10 ? "0" + o : o,
        r = r < 10 ? "0" + r : r,
        s = s < 10 ? "0" + s : s,
        l = l < 10 ? "0" + l : l,
        n(o, r, s, l),
        0 == o && 0 == r && 0 == s && 0 == l)
            return a(),
            !1;
        setTimeout(function() {
            self.countDown(++e, t, n, a)
        }, 1e3)
    };
    tool.format = function (now,isHour){
        var val = now + '',
        vals = val.replace(/000$/,'')*1;
        vals *= 1000;
        var _now = new Date(vals);
        var year=_now.getFullYear();
        var month=_now.getMonth()+1;
        var date=_now.getDate();
        var hour=_now.getHours();
        var minute=_now.getMinutes();
        if ((month+'').length <= 1){
            month = '0'+month;
        }
        if ((date+'').length <= 1){
            date = '0'+date;
        }
        if ((hour+'').length <= 1){
            hour = '0'+hour;
        }
        if ((minute+'').length <= 1){
            minute = '0'+minute;
        }
        if(isHour){
            return year+"-"+month+"-"+date
        }else{
            return year+"/"+month+"/"+date+" "+hour+":"+minute;
        }
    };
    tool.diff=function(hisTime){
        var now = +new Date(),
            oldTime = +new Date(hisTime),
            diffValue = now - oldTime,
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            _day =diffValue/day,
            _hour =diffValue/hour;
            //_min =diffValue/minute,
            if(_day>1){
                return hisTime;//'历史开服'
            }else{
                if(_hour<0){
                    return hisTime.substring(hisTime.indexOf('/')+1,hisTime.length);//'即将开服'
                }else{
                    return hisTime.split(' ')[1];//'今日开服'
                }
            }
    };
    window.tool=tool;
    //module.exports=tool;
});