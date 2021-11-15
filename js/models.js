function savePostInfo(arr)
{
  localStorage.postit_list = JSON.stringify(arr);
}

function updatePostInfo(arr)
{
  var tmpList = JSON.parse(localStorage.postit_list);
  for(var i = 0; i < tmpList.length; i++){
    if(arr.id == tmpList[i].id){
      tmpList[i] = arr;
    }
  }
  localStorage.postit_list = JSON.stringify(tmpList);
}

function getPostInfoLength()
{
  var returns = !localStorage.postit_list ? 0 : JSON.parse(localStorage.postit_list).length;
  return returns;
}

function getPostInfo(num = -1)
{
  var returns;
  if(num == -1){
    returns = JSON.parse(localStorage.postit_list);
  }
  else{
    tmpList = JSON.parse(localStorage.postit_list);
    for(var i = 0; i < tmpList.length; i++){
      if(tmpList[i].id == "post-"+num){
        returns = tmpList[i];
      }
    }
  }
  return returns;
}


function deletePost(id=-1)
{
  if(id == -1){
      localStorage.removeItem("postit_list");
      localStorage.removeItem("postCnt");
      $(".main").html("");
      return false;
  }
  var arr = getPostInfo(id);
  var tmpList = JSON.parse(localStorage.postit_list);
  for(var i = 0; i < tmpList.length; i++){
    if(arr.id == tmpList[i].id){
      tmpList.splice(i,1);
    }
  }
  $("#post-"+id).remove();
  if(tmpList.length == 0){
    localStorage.removeItem("postCnt");
    localStorage.removeItem("postit_list");
  }else{
    localStorage.postit_list = JSON.stringify(tmpList);
  }
}


