var full = get("full");

function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}


function detectHandset(mobi_redirect) {

        var checkCookie = getCookie("mh_handset_detector");

	var userAgent = navigator.userAgent.toLowerCase();

	var isiPad = navigator.userAgent.match(/iPad/i) != null;

	isUserAgentMobile =!!(userAgent.match(/(iPhone|iPod|blackberry|android|htc|kindle|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i));

	//isUserAgentMobile = true;

	var redir = true;

	if (isiPad) {
		redir = false;
	}

	if (document.referrer.indexOf(mobi_redirect) >= 0 ) {
		redir = false;

	}

	if (full == "1"){
		redir = false;
		setFullCookie();
	}

	if (isUserAgentMobile && redir == true) {
		if (null == checkCookie || checkCookie == ''){

			var check = "http://";
			var checkhttps = "https://";
			var start = mobi_redirect.substr(0,check.length);
			var starthttps = mobi_redirect.substr(0,checkhttps.length);

			if (check === start || checkhttps == starthttps){
				document.location.href = mobi_redirect;
			}
			else{
				document.location.href = "http://" + mobi_redirect;
			}
		}
	}

}

function setFullCookie(){
	setCookie("mh_handset_detector", "true", 10);
	//location.href='/';
}


function setCookie(c_name, value, minutes) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + minutes*60000);
    var c_value = escape(value) +
        ((exdate == null) ? "" : ("; expires=" + exdate.toUTCString()));
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}