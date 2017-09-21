        function getStyle(obj,attr){                             // 封装好的获取样式的函数
                    if(obj.currentStyle){
                        return obj.currentStyle[attr];
                    }else{
                        return getComputedStyle(obj,false)[attr];
                    }
                }

        function startMove(obj,json,fn){
            clearInterval(obj.time);    
            obj.time=setInterval(function(){
            	//1.取当前值
            	for(var attr in json){
            	var icu=0;
            	if(attr=='opacity'){
            		icu=Math.round(parseFloat(getStyle(obj,attr))*100);
            	}else{
            		icu=parseInt(getStyle(obj,attr))
            	}    
            	//2.算速度
                var speed=(json[attr]-icu)/5;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                //3.检测停止
                var flag=true;
                if(icu!==json[attr]){
                    flag=false;
                    }
                	if(attr=='opacity'){
                		obj.style.opacity=(icu+speed)/100;
                		obj.style.filter="alpha(opacity='+(icu+speed)+')";
                	}else{
                		obj.style[attr]=icu+speed+"px";}
               if(flag){
               		clearInterval(obj.time);
               		if(fn){
               			fn();
               		}
               }
            }
            	},30);
        }
        
//图标运动
window.onload=function(){
	var aul=document.getElementById('ball-ul');
	var ali=aul.getElementsByTagName('li');
	for(var i =0;i<ali.length;i++){
		ali[i].onmouseover=function(){
			var _this=this.getElementsByTagName('p')[0];
			startMove(_this,{top:-70,opacity:30},function(){
				 _this.style.top=20+'px';
				startMove(_this,{top:0,opacity:100});
			});
		}
	}
	
	//侧栏图标运动
	var sidebar=document.getElementById('sidebar');
	var side_ali=sidebar.getElementsByTagName('li');
	for(var i=0;i<side_ali.length;i++){
		side_ali[i].onmouseover=function(){
			var _this=this.getElementsByTagName('span')[0];
			startMove(_this,{right:35})
		}
		side_ali[i].onmouseout=function(){
			var _this=this.getElementsByTagName('span')[0];
			startMove(_this,{right:-100})
		}
	}
	
	//英超倒计时
		var bodyh=document.body.offsetHeight+15;
		document.getElementById("all").style.height=bodyh+"px";
		var countDown=document.getElementById('countDown');
		countDown.style.display="block";


	//轮播图
		var container=document.getElementById('container_aa');
		var list=document.getElementById('list');
		var buttons=document.getElementById('buttons').getElementsByTagName('span');
		var prev=document.getElementById('prev');
		var next=document.getElementById('next');
		var index=1;
		var animated;
		var timer;
	
		function animate(count){
			var time = 300;
            var inteval = 10;
            var speed = count/(time/inteval);   //每次位移的距离
			animated=true;
			var leftpx=parseInt(list.style.left)+count;
			
			var go=function(){
				 if ( (speed > 0 && parseInt(list.style.left) < leftpx) || (speed < 0 && parseInt(list.style.left) > leftpx)) {
	                    list.style.left = parseInt(list.style.left) + speed + 'px';
	                    setTimeout(go, inteval);
                   }else{                  
					list.style.left=leftpx+'px'; 
					if(leftpx>-100){
						list.style.left=-3300+'px';
					}
					if(leftpx<=-3300){
						list.style.left='0px';
					}
					animated=false;
			}
		}
			go();
		}
		
		function play(){
			timer=setInterval(function(){
				next.onclick();
			},3000);
		}
		function stop(){
			clearInterval(timer);
		}
		
		function showbutton(){
			for(var i=0;i<buttons.length;i++){
				if(buttons[i].className=="on"){
					buttons[i].className="";
				}
			}
			buttons[index-1].className="on";
		}
		prev.onclick=function(){			
			if(animated){
				return;
			}
			animate(660);
			if(index<2){
				index=5;
			}else{
				index-=1;
			}
			showbutton();
		}
		next.onclick=function(){
			if(animated){
				return;
			}
			animate(-660);		
				if(index>4){
				index=1;
			}else{
				index+=1;
			}
			showbutton();
		}
		for(var i=0;i<buttons.length;i++){
			buttons[i].onclick=function(){
				if(this.className=="on"){
					return;
				}
				if(animated){
				return;
			}
				var myIndex=parseInt(this.getAttribute("index"));
				var offset=-660*(myIndex-index);
				animate(offset);
				index=myIndex;
				showbutton();
			}
		}
		container.onmouseover=stop;
		container.onmouseout=play;
		
		play();

	//面板拖曳
	function drag(){
	   var oDrag=document.getElementById('countDown');
	   oDrag.onmousedown=fnDown;

}

function fnDown(event){
  event = event || window.event;
   var oDrag=document.getElementById('countDown');
   var   disX=event.clientX-oDrag.offsetLeft;
   var   disY=event.clientY-oDrag.offsetTop;
  // 移动
  document.onmousemove=function(event){
  	event = event || window.event;
  	fnMove(event,disX,disY);
  }
  // 释放鼠标
 	document.onmouseup=function(){
	  	document.onmousemove=null;
	  	document.onmouseup=null;
  }
}

function fnMove(e,posX,posY){
  var oDrag=document.getElementById('countDown'),
      l=e.clientX-posX,
      t=e.clientY-posY;
      winW=document.documentElement.clientWidth || document.body.clientWidth,
      winH=document.documentElement.clientHeight || document.body.clientHeight,
      maxW=winW-oDrag.offsetWidth,
      maxH=winH-oDrag.offsetHeight;
if(l<0){
    l=0;
}else if(l>maxW){
    l=maxW;
}
if(t<0){
    t=0;
}else if(t>maxH){
    t=maxH;
}
  oDrag.style.left=l+250+'px';
  oDrag.style.top=t+'px';
}

drag();



//导航定位效果
	$(window).scroll(function(){
	var menuA=$("#menuA");
	var items=$(".item");
	var top=$(document).scrollTop();
	var currentId="";
	items.each(function(){
		var m=$(this);
		if(top>m.offset().top-10){
			currentId="#"+m.attr("id");
		}else{
			return false;
		}
	})
	var linkCurrent=$(".off");
	if(currentId && linkCurrent.attr("href")!=currentId){
		linkCurrent.removeClass("off");
		menuA.find("[href='"+currentId+"']").addClass("off");
	}
	if(top==0){
		linkCurrent.removeClass("off");
		$("#zoo").addClass("off");
	}
})
	//解决菜单定位位置偏移问题
$("#menuA .zoo2").click(function(e){
	var href=$(this).attr("href");
		e.preventDefault();
		$(document).scrollTop($(href).offset().top-70);
})

}

