/**
 * 楠炲灝鎲￠弮銉р柤閸掋倖鏌�
 * @param {Mix} ranges 閹烘帗婀￠弮鍫曟？濞堢绱濋崣顖欎簰閺勵垯绔存稉顏勭摟缁楋缚瑕嗛敍灞惧灗閼板懍绔存稉顏呮殶閹诡噯绱濈悰銊с仛婢舵矮閲滈弮鍫曟？濞堝吀绶ユ俊锟�:
 * [
 *   '2013-6-21',                              //2013-6-21閸忋劌銇�
 *   '2013-6-22~2013-6-23',                    //2013-6-22閸掞拷2013-6-23閸忋劌銇�
 *   '2013-6-24 12:3:4~2013-6-25 12:13:20',    //2013-6-24 12:3:4閸掞拷2013-6-25 12:13:20
 *   '9:00:00~12:59:59',                       //濮ｅ繐銇�9:00:00閸掞拷12:59:59
 *   '9:00:00~8:59:59'                         //9:00:00 閸掓壆顑囨禍灞姐亯閺冣晙绗� 8:59:59
 * ] 閹存牞鈧拷
 * 閸忔湹鑵戞稉鈧稉顏勭摟缁楋缚瑕嗚ぐ鎾冲棘閺侊拷
 *
 * @usage
 *   var schedule = new Schedule(ranges);
 *   濡偓閺屻儲妲搁崥锕€婀幒鎺撴埂閸愬懐娈戦弬瑙勭《
 *   schedule.check('2013-06-21 6:0:0');  娑撯偓娑撶嫞ate鐎电钖勯幋鏍偓鍛）閺堢喎鐡х粭锔胯閸楀啿褰�
 */

function Schedule(ranges) {
    ranges = 'string' === typeof ranges ? [ranges] : ranges || [];

    this.ranges = [];

    var range,
        i = 0,
        len = ranges.length,
        start,
        end,
        now = new Date(),
        todayStr = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();

    for (; i < len; i++) {
        range = ranges[i].replace(/\-/g, '/').split('~');

        start = range[0];
        end = range[1] ? range[1] : range[0]; //"2013-6-21" -> "2013-06-21, 2013-06-21"

        //"2013-6-21" -> '2013-6-21 0:0:0'
        if (start.indexOf(':') === -1) {
            start += ' 0:0:0';
        }
        if (end.indexOf(':') === -1) {
            end += ' 0:0:0';
        }

        //"10:0:0" -> "2013-6-21 10:0:0" today 10:0:0
        if (start.indexOf('/') === -1) {
            start = todayStr + ' ' + start;
        }
        if (end.indexOf('/') === -1) {
            end = todayStr + ' ' + end;
        }

        start = +this.parse(start);
        end = +this.parse(end);

        //閸氬酣娼伴惃鍕闂傚瓨鐦崜宥夋桨閻ㄥ嫬鐨敍灞藉灟鐞涖劍妲戠捄銊ャ亯閿涘苯顤冮崝鐘辩婢垛晜妞傞梻锟�
        if (end <= start) {
            end += 1000 * 60 * 60 * 24;
        }

        this.ranges[i] = [start, end];
    }
}

Schedule.prototype = {
    /**
     * 濡偓閺屻儲妲搁崥锕€婀弮銉р柤閼煎啫娲块崘锟�
     * @param  {String | Date} time 鐟曚焦顥呴弻銉ф畱閺冦儲婀�
     * @return {Boolean}            閺勵垰鎯侀崷銊︽）缁嬪鍞�
     */
    check: function(time) {
        var ranges = this.ranges,
            i = 0,
            range,
            result = ranges.length <= 0,
            time = time ? (+this.parse(time)) : (+new Date()); //濞岋紕绮伴弮鍫曟？閿涘奔濞囬悽銊ョ秼閸撳秵妞傞梻瀛橆梾閺岋拷

        while (!result && (range = ranges[i++])) {
            result = time >= range[0] && time <= range[1];
        }
        return result;
    },
    /**
     * 鐟欙絾鐎介弬瑙勭《
     * @tangram T.date.parse
     */
    parse: function(time) {
        var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
        if ('string' == typeof time) {
            if (reg.test(time) || isNaN(Date.parse(time))) {
                var d = time.split(/ |T/),
                    d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0],
                    d0 = d[0].split(/[^\d]/);
                return new Date(d0[0] - 0,
                    d0[1] - 1,
                    d0[2] - 0,
                    d1[0] - 0,
                    d1[1] - 0,
                    d1[2] - 0);
            } else {
                return new Date(time);
            }
        }

        return time;
    }
};

/*
//usage
//test 2013-6-21
var schedule = new Schedule([
    //'2013-6-21',                              //2013-6-21閸忋劌銇�
    //'2013-6-22~2013-6-23',                    //2013-6-22閸掞拷2013-6-23閸忋劌銇�
    //'2013-6-24 12:3:4~2013-6-25 12:13:20',    //2013-6-24 12:3:4閸掞拷2013-6-25 12:13:20
    //'9:00:00~12:59:59',                        //濮ｅ繐銇�9:00:00閸掞拷12:59:59
    '9:00:00~8:59:59'                         //9:00:00 閸掓壆顑囨禍灞姐亯閺冣晙绗� 8:59:59
]);
schedule.check(+new Date('2013/6/21 8:0:0'));
*/

