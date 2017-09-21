var getMatch = (function($){
	Array.min = function(array){
		return Math.min.apply(Math, array);
	}
	function getMatch(obj){
		this.id = obj.id;
		this.limit1 = obj.limit1;
		this.limit2 = obj.limit2;
		this.$wrap = obj.$wrap;
		this.initial();
	}
	getMatch.prototype = {
		initial: function(){
			var that = this, dates = [], $wrap = that.$wrap;
			$.ajax({
				url: "http://platform.sina.com.cn/sports_all/client_api?app_key=3571367214&_sport_t_=livecast&_sport_a_=typeMatches&team_id=" + that.id + "&limit=" + that.limit1,
				type: "GET",
				dataType: "jsonp",
				success: function(d){
					var dataList = d.result.data, dataListLens = [], datesDiff = [], minDiff, locate, jsonLocate;
					if(!dataList) return;
					for(key in dataList){
						dataListLens.push([key, dataList[key].length]);
						for(subkey in dataList[key]){
							dates.push(dataList[key][subkey].date+" "+dataList[key][subkey].time);
						}
					}
					datesDiff = that.getDateDiff(dates);
					minDiff = Array.min(datesDiff);
					locate = that.searchLocate(datesDiff, minDiff);
					jsonLocate = that.getJsonLocate(dataListLens, locate);
					var rstData = dataList[dataListLens[jsonLocate[0]][0]][jsonLocate[1]],
						status = rstData.match_status,
						$matchStatus = $wrap.find(".match_status"),
						scoreClz,
						linkHtml = "";
					if(status == 3){
						$matchStatus.addClass("match_over").find("label").html("\u5df2\u7ed3\u675f");
						scoreClz = "green";
						rstData.VideoUrl&&(linkHtml+='<a href="' + rstData.VideoUrl + '" target="_blank">\u89c6\u9891\u96c6\u9526</a>');
						rstData.ImgUrl&&(linkHtml+='<a href="' + rstData.ImgUrl + '" target="_blank">\u9ad8\u6e05\u56fe\u96c6</a>');
						rstData.NewsUrl&&(linkHtml+='<a href="' + rstData.NewsUrl + '" target="_blank">\u6218\u62a5</a>');
					} else if(status == 2){
						$matchStatus.addClass("match_on").find("label").html("\u6bd4\u8d5b\u4e2d");
						scoreClz = "green";
                                                videoliveurl = rstData.VideoLiveUrl;
                                                if(videoliveurl.indexOf('smgbb.cn') != -1){
						    var datetime=new Date();
						    var s=datetime.getFullYear()+""+(datetime.getMonth()+1)+""+datetime.getDate()+""+datetime.getHours()+""+datetime.getMinutes()+""+datetime.getSeconds();
						    videoliveurl = videoliveurl.replace(/m.smgbb.cn/, "ssports.smgbb.cn").replace(/m.ssports.smgbb.cn/, "ssports.smgbb.cn") + '?source=sina&subsource=premierleagueIndex&tokenId='+s;
						}
						videoliveurl&&(linkHtml+='<a class="live" href="' + videoliveurl + '" target="_blank">LIVE</a>');
						rstData.LiveUrl&&(linkHtml+='<a href="' + rstData.LiveUrl + '" target="_blank">\u56fe\u6587\u76f4\u64ad</a>');
					} else if(status == 1){
						$matchStatus.addClass("match_will").find("label").html("\u672a\u5f00\u59cb");
						scoreClz = "gray";
                                                videoliveurl = rstData.VideoLiveUrl;
                                                if(videoliveurl.indexOf('smgbb.cn') != -1){
						    var datetime=new Date();
						    var s=datetime.getFullYear()+""+(datetime.getMonth()+1)+""+datetime.getDate()+""+datetime.getHours()+""+datetime.getMinutes()+""+datetime.getSeconds();
						    videoliveurl = videoliveurl.replace(/m.smgbb.cn/, "ssports.smgbb.cn").replace(/m.ssports.smgbb.cn/, "ssports.smgbb.cn") + '?source=sina&subsource=premierleagueIndex&tokenId='+s;
						}
						videoliveurl&&(linkHtml+='<a class="live" href="' + videoliveurl + '" target="_blank">LIVE</a>');
						rstData.LiveUrl&&(linkHtml+='<a href="' + rstData.LiveUrl + '" target="_blank">\u56fe\u6587\u76f4\u64ad</a>');
					}
					$wrap.find(".match_time").html(rstData.date + " " + rstData.time);
					$wrap.find(".match_name").html(rstData.group?(rstData.group+rstData.Round_cn):rstData.Round_cn);
					$wrap.find(".match_teams .match_team").each(function(){
						var $this = $(this), index = $this.index() + 1;
						$this.attr("href", "http://match.sports.sina.com.cn/football/team.php?id=" + rstData["Team" + index + "Id"]+ "&dpc=1");
						$this.find("img").attr("src", rstData["Flag"+index]);
						$this.find(".mt_team_name").attr("title", rstData["Team"+index]).html(rstData["Team"+index]);
						$this.find(".mt_team_score").html(rstData["Score"+index]?rstData["Score"+index]:"0").addClass("mt_team_score_"+scoreClz);
					})
					$wrap.find(".match_links").html(linkHtml);
				},
				error: function(){

				}
			})
			if(!that.limit2) return;
			$.ajax({
				url: "http://platform.sina.com.cn/sports_all/client_api?app_key=3571367214&_sport_t_=livecast&_sport_a_=getTeamPreMatches&id="+that.id+"&limit="+that.limit2,
				type: "GET",
				dataType: "jsonp",
				success: function(d){
					var dataList = d.result.data,
						$matchList = $wrap.find(".match_list");
					if(!dataList) return;
					for(key in dataList){
						var tempData = dataList[key];
						var innerHtml = tempData.date.replace(/^\d+-/,"")+" "+tempData.Team1+" VS "+tempData.Team2;
						$matchList.append('<li title="'+innerHtml+'"><a href="'+tempData.LiveUrl+'" target="_blank">'+innerHtml+'</a></li>')
					}
				},
				error: function(){

				}
			})
		},
		getDateDiff: function(dates){
			var now = new Date();
			now = Date.parse(now);
			var that = this, datesDiff = [];
			for(var i = 0, len = dates.length; i<len; i++){
				if(!isNaN(Date.parse(that.frmtConvert(dates[i])))){
					datesDiff.push( Math.abs(now - Date.parse(that.frmtConvert(dates[i]))));
				}
			}
			return datesDiff;
		},
		searchLocate: function(arrs, elem){
			var locate;
			for(var i=0, len=arrs.length; i<len; i++){
				if(arrs[i] === elem){
					locate = i;
					break;
				}
			}
			return locate;
		},
		getJsonLocate: function(arr, locate){
			var count = 0, result = [];
			for(var i=0,len=arr.length;i<len;i++){
				var tempCount = count;
				count += arr[i][1];
				if(locate>=tempCount && locate<count){
					result = [i, locate-tempCount]
					break;
				}
			}
			return result;
		},
		frmtConvert: function(t){
			return t.replace(/-/g,"/");
		}
	}
	return getMatch;
})(jQuery);
