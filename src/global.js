//全局使用
/*全局通用变量*/
global.BASECONFIG = {
	baseUrl:"/apis/"
}
/*全局调用方法*/
global.MY = {
	'GETjson':function(url,d){
		var data = {
			token:$.cookie("token")
		}
		if(d){
			for(var n in d){
				data[n] = d[n]
			}
		}
		return $.ajax({
			url:BASECONFIG.baseUrl+url,
			data:data,
			dataType:'json',
			async:false
		})
	},
	POSTjson:function(url,d){
	var data = {
			token:$.cookie("token")
		}
		if(d){
			for(var n in d){
				data[n] = d[n]
			}
		}
		return $.ajax({
			url:BASECONFIG.baseUrl+url,
			data:data,
			dataType:'json',
			type:"POST",
			async:false
		})
	},
	GETurlData:function(key) {
        var re = '[\\?&]'+key+'=([^&]+)';
        re = new RegExp(re);
        var rst = location.search.match(re);
        return rst ? decodeURI(rst[1]) : '';
    },
    TimeFormat:function(time, format){
        if(!time){
            return '暂无'
        }
        if (!format) {
            format = 'Y-n-j H:i:s';
        }

        var timeObj = new Date(time*1000);
        
        var hour = timeObj.getHours();
        var minute = timeObj.getMinutes();
        var second = timeObj.getSeconds();
        var month = timeObj.getMonth()+1;
        var day = timeObj.getDate();

        var timeFmt = format
            .replace('Y', timeObj.getFullYear())
            .replace('n', month>9 ? month :'0'+month)
            .replace('j', day>9 ? day : '0'+day)
            .replace('H', hour>9 ? hour : '0'+hour)
            .replace('i', minute>9 ? minute : '0'+minute)
            .replace('s', second>9 ? second : '0'+second);

        return timeFmt;
        return time
    },
    //提交表单
	TMDapplyForm : function(d,callback){
		var data = {
			token:$.cookie("token"),
			source:$.cookie('source'),
			tag:$.cookie('tag')
		}
		if(d){
			if(d.phone==''||!d.phone){
				layer.msg("请先填写表单，手机号为必填项")
				throw "缺少表单数据，手机号phone为必填字段"
			}
			for(var n in d){
				data[n] = d[n]
			}
		}else{
			layer.msg("请先填写表单，手机号为必填项")
			throw "缺少表单数据，手机号phone为必填字段"
		}
		if(!$.TMDcheckMobile(data.phone)){
			layer.msg("请输入正确的手机号码")
			return false;
		}

		return $.ajax({
			url:"/apis/form/submit",
			dataType:'json',
			type:'POST',
			data:data,
			success:function(response){
				if(response.status){
					callback?callback(response):callback;
				}else{
					layer.msg(response.msg)
				}
			},
			error:function(response){
				layer.msg("系统繁忙请稍后在试")
			}
		})
	}

}

/*快商通*/
/**
 * 该JS函数的作用是若快商通的代码加载完成,则调用快商通自带的打开聊天窗口的函数
 * 否则直接打开链接地址,并用网站自己获取到的来源的对话网址参数传递给聊天窗口
 * 注: 会直接打开链接地址的情况是,客户在没有生成快商通的图标前就点击了页面上的咨询链接时触发的
 * 用法举例:
 *      1. <a href="javascript:void(0)" onClick="onKST();">在线咨询</a>;
 *		2. <a href="javascript:void(0)" onClick="onKST('zhuanti');">在线咨询</a>;
 *		3. <a href="javascript:void(0)" onClick="onKST('zhuanti',true);">在线咨询</a>;
 * @param ksChatLink 指定打开链接地址，不指定则取函数中默认的链接地址
 * @param text 对话标识，可不指定
 * @param isMobile 是否是手机，可不指定
 * @author drc
 * @since 2016-04-27
 * @version 2.1
 */
