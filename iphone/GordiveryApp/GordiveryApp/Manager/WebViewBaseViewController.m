//
//  WebViewBaseViewController.m
//  Gordivery
//
//  Created by Victor on 26/10/12.
//

#import "WebViewBaseViewController.h"
#import "Utils.h"

#pragma mark - Constants

#define kActionPush @"push:"
#define kActionAlert @"alert:"
#define kActionCall @"call:"
#define kActionMaps @"maps:"
#define kActionShowLoading @"showloading:"
#define kActionHideLoading @"hideloading:"
#define kActionDatePicker @"datepick:"
#define kActionWeb  @"web:"
#define kActionParametersSeparator @"|"

#define kSystemPlatformConstant @"systemPlatformConstant"
#define kSystemPlatformValue @"apple"

#define kActionAlert_Title      @"<title>"
#define kActionAlert_Message    @"<message>"

#pragma mark - UIWebView Delegate Methods

@implementation WebViewBaseViewController

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
    
    NSString *actionString = request.URL.absoluteString;
    
    BOOL res = NO;
    
    Action anAction = [self parseActionString:actionString];
    
    switch (anAction) {
        case ActionPush:
            [self doPush:actionString];
            break;
            
        case ActionAlert:
            [self doAlert:actionString];
            break;
            
        case ActionCall:
            [self doCall:actionString];
            break;
            
        case ActionMaps:
            [self openMaps:actionString];
            break;
            
        case ActionShowLoading:
            [self showLoading:actionString];
            break;
            
        case ActionHideLoading:
            [self hideLoading:actionString];
            break;
            
        case ActionDatePicker:
            [self showDatePickerAction:actionString];
            break;
            
        case ActionWeb:
            [self openWeb:actionString];
            break;
            
        case ActionDefault:
            //do nothing, just forward req
            res = YES;
        default:
            break;
    }
    
    return res;
}

- (void)webView:(UIWebView *)noticiaWebView didFailLoadWithError:(NSError *)error {
    //Hide NetworkActivityIndicator
    [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
    //Hide NetworkActivityIndicator
    [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
    NSLog(@"FinishLoad");
}

- (void)webViewDidStartLoad:(UIWebView *)webView {
    //Show NetworkActivityIndicator
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
    NSLog(@"StartLoad");
}

#pragma mark - Private methods

- (Action)parseActionString:(NSString*)actionStr{
    NSLog(@"parsing: %@",actionStr);
    Action res = ActionDefault;
    if ([actionStr rangeOfString:kActionPush].length > 0) {
        res = ActionPush;
    }else if([actionStr rangeOfString:kActionCall].length > 0){
        res = ActionCall;
    }else if([actionStr rangeOfString:kActionAlert].length > 0){
        res = ActionAlert;
    }else if([actionStr rangeOfString:kActionMaps].length > 0){
        res = ActionMaps;
    }else if([actionStr rangeOfString:kActionShowLoading].length > 0){
        res = ActionShowLoading;
    }else if([actionStr rangeOfString:kActionHideLoading].length > 0){
        res = ActionHideLoading;
    }else if([actionStr rangeOfString:kActionDatePicker].length > 0){
        res = ActionDatePicker;
    }else if([actionStr rangeOfString:kActionWeb].length > 0){
        res = ActionWeb;
    }
    return res;
}

- (void)doPush:(NSString*)actionStr{
    //get URL to load
    NSRange start = [actionStr rangeOfString:kActionPush];
    NSString *urlToLoad = [actionStr substringFromIndex:(start.location + start.length)];
    NSLog(@"pushing: %@", urlToLoad);
    [self pushURLOnViewController:urlToLoad];
}

- (void)doAlert:(NSString*)actionStr{
    
    NSString *alertString = [actionStr stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    //Get title and message strings
    NSRange titleRange = [alertString rangeOfString:kActionAlert_Title];
    NSRange messageRange = [alertString rangeOfString:kActionAlert_Message];
    NSString *title = [alertString substringWithRange:NSMakeRange(titleRange.location + titleRange.length, messageRange.location - (titleRange.location + titleRange.length))];
    
    NSString *message = [alertString substringFromIndex:(messageRange.location + messageRange.length)];
    
    //Show native alert 
    
    [Utils showAlertViewWithTitle:title andMessage:message];
}

- (void)doCall:(NSString*)actionStr{
    //TODO: implement
}

- (void)openMaps:(NSString*)actionStr{
    //get URL to load
    NSRange start = [actionStr rangeOfString:kActionMaps];
    NSString *urlToLoad = [actionStr substringFromIndex:(start.location + start.length)];
    
    //Replace systemPlatformConstant on maps URL
    urlToLoad = [urlToLoad stringByReplacingOccurrencesOfString:kSystemPlatformConstant withString:kSystemPlatformValue];
    
    NSLog(@"openMaps: %@", urlToLoad);
    [self openMapsURLOnViewController:urlToLoad];
}

- (void)showLoading:(NSString*)actionStr{
    //get text to show
    NSRange start = [actionStr rangeOfString:kActionShowLoading];
    NSString *text = [actionStr substringFromIndex:(start.location + start.length)];
    
    //Replace text Percent Escapes
    text = [text stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    [Utils showActivityViewWithTitle:text];
}

- (void)hideLoading:(NSString*)actionStr{
    [Utils hideActivityView];
}

- (void)showDatePickerAction:(NSString*)actionStr{
    //get method to call in JavaScript
    NSRange start = [actionStr rangeOfString:kActionDatePicker];
    NSString *method = [actionStr substringFromIndex:(start.location + start.length)];
    NSLog(@"\n\n********** NAME: %@ **********\n\n",method);
    
    [self openDatePickerWithJSMethod:method];
}

- (void)openWeb:(NSString*)actionStr{
    NSRange start = [actionStr rangeOfString:kActionWeb];
    NSString *urlToLoad = [actionStr substringFromIndex:(start.location + start.length)];
    
    //Open Safari with URL
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlToLoad]];
}

#pragma mark - Methods to override

- (void)pushURLOnViewController:(NSString*)urlToPush{
    //Override on children
}

- (void)openMapsURLOnViewController:(NSString*)urlToOpenMaps{
    //Override on children
}

- (void)openDatePickerWithJSMethod:(NSString*)methodName{
    //Override on children
}

@end
