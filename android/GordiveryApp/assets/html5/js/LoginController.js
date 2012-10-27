/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var loginController = function (){

    var viewLoaded = function(){

      //Load literals prior to any action
      L.loadLiterals(function(){

      //Select spanish as default language
      L.setCurrentLanguage('es'); 

      //Setup user textField & clear button
      $("#user_clear_button").click( onUserClearButtonClick );
      userTextEdition ( $("#login_form_username").val().length );
      $("#login_form_username").bind("keyup", function(){
          userTextEdition( $(this).val().length );
      });

      //Setup pass textField & clear button
      $("#pass_clear_button").click( onPassClearButtonClick );
      passTextEdition ( $("#login_form_pass").val().length );
      $("#login_form_pass").bind("keyup", function(){
          passTextEdition( $(this).val().length );
      });

      //Initialize mainController
      loginController.viewWillAppear();

    },
    function(){
      //DO NOTHING
    });

      $("#login_form").submit(function(event){
          //Prevent Default
          event.preventDefault();          

          var usernText = $("#login_form_username").val();
          var passText = $("#login_form_pass").val();

          if ( utils.isNotEmptyString(usernText) && utils.isNotEmptyString(passText) ) {
              utils.showActivityView();
              restConsumer.doLogin(loginDone, onLoginError, usernText, passText);
          } else {
            utils.showAlertCallWithTitleAndMessage(L.get('_error'),L.get('_wrongUserOrPasword'));
          }

        });

    }

    var viewWillAppear = function(){
      //set literals
      setupLiterals();
    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------
    
    function setupLiterals(){
      
      //Username fileds      
      $("#login_form_username").attr("placeholder",L.get("_username"));
      $("#login_form_username").val("gordivery");

      //Password fields
      $("#login_form_pass").attr("placeholder",L.get("_password"));
      $("#login_form_pass").val("demo");

      //submit
      $("#login_form_submit").attr("value",L.get("_accept"));

    }

    function onUserClearButtonClick(){
        $("#login_form_username").val("");
        $("#user_clear_button").css("display","none");
    }

    function onPassClearButtonClick(){
        $("#login_form_pass").val("");
        $("#pass_clear_button").css("display","none");
    }

    function userTextEdition ( numChars ){   
        if ( numChars>0 )   $("#user_clear_button").css("display","block");
        else                $("#user_clear_button").css("display","none");
    }

    function passTextEdition ( numChars ){   
        if ( numChars>0 )   $("#pass_clear_button").css("display","block");
        else                $("#pass_clear_button").css("display","none");
    }

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------

    function loginDone(data, statusCode){  

        if (data) {
            if (data.status == "OK") {
                //Save user token
                localStorage.setItem( k_USER_LOGIN_TOKEN, data.token );
                //Close LoginView
                window.location = "closeModal:";
            }else {
                utils.showAlertCallWithTitleAndMessage(L.get('_error'),L.get('_wrongUserOrPasword'));
            };
        } 
        else {
          onLoginError();
        };

        utils.hideActivityView();
    }

    function onLoginError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }

    //Functions or variables returned here will be public (accessing like loginController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();