(function() {
    /**
     * 鐠恒劌鐡欓崺鐔风摠閸岊煉绱漣e6,7娴ｈ法鏁ser data鐎涙ê鍋嶉敍灞藉従鐎瑰啯绁荤憴鍫濇珤娴ｈ法鏁ocalstorage
     * @example
     *    // sina.com.cn閸╋拷,閺佺増宓佺€涙ê婀猲ews.sina.com.cn娑擄拷
     *      var Store = window.___CrossDomainStorage___;
     *    Store..ready(function(st){
     *      st.set('key','value');
     *      var data = st.get('key');
     *    });
     *    // 婵″倹鐏夐悽銊ょ艾闂堢€瀒na.com.cn閸╃噦绱濋棁鈧憰浣筋啎缂冾噯绱濇俊锟�
     *    Store.config({
     *      // 鐠佸墽鐤嗘い鍓侀獓閸╋拷
     *      domain:'weibo.com',
     *      // 閸欐垵绔烽崪瀹tp://news.sina.com.cn/iframe/87/store.html娑撯偓閺嶉娈戞禒锝囨倞妞ょ敻娼伴敍灞间簰閸氬孩鏆熼幑顕€鍏樼€涙ê婀猟ata.weibo.com娑擄拷
     *      url:'data.weibo.com/xx/xx/store.html'
     *    }).ready(function(st){
     *      st.set('key','value');
     *      var data = st.get('key');
     *    });
     */
    ;
    (function(exports, name) {
        var fns = [];
        var isReady = 0;
        var iframeStore = null;
        var EXPORTNAME = name || '___SinaadsMonBoxCrossDomainStorage___';
        var HANDLE = EXPORTNAME + '.onReady';
        var opt = {
            domain: 'sina.com.cn',
            url: 'http://d2.sina.com.cn/litong/zhitou/adJs/store.html'
        };
        var ERROR = {
            domain: 'fail to set domain!'
        };
        var loadStore = function() {
            if (iframeStore) {
                return;
            }
            try {
                document.domain = opt.domain;
            } catch (e) {
                throw new Error(ERROR.domain);
            }
            var node = document.getElementById(EXPORTNAME);
            if (node) {
                node.parentNode.removeChild(node);
            }
            var iframeWrap = document.createElement('div');
            var doc = document.body;
            var iframe = '<iframe src="' + opt.url + '?handle=' + HANDLE + '&domain=' + opt.domain + '" frameborder="0"></iframe>';
            var px = '-' + 1e5 + 'em';
            iframeWrap.style.position = 'absolute';
            iframeWrap.style.left = px;
            iframeWrap.style.top = px;
            iframeWrap.className = 'hidden';
            iframeWrap.id = EXPORTNAME;
            iframeWrap.innerHTML = iframe;
            doc.insertBefore(iframeWrap, doc.childNodes[0]);
        };

        var checkReady = function() {
            if (!isReady) {
                loadStore();
            }
            return isReady;
        };
        var CrossDomainStorage = {};
        CrossDomainStorage.ready = function(fn) {
            if (!checkReady()) {
                //ifrmae鏉╂ɑ鐥呴崝鐘烘祰
                fns.push(fn);
                return;
            }
            fn(iframeStore);
        };
        CrossDomainStorage.onReady = function(store) {
            if (isReady) {
                return false;
            }
            isReady = 1;
            iframeStore = store;
            if (fns) {
                while (fns.length) {
                    fns.shift()(store);
                }
            }
            fns = null;
        };
        CrossDomainStorage.config = function(o) {
            if (!o) {
                return false;
            }
            for (var i in o) {
                if (o.hasOwnProperty(i)) {
                    opt[i] = o[i] || opt[i];
                }
            }
            return this;
        };
        exports[EXPORTNAME] = CrossDomainStorage;
    })(window);
})();
setTimeout(function() {
    var date = new Date().getDay();
    debugger;
    if (5 === date || 2 === date || 6 === date) {
        sinaadToolkit.sio.loadScript("http://d1.sina.com.cn/litong/zhitou/sinaads/demo/changwy/monboxMedia_jsb_2016.js", function() {
            var scheduleDate = new Schedule([
                    '2016-01-01','2016-01-12','2016-01-15','2016-01-22','2016-02-02','2016-02-05','2016-02-12','2016-02-26','2016-03-01',
                    '2016-03-04','2016-03-11','2016-03-18','2016-04-01','2016-04-08','2016-04-15','2016-04-22','2016-04-29','2016-05-06',
                    '2016-05-14'
                ]),
                scheduleTime = new Schedule([
                    '16:00:00~18:00:00'
                ]),
                jsbShowLimit = 2,
                jsbShow,
                jsbTime,
                Store = window.___SinaadsMonBoxCrossDomainStorage___;
            try {
                document.execCommand('BackgroundImageCache', false, true);
            } catch (e) {}

            if (scheduleDate.check() && scheduleTime.check()) {
                Store.ready(function(st) {
                    var timeOut = (typeof st.get('jsbTime') !== 'undefined' ? st.get('jsbTime') : (+new Date())),
                        check = (+new Date()) - timeOut;
                    if (check > 12 * 60 * 60 * 1000) {
                        st.set('jsb', 1);
                    }
                    jsbShow = (typeof st.get('jsb') !== 'undefined' ? st.get('jsb') : 1);

                    if (jsbShowLimit > jsbShow) {
                        var monbox = new sinaadToolkit.MonBoxMediajsb({});
                        monbox.show();
                        st.set('jsb', (jsbShow + 1));
                        st.set('jsbTime', +new Date());
                    }
                });
            }
        });
    }

},3000);