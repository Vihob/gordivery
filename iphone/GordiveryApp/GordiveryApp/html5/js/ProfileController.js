/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var profileController = function (){

    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

        //Initialize mainController
        profileController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){
        restConsumer.getUserAccount(onAccountReceived,onAccountError);
    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------
    function setupCreditCardCell( creditCardInfo )
    {

	  var cell = $("<li class=pro_list_item id="+creditCardInfo.data.id+" ></li>");
		cell.html(creditCardInfo.data.number)
      cell.click( function(){ onCreditCardClicked( creditCardInfo ) } );

      return cell;
    }

	function onCreditCardClicked ( creditCardInfo) {
		
	}

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------

    function onAccountReceived(data, statusCode){        
        if (data) {          

         	var cards = data.data.cards;

			for (var it = 0; it < cards.length; ++it) {
				restConsumer.getCreditCardItem(cards[it],onCreditCardReceived,onCreditCardError);
			}
        } 

    }

    function onCreditCardError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }

    function onCreditCardReceived(data, statusCode){        
        if (data) { 
		
			var creditSelected = utils.retriveJSONParseWithLocalStorageKey( k_CREDIT_CARD_SELECTED );
	        if (!utils.isNotEmptyLocalStorageStringKey(creditSelected)) {
				localStorage.setItem( k_CREDIT_CARD_SELECTED, data.data.id);
			}

			$("#pro_grouped_list").append( setupCreditCardCell(data) );
        } 

        utils.hideActivityView();
    }

    function onAccountError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }

    //Functions or variables returned here will be public (accessing like profileController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();