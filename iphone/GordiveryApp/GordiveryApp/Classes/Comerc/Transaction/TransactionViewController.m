//
//  TransactionViewController.m
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import "TransactionViewController.h"

@interface TransactionViewController ()

@end

@implementation TransactionViewController

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
    
    //Set navigationItem title
    [self.navigationItem setTitle:NSLocalizedString(@"Pago", @"")];
    
    [self configureView];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)configureView {
    
    //Load path for init_view.html
    NSString *htmlFile = [[NSBundle mainBundle] pathForResource:@"TransactionView" ofType:@"html" inDirectory:@"html5/html"];
    NSURL *fileURL = [NSURL fileURLWithPath:htmlFile];
    NSURLRequest *request = [NSURLRequest requestWithURL:fileURL];
    
    //Adapt mainWebView
    [self.webview setScalesPageToFit:NO];
    self.webview.scrollView.bounces = NO;
    self.webview.delegate = self;
    //Load request on mainWebView
    [self.webview loadRequest:request];
}

- (void)callViewWillAppearOnHTML {
    [self.webview stringByEvaluatingJavaScriptFromString:@"transactionsListController.viewWillAppear();"];
}

#pragma mark - Overriden methods

- (void)closeModal {
    [self dismissViewControllerAnimated:YES completion:nil];
}

@end
