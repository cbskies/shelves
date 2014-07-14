<?php
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

if (isset($_POST["deletedesign"])) {
	$dom_oldd = new DOMDocument();
	$dom_oldd->load( 'constructions.xml' );

	$designs = $dom_oldd->getElementsByTagName('design');
	$delete_node = $designs->item($_POST["deletedesign"]);

	$gonner = $delete_node->parentNode->removeChild($delete_node);

	$dom_oldd->save('constructions.xml');
	echo 'd';
	exit;
}

if (isset($_POST["downloaddesign"])) {

$title = build_cssnjs();

$res = unlink("zips/".$title.".zip");
$zip = new ZipArchive();
$zipfilename = "zips/".$title.".zip";

if ($zip->open($zipfilename, ZipArchive::CREATE)!==TRUE) {
    echo 'error';
}

$zip->addFile("css/".$title.".css", "shelves.css");
$zip->addFile("css/".$title.".js", "shelves.js");
$zip->addFile("jquery-1.11.0.min.js", "jquery-1.11.0.min.js");

$zip->addFile("templates/index.html", "index.html");

foreach($_POST as $var => $val) {
	if (preg_match("/img$/", $var)) {
		if (!(preg_match("/^http\:\/\//", $val))) {
			$zip->addFile($val, $val);
			//echo $val . "\n";
		}
	}
}
$zip->addFile("images/mexicovolcano.jpg", "images/mexicovolcano.jpg");
$zip->addFile("images/rattlesnakecanyon.jpg", "images/rattlesnakecanyon.jpg");



$zip->close();

	echo "zips/".$title.".zip";
	exit;
} 


$indesign = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
$indesign .= '<constructions>'."\n".'<design>'."\n";

foreach ($_POST as $key=>$value) {
	$value = str_replace('&', '&amp;', $value);
	$value = str_replace('<', '&lt;', $value);
	$value = str_replace('>', '&gt;', $value);
	$indesign .= '  <'.$key.'>'.$value.'</'.$key.'>'."\n";
}
$indesign .= '</design>'."\n".'</constructions>'."\n";

//build_cssnjs();


$dom_newd = new DomDocument;
$dom_newd->loadXML($indesign);

$dom_oldd = new DOMDocument();
$dom_oldd->load( 'constructions.xml' );

$designs = $dom_oldd->getElementsByTagName('design');
$newdesigns = $dom_newd->getElementsByTagName('design');
$newtitlenode = $newdesigns->item(0)->getElementsByTagName('title');
$newtitle = $newtitlenode->item(0)->nodeValue; 

$d = 0;
$replace = 0;
foreach ($designs as $design) {
	$title = $design->getElementsByTagName('title');
	if ((isset($title->item(0)->nodeValue)) && ($title->item(0)->nodeValue == $newtitle)) {
		$oldnode = $designs->item($d);
		$newnode = $dom_oldd->importNode($newdesigns->item(0), true);
		$oldnode->parentNode->replaceChild($newnode, $oldnode);
		$replace = 1;
	}
	$d++;
}

if ($replace == 0) {
	$oldnode = $designs->item(0);
	$newnode = $dom_oldd->importNode($newdesigns->item(0), true);
	$oldnode->parentNode->appendChild($newnode);
}

$dom_oldd->save('constructions.xml');
echo $replace;

function build_cssnjs() {
$medium = 'medium = {'."\n";

foreach ($_POST as $key=>$value) {
	if (($key != 'css') && ($key != 'additionalcss') && ($key != 'downloaddesign')) {
		$value = str_replace('&lt;', '<', $value);
		$value = str_replace('&gt;', '>', $value);
		$value = str_replace('&amp;', '&', $value);
		$value = str_replace('\'', '\\\'', $value);
	//	if (preg_match("/[0-9\.]/", $value)) {
	//		$medium .= ' '.$key.' : '.$value.', '."\n";
	//	} else {
			$medium .= ' '.$key.' : \''.$value.'\', '."\n";
	//	}
	}
}
$medium .= "}\n\n";

$CSS = array();
$title = $_POST['title'];

$title = preg_replace("/[^A-Za-z0-9_-]/", '', $title);
$title = strtolower($title);

$fp = fopen("css/".$title.".css", "w");
//$fp = fopen("css/whiteinblackbrick.css", "w");

$newcss = explode('|', $_POST['css']);
foreach ($newcss as $nc) {
	$n = explode('=', $nc);
//	$n[0] = $n[0].replace('.', '');
	//$n[0] = preg_replace('\.', '', $n[0]);
	if (isset($n[1])) {
		if (!isset($CSS[$n[0]])) {
			$CSS[$n[0]] = "\t" . $n[1] . "\n";
		} else {
			$CSS[$n[0]] .= "\t" . $n[1] . "\n";
		}
	}
//	fwrite($fp, $n[0] . '=' . $CSS[$n[0]] . "\n");
}

$base = file_get_contents('cssshelf.css');

$bas = explode('.s', $base);
$bas_start = array_shift($bas);

fwrite($fp, $bas_start);

foreach ($bas as $b) {
	$ti = explode(' ', $b);
	$clas = '.s' . $ti[0];
	$bl = explode('}', $b, 2);
	if (isset($CSS[$clas])) {
		$add = $CSS[$clas];
	} else {
		$add = '';
	}
	$tb = '.s' . $bl[0] . "\n" . $add . '}' . $bl[1];
	fwrite($fp, $tb);

} 

fwrite($fp, $_POST['additionalcss']);

fclose($fp);

$main_js = file_get_contents('templates/shelves.js');

$fj = fopen("css/".$title.".js", "w");
//$fj = fopen("css/whiteinblackbrick.js", "w");

fwrite($fj, $medium . $main_js);

fclose($fj);

return $title;

}

?>