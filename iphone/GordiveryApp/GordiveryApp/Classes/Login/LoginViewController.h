//
//  LoginViewController.h
//  GordiveryApp
//
//  Created by Marcel Arbó on 10/27/12.
//
//

#import <UIKit/UIKit.h>
#import "WebViewBaseViewController.h"

@interface LoginViewController : WebViewBaseViewController <UIWebViewDelegate>

@property (strong, nonatomic)          NSString  *localUrl;
@property (strong, nonatomic) IBOutlet UIWebView *webview;

@end
