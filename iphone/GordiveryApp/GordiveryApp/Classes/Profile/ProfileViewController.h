//
//  ProfileViewController.h
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import <UIKit/UIKit.h>
#import "WebViewBaseViewController.h"

@interface ProfileViewController : WebViewBaseViewController<UIWebViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *webview;



@end
