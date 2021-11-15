$(function(e){
  init();//초기화
  var increasePosX=0;//마우스 증가값
  var increasePosY=0;//마우스 증가값
  var pointerPosX=0;//마우스 현재값
  var pointerPosY=0;//마우스 현재값
  var contextFlag;//컨텍스트 열림 유무
  var selectPost;//선택한 포스트


  //윈도우 사이즈 변화
  $(window).resize(function(ev){

    if(getPostInfoLength()){
      var tmpList = getPostInfo();
    }
    for(var i = 0; i < getPostInfoLength(); i++){
      // console.log(i+"번째 :"+getPostInfo());
      // console.log("tmpWidth height : "+$('#'+tmpList[i].id).width()+);
      if(tmpList[i].position.x+tmpList[i].size.width >= $(window).width()){

        var tmpPosX = tmpList[i].position.x - ((tmpList[i].position.x+tmpList[i].size.width) - $(window).width());
        tmpList[i].position.x = tmpPosX;
        updatePostInfo(tmpList[i]);
        $('#'+tmpList[i].id).offset({left:tmpPosX});

      }
      if(tmpList[i].position.y+tmpList[i].size.height >= $(window).height()){
        var tmpPosY = tmpList[i].position.y - ((tmpList[i].position.y+tmpList[i].size.height) - $(window).height());
        tmpList[i].position.y = tmpPosY;
        updatePostInfo(tmpList[i]);
        // console.log(tmpPosY);
        $('#'+tmpList[i].id).offset({top:tmpPosY});
      }
    }
  });

  // 컨텍스트 메뉴 생성 Start ---------------------------------------------------------------------------------
  $(document).on('contextmenu', function(ev) {
    contextFlag = true;
    var html = '';
    if(ev.target.className.indexOf("context_") != -1){//context 메뉴를 우클릭 했을 경우
      return false;
    }
    else{
      selectPost = ev.target.id.replace(/([\w]+)-+/g, '');
    }



    if(ev.target.className == "main"){
      html ='<ul class="context_list"><li class="context_li"><button class="context_li_create">생성</button></li>\
              <li class="context_li">-----------</li>\
              <li class="context_li"><button class="context_li_sort">정렬</button></li>\
              <li class="context_li">-----------</l\i>\
              <li class="context_li"><button class="context_li_deleteAll">전체 삭제</button></li>\
              <li class="context_li">-----------</li></ul>\
            ';
      $('.context_menu').html(html);
    }
    else {
      console.log("select Post : "+selectPost)
      var flag = $('#onOffToggle-'+selectPost+'>.toggle:visible').attr("id").indexOf("open-") != -1 ? true:false;
      console.log("flag : "+flag);
      html ='<div class="context_head">서식 조정 기능</div>\
              <ul class="context_list"><li class="context_li">배경색상 변경 : \
                <select name="bg-color" class="context_li_select" id="bg-color">\
                  <option class="context_li_option" value="yellow" id="yellow"></option>\
                  <option class="context_li_option" value="red" id="red"></option>\
                  <option class="context_li_option" value="gray" id="gray"></option>\
                  <option class="context_li_option" value="blue" id="blue"></option>\
                  <option class="context_li_option" value="green" id="green"></option>\
                  <option class="context_li_option" value="white" id="white"></option>\
                  <option class="context_li_option" value="black" id="black"></option>\
                </select>\
              </li>\
              <li class="context_li">글자 크기 선택\
                <select name="font-size" class="context_li_select" id="font-size">\
                  <option class="context_li_option" value="10" id="font_10">10</option>\
                  <option class="context_li_option" value="11" id="font_11">11</option>\
                  <option class="context_li_option" value="12" id="font_12">12</option>\
                  <option class="context_li_option" value="13" id="font_13">13</option>\
                  <option class="context_li_option" value="14" id="font_14">14</option>\
                  <option class="context_li_option" value="15" id="font_15">15</option>\
                  <option class="context_li_option" value="20" id="font_20">20</option>\
                  <option class="context_li_option" value="25" id="font_25">25</option>\
                  <option class="context_li_option" value="30" id="font_30">30</option>\
                  <option class="context_li_option" value="40" id="font_40">40</option>\
                </select>\
              </li>\
              <li class="context_li">글자 색상 변경\
                <select name="font-color" class="context_li_select" id="font-color">\
                  <option class="context_li_option" value="yellow" id="yellow"></option>\
                  <option class="context_li_option" value="red" id="red"></option>\
                  <option class="context_li_option" value="gray" id="gray"></option>\
                  <option class="context_li_option" value="blue" id="blue"></option>\
                  <option class="context_li_option" value="green" id="green"></option>\
                  <option class="context_li_option" value="white" id="white"></option>\
                  <option class="context_li_option" value="black" id="black"></option>\
                </select>\
              </li>\
              <li class="context_li">\
                <div class="onOffToggle" id="contextonOffToggle-'+selectPost+'">\
                  <div class="toggle" style="'+(flag ? "":"display:none")+'" id="contextopen-'+selectPost+'">펼치기</div>\
                  <div class="toggle" style="'+(flag ? "display:none":"")+'" id="contextclose-'+selectPost+'">닫기</div>\
                </div>\
              </li>\
              <li class="context_li"><input type="number" class="context_li_input" id="timer" min="0" name="">초 뒤 삭제</li>\
              <li class="context_li">\
                <div class="deletePost" id="delete-'+selectPost+'">삭제하기</div>\
              </li></ul>\
              ';
      $('.context_menu').html(html);
      changePostBG(selectPost);
      changeFontSize(selectPost);
      changeFontColor(selectPost);
    }
    var bottom = ev.clientY+$(".context_menu").height();
    var right = ev.clientX+$(".context_menu").width();
    console.log("bottom:"+bottom);
    console.log("right:"+right);
    var posY = ev.clientY;
    var posX = ev.clientX;

    if(right >= $(window).width()){
      posX = ev.clientX-$(".context_menu").width();
      console.log("라이트 큼");
    }
    else{
    }
    if(bottom >= $(window).height()){
      posY = ev.clientY-$(".context_menu").height();
      console.log("바텀 큼");
    }

    $('.context_menu').css("top", posY+"px");
    $('.context_menu').css("left", posX+"px");

    $('.context_menu').show();
    return false;
  });
  // 컨텍스트 메뉴 생성 End---------------------------------------------------------------------------------

  // 그 외 이벤트 열기, 닫기, 삭제, 생성
  $(document).on('click', function(ev){
    var className = ev.target.className;
    console.log("document click class Name : "+className);

    if(contextFlag && ev.target.className.indexOf("context_") == -1){
      console.log("test");
      contextFlag = false;
      $('.context_menu').hide(hideCallback(selectPost));
    }
    if(className == "deletePost"){
      var id = ev.target.id.replace(/([\w]+)-+/g, '');
      callDeletePost(id);
      contextFlag = false;
      $('.context_menu').hide();
    }
    else if(className == "context_li_create"){
      makePostit(getPostInfoLength(), "create" ,ev);
      $('.context_menu').hide();

    }
    else if(className == "context_li_sort"){
      sortPost();
      $('.context_menu').hide();

    }
    else if(className == "context_li_deleteAll"){
      callDeletePost();
      $('.context_menu').hide();

    }
  });

  $("body").on("click",".onOffToggle",function(ev){
    var id = $(this).attr("id").replace(/([\w]+)-+/g, '');
    console.log(id);
    $("#onOffToggle-"+id+">.toggle" ).toggle();
    $("#contextonOffToggle-"+id+">.toggle" ).toggle();
    changePost(ev.target.id);
  });

  // 포스트 이동 Start---------------------------------------------------------------------------------
  $("body").on("mousedown",'.postHead',function(ev){
    //z-index 정리 (선택된게 가장 상단으로)
    $(".main").children().css("z-index",10);
    $(this).parent().css("z-index",10000);
    var parent = $(this).parent().attr("id");

    //커서 좌표
    pointerPosX = ev.clientX;
    pointerPosY = ev.clientY;

    //마우스 업 했을 경우 이벤트 해제
    $(document).on("mouseup", function(ev){
      var id = parent.replace(/([\w]+)-+/g, '');
      var tmpList = getPostInfo(id);
      tmpList.position.y = $("#"+parent).offset().top-increasePosY;
      tmpList.position.x = $("#"+parent).offset().left-increasePosX;
      updatePostInfo(tmpList);

      $(document).off("mouseup");
      $(document).off("mousemove");
    });

    //마우스 커서 위치에 따라 포스트 이동
    $(document).on("mousemove", function(ev){
      increasePosX = pointerPosX - ev.clientX;
      increasePosY = pointerPosY - ev.clientY;

      pointerPosX = ev.clientX;
      pointerPosY = ev.clientY;

      $("#"+parent).css("top", ($("#"+parent).offset().top-increasePosY)+"px");
      $("#"+parent).css("left", ($("#"+parent).offset().left-increasePosX)+"px");
      checkBoard($("#"+parent));
    });


    //보드의 가장자리를 벗어나지 않게 체크
    function checkBoard(parent)
    {
      if(parent.offset().top <= 0 ){
        parent.offset({top: 0});
      }
      if(parent.offset().left <= 0){
        parent.offset({left: 0});
      }
      if((parent.offset().left+parent.width()) >= $(window).width()){
        parent.offset({left:($(window).width()-parent.width())});
      }
      if(parent.offset().top+parent.height() >= $(window).height()){
        parent.offset({top:($(window).height()-parent.height())});
      }
    }
  });
  // 포스트 이동 End---------------------------------------------------------------------------------

  // 포스트 리사이즈 Start---------------------------------------------------------------------------------
  $("body").on("mousedown",".resizable",function(ev){
    $(".main").children().css("z-index",10);
    $(this).parent().css("z-index",10000);

    var parent = $(this).parent().attr("id");
    pointerPosX = ev.clientX;
    pointerPosY = ev.clientY;
    var nowWidth = $("#"+parent).width();
    var nowHeight = $("#"+parent).height();
    //마우스 커서 위치에 따라 리사이즈
    $(document).on("mousemove", function(ev){
      increasePosX = pointerPosX - ev.clientX;
      increasePosY = pointerPosY - ev.clientY;

      pointerPosX = ev.clientX;
      pointerPosY = ev.clientY;
      nowWidth = $("#"+parent).width();
      nowHeight = $("#"+parent).height();
      $("#"+parent).width(nowWidth-increasePosX);
      $("#"+parent).height(nowHeight-increasePosY);
      $('#'+parent+">.body>.contents").height((nowHeight-increasePosY-20))

      if($("#"+parent).width() <= 250){
        $("#"+parent).width(250);
      }
      if($("#"+parent).height() <= 30){
        $("#"+parent).height(30);
      }

      if(($("#"+parent).width()+$("#"+parent).offset().left) >= $(window).width()){
        $("#"+parent).width(nowWidth);
      }
      if(($("#"+parent).height()+$("#"+parent).offset().top) >= $(window).height()){
        $("#"+parent).height(nowHeight);
      }
    });
    //마우스 업 했을 경우 이벤트 해제
    $(document).on("mouseup", function(ev){
      var id = parent.replace(/([\w]+)-+/g, '');
      var tmpList = getPostInfo(id);
      tmpList.size.width = nowWidth;
      tmpList.size.height = nowHeight;
      updatePostInfo(tmpList);
      $(document).off("mouseup");
      $(document).off("mousemove");
    });
  });
  // 포스트 리사이즈 End---------------------------------------------------------------------------------

  //텍스트 에어리어 입력 및 저장
  $(document).on("keyup", ".contents", function(ev){
    var id = $(this).attr("id").replace(/([\w]+)-+/g, '');
    var tmpList = getPostInfo(id);
    tmpList.contents = $(this).val();
    updatePostInfo(tmpList);
  });
  //배경색 변경
  $(document).on("change", "#bg-color", function(ev){
    changePostBG(selectPost, true);
  });
  //폰트 사이즈 변경
  $(document).on("change", "#font-size", function(ev){
    changeFontSize(selectPost, true);
  });
  //폰트 색상 변경
  $(document).on("change", "#font-color", function(ev){
    changeFontColor(selectPost, true);
  });

  $("#time-input").on("change",function(ev){
    console.log($("#time-input").val());
  });
});

