//
//  LoadingViewController.m
//  Gordivery
//
//  Created by Marcel Arbó Lack on 20/06/12.
//  Copyright (c) 2012 FIB-Fàcultat d'informàtica de Barcelona. All rights reserved.
//

#import "LoadingViewController.h"

@interface LoadingViewController ()

@end

@implementation LoadingViewController
@synthesize loadingLabel;

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
    // Do any additional setup after loading the view from its nib.
    
    [loadingLabel setText:NSLocalizedString(@"_loading", @"")];
}

- (void)viewDidUnload
{
    [self setLoadingLabel:nil];
    [super viewDidUnload];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

@end
