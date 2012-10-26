//
//  Utils.m
//  Gordivery
//
//  Created by Marcel Arbó on 26/10/12.
//

#import "Utils.h"
#import "AppDelegate.h"
#import "LoadingViewController.h"

@implementation Utils

#pragma mark - LoadingView

#define kLoadingViewTag 678

//Show Loading View
+ (void)showActivityViewWithTitle:(NSString *)title {
    
    AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    
    UIView *dummyView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, appDelegate.window.bounds.size.width, appDelegate.window.bounds.size.height)];
    [dummyView setBackgroundColor:[UIColor colorWithRed:0/255.0 green:0/255.0 blue:0/255.0 alpha:0.6]];
    
    UIView *loadingView = [appDelegate.window viewWithTag:kLoadingViewTag];
    if (!loadingView) {
        LoadingViewController *loadingView = [[LoadingViewController alloc] initWithNibName:@"LoadingViewController" bundle:nil];
        [loadingView.view setCenter:[[appDelegate window] center]];
        [[loadingView loadingLabel] setText:title];
        [dummyView setTag:kLoadingViewTag];
        
        [dummyView addSubview:loadingView.view];
        [appDelegate.window addSubview:dummyView];
    }
    
}

#pragma mark - Alerts

//Hide Loading View
+ (void)hideActivityView {
    
    AppDelegate *appDelegate = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    UIView *loadingView = [appDelegate.window viewWithTag:kLoadingViewTag];
    if (loadingView) {
        [loadingView removeFromSuperview];
    }
}

+ (void)showAlertViewWithTitle:(NSString *)title andMessage:(NSString *)message {
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:message delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    [alertView show];
}

@end
