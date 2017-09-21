
window.onload=function(){
showTime();
$('.content_box').each(function(){

	$(this).mouseout(function(){
		$(this).find('div.content_intro').addClass('move2');
	})
})

					
		
	 	}
 function checkTime(i){  //补位处理
      if(i<10){
          i="0"+i;
      }

   return i;
  }
  function showTime(){
    var now=new Date();
    var year=now.getFullYear();
    var month=  now.getMonth()+1 ;
    var day=  now.getDate()  ;
    var h=now.getHours()  ;
    var m=now.getMinutes()  ;
    var s=now.getSeconds()  ;
    m=checkTime(m)
    s=checkTime(s)

    var weekday=new Array(7)
    weekday[0]="星期日"
    weekday[1]="星期一"
    weekday[2]="星期二"
    weekday[3]="星期三"
    weekday[4]="星期四"
    weekday[5]="星期五"
    weekday[6]="星期六"
    var d=now.getDay();
    document.getElementById("show2").innerHTML=""+year+"年"+month+"月"+day+"日 "+ weekday[d]+" "+h+":"+m+":"+s;
    t=setTimeout('showTime()',500)
  }