// other --------------------------------------------------------------------------------------------------

//타이머
var startTimer = {};

//컨텍스트 메뉴 숨김처리시 콜백 함수
function hideCallback(selectPost)
{

  Timer(selectPost);

}
//타이머
function Timer(selectPost)
{
  var endTime = $("#timer").val();
  if(isNaN($("#timer").val()) || $("#timer").val() == "" || startTimer[selectPost]){
    return false;
  }
  startTimer[selectPost] = setInterval(function(){
    console.log("post-"+selectPost+":"+endTime);
    //첫줄 가져와 포스트 헤드에 제목으로 지정

    $("#post-"+selectPost+">.postHead>.subject>.timer-span").html("["+endTime+"초 뒤 삭제]");
    if(endTime == 0){
      // clearInterval(startTimer[selectPost]);
      callDeletePost(selectPost);
      $('.context_menu').hide();
    }
    endTime--;
  },1000);


}

function callDeletePost(id=-1)
{
  if(id == -1){
    var keyList = Object.keys(startTimer);
    console.log(keyList);
    for(var i = 0; i < keyList.length; i++){
      clearInterval(startTimer[keyList[i]]);
    }
    startTimer ={};

  }else{
    clearInterval(startTimer[id]);
    delete startTimer[id];
  }
  //model.js/deletePost
  deletePost(id);
}

