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
$(document).ready(function() { 
		$('#x').bind('change',changeImagesCrop );
		$('#y').bind('change',changeImagesCrop );
		$('#z').bind('change',imagesRotation );
		$('#t').bind('change',imagesOpacity );
		changeImagesCrop();
		imagesRotation();
		imagesOpacity();
})
function changeImagesCrop(evt){ 
	var x = $('#x').val();
	var y = $('#y').val();
 imageCrop('#imageTable',x,y);
}
function imagesRotation(evt) {
  		var r = $('#z').val();
  		var css = 'rotate(' + r + 'deg)';
  		$('img').css('-webkit-transform', css);
} 
function imagesOpacity(evt) {
  		var o = $('#t').val();
  		$('img').css({'opacity': o*0.01});
}