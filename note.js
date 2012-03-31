// JavaScript Document

function get_script(script_url){
	var s = document.createElement('script');
	s.type='text/javascript';
	s.src=script_url;
	document.body.appendChild(s);
	//void(0);
	};
function get_css(css_url){
	var s = document.createElement('link');
	s.setAttribute("rel","stylesheet");
	s.setAttribute("type","text/css");
	s.setAttribute("href",css_url);
	document.getElementsByTagName("head")[0].appendChild(s);
	
	};
	
	
	
get_script(chrome.extension.getURL("jquery.js"));

var t=setTimeout('get_script(chrome.extension.getURL("jquery-ui-1.8.18.custom.min.js"));',500)
//get_script(chrome.extension.getURL("jquery-ui-1.8.18.custom.min.js"));
var t=setTimeout('get_script(chrome.extension.getURL("farbtastic.js"));',1000)
var t=setTimeout('get_script(chrome.extension.getURL("jfunc.js"));',1500)
//get_script(chrome.extension.getURL("farbtastic.js"));
//get_script(chrome.extension.getURL("jfunc.js"));

get_css(chrome.extension.getURL("farbtastic.css"));
