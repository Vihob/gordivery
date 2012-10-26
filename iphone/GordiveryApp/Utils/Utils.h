//
//  Utils.h
//  LineaCaminos
//
//  Created by Marcel Arbó on 10/8/12.
//  Copyright (c) 2012 Delfin Pereiro Parejo. All rights reserved.
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