//포스트 정렬
function sortPost()
{
  $(".main").html("");
  var maxHeight = 0;
  var maxWidth = 0;
  var wWidth = $(window).width();
  var wHeight = $(window).height();
  var col = 0;
  var row = 0;
  var tmpList = getPostInfo();
  for(var i = 0; i < getPostInfoLength(); i++){

    var marginTop = 30;
    var marginLeft = 10;

    maxHeight = ((row+1)*marginTop)+200;
    if(maxHeight >= wHeight){
      maxHeight = 0;
      row = 0;
      col++;
    }

    maxWidth = (col*250)+((col+1)*marginLeft)+250;
    if(maxWidth >= wWidth){
      maxWidth = 0;
      maxHeight = 0;
      col = 0;
      row = 0;
    }

    console.log("maxWidth : "+maxWidth);
    console.log("maxheight : "+maxHeight);

    tmpList[i].position.x = (col*250)+((col+1)*marginLeft);
    tmpList[i].position.y = (row++)*marginTop+10;





    tmpList[i].size.width = 250;
    tmpList[i].size.height = 200;

    updatePostInfo(tmpList[i]);
    makePostit(i,"init");
  }
}

//폰트색 바꾸기
function changeFontColor(id, flag=false)
{
  var tmpList = getPostInfo(id);
  if(!flag){
    $("#font-color").val(tmpList.css.fontcolor);
  }
  $("#font-color").css("background-color", $("#font-color").val());
  $("#contents-"+id).css("color", $("#font-color").val());
  tmpList.css.fontcolor = $("#font-color").val();
  updatePostInfo(tmpList);
}


