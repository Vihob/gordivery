//
//  TransactionListViewController.h
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import <UIKit/UIKit.h>
#import "WebViewBaseViewController.h"

@interface TransactionListViewController : WebViewBaseViewController

@property (strong, nonatomic)          NSString  *localUrl;
@property (strong, nonatomic) IBOutlet UIWebView *webview;

@end
