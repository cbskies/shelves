/*
var constructions = [];

whiteinblack = {
title : 'White in Black Brick',
backwall : 1,
toptop : 0,
topface : 0,
trim : 0,
makesquare : 1,
alignsquares : 1,
backwallbih : '',
backwallbiw : '',
topspace : 90,
backwallimg : 'http://localhost/shelves/images/blackbrickF.png',
trimleftimg : 'http://localhost/shelves/images/blackbrickF.png',
trimrightimg : 'http://localhost/shelves/images/blackbrickF.png',
faceimg : 'http://localhost/shelves/images/blackbrickF.png',
verticalleftimg : 'http://localhost/shelves/images/cinderblock.png',
verticalrightimg : 'http://localhost/shelves/images/cinderblock.png',
backimg : 'http://localhost/shelves/images/cinderblock.png',
topfaceimg : 'http://localhost/shelves/images/blackbrickF.png',
toptopimg : 'http://localhost/shelves/images/blackbrickF.png',
bottomimg : 'http://localhost/shelves/images/cinderblock.png',
shadowlength : 200,
containerbackground : 'grey',
unitwidth : 92,
unitspan : 7,
shelfdepth : '',
trimwidth : '',
trimbiw : '',
trimbih : '',
facebiw : '',
facebih : '',
backbiw : '',
backbih : '',
verticalbiw : '',
verticalbih : '',
toptopbiw : '',
toptopbih : '',
topfacebiw : '',
topfacebih : '',
bottombiw : '',
bottombih : '',
faceheight : '',
topfaceheight : '',
contentwrap : 1,
contentprefix : '<table><tbody><tr><td align="center" valign="bottom"><div class="shelf-wrap-holder"><div class="shelf-wrap">',
contentsuffix : '</div></div></td></tr></tbody></table>',
contenthangers : 1,
contentswingonload : 0,
contentswingonhover : 0,
pixelwidth : 700,
perspectivechng : 0,
};
constructions.push(whiteinblack);

darkwood1 = {
title : 'Dark Wood Shelf',
makeTop : 1,
backwall : 1,
makeInset : 0,
toptop : 1,
topface : 1,
trim : 1,
makesquare : 0,
backwallbih : 'auto',
backwallbiw : '700px',
topspace : 90,
backwallimg : 'http://localhost/shelves/images/darkwood1/WoodLogs.jpg',
trimleftimg : 'http://localhost/shelves/images/darkwood1/vertFaceL.png',
trimrightimg : 'http://localhost/shelves/images/darkwood1/vertFaceR.png',
faceimg : 'http://localhost/shelves/images/darkwood1/shelfFace.png',
verticalleftimg : 'http://localhost/shelves/images/darkwood1/leftVert5.png',
verticalrightimg : 'http://localhost/shelves/images/darkwood1/rightvert2.png',
backimg : 'http://localhost/shelves/images/darkwood1/sback.jpg',
topfaceimg : 'http://localhost/shelves/images/darkwood1/shelfFace.png',
toptopimg : 'http://localhost/shelves/images/darkwood1/bottomMid.png',
bottomimg : 'http://localhost/shelves/images/darkwood1/bottomMid.png',
shadowlength : 200,
containerbackground : 'black',
unitwidth : 92,
unitspan : 7,
shelfdepth : 70,
trimwidth : 22,
faceheight : 22,
topfaceheight : 22,
trimbiw : '22px',
trimbih : '',
facebiw : '',
facebih : '22px',
backbiw : '600px',
backbih : '',
verticalbiw : '70px',
verticalbih : '',
toptopbiw : '',
toptopbih : '70px',
topfacebiw : '',
topfacebih : '22px',
bottombiw : '',
bottombih : '70px',
contentwrap : 1,
contentprefix : '<table><tbody><tr><td align="center" valign="bottom"><div class="shelf-wrap-holder"><div class="shelf-wrap">',
contentsuffix : '</div></div></td></tr></tbody></table>',
contenthangers : 0,
contentswingonload : 0,
contentswingonhover : 0,
pixelwidth : 400,
perspectivechng : 0,
};
constructions.push(darkwood1);

tiles1 = {
title : 'Tiles 1',
backwall : 1,
toptop : 1,
topface : 1,
trim : 1,
makesquare : 1,
alignsquares : 1,
backwallbih : '',
backwallbiw : '',
topspace : 90,
backwallimg : 'http://localhost/shelves/images/tiles/tile1opaque.jpg',
trimleftimg : 'http://localhost/shelves/images/tiles/tile1.png',
trimrightimg : 'http://localhost/shelves/images/tiles/tile1.png',
faceimg : 'http://localhost/shelves/images/tiles/tile1.png',
verticalleftimg : 'http://localhost/shelves/images/tiles/tile1.png',
verticalrightimg : 'http://localhost/shelves/images/tiles/tile1.png',
backimg : 'http://localhost/shelves/images/tiles/tile1opaque.jpg',
topfaceimg : 'http://localhost/shelves/images/tiles/tile1.png',
toptopimg : 'http://localhost/shelves/images/tiles/tile1.png',
bottomimg : 'http://localhost/shelves/images/tiles/tile1.png',
shadowlength : 300,
containerbackground : 'black',
unitwidth : 92,
unitspan : 7,
shelfdepth : '',
trimwidth : '',
faceheight : '',
topfaceheight : '',
trimbiw : '',
trimbih : '',
facebiw : '',
facebih : '',
backbiw : '',
backbih : '',
verticalbiw : '',
verticalbih : '',
toptopbiw : '',
toptopbih : '',
topfacebiw : '',
topfacebih : '',
bottombiw : '',
bottombih : '',
contentwrap : 1,
contentprefix : '<table><tbody><tr><td align="center" valign="bottom"><div class="shelf-wrap-holder"><div class="shelf-wrap">',
contentsuffix : '</div></div></td></tr></tbody></table>',
contenthangers : 0,
contentswingonload : 0,
contentswingonhover : 0,
pixelwidth : 400,
perspectivechng : 0,
};
constructions.push(tiles1);

lightredflowers = {
title : 'Light/Red Wood In Flowers',
backwall : 1,
toptop : 0,
topface : 0,
trim : 0,
makesquare : 0,
backwallbih : '',
backwallbiw : '500px',
topspace : 90,
backwallimg : 'http://localhost/shelves/images/FlowerBeds.jpg',
trimleftimg : 'http://localhost/shelves/images/wood3/trimv.png',
trimrightimg : 'http://localhost/shelves/images/wood3/trimv.png',
faceimg : 'http://localhost/shelves/images/wood3/trimh.png',
verticalleftimg : 'http://localhost/shelves/images/wood3/plankv.png',
verticalrightimg : 'http://localhost/shelves/images/wood3/plankv.png',
backimg : 'http://localhost/shelves/images/woodred.jpg',
topfaceimg : 'http://localhost/shelves/images/wood3/trimh.png',
toptopimg : 'http://localhost/shelves/images/wood3/plankh.png',
bottomimg : 'http://localhost/shelves/images/wood3/plankh.png',
shadowlength : 200,
containerbackground : 'black',
unitwidth : 92,
unitspan : 7,
shelfdepth : 70,
trimwidth : 10,
faceheight : 10,
topfaceheight : 10,
trimbiw : '10px',
trimbih : '',
facebiw : '',
facebih : '10px',
backbiw : '600px',
backbih : '',
verticalbiw : '70px',
verticalbih : '',
toptopbiw : '',
toptopbih : '70px',
topfacebiw : '',
topfacebih : '10px',
bottombiw : '',
bottombih : '70px',
contentwrap : 1,
contentprefix : '<table><tbody><tr><td align="center" valign="bottom"><div class="shelf-wrap-holder"><div class="shelf-wrap">',
contentsuffix : '</div></div></td></tr></tbody></table>',
contenthangers : 0,
contentswingonload : 0,
contentswingonhover : 0,
pixelwidth : 400,
perspectivechng : 0,
};
constructions.push(lightredflowers);

lightwoodntiles = {
title : 'Light Wood In Tiles',
backwall : 1,
toptop : 0,
topface : 0,
trim : 0,
makesquare : 0,
backwallbih : '',
backwallbiw : '199px',
topspace : 90,
backwallimg : 'http://localhost/shelves/images/tilesornate.jpg',
trimleftimg : 'http://localhost/shelves/images/wood3/trimv.png',
trimrightimg : 'http://localhost/shelves/images/wood3/trimv.png',
faceimg : 'http://localhost/shelves/images/facetile.jpg',
verticalleftimg : 'http://localhost/shelves/images/lightwood3/plankv2.jpg',
verticalrightimg : 'http://localhost/shelves/images/lightwood3/plankv.jpg',
backimg : 'http://localhost/shelves/images/dragontile.jpg',
topfaceimg : 'http://localhost/shelves/images/wood3/trimh.png',
toptopimg : 'http://localhost/shelves/images/wood3/plankh.png',
bottomimg : 'http://localhost/shelves/images/lightwood3/plankh3.jpg',
shadowlength : 400,
containerbackground : 'black',
unitwidth : 92,
unitspan : 7,
shelfdepth : 128,
trimwidth : 10,
faceheight : 55,
topfaceheight : 55,
trimbiw : '10px',
trimbih : '',
facebiw : '',
facebih : '55px',
backbiw : '100%',
backbih : '100%',
verticalbiw : '100px',
verticalbih : '',
toptopbiw : '',
toptopbih : '100px',
topfacebiw : '',
topfacebih : '55px',
bottombiw : '',
bottombih : '100px',
contentwrap : 1,
contentprefix : '<table><tbody><tr><td align="center" valign="bottom"><div class="shelf-wrap-holder"><div class="shelf-wrap">',
contentsuffix : '</div></div></td></tr></tbody></table>',
contenthangers : 0,
contentswingonload : 0,
contentswingonhover : 0,
pixelwidth : 400,
perspectivechng : 0,
};
constructions.push(lightwoodntiles);

coppernsteel = {
title : 'Copper And Stainless Steel',
backwall : 1,
toptop : 0,
topface : 0,
trim : 0,
makesquare : 0,
backwallbih : '',
backwallbiw : '500px',
topspace : 90,
backwallimg : 'http://localhost/shelves/images/bronzecopper.jpg',
trimleftimg : 'http://localhost/shelves/images/darkwood1/vertFaceL.png',
trimrightimg : 'http://localhost/shelves/images/darkwood1/vertFaceR.png',
faceimg : 'http://localhost/shelves/images/bronzecopper.jpg',
verticalleftimg : 'http://localhost/shelves/images/metalbare.jpg',
verticalrightimg : 'http://localhost/shelves/images/metalbare.jpg',
backimg : 'http://localhost/shelves/images/bronzecopper.jpg',
topfaceimg : 'http://localhost/shelves/images/darkwood1/shelfFace.png',
toptopimg : 'http://localhost/shelves/images/darkwood1/bottomMid.png',
bottomimg : 'http://localhost/shelves/images/metalbare.jpg',
shadowlength : 500,
containerbackground : 'black',
unitwidth : 92,
unitspan : 8,
shelfdepth : 225,
trimwidth : 22,
faceheight : 75,
topfaceheight : 75,
trimbiw : '22px',
trimbih : '',
facebiw : '500px',
facebih : '',
backbiw : '600px',
backbih : '',
verticalbiw : '500px',
verticalbih : '',
toptopbiw : '500px',
toptopbih : '',
topfacebiw : '500px',
topfacebih : '',
bottombiw : '500px',
bottombih : '',
contentwrap : 1,
contentprefix : '<table><tbody><tr><td align="center" valign="bottom"><div class="shelf-wrap-holder"><div class="shelf-wrap">',
contentsuffix : '</div></div></td></tr></tbody></table>',
contenthangers : 0,
contentswingonload : 0,
contentswingonhover : 0,
pixelwidth : 400,
perspectivechng : 0,
};
constructions.push(coppernsteel);

medium = constructions[0];
//var regex = /</g;

var txt = "<textarea name=\"bla\">\n<constructions>";
for (i=0;i<constructions.length;i++) {
	txt = txt + "<design>\n";
	for (key in constructions[i]) {
		var v = String(constructions[i][key]);
		var v = v.replace(/</g,'&lt;');
		var v = v.replace(/>/g,'&gt;');
		var v = v.replace(/\&/g,'&amp;');
		txt = txt + '  <' + key + '>' + v + '</' + key + ">\n";
	}
	txt = txt + "</design>\n\n";
}
txt = txt + "</constructions>\n</textarea>";
document.write(txt);

*/



function loadXMLDoc(dname)
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",dname,false);
xhttp.send();
return xhttp.responseXML;
}


xmlDoc=loadXMLDoc("http://localhost/drupal/sites/all/modules/shelves/constructions.xml");
designs=xmlDoc.getElementsByTagName("design");
var constructions = [];

for(b=0;b<designs.length;b++) {
myOb = [];

x=xmlDoc.getElementsByTagName("design")[b].childNodes;
y=xmlDoc.getElementsByTagName("design")[b].firstChild;
for (i=0;i<x.length;i++)
{
if (y.nodeType==1)
  {//Process only element nodes (type 1)
//  if (y.childNodes[0].nodeValue) {
//   y.childNodes[0].nodeValue = '';
//  }
  var val = y && y.childNodes[0] && y.childNodes[0].nodeValue;
  if (!val) {
	val = '';
	}
 // document.write(y.nodeName + " = " + val + "<br>");
	myOb[y.nodeName] = val;
  }
y=y.nextSibling;

}
//document.write(printObject(myOb, 'myOb'));
constructions.push(myOb);
}
medium = constructions[0];
