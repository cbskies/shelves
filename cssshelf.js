/**
* @file
* JS file which builds 3D shelves using CSS3 for preview and production use for the display of web content.
*/

/*
CSS Shelves - js/css program for the design and use of 3D CSS shelving systems in the display of web content.
Copyright (C) 2014  Michael S. Wright, michael@ms-wright.com, http://ms-wright.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/


//Make so backgrounds can be a colors as well
//Need to figure out limitations on dimensions and create errors accordingly
//on very wide designs with deep depths the top gets missaligned?
//Need to setup so it caches nicely
/*

bottom back size on makesquare
92 tsize
81 x 93 back size

50
44 x 51

100
97.5 x 111
*/

//jQuery.noConflict(true);
//alert(jQuery.fn.jquery); // Lets you know what version of jQuery is present


//var shelvesControl = 'HTML';
//var shelvesControl = 'Drupal';
//	alert(document.location);

	scriptLoc = jQuery('#cssshelf').attr('src');
	sLoc = scriptLoc.split('/');
	thisscript = sLoc.pop();
	scriptLoc = sLoc.join('/');
	//alert(scriptLoc + '  ' + thisscript);

	constructions = [];
	loadConstructions();

jQuery(document).ready(function() {
	if (typeof shelvesControl == 'undefined') {
		shelvesControl = 'default';
	}

	setDivs();

//	update();
jQuery(window).load(function() { update(); });

	buildCMScontrols();
	buildDesignSelect();

});

function fixRelativeURLs(url) {
/*	if ((typeof url != 'undefined') && (isNaN(url))) {
		if (url.match(/^images/)) {
			url = scriptLoc + '/' + url;
		}
	} else {
		url = '';
	} */
	return url;
}

function setCss(cclass, property, value) {
	jQuery(cclass).css(property, value);
	mycss = mycss + cclass + '=' + property + ': ' + value + ";|";
	//jQuery('#data').append(cclass + ' ' + property + ' = ' + value + "<br>");
}

function demval(dem) {
	var t = String(dem);
	if (!(t)) {
		t = '0px';
	}
	if (!(t.match(/[^0-9\.]/))) {
		t = t + 'px';
	}
//alert(t);
return t;
}

