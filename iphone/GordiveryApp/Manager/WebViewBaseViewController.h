//
//  MVYWebViewManager.h
//  LineaCaminos
//
//  Created by Ivan on 05/10/12.
//  Copyright (c) 2012 Delfin Pereiro Parejo. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum{
    ActionDefault = 0,
    ActionPush,
    ActionCall,
    ActionMaps,
    ActionAlert,
    ActionShowLoading,
    ActionHideLoading,
    ActionDatePicker,
    ActionWeb
} Action;

@interface MVYWebViewManager : UIViewController <UIWebViewDelegate>

@end
