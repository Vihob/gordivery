/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var transactionController = function (){
	
	var comercId;
  var paymentCode;

    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

        //Load stored data
        loadStoredData();

		setupView();
        //Initialize mainController
        transactionController.viewWillAppear();
		
      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){

      utils.showActivityView();



      restConsumer.askPayment(comercId,onPayTokenReceived,onPayTokenError);
    }

    function loadStoredData(){
      //Get disclaimerInfo from localStorage
      comercId =  localStorage.getItem( k_COMERC_IDENT );
    }

    function setupView () {
      //Setup initial view and buttons
	var payInfo = $("#pay_info")
		payInfo.attr('style', 'display:hidden');
		$("#pay_btns").attr('style', 'display:hidden');
    }

    function onCancelClick() {
      window.location = "closeModal:";
    }

    function onAcceptPaymentClick() {

      var creditCard = localStorage.getItem( k_CREDIT_CARD_SELECTED );

      //Call doPayment service
      restConsumer.doPayment(paymentCode,creditCard,onAcceptPayDone,onAcceptPayError);
    }

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------

    function onPayTokenReceived(data, statusCode){        
        if (data) {          
			$("#pay_info").attr('style', 'display:block');
			$("#pay_btns").attr('style', 'display:block');
			$("#pay_loader").attr('style', 'display:hidden');
           //Save paymentCode
           paymentCode = data.code;
        } 

        utils.hideActivityView();
    }

    function onPayTokenError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }


    function onAcceptPayDone(data, statusCode){        
        if (data) {          
           window.location = "push:"+"TransactionCompleteView";
        } 

        utils.hideActivityView();
    }

    function onAcceptPayError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }


    //Functions or variables returned here will be public (accessing like transactionController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();