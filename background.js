//var noting = new Array(false,false,false,false,false,false,false,false)
var noting = false;

function reset(){
	noting = false;
	chrome.browserAction.setIcon({path:"icon.png"});
}

function main() {
	if(!noting){
		chrome.tabs.executeScript(null, {file:"note.js"});
		chrome.browserAction.setIcon({path:"icon.png"});
		//noting = true;
	}
	else{
		//chrome.tabs.captureVisibleTab(null, {"format":"jpeg"}, function(imgUrl){alert(imgUrl);});
		//reset();
		return;
	}
}

chrome.browserAction.onClicked.addListener(main);
