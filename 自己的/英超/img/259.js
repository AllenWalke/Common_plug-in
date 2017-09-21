	(function(aClz,maxSize,co) {
	// 添加样式
	var loadStyle = function(s, id) {
	    var doc = document;
	    var sDom = doc.createElement("style");
	    sDom.id = id;
	    sDom.type = "text/css";
	    sDom.styleSheet ? (sDom.styleSheet.cssText = s) : sDom.appendChild(doc.createTextNode(s));
	    doc.getElementsByTagName("head")[0].appendChild(sDom);
	    return sDom;
	};
	var newStyle = [];
	newStyle.push('.side-btns-2w {width:110px;top: 350px;_top:expression(documentElement.scrollTop + 350);left: 50%;margin: 0 0 0 480px;position: fixed;_position:absolute;z-index: 0;overflow: hidden; font: 12px/22px Arial;color:#333;}');
	newStyle.push('.side-btns-2w em,.side-btns-2w span{font-style: normal;font-weight: normal;line-height: 27px;}');
	newStyle.push('.side-btns-2w-img{ display:block;width:110px;background: #EBEBEB;line-height: 0;text-align: center;position: relative;zoom:1;}');
	newStyle.push('.side-btns-2w-img:link,.side-btns-2w-img:visited{color:#333;text-decoration: none;}');
	newStyle.push('.side-btns-2w-img:hover,.side-btns-2w-img:active{color:#333;text-decoration: none;background: #D1D1D1;}');
	newStyle.push('.side-btns-2w img{border: 0;display: block; margin:0 auto;padding: 0;}');
	newStyle.push('.side-btns-2w-close{width:40px;height: 18px;line-height: 80px;margin:0 0 0 70px;display:block;overflow: hidden;background: url(http://i0.sinaimg.cn/dy/deco/2013/0912/close.png) no-repeat;}');
	newStyle.push('.side-btns-2w-resize{display: none !important;}');
	newStyle = newStyle.join('\n ');
	loadStyle(newStyle,'style_dmcode');

	var doc = document,
		side = (function() {
			var body = doc.body,
				firstChild = body.firstChild,
				wrap = doc.createElement('div');
			wrap.className = 'side-btns-2w';
			wrap.style.display = 'none';
			wrap.innerHTML = '<a class="side-btns-2w-img" target="_blank" href="http://sports.sina.com.cn/m/sinasport.html" title="点击下载体育客户端" suda-uatrack="key=qr_code&value=video_content_qrcode"><em>新浪体育客户端</em> <img src="http://i1.sinaimg.cn/ty/2011hqj/0624/sportsapp.png" width="90"> <span>点击或扫描下载</span> </a> <a href="javascript:;" class="side-btns-2w-close" title="关闭" suda-uatrack="key=qr_code&value=video_content_qrcode_close">关闭</a>';
			firstChild ? firstChild.parentNode.insertBefore(wrap, firstChild) : body.appendChild(wrap);
			return wrap;
		})(),
		clz = side.className,
		nClz = clz + ' ' + aClz,
		cookieName = co.name || 'close_rightdmcode',
		domain = co.domain || 'video.sina.com.cn',
		lnks = side.getElementsByTagName('a'),
		close = lnks[lnks.length-1],
		toggle = function(dis) {
			side.style.display = dis;
		}, addEvent = function(o, s, fn) {
			if (o.attachEvent) {
				o.attachEvent('on' + s, fn);
			} else {
				o.addEventListener(s, fn, false);
			}
			return o;
		}, resize = function() {
			var body = doc.documentElement || doc.body;
			if (!body) {
				return;
			}
			var width = body.offsetWidth;
			if (width < maxSize) {
				side.className = nClz;
			} else {
				side.className = clz;
			}
		};
		// name, value, expire(hour), path, domain, secure
		var cookie = (function() {var co = {}; co.getCookie = function(name) {name = name.replace(/([\.\[\]\$])/g, '\\\$1'); var rep = new RegExp(name + '=([^;]*)?;', 'i'); var co = document.cookie + ';'; var res = co.match(rep); if (res) {return unescape(res[1]) || ""; } else {return ""; } }; co.setCookie = function(name, value, expire, path, domain, secure) {var cstr = []; cstr.push(name + '=' + escape(value)); if (expire) {var dd = new Date(); var expires = dd.getTime() + expire * 3600000; dd.setTime(expires); cstr.push('expires=' + dd.toGMTString()); } if (path) {cstr.push('path=' + path); } if (domain) {cstr.push('domain=' + domain); } if (secure) {cstr.push(secure); } document.cookie = cstr.join(';'); }; co.deleteCookie = function(name) {document.cookie = name + '=;' + 'expires=Fri, 31 Dec 1999 23:59:59 GMT;'; }; return co; })();
		var display = cookie.getCookie(cookieName);
		if(display!=''){
			toggle('none');
			return;
		}
		toggle('block');
		resize();
		addEvent(window, 'resize', resize);
		addEvent(close,'click',function(e){
			toggle('none');
			cookie.setCookie(cookieName,'1',15*24,'/',domain);
			if(window.event){
				window.event.returnValue = false;
			}else{
				e.preventDefault();
			}
		});

	})('side-btns-2w-resize',1180,{
		name:'close_rightdmcode',				//cookie名
		domain:'video.sina.com.cn'		//domain 根据频道不同
	});