function update() {
mycss = '';
myOb = printObject(medium);
jQuery('#data').html(myOb);

buildOptionalDivs();
//fixRelativeURLs(medium);

setCss('.stleft', 'background-image', 'url(\'' + fixRelativeURLs(medium.trimleftimg) + '\')');
setCss('.stright', 'background-image', 'url(\'' + fixRelativeURLs(medium.trimrightimg) + '\')');
setCss('.shelves-top-face', 'background-image', 'url(\'' + fixRelativeURLs(medium.topfaceimg) + '\')');
setCss('.shelf-face', 'background-image', 'url(\'' + fixRelativeURLs(medium.faceimg) + '\')');
setCss('.svright', 'background-image', 'url(\'' + fixRelativeURLs(medium.verticalrightimg) + '\')');
setCss('.svleft', 'background-image', 'url(\'' + fixRelativeURLs(medium.verticalleftimg) + '\')');
setCss('.shelf-bottom-child', 'background-image', 'url(\'' + fixRelativeURLs(medium.bottomimg) + '\')');
setCss('.shelf-top-child', 'background-image', 'url(\'' + fixRelativeURLs(medium.bottomimg) + '\')');

var shadowlength = demval(medium.shadowlength);
setCss('.shelf-back-shadow', 'height', shadowlength);
setCss('.shelf-vertical-shadow', 'height', shadowlength);
setCss('.svsleftbottom', 'height', shadowlength);
setCss('.svsrightbottom', 'height', shadowlength);
setCss('.shelf-back-shadow-bottom', 'height', shadowlength);

setCss('.shelves', 'background-color', medium.containerbackground);
setCss('.shelves-top-spacer', 'height', demval(medium.topspace));

//Dimensions
tilesAcross = Number(medium.unitspan);
//if build is not makesquare tilesAcross is simply the width in pixels
tsize = Number(medium.unitwidth); //shouldn't be here on regular width build but due to legacy build of designs is here as default background size 
pixelwidth = Number(medium.pixelwidth);

if (medium.makesquare) {
// Build is tile type
	shelfWidth = tilesAcross * tsize;
} else {
	shelfWidth = pixelwidth;
	//need to either make a minimum width or put controls outside of preview shelf
}
if (shelfWidth < 400) {
	shelfWidth = 400;
}
if (shelfWidth > 2000) {
	shelfWidth = 2000;
}

//jQuery('.shelf-parent, .shelves').css('width', shelfWidth + 'px');
setCss('.shelf-parent', 'width', shelfWidth + 'px');
setCss('.shelves', 'width', shelfWidth + 'px');

	cleanperspective(1);


//Shelf Face
		if (medium.faceheight != '') {		   
			shelfFH = Number(medium.faceheight);
		} else {
			shelfFH = tsize;
		}

/*		if (medium.customFaceBackSize != '') {
			shelfFBS = medium.customFaceBackSize;
		} else {
			shelfFBS = tsize + 'px';
		}*/
		if (medium.facebiw || medium.facebih) {
			if (!medium.facebiw) {
				medium.facebiw = 'auto';
			}
			if (!medium.facebih) {
				medium.facebih = 'auto';
			}
			var shelfFBS = medium.facebiw + ' ' + medium.facebih;
		} else {
			shelfFBS = tsize + 'px';
		}

//	jQuery('.shelf-face')
//		.css('height', shelfFH + 'px')
//		.css('background-size', shelfFBS);
	setCss('.shelf-face', 'min-height', shelfFH + 'px');
	setCss('.shelf-face', 'background-size', shelfFBS);

//Shelf Bottom
halfWidth = shelfWidth / 2;

	jQuery('.shelf-bottom-parent')
		.css('width', shelfWidth + 'px')
		.css('perspective', halfWidth + 'px')
		.css('-webkit-perspective', halfWidth + 'px');
	setCss('.shelf-bottom-parent', 'bottom', '0px');

	if (medium.shelfdepth != '') {
		tsizeShelf = Number(medium.shelfdepth);
	} else {
		tsizeShelf = tsize;
	}

	setCss('.shelf-bottom-child', 'height', tsizeShelf + 'px');
	setCss('.shelf-top-child', 'height', tsizeShelf + 'px');

shelfbottom = jQuery('.shelf-bottom-child');

var demsCh = shelfbottom[0].getBoundingClientRect();
var i = 1;
var childW = demsCh.width;
while ((childW > shelfWidth) && (i < 1000)) {
	newWidth = Math.round(shelfWidth - i);
	newPers = Math.round(newWidth / 2);
	jQuery('.shelf-bottom-parent')
		.css('width', newWidth + 'px')
		.css('-webkit-perspective', newPers + 'px')
		.css('perspective', newPers + 'px');
	demsCh = shelfbottom[0].getBoundingClientRect();
	childW = Math.round(demsCh.width);
	i++;
//jQuery('#data').append(childW + 'cwidth' + shelfWidth + 'shelfwidth' + newWidth + 'newwidth' + Math.round(newWidth / 2) + 'newhalfwidth<br>');
}
	setCss('.shelf-bottom-parent', 'width', newWidth + 'px');
	setCss('.shelf-bottom-parent', '-webkit-perspective',  newPers + 'px');
	setCss('.shelf-bottom-parent', 'perspective',  newPers + 'px');
	setCss('.shelf-top-parent', 'width', newWidth + 'px');
	setCss('.shelf-top-parent', '-webkit-perspective',  newPers + 'px');
	setCss('.shelf-top-parent', 'perspective',  newPers + 'px');


demssbB = shelfbottom[0].getBoundingClientRect();

	if (medium.bottombiw || medium.bottombih) {
		if (!medium.bottombiw) {
			medium.bottombiw = 'auto';
		}
		if (!medium.bottombih) {
			medium.bottombih = 'auto';
		}
		var insideShelfHBsize = medium.bottombiw + ' ' + medium.bottombih;
	} else {
		if (medium.makesquare) {
			insideShelfHBsize = Math.round(newWidth / tilesAcross) + 'px ' + (tsize + 1) + 'px';
		} else {
			insideShelfHBsize = tsize + 'px';
		}
	}

//	jQuery('.shelf-bottom-child')
//		.css('background-size', insideShelfHBsize);
	setCss('.shelf-bottom-child', 'background-size', insideShelfHBsize);
	setCss('.shelf-top-child', 'background-size', insideShelfHBsize);

//Inside Verticals

insideVertWidth = Math.round(demssbB.height);
	
if (medium.verticalbiw || medium.verticalbih) {
	if (!medium.verticalbiw) {
		medium.verticalbiw = 'auto';
	}
	if (!medium.verticalbih) {
		medium.verticalbih = 'auto';
	}
	var insideShelfVBsize = medium.verticalbiw + ' ' + medium.verticalbih;
} else {
	insideShelfVBsize = insideVertWidth + 'px ' + tsize + 'px';
}

/*
if (medium.faceheight != '') {
	vertup = medium.faceheight;
} else {
	vertup = tsize;
}
*/

//jQuery('.shelf-vertical')
//	.css('width', insideVertWidth + 'px')
//	.css('background-size', insideShelfVBsize)
//	.css('bottom', vertup + 'px');
	setCss('.shelf-vertical', 'width', insideVertWidth + 'px');
	setCss('.shelf-vertical', 'background-size',  insideShelfVBsize);
//	setCss('.shelf-vertical', 'bottom', vertup + 'px');
//jQuery('.shelf-vertical-shadow, .shelf-back-shadow')
//	.css('top', vertup + 'px');
//	setCss('.shelf-back-shadow', 'top', vertup + 'px');
//	setCss('.shelf-back-shadow', 'top', vertup + 'px');
//	setCss('.shelf-vertical-shadow', 'top', vertup + 'px');
//	setCss('.shelf-vertical-shadow', 'top', vertup + 'px');

backWidth = Math.round(shelfWidth - (demssbB.height * 2));

//Shelf Back
if (medium.backimg) {
	//jQuery('.shelf-back').css('background-image', 'url(\'' + fixRelativeURLs(medium.backimg) + '\')');
	setCss('.shelf-back', 'background-image', 'url(\'' + fixRelativeURLs(medium.backimg) + '\')');

			if (medium.backbiw || medium.backbih) {
				if (!medium.backbiw) {
					medium.backbiw = 'auto';
				}
				if (!medium.backbih) {
					medium.backbih = 'auto';
				}
				var backBS = medium.backbiw + ' ' + medium.backbih;
			} else {
				if (medium.makesquare) {
					backTwidth = Math.round(backWidth / tilesAcross);
					backBS = backTwidth + 'px ' + tsize + 'px';
				} else {
					backBS = tsize + 'px';
				}
			}

//	jQuery('.shelf-back')
//		.css('width', backWidth + 'px')
//		.css('bottom', backUp + 'px')
//		.css('background-size', backBS);
	setCss('.shelf-back', 'background-size', backBS);
} else {
	jQuery('.shelf-back').removeAttr('style')
}
// Still need the back div for shadows
backUp = Math.round(demssbB.height);
setCss('.shelf-back', 'width', backWidth + 'px');
setCss('.shelf-back', 'bottom', backUp + 'px');

//Shelf Padding
if (medium.contentpadding) {
	shelfPadding = medium.contentpadding;
} else {
	shelfPadding = Math.round(demssbB.height / 2);
}
//jQuery('.shelf')
//	.css('padding', shelfPadding + 'px');
	setCss('.shelf', 'padding', shelfPadding + 'px');

//Align Squares if needed
if ((medium.alignsquares) && (medium.makesquare)) {
//	jQuery('.shelf')
//		.css('padding', shelfPadding + 'px ' + shelfPadding + 'px ' + shelfPadding + 'px ' + shelfPadding + 'px');
	shelfs = jQuery('.shelf');
	for (var sp = 0; sp < shelfs.length; sp++) {
		jQuery('.shelf:eq(' + sp + ')').css('height', 'auto');
		var spHeight = jQuery('.shelf:eq(' + sp + ')').outerHeight();
		var more = ((spHeight + (shelfPadding * 2)) % tsize);
		if (more > 0) {
			spNewHeight = Math.round(spHeight + (tsize - more));
			jQuery('.shelf:eq(' + sp + ')').css('height', spNewHeight + 'px');
		}
	}
	shelfFaces = jQuery('.shelf-face');
	for (var sp = 0; sp < shelfFaces.length; sp++) {
		jQuery('.shelf-face:eq(' + sp + ')').css('height', 'auto');
		spHeight = jQuery('.shelf-face:eq(' + sp + ')').outerHeight();
		more = (spHeight % tsize);
		if (more > 0) {
			spNewHeight = Math.round(spHeight + (tsize - more));
			jQuery('.shelf-face:eq(' + sp + ')').css('min-height', spNewHeight + 'px');
		}
	}
} else {
	jQuery('.shelf').css('height', 'auto');
}
//Adjust the height position of the shelf bottom so it sits on top of the shelf face.
if (customFace == 1) {
	shelfface = jQuery('.shelf-face');
	for (var f=0; f<shelfface.length; f++) {
		var demssbC = shelfbottom[f].getBoundingClientRect();
		var demssfC = shelfface[f].getBoundingClientRect();
		var newUpC = Math.round(demssbC.bottom - demssfC.top);
		jQuery('.shelf-bottom-parent:eq('+f+')')
			.css('bottom', newUpC + 'px');
	}
	demssf = shelfface[0].getBoundingClientRect();
} else {
	shelfface = jQuery('.shelf-face:eq(0)');
	demssb = shelfbottom[0].getBoundingClientRect();
	demssf = shelfface[0].getBoundingClientRect();

	newUp = Math.round(demssb.bottom - demssf.top);

	//	jQuery('.shelf-bottom-parent')
	//		.css('bottom', newUp + 'px');
	setCss('.shelf-bottom-parent', 'bottom', newUp + 'px');
}



//Shelf Content Wrapper
removeOldWrap();
if (medium.contentwrap) {

	if (medium.contenthangers) {
		var prefix = medium.contentprefix + '<div class="hangers"><div class="hangerleft"></div><div class="hangerright"></div></div>';
	} else {
		var prefix = medium.contentprefix;
	}
/*
	if (medium.contentswingonload) {
		var regex = /(class\=\"shelf-wrap\")/;
		var add = ' style="-webkit-animation-name: swing; animation-name: swing;"';
		prefix = prefix.replace(regex, "$1" + add);
	}
*/

	shelves = jQuery('.shelf');
	for (var s = 0; s < shelves.length; s++) {
		tmpContent = jQuery('.shelf:eq(' + s + ')').html();
		tmpContent = '<!--cwrap-->' + prefix + '<!--cwrap-->' + tmpContent;
		tmpContent = tmpContent + '<!--cwrap-->' + medium.contentsuffix + '<!--cwrap-->';
		jQuery('.shelf:eq(' + s + ')').html(tmpContent);
		
	}

	jQuery('.swingcss').remove();
	if (medium.contentswingonhover || medium.contentswingonload) {
		var cssdiv = "<div class=\"swingcss\"><style>\n";
		var newcss = '';
		if (medium.contentswingonload) {
			newcss = newcss + ".shelf-wrap {\n-webkit-animation-name: swing;\n-webkit-transform-origin: center top;\n-webkit-animation-duration: 5s;\n-webkit-animation-iteration-count: 1;\n";
			newcss = newcss + "animation-name: swing;\ntransform-origin: center top;\nanimation-duration: 5s;\nanimation-iteration-count: 1;\n}\n\n";
		}
		if (medium.contentswingonhover) {
			newcss = newcss + ".shelf-wrap:hover {\n-webkit-animation-name: swingh;\n-webkit-transform-origin: center top;\n-webkit-animation-duration: 5s;\n-webkit-animation-iteration-count: 1;\n";
			newcss = newcss + "animation-name: swingh;\nanimation-duration: 5s;!animation-fill-mode: both;\nanimation-iteration-count: 1;\n}\n\n";
		}
		cssdiv = cssdiv + newcss + "</style></div>\n";
		jQuery('.shelf:eq(0)').prepend(cssdiv);
		medium.additionalcss = newcss;
	}
}


//Trim
if (medium.trim) {
	if (medium.trimwidth != '') {
		trimWidth = Number(medium.trimwidth);
	} else {
		trimWidth = tsize;
	}
	if (medium.trimbiw || medium.trimbih) {
		if (!medium.trimbiw) {
			medium.trimbiw = 'auto';
		}
		if (!medium.trimbih) {
			medium.trimbih = 'auto';
		}
		var trimBS = medium.trimbiw + ' ' + medium.trimbih;
	} else {
		trimBS = tsize + 'px';
	}
//	jQuery('.shelves-trim')
//		.css('width', trimWidth + 'px')
//		.css('background-size', trimBS);
	setCss('.shelves-trim', 'width',  trimWidth + 'px');
	setCss('.shelves-trim', 'background-size', trimBS);

} else {
	trimWidth = 0;
}

//Top Face
topFaceWidth = Math.round(shelfWidth + (trimWidth * 2));

if (medium.topface) {
	if (medium.topfacebiw || medium.topfacebih) {
		if (!medium.topfacebiw) {
			medium.topfacebiw = 'auto';
		}
		if (!medium.topfacebih) {
			medium.topfacebih = 'auto';
		}
		var shelfTFBS = medium.topfacebiw + ' ' + medium.topfacebih;
	} else {
		var shelfTFBS = shelfFBS;
	}
	if (medium.topfaceheight != '') {
		var shelfTFH = medium.topfaceheight;
	} else {
		var shelfTFH = shelfFH;
	}
//	jQuery('.shelves-top-face')
//		.css('width', topFaceWidth + 'px')
//		.css('height', shelfTFH + 'px')
//		.css('background-size', shelfTFBS);
	setCss('.shelves-top-face', 'width', topFaceWidth + 'px');
	setCss('.shelves-top-face', 'height', shelfTFH + 'px');
	setCss('.shelves-top-face', 'background-size', shelfTFBS);

}

//Top Top

if (medium.toptop) {
topFaceHalf = Math.round(topFaceWidth / 2);
	jQuery('.shelves-top-top-parent')
		.css('width', topFaceWidth + 'px')
		.css('perspective', topFaceHalf + 'px')
		.css('-webkit-perspective', topFaceHalf + 'px');


	if (medium.shelfdepth != '') {
		tsizeShelf = Number(medium.shelfdepth);
	} else {
		tsizeShelf = tsize;
	}

//	jQuery('.shelves-top-top-child')
//		.css('height', tsizeShelf + 'px')
//		.css('background-image', 'url(\'' + fixRelativeURLs(medium.toptopimg) + '\')');
	setCss('.shelves-top-top-child', 'height',  tsizeShelf + 'px');
	setCss('.shelves-top-top-child', 'background-image', 'url(\'' + fixRelativeURLs(medium.toptopimg) + '\')');


toptop = jQuery('.shelves-top-top-child:eq(0)');

var demsCh = toptop[0].getBoundingClientRect();
var i = 1;
var childW = demsCh.width;
while ((childW > topFaceWidth) && (i < 1000)) {
	newWidth = Math.round(topFaceWidth - i);
	newPers = Math.round(newWidth / 2);
	jQuery('.shelves-top-top-parent')
		.css('width', newWidth + 'px')
		.css('-webkit-perspective', newPers + 'px')
		.css('perspective', newPers + 'px');
	demsCh = toptop[0].getBoundingClientRect();
	childW = Math.round(demsCh.width);
	i++;
}
	setCss('.shelves-top-top-parent', 'width', newWidth + 'px');
	setCss('.shelves-top-top-parent', '-webkit-perspective', newPers + 'px');
	setCss('.shelves-top-top-parent', 'perspective', newPers + 'px');

if (medium.topface) {
	topface = jQuery('.shelves-top-face:eq(0)');
} else {
	topface = jQuery('.shelves');
}
demstf = topface[0].getBoundingClientRect();
	
demsttB = toptop[0].getBoundingClientRect();
newUp = Math.round(demsttB.bottom - demstf.top);

//	jQuery('.shelves-top-top-parent')
//		.css('bottom', newUp + 'px');
	setCss('.shelves-top-top-parent', 'bottom', newUp + 'px');

	if (medium.toptopbiw || medium.toptopbih) {
		if (!medium.toptopbiw) {
			medium.toptopbiw = 'auto';
		}
		if (!medium.toptopbih) {
			medium.toptopbih = 'auto';
		}
		var topTopBsize = medium.toptopbiw + ' ' + medium.toptopbih;
	} else {
		if (medium.makesquare) {
			if (medium.trim) {
				add = 2;
			} else {
				add = 0;
			}
			topTopBsize = Math.round(newWidth / (tilesAcross + add)) + 'px ' + (tsize + 1) + 'px';
		} else {
			topTopBsize = tsize + 'px';
		}
	}

//	jQuery('.shelves-top-top-child')
//		.css('background-size', topTopBsize);
	setCss('.shelves-top-top-child', 'background-size', topTopBsize);

}

//Back Wall

if (medium.backwall) {
	if (medium.backwallbiw || medium.backwallbih) {
		if (!medium.backwallbiw) {
			medium.backwallbiw = 'auto';
		}
		if (!medium.backwallbih) {
			medium.backwallbih = 'auto';
		}
		var topTwidth = medium.backwallbiw + ' ' + medium.backwallbih;
	} else {
		if (medium.toptop) {
			topTwidth = backTwidth + 'px';
		} else {
			topTwidth = tsize + 'px';
			var sbw = jQuery('.shelf-back-wall');
			var demsSBW = sbw[0].getBoundingClientRect();
			//jQuery('.shelf-back-wall')
			//	.css('background-position', Math.round((demssf.left - demsSBW.left) - tsize) + 'px ' + medium.topspace + 'px');
			setCss('.shelf-back-wall', 'background-position', Math.round((demssf.left - demsSBW.left) - tsize) + 'px ' + medium.topspace + 'px');
		}
	}
//	jQuery('.shelf-back-wall')
//		.css('background-image',  'url(\'' + fixRelativeURLs(medium.backwallimg) + '\')')
//		.css('background-size', topTwidth);
	setCss('.shelf-back-wall', 'background-image', 'url(\'' + fixRelativeURLs(medium.backwallimg) + '\')');
	setCss('.shelf-back-wall', 'background-size', topTwidth);

} else {
	jQuery('.shelf-back-wall')
		.css('background-image',  '')
		.css('background-size', '');
}

//trim shadow 

if ((medium.toptop == 1) && (medium.trim == 1) && (medium.backwall == 1)) {
	var trims = jQuery('.shelves-trim');
	var backw = jQuery('.shelf-back-wall');
	var bwDems = backw[0].getBoundingClientRect();
	var tDems = trims[0].getBoundingClientRect();
	var tDemsR = trims[1].getBoundingClientRect();
/*	jQuery('.stsleft')
		.css('background', '-webkit-linear-gradient(right, transparent, transparent)')
		.css('background', '-moz-linear-gradient(right, transparent, transparent)');
	jQuery('.stsright')
		.css('background', '-webkit-linear-gradient(left, transparent, transparent)')
		.css('background', '-moz-linear-gradient(left, transparent, transparent)'); */
	jQuery('.stsleft')
		.css('height', Math.round(tDems.height) + 'px')
		.css('width', insideVertWidth + 'px')
		.css('top', Math.round(tDems.top - bwDems.top) + 'px')
		.css('left', Math.round(tDems.left - insideVertWidth) + 'px');
//		.css('background', '-webkit-linear-gradient(right, rgba(0,0,0,.2), rgba(0,0,0,0))')
//		.css('background', '-moz-linear-gradient(right, rgba(0,0,0,.2), rgba(0,0,0,0))');
	jQuery('.stsright')
		.css('height', Math.round(tDems.height) + 'px')
		.css('width', insideVertWidth + 'px')
		.css('top', Math.round(tDems.top - bwDems.top) + 'px')
		.css('left', Math.round(tDemsR.right) + 'px');
//		.css('background', '-webkit-linear-gradient(left, rgba(0,0,0,.2), rgba(0,0,0,0))')
//		.css('background', '-moz-linear-gradient(left, rgba(0,0,0,.2), rgba(0,0,0,0))');
} else {
	jQuery('.stsleft').removeAttr('style');
	jQuery('.stsright').removeAttr('style');
}


if (medium.perspectivechng) {
	jQuery( window ).scroll(function() {
		chview();
	});
//	add divs
	

//	edit change view to deal with them as well
} else {
	jQuery( window ).scroll(function() {
	});
}

switch (shelvesControl) {
	case 'Drupal' :
		fillinputsDRUPAL();
		break;
	default :
		fillinputsHTML();
}


} //end update function

