//
//  WebViewBaseViewController.h
//  Gordivery
//
//  Created by Victor on 26/10/12.
//

#import <Foundation/Foundation.h>

typedef enum{
    ActionDefault = 0,
    ActionPush,
    ActionCall,
    ActionMaps,
    ActionAlert,
    ActionShowLoading,
    ActionHideLoading,
    ActionDatePicker,
    ActionWeb,
    ActionCloseModal
} Action;

@interface WebViewBaseViewController : UIViewController <UIWebViewDelegate>

@end
