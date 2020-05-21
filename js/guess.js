"use strict";

var curr_round;
var GUESS_CORRECT_FLAG = 0;
var GUESS_INCORRECT_FLAG = 1;
var QUIT_FLAG = 2;
var total_rounds;
var user_name;
//Execution starts from here-----------
$(document).ready(function(){
  console.log("info: document ready.");
  curr_round = 1;
  total_rounds = 6;
  //Load user name pop up
    
  $('#take_user_info').modal();
});
function quitGame(){
  if(curr_round>total_rounds){
    alert(user_name+", game ended already!");
    reloadGame();
  }else{
    var confirmed = confirm(user_name+", do you really want to quit?");
    if(confirmed){
      getScore(QUIT_FLAG);
    }
  }
}
function getUserName(){
  var user_name_input = document.getElementById("user_name");
  var greet_user = document.getElementById("greet_user");
  if(user_name_input ){
    user_name = user_name_input.value;
      if(user_name != "" && checkUserNameValidity(user_name)){
        console.log("info: ",user_name);
        $.ajax({
          url:'./server/insertUserData.php',
          method:'POST',
          data:{'user_name':user_name},
          success:function(data){
            console.log("info-response : ",data);
            if(data == 1){
              $('#take_user_info').modal('hide');
              greet_user.innerHTML = "Hi, "+user_name.toUpperCase();
            }else{//database operation error
              alert(user_name+" we are facing some issue right now . Please try again later!");

            }
            
    
          },
          error:function(){//http request error
            alert(user_name+" we are facing some issue right now . Please try again later!");
          }
        });
        
     }else{
         document.getElementById("no_username_error").style.display = "block";
     }
  }
    
}
function checkUserNameValidity(name){
  var letters = /^[A-Za-z]+$/;
  if(name.charAt(0).match(letters)){//check if first character of usename is not alphabet
    return true;
  }else{
    return false;
  }
}
function reloadGame(){
  window.onbeforeunload = null;
  window.location = window.location.href;
  window.open("index.html","_parent","toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400,fullscreen=no");
}
function getScore(flag){
  $.ajax({
    url:'./server/getScore.php',
    method:'GET',
    success:function(data){
      if(data != -99){//-99 is used for any database operation error
        if(flag == 0){//correct guess
          alert(user_name+' you guessed correct! Your final score is: '+data);

        }else if(flag == 1){//incorrect guess
          alert(user_name+' you guessed incorrect! Your final score is: '+data);
        }else{
          alert(user_name+', thanks for playing. your final score is: '+data);
          reloadGame();
        }

      }else{//database operation error
        alert(user_name+" we are facing some issue right now . Please try gain later!");

      }

    },
    error:function(){//http request error
      alert(user_name+" we are facing some issue right now . Please try gain later!");

    }
  });
}
function matchColorCodes(user_color_code,server_color_code){
   //check two color codes and update score
   if(user_color_code == server_color_code){
    //user guessed correct!
    var credit = 1;
    $.ajax({
      url:'./server/updateUserData.php',
      method:'POST',
      data:{'round':curr_round,'credit':credit},
      success:function(data){
        if(data == 1){
          var round_info = document.getElementById("round_info");
          if(round_info && curr_round <= total_rounds){//proceed to next round
            alert(user_name+" you guessed correct! Proceed to round "+curr_round);
            round_info.innerHTML = "Round "+curr_round;
          }else{
            if(curr_round >= total_rounds+1){//game ended
              getScore(GUESS_CORRECT_FLAG);//used for correct guess
            }else{//cannot get dom object
              alert(user_name+" we are facing some issue right now . Please try gain later!");

            }
          }
        }else{//http request error
          alert(user_name+" we are facing some issue right now . Please try gain later!");

        }
       

      },
      error:function(){//http request error
        alert(user_name+" we are facing some issue right now . Please try gain later!");
        
      }
    });

  }else{
    //user guessed incorrect!
    var debit = 1;
    $.ajax({
      url:'./server/updateUserData.php',
      method:'POST',
      data:{'round':curr_round,'debit':debit},
      success:function(data){
        if(data == 1){
          var round_info = document.getElementById("round_info");
          if(round_info && curr_round <= total_rounds){//proceed to next round
            alert(user_name+" you guessed incorrect! Proceed to round "+curr_round);
            round_info.innerHTML = "Round "+curr_round;
          }else{
            if(curr_round >= total_rounds+1){//game ended
              getScore(GUESS_INCORRECT_FLAG);//used for incorrect guess
            }else{//cannot get dom object
              alert(user_name+" we are facing some issue right now . Please try gain later!");

            }
          }
        }else{//database updation error
          alert(user_name+" we are facing some issue right now . Please try gain later!");

        }
       

      },
      error:function(){//http request error
        alert(user_name+" we are facing some issue right now . Please try gain later!");
        
      }
    });
  }

}
function play(id){
  var button = document.getElementById(id);
  
  if(button){
    var user_color_code = id.split('_')[1];
    console.log("info - current round: ",curr_round);
    console.log("info - user color code : ",user_color_code);
    if(curr_round <= total_rounds){
      var server_color_code = getFibonacciNumber(curr_round);
      console.log("info - server color code : ",server_color_code);
      if(server_color_code == -1){//game ended
        alert("Sorry "+user_name+", game ended!");
      }else{//game continuing
       matchColorCodes(user_color_code,server_color_code);
      }
    }else{//game ended
      alert("Sorry "+user_name+", game ended!");
    }
    
        
  }else{//cannot get dom object
    alert(user_name+" we are facing some issue right now . Please try gain later!")
  }

}
function getFibonacciNumber(pos){
  var f_series = [1,1,2,3,5,8];
  if(pos - 1 < f_series.length){//returning f series by pos
    curr_round += 1;
    return f_series[pos - 1];

  }else{//series out of range
    return -1;
  }

}