function removeOldWrap() {
	shelves = jQuery('.shelf');
//	alert ('here');
	var regex = /\<\!--cwrap--\>([^]*?)\<\!--cwrap--\>/g;
	for (var s = 0; s < shelves.length; s++) {
		tmpContent = jQuery('.shelf:eq(' + s + ')').html();
		tmpContent = tmpContent.replace(regex, '');
//		tmpContent = tmpContent.replace(medium.contentprefix, '');
//		tmpContent = tmpContent.replace(medium.contentsuffix, '');
		jQuery('.shelf:eq(' + s + ')').html(tmpContent);
	}
}

function setDivs() {
jQuery('.shelves').wrap('<div class="shelf-back-wall"></div>');

jQuery('.shelf').wrap('<div class="shelf-parent"></div>');
var sPanels = [
	'<div class="shelf-vertical svleft"><div class="shelf-vertical-shadow svsleft"></div><div class="svsleftright"></div><div class="svsleftbottom"></div></div>',
	'<div class="shelf-top-parent"><div class="shelf-top-child"><div class="stcshadow"></div></div></div>',
	'<div class="shelf-bottom-parent"><div class="shelf-bottom-child"><div class="sbcshadow"></div></div></div>',
	'<div class="shelf-back"><div class="shelf-back-shadow"></div><div class="shelf-back-shadowleft"></div><div class="shelf-back-shadow-bottom"></div><div class="shelf-back-shadowright"></div></div>',
	'<div class="shelf-vertical svright"><div class="shelf-vertical-shadow svsright"></div><div class="svsrightleft"></div><div class="svsrightbottom"></div></div>',
//	'<div class="shelf-face"></div>'
].join("\n");
jQuery('.shelf-parent').append(sPanels);
jQuery('.shelf-back-wall').prepend("\n"+'<div class="shelves-top-spacer"></div>'+"\n");


var shelves = jQuery('.shelf-parent');
var r = /class(\s?)=(\s?)[\'\"]shelf-face/;
//alert(shelves.length);
for (var i=0; i<shelves.length; i++) {
	var thishtml = jQuery('.shelf-parent:eq('+i+')').html();
//	alert(thishtml);
	if (!(thishtml.match(r))) {
		jQuery('.shelf-parent:eq('+i+')').after('<div class="shelf-face"></div>');
	} else {
		var f = jQuery('.shelf:eq('+i+') > .shelf-face').detach();
		jQuery('.shelf-parent:eq('+i+')').after(f);
		customFace = 1;
	}
}

//var loc = '<div id="location" style="overflow: scroll; position: fixed; top:100px; left:0px; color: white; z-index:100; background-color: black;"></div>';
//jQuery('.shelf-back-wall').before(loc);

}

function buildOptionalDivs() {
//strip previous
if (jQuery('.stleft').length) {
	jQuery('.stleft').remove();
	jQuery('.stright').remove();
}
if (jQuery('.stsleft').length) {
	jQuery('.stsleft').remove();
	jQuery('.stsright').remove();
}
if (jQuery('.shelves-table').length) {
	jQuery('.shelves').unwrap();
	jQuery('.shelves').unwrap();
}
if (jQuery('.shelves-top-face').length) {
	jQuery('.shelves-top-face').remove();
}
if (jQuery('.shelves-top-top-parent').length) {
	jQuery('.shelves-top-top-parent').remove();
}

if (medium.trim) {
jQuery('.shelves').wrap('<div class="shelves-table"><div class="shelves-table-row"></div></div>');
jQuery('.shelves-table-row').prepend('<div class="shelves-trim-shadow stsleft"></div><div class="shelves-trim stleft"></div>');
jQuery('.shelves-table-row').append('<div class="shelves-trim stright"></div><div class="shelves-trim-shadow stsright"></div>');
//jQuery('.shelves-table-row').prepend('<div class="shelves-trim stleft"></div>');
//jQuery('.shelves-table-row').append('<div class="shelves-trim stright"></div>');
}

if (medium.topface) {
jQuery('.shelves-top-spacer').after('<div class="shelves-top-face"></div>');
}

if (medium.toptop) {
jQuery('.shelves-top-spacer').after('<div class="shelves-top-top-parent"><div class="shelves-top-top-child"></div></div>');
}

}

function chview() {
if (medium.perspectivechng) {
//jQuery('#location').css('height', jQuery(window).height() + 'px');

var bottomchilds = jQuery('.shelf-bottom-child');
var winH = jQuery(window).height();
var faces = jQuery('.shelf-face');
var backs = jQuery('.shelf-back');
var mine;
it = 0;

for (var q=0; q<bottomchilds.length; q++) {
var dems = bottomchilds[q].getBoundingClientRect();
var cenloc = (dems.bottom + dems.top) / 2;

if ((cenloc < winH) && (dems.bottom > 0)) {
	it++;

	var scale = (cenloc - (winH / 2)) / (winH - (winH / 2));
	mine = it + '-for iteration count<br>' + cenloc +' < '+ winH +' && '+ scale + ' > 0<br>';
	var a, b;
		if (scale < .42) {
			a = 52.844;
			b = .09952;
		} else {
			a = 41.6;
			b = 4.5;
		}
		var sk = (a * scale) + b;
		sk = sk.toFixed(1);
		scale = scale.toFixed(2);

		if (sk > 45) {
			sk = 45;
		}

		jQuery('.shelf-bottom-child:eq('+q+')')
			.css('-webkit-transform', 'scale(1,' + scale + ') rotateX(45deg)')
			.css('transform', 'scale(1,' + scale + ') rotateX(45deg)');
		jQuery('.svright:eq('+q+')')
			.css('-webkit-transform', 'skew(0deg, '+sk+'deg)')
			.css('transform', 'skew(0deg, '+sk+'deg)');
		jQuery('.svleft:eq('+q+')')
			.css('-webkit-transform', 'skew(0deg, -'+sk+'deg)')
			.css('transform', 'skew(0deg, -'+sk+'deg)');
	if (scale < 0) {
		jQuery('.shelf-bottom-child:eq('+q+')')
			.css('transform-origin', 'center bottom');
	} else {
		jQuery('.shelf-bottom-child:eq('+q+')')
			.css('transform-origin', 'center bottom');
	}
	
	//adjust bottom position
	jQuery('.shelf-bottom-parent:eq('+q+')')
		.css('bottom', '0px');

	var demsBc = bottomchilds[q].getBoundingClientRect();
	var demsF = faces[q].getBoundingClientRect();

	newUp = Math.round(demsBc.bottom - demsF.top);

	jQuery('.shelf-bottom-parent:eq('+q+')')
		.css('bottom', newUp + 'px');

	//adjust back position
	jQuery('.shelf-back:eq('+q+')')
		.css('bottom', '0px');
	var demsBc = bottomchilds[q].getBoundingClientRect();
	var demsBb = backs[q].getBoundingClientRect();
	var backUp = Math.round(demsBb.bottom - demsBc.top);
	jQuery('.shelf-back:eq('+q+')')
		.css('bottom', backUp + 'px');

//	mine += printObject(demsBc, 'bottom#' + q);
//	mine += printObject(demsBb, 'back#' + q);

//	mine += 'backUp ' + backUp + '<hr>';
	jQuery('#location').html(mine);


}

}
//	jQuery('#location').html(mine);
//var mine = mine+'top: '+demsHc.top+' <br>bottom: '+demsHc.bottom+'<br>Scale:'+scale+'<br>Skew:'+sk+'<br>'+demsHc.height+'-'+backUp+'='+bDown;
//jQuery('.location').html(mine);
}
}

function cleanperspective(noTog) {
	jQuery('.shelf-bottom-child')
		.css('-webkit-transform', 'rotateX(45deg)')
		.css('transform', 'rotateX(45deg)');
	jQuery('.svright')
		.css('-webkit-transform', 'skew(0deg, 45deg)')
		.css('transform', 'skew(0deg, 45deg)');
	jQuery('.svleft')
		.css('-webkit-transform', 'skew(0deg, -45deg)')
		.css('transform', 'skew(0deg, -45deg)');
	jQuery('.shelf-bottom-parent')
		.css('bottom', '0px');
	jQuery('.shelf-back')
		.css('bottom', '0px');

	if (typeof noTog == 'undefined') {
		switch (shelvesControl) {
			case 'Drupal' :
				togPramDrupal('#edit-shelves-perspectivechng','perspectivechng','');
				break;
			default :
				togPram('#perspectivechng','perspectivechng');
		}
	}
}

//Regular Html Control Functions
function fillinputsHTML() {

var dsel = document.getElementById("designx");
dsel.selectedIndex = thisD;

jQuery('.title').val(medium.title);
jQuery('.topspaceInput').val(medium.topspace);
jQuery('.shadowLInput').val(medium.shadowlength);
jQuery('.tileSizeInput').val(medium.unitspan);
jQuery('.tilesAcrossInput').val(medium.unitwidth);
jQuery('.pixelwidth').val(medium.pixelwidth);
jQuery('#shelfDepthInput').val(medium.shelfdepth);
jQuery('#contentpadding').val(medium.contentpadding);
jQuery('.trimWidthInput').val(medium.trimwidth);
jQuery('.faceHeightInput').val(medium.faceheight);
jQuery('.topFaceHeightInput').val(medium.topfaceheight);
jQuery('.imgAInput').val(medium.backwallimg);
jQuery('.imgBInput').val(medium.trimleftimg);
jQuery('.imgJInput').val(medium.trimrightimg);
jQuery('.imgCInput').val(medium.faceimg);
jQuery('.imgDInput').val(medium.verticalleftimg);
jQuery('.imgEInput').val(medium.verticalrightimg);
jQuery('.imgFInput').val(medium.backimg);
jQuery('.imgGInput').val(medium.topfaceimg);
jQuery('.imgHInput').val(medium.toptopimg);
jQuery('.imgIInput').val(medium.bottomimg);
jQuery('.cBcInput').val(medium.containerbackground);

if (medium.trim) {
	jQuery('#showtrim').prop('checked', 'checked');
} else {
	jQuery('#showtrim').removeAttr('checked');
}
if (medium.topface) {
	jQuery('#showtopface').prop('checked', 'checked');
} else {
	jQuery('#showtopface').removeAttr('checked');
}
if (medium.toptop) {
	jQuery('#showtop').prop('checked', 'checked');
} else {
	jQuery('#showtop').removeAttr('checked');
}
if (medium.backwall) {
	jQuery('#backwall').prop('checked', 'checked');
} else {
	jQuery('#backwall').removeAttr('checked');
}
if (medium.makesquare) {
	jQuery('#makesquareTrue').prop('checked', 'checked');
	jQuery('#makesquareFalse').removeAttr('checked');
	jQuery('#tileoptions').css('display', 'block');
	jQuery('#pixelwidth').css('display', 'none');
} else {
	jQuery('#makesquareFalse').prop('checked', 'checked');
	jQuery('#makesquareTrue').removeAttr('checked');
	jQuery('#tileoptions').css('display', 'none');
	jQuery('#pixelwidth').css('display', 'block');
}

if (medium.contentwrap) {
	jQuery('#contentwrap').prop('checked', 'checked');
	jQuery('#contentwrapdiv').css('display', 'block');
	jQuery('#contentprefix').val(medium.contentprefix);
	jQuery('#contentsuffix').val(medium.contentsuffix);
	if (medium.contenthangers) {
		jQuery('#contenthangers').prop('checked', 'checked');
	} else {
		jQuery('#contenthangers').removeAttr('checked');
	}
	if (medium.contentswingonload) {
		jQuery('#contentswingonload').prop('checked', 'checked');
	} else {
		jQuery('#contentswingonload').removeAttr('checked');
	}
	if (medium.contentswingonhover) {
		jQuery('#contentswingonhover').prop('checked', 'checked');
	} else {
		jQuery('#contentswingonhover').removeAttr('checked');
	}
} else {
	jQuery('#contentwrap').removeAttr('checked');
	jQuery('#contentwrapdiv').css('display', 'none');
}

if (medium.alignsquares) {
	jQuery('#alignsquares').prop('checked', 'checked');
} else {
	jQuery('#alignsquares').removeAttr('checked');
}
//alert(medium.perspectivechng);
if (medium.perspectivechng) {
	jQuery('#perspectivechng').prop('checked', 'checked');
} else {
	jQuery('#perspectivechng').removeAttr('checked');
}

jQuery('#scroller').removeAttr('checked');

jQuery('.trimbiw').val(medium.trimbiw);
jQuery('.trimbih').val(medium.trimbih);
jQuery('.facebiw').val(medium.facebiw);
jQuery('.facebih').val(medium.facebih);
jQuery('.backbiw').val(medium.backbiw);
jQuery('.backbih').val(medium.backbih);
jQuery('.verticalbiw').val(medium.verticalbiw);
jQuery('.verticalbih').val(medium.verticalbih);
jQuery('.toptopbiw').val(medium.toptopbiw);
jQuery('.toptopbih').val(medium.toptopbih);
jQuery('.topfacebiw').val(medium.topfacebiw);
jQuery('.topfacebih').val(medium.topfacebih);
jQuery('.bottombiw').val(medium.bottombiw);
jQuery('.bottombih').val(medium.bottombih);
jQuery('.backwallbih').val(medium.backwallbih);
jQuery('.backwallbiw').val(medium.backwallbiw);

//alert(jQuery('#contentprefix').val() + '<-')

}
/*function changetext(pram) {
	jQuery('#' + pram).html('great');
}*/
//changetext('contentprefix');

function changeMedium(med) {
m = Number(med);
update();
}

function changePram(item,ch,input,s) {
//if ((item == 'contentprefix') || (item == 'contentsuffix')) {
	//removeOldWrap();
//}

var newval, inval;
if (ch == 0) {
	inval = jQuery('#'+input).val();
	if ((!(isNaN(Number(inval)))) && (inval != '')){ 
		inval = Number(inval);
	}
	newval = inval;
} else {
	newval = Number(medium[item]) + Number(ch);
}
medium[item] = newval;
//jQuery('.'+input+':eq('+l+')').val(newval);
update();
}

function setPram(item,newval) {
for (p=0; p<item.length; p++) {
	medium[item[p]] = newval[p];
}
update();
}

function changeBsizes(item,inputW,inputH,s) {
var l;
if (s == 'NA') { l = 0; } else { l = s; }
var thisW = jQuery('.'+inputW+':eq('+l+')').val();
var thisH = jQuery('.'+inputH+':eq('+l+')').val();
if (thisW == '') {
	thisW = 'auto';
}
if (thisH == '') {
	thisH = 'auto';
}
if ((thisW == 'auto') && (thisH == 'auto')) {
	if (s == 'NA') {
		medium[item] = '';
	} else {
		medium[item][s] = '';
	}
} else {
	if (s == 'NA') {
		medium[item] = thisW + ' ' + thisH;
	} else {
		medium[item][s] = thisW + ' ' + thisH;
	}
		}
update();
}

function togPram(input,pram) {
if (jQuery(input).prop("checked")) {
	medium[pram] = 1;
} else {
	medium[pram] = 0;
}
update();
}

function chDesign() {
thisD = jQuery('.designx').val();
medium = constructions[thisD];
cleanperspective(1);
update();
}
// END Regular HTML control functions

// Drupal Controls
function fillinputsDRUPAL() {
jQuery('#edit-shelves-topspace').val(medium.topspace);
jQuery('#edit-shelves-shadowlength').val(medium.shadowlength);
jQuery('#edit-shelves-unitspan').val(medium.unitspan);
jQuery('#edit-shelves-pixelwidth').val(medium.pixelwidth);
jQuery('#edit-shelves-unitwidth').val(medium.unitwidth);
jQuery('#edit-shelves-shelfdepth').val(medium.shelfdepth);
jQuery('#edit-shelves-trimwidth').val(medium.trimwidth);
jQuery('#edit-shelves-faceheight').val(medium.faceheight);
jQuery('#edit-shelves-backwallimg').val(medium.backwallimg);
jQuery('#edit-shelves-trimleftimg').val(medium.trimleftimg);
jQuery('#edit-shelves-trimrightimg').val(medium.trimrightimg);
jQuery('#edit-shelves-faceimg').val(medium.faceimg);
jQuery('#edit-shelves-verticalleftimg').val(medium.verticalleftimg);
jQuery('#edit-shelves-verticalrightimg').val(medium.verticalrightimg);
jQuery('#edit-shelves-backimg').val(medium.backimg);
jQuery('#edit-shelves-topfaceimg').val(medium.topfaceimg);
jQuery('#edit-shelves-toptopimg').val(medium.toptopimg);
jQuery('#edit-shelves-bottomimg').val(medium.bottomimg);
jQuery('#edit-shelves-containerbackground').val(medium.containerbackground);
jQuery('#edit-shelves-contentpadding').val(medium.contentpadding);
jQuery('#edit-shelves-topfaceheight').val(medium.topfaceheight);
jQuery("input[name='shelves_title']").val(medium.title);
//jQuery("input[name='shelves_maketop']").val(medium.makeTop);
//jQuery("input[name='shelves_makesquare']").val(medium.makesquare);

/*
if (medium.makeInset) {
jQuery("input[value*='makeInset-1']").attr('checked', 'checked');
} else {
jQuery("input[value*='makeInset-0']").attr('checked', 'checked');
}

if (medium.backwall) {
jQuery("input[value*='backwall-1']").attr('checked', 'checked');
} else {
jQuery("input[value*='backwall-0']").attr('checked', 'checked');
}
*/
if (medium.makesquare) {
jQuery("#edit-shelves-buildtiles").css('display', 'block');
jQuery("#edit-shelves-buildregular").css('display', 'none');
jQuery("#edit-shelves-makesquare-1").attr('checked', 'checked');
jQuery("#edit-shelves-makesquare-0").removeAttr('checked');
} else {
jQuery("#edit-shelves-buildtiles").css('display', 'none');
jQuery("#edit-shelves-buildregular").css('display', 'block');
jQuery("#edit-shelves-makesquare-0").attr('checked', 'checked');
jQuery("#edit-shelves-makesquare-1").removeAttr('checked');
}

if (medium.alignsquares) {
jQuery("#edit-shelves-alignsquares").attr('checked', 'checked');
} else {
jQuery("#edit-shelves-alignsquares").removeAttr('checked');
}

if (medium.trim) {
jQuery("#edit-shelves-trim").attr('checked', 'checked');
jQuery("#edit-shelves-trim-options").css('display', 'block');
} else {
jQuery("#edit-shelves-trim").removeAttr('checked');
jQuery("#edit-shelves-trim-options").css('display', 'none');
}

if (medium.topface) {
jQuery("#edit-shelves-topface").attr('checked', 'checked');
jQuery("#edit-shelves-topface-options").css('display', 'block');
} else {
jQuery("#edit-shelves-topface").removeAttr('checked');
jQuery("#edit-shelves-topface-options").css('display', 'none');
}

if (medium.toptop) {
jQuery("#edit-shelves-toptop").attr('checked', 'checked');
jQuery("#edit-shelves-toplid-options").css('display', 'block');
} else {
jQuery("#edit-shelves-toptop").removeAttr('checked');
jQuery("#edit-shelves-toplid-options").css('display', 'none');
}

if (medium.backwall) {
jQuery("#edit-shelves-backwall").attr('checked', 'checked');
jQuery("#edit-shelves-backwall-options").css('display', 'block');
} else {
jQuery("#edit-shelves-backwall").removeAttr('checked');
jQuery("#edit-shelves-backwall-options").css('display', 'none');
}

if (medium.contentwrap) {
jQuery("#edit-shelves-contentwrap").attr('checked', 'checked');
} else {
jQuery("#edit-shelves-contentwrap").removeAttr('checked');
}

if (medium.contenthangers) {
jQuery("#edit-shelves-contenthangers").attr('checked', 'checked');
} else {
jQuery("#edit-shelves-contenthangers").removeAttr('checked');
}

if (medium.contentswingonload) {
jQuery("#edit-shelves-contentswingonload").attr('checked', 'checked');
} else {
jQuery("#edit-shelves-contentswingonload").removeAttr('checked');
}

if (medium.perspectivechng) {
jQuery("#edit-shelves-perspectivechng").attr('checked', 'checked');
} else {
jQuery("#edit-shelves-perspectivechng").removeAttr('checked');
}

if (medium.contentswingonhover) {
jQuery("#edit-shelves-contentswingonhover").attr('checked', 'checked');
} else {
jQuery("#edit-shelves-contentswingonhover").removeAttr('checked');
}
jQuery("#edit-shelves-contentprefix").val(medium.contentprefix);
jQuery("#edit-shelves-contentsuffix").val(medium.contentsuffix);

jQuery("#edit-shelves-trimbiw").val(medium.trimbiw);
jQuery("#edit-shelves-trimbih").val(medium.trimbih);
jQuery("#edit-shelves-facebiw").val(medium.facebiw);
jQuery("#edit-shelves-facebih").val(medium.facebih);
jQuery("#edit-shelves-backbiw").val(medium.backbiw);
jQuery("#edit-shelves-backbih").val(medium.backbih);
jQuery("#edit-shelves-verticalbiw").val(medium.verticalbiw);
jQuery("#edit-shelves-verticalbih").val(medium.verticalbih);
jQuery("#edit-shelves-toptopbiw").val(medium.toptopbiw);
jQuery("#edit-shelves-toptopbih").val(medium.toptopbih);
jQuery("#edit-shelves-topfacebiw").val(medium.topfacebiw);
jQuery("#edit-shelves-topfacebih").val(medium.topfacebih);
jQuery("#edit-shelves-bottombiw").val(medium.bottombiw);
jQuery("#edit-shelves-bottombih").val(medium.bottombih);
jQuery("#edit-shelves-backwallbih").val(medium.backwallbih);
jQuery("#edit-shelves-backwallbiw").val(medium.backwallbiw);

/*
var bd;
bd = medium.customBackWallSizeInput.split(' ');
jQuery('#edit-shelves-backwallbackimgw').val(bd[0]);
jQuery('#edit-shelves-backwallbackimgh').val(bd[1]);
bd = medium.customTrimBackSize[0].split(' ');
jQuery('#edit-shelves-trimbackimgw').val(bd[0]);
jQuery('#edit-shelves-trimbackimgh').val(bd[1]);
bd = medium.customFaceBackSize[0].split(' ');
jQuery('#edit-shelves-facebackimgw').val(bd[0]);
jQuery('#edit-shelves-facebackimgh').val(bd[1]);
bd = medium.customTopFaceBackSize[0].split(' ');
jQuery('#edit-shelves-toptopbackimgw').val(bd[0]);
jQuery('#edit-shelves-toptopbackimgh').val(bd[1]);
bd = medium.customTopTopBackSize[0].split(' ');
jQuery('#edit-shelves-topfacebackimgw').val(bd[0]);
jQuery('#edit-shelves-topfacebackimgh').val(bd[1]);
bd = medium.customBackBackSize[0].split(' ');
jQuery('#edit-shelves-backbackimgw').val(bd[0]);
jQuery('#edit-shelves-backbackimgh').val(bd[1]);
bd = medium.customInsideVBackSize[0].split(' ');
jQuery('#edit-shelves-vertbackimgw').val(bd[0]);
jQuery('#edit-shelves-vertbackimgh').val(bd[1]);
bd = medium.customInsideHBackSize[0].split(' ');
jQuery('#edit-shelves-bottombackimgw').val(bd[0]);
jQuery('#edit-shelves-bottombackimgh').val(bd[1]);
*/
}

function togPramDrupal(input,pram,fieldops) {
if (jQuery(input).attr("checked")) {
	medium[pram] = 1;
	if (fieldops) {
		jQuery(fieldops).css('display', 'block');
	}
} else {
	medium[pram] = 0;
	if (fieldops) {
		jQuery(fieldops).css('display', 'none');
	}
}
update();
}

function chDesignDrupal(thisD) {
if (thisD == 'current') {
	meidum = current;
} else {
	medium = constructions[thisD];
}
cleanperspective(1);
update();
}

function changePramDrupal(item,newval) {
	medium[item] = newval;
	update();
}

function setPramDrupal(items) {
	var prams = items.split("_");
for (p=0; p<prams.length; p++) {
	var pram = prams[p].split("-");
	medium[pram[0]] = pram[1];
}
update();
}

function changeBsizesDrupal(item,inputW,inputH,s) {
	var l;
	if (s == 'NA') { l = 0; } else { l = s; }
	var thisW = inputW;
	var thisH = inputH;

//alert (item +'-'+ inputW +'-'+ inputH +'-'+ s +'<--');
	if (thisW != '') {
	//	thisW = thisW + 'px';
	} else {
		thisW = 'auto';
	}
	if (thisH != '') {
	//	thisH = thisH + 'px';
	} else {
		thisH = 'auto';
	}
	if ((thisW == 'auto') && (thisH == 'auto')) {
		if (s == 'NA') {
			medium[item] = '';
		} else {
			medium[item][s] = '';
		}
	} else {
		if (s == 'NA') {
			medium[item] = thisW + ' ' + thisH;
		} else {
			medium[item][s] = thisW + ' ' + thisH;
		}
			}
	update();
}

function buildCMScontrols() {
	if (shelvesControl == 'Drupal') {
	//Create Control Triggers for Drupal Controls
	jQuery("#edit-shelves-design").change(function(){
		chDesignDrupal(jQuery('#edit-shelves-design').val());
	});
	/*
	jQuery("input[name^='shelves_inorout'], input[name^='shelves_backwall']").click(function(){
		setPramDrupal(jQuery(this).val());
	});
	*/

	jQuery("#edit-shelves-trim").click(function(){
		togPramDrupal('#edit-shelves-trim','trim','#edit-shelves-trim-options');
	});
	jQuery("#edit-shelves-topface").click(function(){
		togPramDrupal('#edit-shelves-topface','topface','#edit-shelves-topface-options');
	});
	jQuery("#edit-shelves-toptop").click(function(){
		togPramDrupal('#edit-shelves-toptop','toptop','#edit-shelves-toplid-options');
	});
	jQuery("#edit-shelves-backwall").click(function(){
		togPramDrupal('#edit-shelves-backwall','backwall','#edit-shelves-backwall-options');
	});
	jQuery("#edit-shelves-alignsquares").click(function(){
		togPramDrupal('#edit-shelves-alignsquares','alignsquares','');
	});

	jQuery("#edit-shelves-contentwrap").click(function(){
		togPramDrupal('#edit-shelves-contentwrap','contentwrap','');
	});
	jQuery("#edit-shelves-contenthangers").click(function(){
		togPramDrupal('#edit-shelves-contenthangers','contenthangers','');
	});
	jQuery("#edit-shelves-contentswingonload").click(function(){
		togPramDrupal('#edit-shelves-contentswingonload','contentswingonload','');
	});
	jQuery("#edit-shelves-contentswingonhover").click(function(){
		togPramDrupal('#edit-shelves-contentswingonhover','contentswingonhover','');
	});
	jQuery("#edit-shelves-perspectivechng").click(function(){
		cleanperspective();
	});
	jQuery("#edit-shelves-contentprefix").change(function(){
		changePramDrupal('contentprefix',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-contentsuffix").change(function(){
		changePramDrupal('contentsuffix',jQuery(this).val(),'NA');
	});

	jQuery("input[name='shelves_makesquare']").change(function(){
		if (jQuery('#edit-shelves-makesquare-0').attr("checked")) {
			medium.makesquare = 0;
			jQuery("#edit-shelves-buildtiles").css('display', 'none');
			jQuery("#edit-shelves-buildregular").css('display', 'block');
		}
		if (jQuery('#edit-shelves-makesquare-1').attr("checked")) {
			medium.makesquare = 1;
			jQuery("#edit-shelves-buildtiles").css('display', 'block');
			jQuery("#edit-shelves-buildregular").css('display', 'none');
		}
		update();
	});


	jQuery("#edit-shelves-topspace").change(function(){
		changePramDrupal('topspace',Number(jQuery(this).val()),'NA');
	});

	jQuery("#edit-shelves-shadowlength").change(function(){
		changePramDrupal('shadowlength',Number(jQuery(this).val()),'NA');
	});

	jQuery("#edit-shelves-contentpadding").change(function(){
		changePramDrupal('contentpadding',Number(jQuery(this).val()),'NA');
	});

	jQuery("#edit-shelves-containerbackground").change(function(){
		changePramDrupal('containerbackground',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-unitwidth").change(function(){
		changePramDrupal('unitwidth',Number(jQuery(this).val()));
	});

	jQuery("#edit-shelves-unitspan").change(function(){
		changePramDrupal('unitspan',Number(jQuery(this).val()),0);
	});

	jQuery("#edit-shelves-pixelwidth").change(function(){
		changePramDrupal('pixelwidth',Number(jQuery(this).val()),0);
	});

	jQuery("#edit-shelves-shelfdepth").change(function(){
		changePramDrupal('shelfdepth',Number(jQuery(this).val()),0);
	});

	jQuery("#edit-shelves-trimwidth").change(function(){
		changePramDrupal('trimwidth',Number(jQuery(this).val()),0);
	});

	jQuery("#edit-shelves-faceheight").change(function(){
		changePramDrupal('faceheight',Number(jQuery(this).val()),0);
	});

	jQuery("#edit-shelves-trimbiw").change(function(){
		changePramDrupal('trimbiw',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-trimbih").change(function(){
		changePramDrupal('trimbih',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-trimleftimg").change(function(){
		changePramDrupal('trimleftimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-trimrightimg").change(function(){
		changePramDrupal('trimrightimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-faceimg").change(function(){
		changePramDrupal('faceimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-facebiw").change(function(){
		changePramDrupal('facebiw',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-facebih").change(function(){
		changePramDrupal('facebih',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-verticalleftimg").change(function(){
		changePramDrupal('verticalleftimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-verticalrightimg").change(function(){
		changePramDrupal('verticalrightimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-verticalbiw").change(function(){
		changePramDrupal('verticalbiw',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-verticalbih").change(function(){
		changePramDrupal('verticalbih',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-bottomimg").change(function(){
		changePramDrupal('bottomimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-bottombiw").change(function(){
		changePramDrupal('bottombiw',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-bottombih").change(function(){
		changePramDrupal('bottombih',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-toptopimg").change(function(){
		changePramDrupal('toptopimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-topfaceimg").change(function(){
		changePramDrupal('topfaceimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-topfacebiw").change(function(){
		changePramDrupal('topfacebiw',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-topfacebih").change(function(){
		changePramDrupal('topfacebih',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-toptopbiw").change(function(){
		changePramDrupal('toptopbiw',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-toptopbih").change(function(){
		changePramDrupal('toptopbih',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-topfaceheight").change(function(){
		changePramDrupal('topfaceheight',Number(jQuery(this).val()),0);
	});

	jQuery("#edit-shelves-backwallimg").change(function(){
		changePramDrupal('backwallimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-backwallbiw").change(function(){
		changePramDrupal('backwallbiw',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-backwallbih").change(function(){
		changePramDrupal('backwallbih',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-backimg").change(function(){
		changePramDrupal('backimg',jQuery(this).val(),'NA');
	});

	jQuery("#edit-shelves-backbiw").change(function(){
		changePramDrupal('backbiw',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-backbih").change(function(){
		changePramDrupal('backbih',jQuery(this).val(),'NA');
	});
	jQuery("#edit-shelves-backbih").change(function(){
		changePramDrupal('backbih',jQuery(this).val(),'NA');
	});

	}
}


/**
* Encode the properties of an object as if they were name/value pairs from
* an HTML form, using application/x-www-form-urlencoded format
*/
function encodeFormData(data) {
	if (!data) return ""; // Always return a string
	var pairs = []; // To hold name=value pairs
	for(var name in data) { // For each name
		if (!data.hasOwnProperty(name)) continue; // Skip inherited
		if (typeof data[name] === "function") continue; // Skip methods
		var value = data[name].toString(); // Value as string
		name = encodeURIComponent(name); // Encode name
		value = encodeURIComponent(value); // Encode value
		pairs.push(name + "=" + value); // Remember name=value pair
	}
	return pairs.join('&'); // Return joined pairs separated with &
}

function postData(url, data, callback) {
	var request = new XMLHttpRequest();
	request.open("POST", url); // POST to the specified url
	request.onreadystatechange = function() { // Simple event handler
	if (request.readyState === 4 && request.status==200 && callback) // When response is complete
		callback(request); // call the callback.
	};
	request.setRequestHeader("Content-Type", // Set Content-Type
	"application/x-www-form-urlencoded");
	request.send(data); // Send form-encoded data
}

function loadXMLDoc(dname, callback, processing) {
	var xhttp;
	if (window.XMLHttpRequest) {
		xhttp=new XMLHttpRequest();
	} else {
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	dname = dname + '?t='+Math.random();
	xhttp.open("GET",dname,false);

	xhttp.onreadystatechange=function() {
		if (xhttp.readyState==4 && xhttp.status==200) {
			callback(xhttp.responseXML);
		}
		//alert(xhttp.readyState + ' - ' + xhttp.status);
		if (xhttp.readyState < 4) {
			processing();
		}
	}

	xhttp.send();
}

//Development functions

function printObject(o, name) {
  var out = 'Object is: ' + name + '<br>';

  for (var p in o) {
    out += p + ': ' + o[p] + '<br>';
  }
  return(out);
}

function save() {
	//var smedium = medium;
	//smedium.title = jQuery('#title').val();

//alert(medium.contentprefix);
//	alert(mycss);
	medium.css = mycss;
	var postpairs = encodeFormData(medium);
//	alert(postpairs);
	postData('constructions.php', postpairs, finishsave, process)
	//postData('constructions.php', postpairs, finishsave)
}

function deleteDesign() {
	var proceed = confirm(thisD + "Are you sure you want to delete this design?\n" + medium.title);
	if (proceed) {
		sendstring = 'deletedesign=' + thisD;
		postData('constructions.php', sendstring, finishdelete)
	}
}

function downloadDesign() {
	save();
	var postpairs = encodeFormData(medium);
	sendstring = 'downloaddesign=' + thisD + '&' + postpairs;
//	alert(sendstring);
	postData('constructions.php', sendstring, finishdownload)

}

function finishdownload(request) {
	var response = request.responseText;
	document.location = response;
//	alert(response);
}

function finishdelete(request) {
	var response = request.responseText;
	loadConstructions();
	buildDesignSelect(response);
	medium = constructions[0];
	cleanperspective(1);
	update();
	//alert(response);
}

function finishsave(request) {
	var wasReplace = request.responseText;
	loadConstructions();
	buildDesignSelect(wasReplace);
//	alert('Your Design has been saved.');
	jQuery('#saver').html('Design Saved');
}

function process() {
//	var wasReplace = request.responseText;
//	loadConstructions();
//	buildDesignSelect(wasReplace);
	alert('one moment.');
	jQuery('#saver').html('One moment please...');
}

function loadConstructions() {
	constructions = [];
	//var mine = '';
	loadXMLDoc("constructions.xml", function(xmlDoc) { 
		designs=xmlDoc.getElementsByTagName("design");

		for(b=0;b<designs.length;b++) {
			myOb = [];

			var x=xmlDoc.getElementsByTagName("design")[b].childNodes;
			var y=xmlDoc.getElementsByTagName("design")[b].firstChild;
			for (i=0;i<x.length;i++) {
			if (y.nodeType==1) {//Process only element nodes (type 1)
			  var val = y && y.childNodes[0] && y.childNodes[0].nodeValue;
			  if (!val) {
				val = '';
				} else {
					val = val.replace(/\&lt;/g,'<');
					val = val.replace(/\&gt;/g,'>');
					val = val.replace(/\&amp;/g,'&');
				}
				if (!isNaN(val)) {
					val = Number(val);
					if (val == 0) {
						val = String('');
					}
				}
				myOb[y.nodeName] = val;
			  }
			y=y.nextSibling;
			}
			constructions.push(myOb);
	//		mine = mine + myOb['title'] + "\n";
	//		xmlDoc = '';
		}
	//	medium = constructions[0];

		if (typeof medium == "undefined") {
			thisD = 0;
			medium = constructions[0];
		}

	//	alert (mine);
	});
}

function buildDesignSelect(wasReplace) {
	var des = '';
	var thisI = 0;
	for (var c=0; c<constructions.length; c++) {
		des = des + '<option value="'+c+'">'+constructions[c].title+'</option>'+"\n";
		if (medium.title == constructions[c].title) {
			thisI = c;
		}
	}
	//alert(des + '-' + medium.title + '-' + thisI);
	switch (shelvesControl) {
		case 'Drupal' :
			jQuery('#edit-shelves-design').append(des);
			break;
		default :
			jQuery('.designx').html(des);
	}
	var dsel = document.getElementById("designx");
	if (wasReplace == 0) {
		dsel.selectedIndex = c - 1;
		thisD = c - 1;
	} else if (wasReplace == 'd') {
		dsel.selectedIndex = 0;
		thisD = 0;
	} else {
		dsel.selectedIndex = thisI;
		thisD = thisI;
	}
}