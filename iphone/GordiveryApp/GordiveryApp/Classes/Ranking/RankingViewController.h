//
//  RankingViewController.h
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import <UIKit/UIKit.h>
#import "WebViewBaseViewController.h"

@interface RankingViewController : WebViewBaseViewController<UIWebViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *webview;

@end