global.onKST= function(text,isMobile){
	//请替换成"生成代码 - 链接地址" 中的链接地址,不要去其他地方复制
	ksChatLink = 'https://hztk5.kuaishang.cn/bs/im.htm?cas=69442___591199&fi=79018&ism=1';
	/**
	 * 若强行打开新窗口,则放开设置,不设置则手机不打开新窗口,pc打开新窗口,此设置只对当前自定义事件有效
	 * 若想全局生效,包括快商通默认的打开聊天窗口事件,则将此变量ksUserDefinedOpenNewChatWin定义在ks.j前即可
	 */
	 window.location.href=ksChatLink;
	//var ksUserDefinedOpenNewChatWin=true;
	
	//eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h Q(a,b){3(!a)9 J;9 z D("(^|&)"+b+"=([^&]*)(&|$)","i").16(a)}h G(a,b){4 c=a.j(\'?\');3(c==-1)9\'\';a=a.14(c+1,a.y);4 d=z D("(^|&)"+b+"=([^&]*)(&|$)","i");4 r=a.K(d);3(r!=L)9 O(r[2]);9\'\'}3(12&&5.j(\'l=1\')==-1){3(5.j(\'?\')==-1){5+=\'?l=1\'}6{5+=\'&l=1\'}}4 7,A=5;4 v=5.11("?");v.17("");3(q P!=\'R\'&&P==w){7=w}6 3(Q(v[1],\'l\')){7=J}6{7=w}h t(){4 a=\'\';u{4 b=G(5,\'X\');3(b){4 c=\'\';4 d=k.V.K(z D(\'(^| )\'+b+\'U\'+b+\'=([^;]*)(;|$)\'));3(d!=L){c=O(d[2])}3(c){a+=\'&Z=\'+c}}}o(e){}4 f="";u{3(N.k.n.y>0){f=N.k.n}}o(e){f=k.n}3(!f||f.y==0){f=k.n}a+=\'&S=\'+C(m.B.x);3(f)a+=\'&T=\'+C(f);3(s)a+=\'&H=\'+C(s);3(5.j(\'?\')==-1){a=\'?\'+a.W(1)}5+=a;3(!7){m.B.x=5}6{4 g=m.Y(5,\'M\');3(g){u{g.10()}o(e){}}6{m.B.x=5}}}3(q 8!=\'R\'){4 p={};3(s)p[\'H\']=s;3(7)p[\'13\']=\'M\';u{3(q 8.F==\'h\'){3(7&&A.j(\'15\')==-1&&!8.E){8.E=A}8.F(p)}6 3(q 8.I==\'h\'){8.I(p)}6{t()}}o(e){t()}}6{t()}',62,70,'|||if|var|ksChatLink|else|openNewChatWin|KS|return||||||||function||indexOf|document|ism|window|referrer|catch||typeof||text|ksOpenLink|try|localArr|true|href|length|new|_ksChatLink|location|encodeURIComponent|RegExp|customUrl|openChatWin|getQueryString|sText|openChatLink|false|match|null|_blank|opener|unescape|ksUserDefinedOpenNewChatWin|checkQueryString|undefined|dp|ref|_KS_|cookie|substring|cas|open|vi|focus|split|isMobile|oTarget|substr|kuaishang|test|push'.split('|'),0,{}))
};



/*全局模板*/
global.TplQrcode = '<div class="qw-qrcode-popup-shade">'+
    '<div class="qw-qrcode-popup-bg">'+
        '<div class="qw-qrcode-popup-pic">'+
            '<img class="qw-block" src="../../../static/images/qrcode_pic.jpg">'+
        '</div>'+
        '<div class="qw-qrcode-popup-label">'+
            '<p>关注青蛙公众号<br>了解更多情感资讯</p>'+
        '</div>'+
        '<div class="qw-qrcode-popup-x">'+
            '<img class="qw-block" src="../../../static/images/qrcode_icon_x.png">'+
        '</div>'+
    '</div>'+
'</div>';

var USER_INFO = null;

/*全局自执行*/
//文档加载以后
$(function(){

	//跳转快商通
	$("body").on("click","[consult='kst']",function(){
		onKST();
		return false;
	})

	// 返回顶部按钮
	$("body").on("click",".funcGoTop",function(){
		$('.qw-container').animate({scrollTop:0},160);
	})


	//显示二维码
	$("body").on("click",".funcQrcode",function(){
		var qrcode = $('.qw-qrcode-popup-shade');
		if(qrcode.length<1){
			$("body").append(TplQrcode);
			qrcode = $('.qw-qrcode-popup-shade')
		}
		qrcode.show();
	})

	//隐藏二维码
	$("body").on("click",".qw-qrcode-popup-shade .qw-qrcode-popup-x",function(){
		$(this).parents('.qw-qrcode-popup-shade').hide();
	})
	
	//获取用户资料
	MY.POSTjson("user/get_user_info")
	  .done(function(res){
	  	if(res.status){
			USER_INFO= res.result.info;
		}
	})
})
