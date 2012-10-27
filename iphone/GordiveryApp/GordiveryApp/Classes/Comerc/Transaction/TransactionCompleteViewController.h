//
//  TransactionCompleteViewController.h
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import <UIKit/UIKit.h>
#import "WebViewBaseViewController.h"

@interface TransactionCompleteViewController : WebViewBaseViewController <UIWebViewDelegate>

@property (nonatomic, weak) IBOutlet UIWebView *webview;

@end
