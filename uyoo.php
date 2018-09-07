<?php
/*
Copyright (C) 2018 Hyperchain (Hyperchain.net)

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/

/**
 * @package uyoo
 * @version 1.0
 */
/*
Plugin Name: 吾有作品登记插件
Plugin URI: https://www.uyoo.io/
Description: 本插件用于将网页中您创作的文字或图片作品提交到吾有TM平台进行登记，登记完成后您可以在吾有平台继续定价和发布交易。
Author: Hyperchain (Hyperchain.net)
Version: 1.0
Author URI: https://www.uyoo.io/
*/ 
function add_uyoo_box (){
	add_meta_box('uyoo_box', '吾有作品登记插件', 'uyoo_box','post','normal','high',array('str1','str2'));
}

add_action('add_meta_boxes','add_uyoo_box');

function uyoo_box($post,$boxargs){
	$login_url = '';
	$js_file = plugins_url().DIRECTORY_SEPARATOR.'uyoo'.DIRECTORY_SEPARATOR.'js'.DIRECTORY_SEPARATOR.'uyoo_base.js';
	$css_file = plugins_url().DIRECTORY_SEPARATOR.'uyoo'.DIRECTORY_SEPARATOR.'css'.DIRECTORY_SEPARATOR.'uyoo_base.css';
	$logo_file = plugins_url().DIRECTORY_SEPARATOR.'uyoo'.DIRECTORY_SEPARATOR.'img'.DIRECTORY_SEPARATOR.'logo.png';
	$ye_file = plugins_url().DIRECTORY_SEPARATOR.'uyoo'.DIRECTORY_SEPARATOR.'img'.DIRECTORY_SEPARATOR.'ye.png';

	echo $html = "<link rel='stylesheet' href='".$css_file."' type='text/css'  />";
	
	$html = <<<EOF
		<div class="rotation testa" id="work">
			<div class="basic-grey">

				<h1 class="clearfix">登记作品
				<div class="fr username_login"><span id="username"></span><span class="uyoo_loginout">退出登录</span></div>
				</h1>

				<p>
				<label>
				<span>作者:</span>
				<input id="uyoo_author" name="uyoo_author" type="text" placeholder="请输入该作品的作者名称" />
				</label>
				<label>
				</p>

				<p>
				<label>
				<span>版权所有者:</span>
				<input id="uyoo_copyright_owner_name" placeholder="请输入版权所有者名称" type="text" />
				</label>
				<label>
				</p>


				<p>
				<span class="basespan"></span>				
				<button id="uyoo_work" class="button-demo btn-demo" type="button">登记</button>
				</p>
			</div>
		</div>

		<div class="rotation test" id="start">
			<div class="center">
			<img class="logo" src="$logo_file" />
			</div>
			<div class="center">
			<a href="javascript:void(0);" id="uyoo_start"  class="button-demo btn-demo anone" title="登记作品" style="width: 260px;"><i class="inline icon-demo icon-white"></i>登记作品</a>
			</div>
		</div>

		<div class="rotation test" id="end">
			<div class="clearfix">
				<img src="$ye_file" class="end_img"/>
				<span>确权成功</span>
			</div>
			<p class="end_p1">作品已提交到吾有平台，</p>
			<p class="end_p2">您可以在吾有平台继续定价和发布交易，点击<span id="gourl">立即定价</span>。</p>
		</div>
EOF;

	echo $html;
	echo $html = "<script type='text/javascript' src='".$js_file."'></script>";
}

?>
