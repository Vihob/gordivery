//
//  AppDelegate.m
//  GordiveryApp
//
//  Created by Victor L. Fernandez Rodrigo on 26/10/12.
//
//

#import "AppDelegate.h"
#import "Defines.h"

@interface AppDelegate()
- (void)tabBarCustomizeAppearance;
- (void)tabBarItemCustomizeAppareance;
- (void)navigationBarCustomizeAppearance;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Override point for customization after application launch.
    
    [self tabBarCustomizeAppearance];
    [self tabBarItemCustomizeAppareance];
    [self navigationBarCustomizeAppearance];
    
    //Customize eahc tabBarItem Images
    UITabBarController *tabController = (UITabBarController *)self.window.rootViewController;
    
    UITabBarItem *tab1 = [[tabController.viewControllers objectAtIndex:0] tabBarItem];
    [tab1 setTitle:NSLocalizedString(@"Comercios", @"")];
    [tab1 setFinishedSelectedImage:[[UIImage imageNamed:@"tabbar_icon_comercios_.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(10, 0, 10, 0)]
       withFinishedUnselectedImage:[[UIImage imageNamed:@"tabbar_icon_comercios.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(10, 0, 10, 0)]];
    
    UITabBarItem *tab2 = [[tabController.viewControllers objectAtIndex:1] tabBarItem];
    [tab2 setTitle:NSLocalizedString(@"Cuentas", @"")];
    [tab2 setFinishedSelectedImage:[[UIImage imageNamed:@"tabbar_icon_cuentas_.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(10, 0, 10, 0)]
       withFinishedUnselectedImage:[[UIImage imageNamed:@"tabbar_icon_cuentas.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(10, 0, 10, 0)]];
    
    UITabBarItem *tab3 = [[tabController.viewControllers objectAtIndex:2] tabBarItem];
    [tab3 setTitle:NSLocalizedString(@"Ranking", @"")];
    [tab3 setFinishedSelectedImage:[[UIImage imageNamed:@"tabbar_icon_ranking_.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(10, 0, 10, 0)]
       withFinishedUnselectedImage:[[UIImage imageNamed:@"tabbar_icon_ranking.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(10, 0, 10, 0)]];
    
    UITabBarItem *tab4 = [[tabController.viewControllers objectAtIndex:3] tabBarItem];
    [tab4 setTitle:NSLocalizedString(@"Usuario", @"")];
    [tab4 setFinishedSelectedImage:[[UIImage imageNamed:@"tabbar_icon_user_.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(10, 0, 10, 0)]
       withFinishedUnselectedImage:[[UIImage imageNamed:@"tabbar_icon_user.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(10, 0, 10, 0)]];
    
    return YES;
}
							
- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

#pragma mark - Customization Methods

- (void)tabBarCustomizeAppearance
{
    // Set the background color for UITabBar
    UIImage* tabBarBackground = [[UIImage imageNamed:@"comun_tabbar_background.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(0, 0, 0, 0)];
    [[UITabBar appearance] setBackgroundImage:tabBarBackground];
    //[[UITabBar appearance] setTintColor:k_TAB_BAR_COLOR];
    [[UITabBar appearance] setSelectionIndicatorImage:[UIImage imageNamed:@"comun_tabbar_background_selec.png"]];
    [[UITabBar appearance] setTintColor:[UIColor blackColor]];
}

- (void)tabBarItemCustomizeAppareance
{
    // Normal State Attributes
    [[UITabBarItem appearance] setTitleTextAttributes:
     [NSDictionary dictionaryWithObjectsAndKeys:
      [UIColor whiteColor],UITextAttributeTextColor,
      k_TAB_BAR_FONT, UITextAttributeFont, nil]
                                             forState:UIControlStateNormal];
    
    // Highlighted State Attributes
    [[UITabBarItem appearance] setTitleTextAttributes:
     [NSDictionary dictionaryWithObjectsAndKeys:
      [UIColor whiteColor],UITextAttributeTextColor,
      k_TAB_BAR_FONT, UITextAttributeFont, nil]
                                             forState:UIControlStateHighlighted];
}

- (void)navigationBarCustomizeAppearance
{
    // Set the background image for *all* UINavigationBars
    /*[[UINavigationBar appearance] setBackgroundImage:[[UIImage imageNamed:@"comun_navigation.png"] resizableImageWithCapInsets:UIEdgeInsetsMake(0, 0, 0, 0)]
                                       forBarMetrics:UIBarMetricsDefault];*/
    
    // Customize the title text for *all* UINavigationBars
    [[UINavigationBar appearance] setTitleTextAttributes:
     [NSDictionary dictionaryWithObjectsAndKeys:
      [UIColor whiteColor], UITextAttributeTextColor,
      [UIColor whiteColor], UITextAttributeTextShadowColor,
      [NSValue valueWithUIOffset:UIOffsetMake(0,0)], UITextAttributeTextShadowOffset,
      k_NAV_BAR_FONT, UITextAttributeFont,
      nil]];
    
    //Set tintColor
    [[UINavigationBar appearance] setTintColor:k_NAV_BAR_COLOR];
}

@end
