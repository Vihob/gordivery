//
//  CategoryListViewController.h
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import <UIKit/UIKit.h>
#import "WebViewBaseViewController.h"

@interface CategoryListViewController : WebViewBaseViewController<UIWebViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *webview;

@end
