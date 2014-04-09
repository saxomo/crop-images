// JavaScript Document

function imageCrop(conteinerId,x,y){ 
	var imgs = $(conteinerId+" img"); 
	if($(imgs[imgs.length-1]).height() > 0){ 	
 		var origWidth,origHeight,difX,difY,difXIsBiger;  	
		for(i=0;i<imgs.length;i++){	
			origWidth = parseInt($(imgs[i]).width());
			origHeight = parseInt($(imgs[i]).height()); 
			difX = x/origWidth;	
			difY = y/origHeight;	
			difXIsBiger = difX>difY; 
			$(imgs[i]).css({'width'  : (difXIsBiger?x:origWidth*difY)+'px',
							'height' : (difXIsBiger?(origHeight*difX):y)+'px',
							'margin' : (difXIsBiger?(y-origHeight*difX)*0.5:0)+'px '+(difXIsBiger?0:(x-origWidth*difY)*0.5)+'px '}) ;
	 	} 	 	
	}	
	else{
		setTimeout('imageCrop("'+conteinerId+'",'+x+','+y+')',1000);
	}
}
var cl,c;	

$(document).ready(function(e ) {
	$('#x').bind('change',changeImagesCrop );
	$('#y').bind('change',changeImagesCrop );
	$('#z').bind('change',imagesRotation );
	$('#t').bind('change',imagesOpacity );
	$('img').bind('click',bigImg);		
	changeImagesCrop();
	imagesRotation();
	imagesOpacity();
	c=document.createElement("div");
	c.id="big";
	document.body.appendChild(c); 		
	$("#big").bind('mouseout',fadeBigImg);
})
function bigImg(e){  
	var xx=parseInt($(this).width());
	var yy=parseInt($(this).height());
	var ml=parseInt($(this).css("margin-left"));
	var mt=parseInt($(this).css("margin-top"));
	var a=parseInt($('table').width());
	var b=parseInt($('table').height());
	var ax=$('table').offset(); 
	var diff=a>b?a/xx:b/yy; 

	cl=$(this).clone();
	
	$("#big").css({"position":"absolute",
		       "left":ax.left,
		       "top":ax.top,
		       "overfow":"hidden"});
		$(c ).html(cl); 
		$(cl).css("margin-left",ml*diff+"px");
		$(cl).css("margin-top",mt*diff+"px");
		$(cl).animate({"width":(a-2*ml*diff),
			       "height":(b-2*mt*diff)}, 550);
	
}  
function fadeBigImg( ){   
	$(cl).fadeOut("slow");	    
		}	 
 
function changeImagesCrop(evt){ 
 	imageCrop('#imageTable',$('#x').val(),$('#y').val());
}

function imagesRotation(evt) {
    var r = $('#z').val();
  	var css = 'rotate(' + r + 'deg)';
  	if( navigator.userAgent == "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0")
  	$('img').css('-moz-webkit-transform', css);
  	else
  		$('img').css('-webkit-transform', css);
}
 
function imagesOpacity(evt) {
  	$('img').css({'opacity':  $('#t').val()*0.01});
}
