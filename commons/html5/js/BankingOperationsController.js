/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var bankingOperationsController = function (){

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
      bankingOperationsController.viewWillAppear();

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

      //Password fields
      $("#login_form_pass").attr("placeholder",L.get("_password"));

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
          console.log("Login done with data: "+data);
          if (data.serverError != ""){
            utils.showAlertCallWithTitleAndMessage(L.get('_error'),L.get('_wrongUserOrPasword'));
          }else if(data.resultLink == ""){
            console.log("Login done without result url");
            onLoginError();
          }else{
            //login was OK, just open result URL!
            console.log("URL to load:"+data.resultLink);
            window.location = "web:"+data.resultLink;
            //Delete password field
            $("#login_form_pass").val('');          
          }
          
        } 
        else {
          console.log("Login done without data");
          onLoginError();
        }

        utils.hideActivityView();
    }

    function onLoginError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
         utils.hideActivityView();
    }

    //Functions or variables returned here will be public (accessing like bankingOperationsController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();