//폰트 사이즈 바꾸기
function changeFontSize(id, flag=false)
{
  var tmpList = getPostInfo(id);
  if(!flag){
    $("#font-size").val(tmpList.css.fontsize);
  }
  $("#contents-"+id).css("font-size", $("#font-size").val()+"px");
  tmpList.css.fontsize = $("#font-size").val();
  updatePostInfo(tmpList);
}

//배경색 바꾸기
function changePostBG(id, flag=false)
{
  var tmpList = getPostInfo(id);
  if(!flag){
    $("#bg-color").val(tmpList.css.bgcolor);
  }
  $("#bg-color").css("background-color", $("#bg-color").val());
  $("#post-"+id).css("background-color", $("#bg-color").val());
  tmpList.css.bgcolor = $("#bg-color").val();

  updatePostInfo(tmpList);
}


function changePost(id)
{
  var tmp = id.split('-');
  if(tmp[0] == "open" || tmp[0] == "contextopen"){
    var tmpList = getPostInfo(tmp[1]);
    $("#post-"+tmp[1]).height(tmpList.size.height);
    $("#post-"+tmp[1]+">.postHead>.subject>.contents-span").html('');

    $("#post-"+tmp[1]).children(".body").removeClass("hidden");
    $("#post-"+tmp[1]).children(".resizable").removeClass("hidden");
  }
  else if(tmp[0] == "close" || tmp[0] == "contextclose"){

    var tmpList = getPostInfo(tmp[1]);

    //첫줄 가져와 포스트 헤드에 제목으로 지정
    var firstLine = tmpList.contents.split('\n');
    firstLine = firstLine[0];
    var timerWidth = $("#post-"+tmp[1]+">.postHead>.subject>.timer-span").width();
    $("#post-"+tmp[1]+">.postHead>.subject>.contents-span").css({left:timerWidth});
    $("#post-"+tmp[1]+">.postHead>.subject>.contents-span").html(firstLine);


    tmpList.size.height = $("#post-"+tmp[1]).height();
    updatePostInfo(tmpList);

    $("#post-"+tmp[1]).height(15);

    $("#post-"+tmp[1]).children(".body").addClass("hidden");
    $("#post-"+tmp[1]).children(".resizable").addClass("hidden");
  }
}


