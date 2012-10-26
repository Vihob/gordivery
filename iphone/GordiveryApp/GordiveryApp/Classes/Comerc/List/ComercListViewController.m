//
//  ComercListViewController.m
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import "ComercListViewController.h"
#import "ComercDetailViewController.h"

@interface ComercListViewController ()

@end

@implementation ComercListViewController

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
    NSString *htmlFile = [[NSBundle mainBundle] pathForResource:@"ComercView" ofType:@"html" inDirectory:@"html5/html"];
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
    [self.webview stringByEvaluatingJavaScriptFromString:@"ComercController.viewWillAppear();"];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)openDetailViewControllerWithUrlString:(NSString *)url {
    
    self.urlString = url;
    [self performSegueWithIdentifier:@"DetailComerc" sender:self];
}

#pragma mark - Segues

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    

        ComercDetailViewController *detailVC = (ComercDetailViewController *) [segue destinationViewController];
        detailVC.hidesBottomBarWhenPushed = YES;
        [detailVC setLocalUrl:self.urlString];
    
    
}

#pragma mark - Overriden methods

- (void)pushURLOnViewController:(NSString*)urlToLoad{
    [self openDetailViewControllerWithUrlString:urlToLoad];
}

@end
