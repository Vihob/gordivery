//
//  Utils.h
//  Gordivery
//
//  Created by Marcel Arbó on 26/10/12.
//

#import <Foundation/Foundation.h>

@interface Utils : NSObject

/** Show Loading View with title */
+ (void)showActivityViewWithTitle:(NSString *)title;

/** Hide Loading View */
+ (void)hideActivityView;

/** Show alert with title and message */
+ (void)showAlertViewWithTitle:(NSString *)title andMessage:(NSString *)message;

@end