function makePostit(num, type, ev = "")
{
  console.log("postLength : "+num);
  if(type == "create"){
    var postit_list = [];

    if(num != 0){
      postit_list = getPostInfo();
    }
    var cnt = !localStorage.postCnt ? 0 : Number(localStorage.postCnt)+1;

    var x = Number($(".context_menu").css("left").replace(/\D+/g,''));
    var y = Number($(".context_menu").css("top").replace(/\D+/g,''));

    var data = {
       id:"post-"+cnt,
       contents:"",
       position:{x:x, y:y},
       size:{width:250, height:200},
       css:{bgcolor:"yellow",fontsize:"12",fontcolor:"black"}
    };


    postit_list.push(data);

    localStorage.postCnt = cnt;
    savePostInfo(postit_list);

  }
  else{
    postit_list = getPostInfo();
    cnt = postit_list[num].id.replace(/([\w]+)-+/g, '');


  }

  html ='<div class="post" id="post-'+cnt+'">\
          <div class="postHead" id="postHead-'+cnt+'">\
            <div class="subject inline-block" id="subject-'+cnt+'">\
              <span class="timer-span" id="timespan-'+cnt+'"></span>\
              <span class="contents-span" id="contentsspan-'+cnt+'"></span>\
            </div>\
            <div class="onOffToggle" id="onOffToggle-'+cnt+'">\
              <button class="toggle" style="display:none" id="open-'+cnt+'">▼</button>\
              <button class="toggle" style="" id="close-'+cnt+'">▲</button>\
            </div>\
            <div class="delete"><button class="deletePost" id="delete-'+cnt+'">X</button></div>\
          </div>\
          <div class="body">\
            <textarea class="contents" name="contents" id="contents-'+cnt+'">'+postit_list[num].contents+'</textarea>\
          </div>\
          <div class="resizable"></div>\
        </div>';
  $(".main").append(html);

  // 좌표
  $("#post-"+cnt).offset({top:postit_list[num].position.y});
  $("#post-"+cnt).offset({left:postit_list[num].position.x});
  // 크기
  $("#post-"+cnt).width(postit_list[num].size.width);
  $("#post-"+cnt).height(postit_list[num].size.height);
  //css
  $("#post-"+cnt).css("background-color",postit_list[num].css.bgcolor);
  $("#post-"+cnt+">.body>.contents").css("font-size",postit_list[num].css.fontsize+"px");
  $("#post-"+cnt+">.body>.contents").css("color",postit_list[num].css.fontcolor);
  $("#post-"+cnt+">.body>.contents").height(($("#post-"+cnt).height()-20));//텍스트에어리어 리사이즈
}


function init()
{
  if(localStorage.postit_list){

    for(var i = 0; i < getPostInfoLength(); i++){
      // tmpList[i].position.x;
      makePostit(i,"init");
    }
  }
}