//关闭窗口
	function close1(){
		var floatA=document.getElementById('float');
		floatA.style.display="none";
	}
	function close2(){
		var all=document.getElementById('all');
		all.style.display="none";
	}

//显示球队，隐藏球队
function show1(){
	var totTeam=document.getElementById('tot-team');
	totTeam.style.display="block";
}
function hidden1(){
	var totTeam=document.getElementById('tot-team');
	totTeam.style.display="none";	
}
function show2(){
	var landingWindow=document.getElementById("landingWindow");
	landingWindow.style.display="block";
}
function hidden2(){
	var landingWindow=document.getElementById("landingWindow");
	landingWindow.style.display="none";
}
function show3(){
	var alertpic=document.getElementById("alertpic");
	alertpic.style.display="block"
}
function hidden3(){
	var alertpic=document.getElementById("alertpic");
	alertpic.style.display="none";
}
//倒计时
function count(){
	var nowTime=new Date();
	var endTime=new Date("2016/8/12,1:0:0");
	var leftTime=parseInt((endTime.getTime()-nowTime.getTime())/1000);
	var d=parseInt(leftTime/3600/24);
	var h=parseInt(leftTime/(60*60)%24);
	var m=parseInt(leftTime/60%60);
	var s=parseInt(leftTime%60);
	document.getElementById('countTime').innerHTML=d+"&nbsp天"+"&nbsp&nbsp&nbsp"+h+"&nbsp"+"时" +"&nbsp"+"&nbsp"+"&nbsp"+m+"&nbsp"+"分"+"&nbsp"+"&nbsp"+"&nbsp" +s+"&nbsp"+"秒";
}
setInterval("count()",500);





