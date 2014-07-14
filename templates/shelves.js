/*
CSS Shelves - js/css program for the design and use of 3D shelving systems in the display of web content.
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

jQuery(document).ready(function() {
	jQuery(window).load(function() {
		update();

		if (medium.perspectivechng) {
			jQuery( window ).scroll(function() {
				chview();
			});
		}
	});
});


function update() {
	jQuery('.shelves').wrap('<div class="shelf-back-wall"></div>');

	jQuery('.shelf').wrap('<div class="shelf-parent"></div>');
	var sPanels = [
	'<div class="shelf-vertical svleft"><div class="shelf-vertical-shadow svsleft"></div><div class="svsleftright"></div><div class="svsleftbottom"></div></div>',
	'<div class="shelf-bottom-parent"><div class="shelf-bottom-child"><div class="sbcshadow"></div></div></div>',
	'<div class="shelf-back"><div class="shelf-back-shadow"></div><div class="shelf-back-shadowleft"></div><div class="shelf-back-shadow-bottom"></div><div class="shelf-back-shadowright"></div></div>',
	'<div class="shelf-vertical svright"><div class="shelf-vertical-shadow svsright"></div><div class="svsrightleft"></div><div class="svsrightbottom"></div></div>',
	//	'<div class="shelf-face"></div>'
	].join("\n");
	jQuery('.shelf-parent').append(sPanels);
	jQuery('.shelf-back-wall').prepend("\n"+'<div class="shelves-top-spacer"></div>'+"\n");

	//Add the shelf-face div if it is needed or move it to the corrent possition at the end of the shelf-parent div
	var shelves = jQuery('.shelf-parent');
	var r = /class(\s?)=(\s?)[\'\"]shelf-face/;
	for (var i=0; i<shelves.length; i++) {
		var thishtml = jQuery('.shelf-parent:eq('+i+')').html();
		if (!(thishtml.match(r))) {
			jQuery('.shelf-parent:eq('+i+')').append('<div class="shelf-face"></div>');
		} else {
			var f = jQuery('.shelf:eq('+i+') > .shelf-face').detach();
			jQuery('.shelf-parent:eq('+i+')').append(f);
			customFace = 1;
		}
	}

	var cwrap = medium.contentprefix + medium.contentsuffix;
	jQuery('.shelf').wrapInner(cwrap);
//	jQuery('.shelf').prepend(medium.contentprefix);
//	jQuery('.shelf').append(medium.contentsuffix);


	if (medium.trim) {
	jQuery('.shelves').wrap('<div class="shelves-table"><div class="shelves-table-row"></div></div>');
	jQuery('.shelves-table-row').prepend('<div class="shelves-trim stleft"></div>');
	jQuery('.shelves-table-row').append('<div class="shelves-trim stright"></div>');
	}

	if (medium.topface) {
	jQuery('.shelves-top-spacer').after('<div class="shelves-top-face"></div>');
	}

	if (medium.toptop) {
	jQuery('.shelves-top-spacer').after('<div class="shelves-top-top-parent"><div class="shelves-top-top-child"></div></div>');
	}

	shelfbottom = jQuery('.shelf-bottom-child');

	if ((medium.alignsquares) && (medium.makesquare)) {
		tsize = Number(medium.unitwidth);

		demssbB = shelfbottom[0].getBoundingClientRect();

		if (medium.contentpadding) {
			shelfPadding = medium.contentpadding;
		} else {
			shelfPadding = Math.round(demssbB.height / 2);
		}
		shelfParents = jQuery('.shelf');
		for (var sp = 0; sp < shelfParents.length; sp++) {
			jQuery('.shelf:eq(' + sp + ')').css('height', 'auto');
			spHeight = jQuery('.shelf:eq(' + sp + ')').outerHeight();
			more = ((spHeight + (shelfPadding * 2)) % tsize);
			spNewHeight = Math.round(spHeight + (tsize - more));
			jQuery('.shelf:eq(' + sp + ')').css('height', spNewHeight + 'px');
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
		//it++;
		//mine = it + '-for iteration count<br>' + cenloc +' < '+ winH +' && '+ dems.bottom + ' > 0<br>';

		var scale = cenloc / winH;
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
	//	jQuery('#location').html(mine);


	}

	}
	//	jQuery('#location').html(mine);
	//var mine = mine+'top: '+demsHc.top+' <br>bottom: '+demsHc.bottom+'<br>Scale:'+scale+'<br>Skew:'+sk+'<br>'+demsHc.height+'-'+backUp+'='+bDown;
	//jQuery('.location').html(mine);
	}
}