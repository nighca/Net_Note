//添加元素#ctr_div,#canvas_div,#canvas,#...

$("html").prepend("<div id=\"ctr_div\" style=\"position:absolute;top:0px;left:0px;background-color:grey;z-index:10002;height:24px;margin:0px 0px 0px 0px\"></div>");
$("#ctr_div").prepend("<div id=\"colorpicker\"></div>");
$("#ctr_div").prepend("<button id=\"back\" style=\"\" title=\"try alt+H\"> &nbsp;Hide&nbsp; </button>");
$("#ctr_div").prepend("<button id=\"clear\" style=\"\" title=\"try alt+C\"> &nbsp;Clear&nbsp; </button>");
//$("#ctr_div").prepend("<button id=\"set\" style=\"\"> &nbsp;Set&nbsp; </button>");
$("#ctr_div").prepend("<span id=\"sp1\"><a href=\"http://www.114la.com/other/rgb.htm\" target=\"_blank\">color_ </a></span><input type=\"text\" id=\"color\" name=\"color\" value=\"#123456\" onMouseOut=\"set_value()\" /><span id=\"sp2\">width_ </span><input id=\"input2\" placeholder=\"4\" value=\"4\" style=\"\" onMouseOut=\"set_value()\" />");
$("#ctr_div").prepend("<img id=\"ni_logo\" src=\"http://nighca.sinaapp.com/favicon.ico\" title=\"try alt+Q\" width=\"30\" height=\"30\">");


$("html").prepend("<div id=\"canvas_div\" style=\"position:absolute;left:0px;top:0px;z-index:10001;margin:0px 0px 0px 0px\"><canvas id=\"canvas\" style=\"position:absolute;left:0px;top:0px;width:100%;height:100%;margin:0xp 0px 0px 0px;cursor:default\"></canvas></div>");

//设置宽高
var canvasWidth = $("html").width(), canvasHeight=$("html").height();
//$("#sp1").html(canvasWidth);//*************************************************
//$("#sp2").html(canvasHeight);//*************************************************
if(document.body.clientWidth>canvasWidth)canvasWidth = document.body.clientWidth;
if(document.body.clientHeight>canvasHeight)	canvasHeight = document.body.clientHeight;
if($("body").width()>canvasWidth)canvasWidth = $("body").width();
if($("body").height()>canvasHeight)	canvasHeight = $("body").height();
//$("#color").val(canvasWidth);//**********************************************
//$("#input2").val(canvasHeight);//**********************************************

//设置样式
$("#canvas_div").css({"width":canvasWidth,"height":canvasHeight});

$("#ctr_div").css({"font-family":"Arial, Helvetica, sans-serif","font-size":"16px","padding":"3px 10px 3px 40px","box-shadow":"0px 0px 8px grey,inset 0px 0px 3px #1F1F1F","cursor":"move","opacity":"0.9","border":"3px solid white"});
$("#ni_logo").css({"position":"absolute","top":"0px","left":"0px","z-index":"10003"});
$("#ctr_div input").css({"margin-right":"12px","text-align":"center","width":"100px","height":"18px"});
$("#ctr_div a").css({"text-decoration":"none","color":"inherit"});
$("#ctr_div span").css({"color":"white"});
$("#ctr_div button").css({"border-style": "none","height":"20px","cursor":"pointer","margin-left":"5px"});
$("#ctr_div #colorpicker").css({"margin-left":"47px","margin-top":"6px","width":"195px","background-color":"white","box-shadow":"0px 4px 8px grey","border":"4px solid white"});
//$("body").css({"cursor":"default"});

$(function() {
	$("#ctr_div").draggable();
	$("#ctr_div").css({"position":"fixed"});
	$('#colorpicker').farbtastic('#color');
	$("#colorpicker").css({"display":"none"});
});

function hide_painting(){
	if($("#canvas_div").css("z-index")==10001){
		$("#canvas_div").css({"z-index":"-1"})
		$("#back").html("&nbsp;Show&nbsp; ");
	}else{
		$("#canvas_div").css({"z-index":"10001"})
		$("#back").html("&nbsp;Hide&nbsp;");
	}
}

$("#color").click(function(){
	//$("#colorpicker").css({"display":"block"});
	$("#colorpicker").toggle("normal");
	});

function clear_painting(){
	clickX = [];
	clickY = [];
	clickDrag = [];
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	}

var painting = true;

$("#ctr_div #ni_logo").click(function(){
	$("#ctr_div").hide("normal");
	});
	
$(document).keydown(function(event){ 
	if(event.altKey&&window.event.keyCode==81){//alt&Q->隐藏/显示设置条
		$("#ctr_div").toggle("normal");	
	}else if(event.altKey&&window.event.keyCode==67){//alt&C->清除笔记
		clear_painting();
	}else if(event.altKey&&window.event.keyCode==72){//alt&H->隐藏/显示笔记
		hide_painting();
	}
}); 

$("#ctr_div #back").click(function(){
	hide_painting();
});

//以下均为canvas实现
var canvasDiv = document.getElementById('canvas_div');
var canvas = document.getElementById('canvas');


var point = {};
point.notFirst = false;

canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);

var point = {};
point.notFirst = false;

//canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
var context = canvas.getContext("2d");
context.strokeStyle = $("#color").val();
context.lineWidth = $("#input2").val();

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
		
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
	//$("#color").val(e.pageX - this.offsetLeft);
	//$("#input2").val(e.pageY - this.offsetTop);//**********************************************
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

function set_value(){
	context.strokeStyle = $("#color").val();
    context.lineWidth = $("#input2").val();
	};
/*
$("#ctr_div #set").click(function(){
	set_value();
});
*/

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

$("#ctr_div #clear").click(function(){
	clear_painting();
	});

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  //canvas.width = canvas.width; // Clears the canvas
  
  
  context.lineJoin = "round";
  
  while (clickX.length > 0 ) {
	  point.bx = point.x;
	  point.by = point.y;
	  
	  point.x = clickX.pop();
	  point.y = clickY.pop();
	  
	  //$("#sp1").html(point.x);
	  //$("#sp2").html(point.y);//*******************************************************
	  
	  point.drag = clickDrag.pop();
	  context.beginPath();
	  if (point.drag && point.notFirst) {
		  context.moveTo(point.bx, point.by);
	  } else {
		  point.notFirst = true;
		  context.moveTo(point.x - 1, point.y);
	  }
     context.lineTo(point.x, point.y);
     context.closePath();
     context.stroke();
	 context.save();
  }
  
  
 }

/*
  for(var i=0; i < clickX.length; i++)
  {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
  */


