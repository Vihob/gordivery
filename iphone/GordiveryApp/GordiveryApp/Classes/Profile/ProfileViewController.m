//
//  ProfileViewController.m
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import "ProfileViewController.h"

@interface ProfileViewController ()

@end

@implementation ProfileViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
    [self configureView];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self callViewWillAppearOnHTML];
}

- (void)configureView {
    
    //Load path for init_view.html
    NSString *htmlFile = [[NSBundle mainBundle] pathForResource:@"ProfileView" ofType:@"html" inDirectory:@"html5/html"];
    NSURL *fileURL = [NSURL fileURLWithPath:htmlFile];
    NSURLRequest *request = [NSURLRequest requestWithURL:fileURL];
    
    //Adapt mainWebView
    [self.webview setScalesPageToFit:NO];
    self.webview.scrollView.bounces = NO;
    
    //Load request on mainWebView
    [self.webview loadRequest:request];
}

- (void)callViewWillAppearOnHTML {
    [self.webview stringByEvaluatingJavaScriptFromString:@"ProfileController.viewWillAppear();"];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
