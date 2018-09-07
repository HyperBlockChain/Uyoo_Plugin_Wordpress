/*
Copyright (C) 2018 Hyperchain (Hyperchain.net)

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/
    var uyoo_host = "https://api.example.net/"

    var gourls = 'https://test.example.net/';

    var login_url = uyoo_host+"user/login"
    var signup_url = uyoo_host+"user/signup"
    var work_url = uyoo_host+"works/create"
    var release_url = uyoo_host+"works/uyoorelease"
    var BillingSwitch = uyoo_host+"site/isfree"
    var copyright_url = uyoo_host+"works/getcopyright"
    var me = uyoo_host+"user/me"
    var getencrypt = uyoo_host+"site/getencrypt"
    var getlogin = uyoo_host+"site/getlogin"

    var token = localStorage.getItem('Uyoo_token')?localStorage.getItem('Uyoo_token'):'';
    var user_key = {};
    var user_authorization_code = {}
    var work_id = 0;
    var wordpressCode = '1.0.0';
    var num = 0;

    function formatReturn(str){
      return $.parseJSON(str)
    }

    function removeDom(_this){
      $(_this).remove();
    }
    function setContent(){

      var request_url = tokenUrl(copyright_url);
      $.ajax({
            type: 'POST',
            url: request_url,
            processData: true, 
            data: JSON.stringify({'id':work_id}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data){
          console.log(data)
          if(data.ret==200){
             var content = $('#content').css('display') == 'none'?tinymce.get('content').getContent():$('#content').val();
             var html = data.data.copyright_url_big_image+'<br/>'+content+'<br/>'+data.data.copyright_strand_url
             if($('#content').css('display') == 'none'){
                tinymce.get('content').setContent(html)
             }else{
                $('#content').val(html)
             }

          }else{
            showMessage(data.msg,'err')
          } 
            },
          error: function (data,a,b) { 
              var return_error = formatReturn(data.responseText)
              console.log(return_error)
              showMessage(return_error.msg,'err')
 　　     }    
        });



     }

    function showMessage(str,cass){
      num++;
      console.log(num)
      var divStr = "<div class='alert"+cass+"' style='z-index:"+(9999+num)+";' id='alert"+num+"'><i class='fl "+cass+"'></i><span class='fl'>"+str+"</span></div>";
      $('#uyoo_box').append(divStr);
      setTimeout("removeDom('#alert"+num+"')",5000);
    }

    function tokenUrl(url){
      return url+'?access_token='+token+'&ver=wordpress-'+ wordpressCode;
    }

    function uyoo_me(){
      $.ajax({
        type: 'get',
        url: tokenUrl(me),
        async:false,
        dataType:'json',
        success:function(data){
          if(data.ret == 200){
            $('#username').text(data.data.username);
            $('#uyoo_author').val(data.data.pen_name);
            $('#uyoo_copyright_owner_name').val(data.data.copyright_owner_name);
          }
        }
      })
    }


    function rotationTab(id){
      $('#'+id).show().siblings('.rotation').hide();
    }

    if(token){
      rotationTab('work');
    }else{
      rotationTab('start');
    }

    function isEmptyObj(obj){
      if(JSON.stringify(obj)=="{}"){
        return true;
      }else{
        return false;
      }
    }

    $("#uyoo_start").click(function(){
      $.ajax({
        type:'get',
        url:getencrypt,
        dataType:'json',
        async:false,
        success:function(data){
          if(data.ret == 200){
            var dat = data.data;
            window.open(gourls+'site/login?encrypt='+dat.encrypt);
            var time = setInterval(function(){
              $.ajax({
                type:'post',
                url:getlogin,
                data:JSON.stringify(dat),
                dataType:'json',
                async:false,
                success:function(data){
                  if(data.ret == 200){
                    token = data.data.access_token;
                    window.localStorage.setItem('Uyoo_token',token);
                    uyoo_me();
                    rotationTab('work');
                    clearInterval(time);
                  }
                }
              })
            },2000);
          }
        }
      })
    })

    $(".uyoo_back").click(function(){
      rotationTab('login')
    })

    $(".uyoo_signup").click(function(){
      rotationTab('signup')
    })

    $(".uyoo_loginout").click(function(){
      localStorage.removeItem('Uyoo_token');  
      token = '';
      rotationTab('start')
    })

    $(".uyoo_restart").click(function(){
        rotationTab('start'); 
    })


    $("#uyoo_work").click(function() {
      var author = $('#uyoo_author').val();
      var copyright_owner_name = $('#uyoo_copyright_owner_name').val();
      var content = $('#content').css('display') == 'none'?tinymce.get('content').getContent():$('#content').val();
      var title = $('#title').val();
      var request_url = tokenUrl(work_url);

      if(author == null||author == undefined||author == ''){
        showMessage('作者不能为空','err');
        return;
      }else if(copyright_owner_name == null||copyright_owner_name == undefined||copyright_owner_name == ''){
        showMessage('版权所有者不能为空','err');
        return;
      }else if(content == null||content == undefined||content == ''){
        showMessage('文本不能为空','err');
        return;
      }else if(title == null||title == undefined||title == ''){
        showMessage('标题不能为空','err'); 
        return;
      }

      $.ajax({
            type: 'POST',
            url: request_url,
            processData: true, 
            data: JSON.stringify({'name':title,'author':author,'copyright_owner_name':copyright_owner_name,'content_text':content}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data){
              console.log(data)
              if(data.ret==200){
                work_id = data.data.id
                setContent()
                rotationTab('end')
              }else{
                showMessage(data.msg,'err')
              } 
            },
          error: function (data,a,b) { 
              var return_error = formatReturn(data.responseText)
              console.log(return_error)
              showMessage(return_error.msg,'err')
 　　     }    
        });
    })

    uyoo_me();

    $('#gourl').click(function(){
      window.open(gourls+'works/priceuyoo?id='+work_id+'&access_token='+token);
    })