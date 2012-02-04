#import "SHK.h"
#import "SHKConfiguration.h"
#import "PGShareKit.h"


@interface PGShareKitSHKConfigurator : DefaultSHKConfigurator

@property (strong, nonatomic) NSString *appName;
@property (strong, nonatomic) NSString *appURL;
@property (strong, nonatomic) NSString *facebookAppId;
@property (strong, nonatomic) NSString *twitterConsumerKey;
@property (strong, nonatomic) NSString *twitterSecret;
@property (strong, nonatomic) NSString *twitterCallbackUrl;

@end

@implementation PGShareKitSHKConfigurator

@synthesize appName, appURL, facebookAppId, twitterConsumerKey, twitterSecret, twitterCallbackUrl;

- (void)dealloc {
    self.appName = nil;
    self.appURL = nil;
    self.facebookAppId = nil;
    self.twitterConsumerKey = nil;
    self.twitterSecret = nil;
    self.twitterCallbackUrl = nil;

    [super dealloc];
}

@end


@interface PGShareKit ()

@property (strong, nonatomic) PGShareKitSHKConfigurator *configurator;

- (NSString *)nullifyStringIfNeeded:(NSString *)string;
- (NSString *)singleParameterForArguments:(NSArray *)arguments;
- (void)resetFavoriteSharers;

@end

@implementation PGShareKit

@synthesize configurator = _configurator;

- (id)initWithWebView:(UIWebView *)webView {
    self = (id)[super initWithWebView:webView];

    if (self != nil) {
        {
            NSBundle *mainBundle = [NSBundle mainBundle];
            PGShareKitSHKConfigurator *configurator = [[PGShareKitSHKConfigurator new] autorelease];

            configurator.appName = [mainBundle.infoDictionary objectForKey:(NSString *)kCFBundleNameKey];
            configurator.twitterCallbackUrl = [NSString stringWithFormat:@"%@://auth/", mainBundle.bundleIdentifier];
            [SHKConfiguration sharedInstanceWithConfigurator:configurator];
            self.configurator = configurator;
        }

        [SHK setSharersDictionary:[NSDictionary dictionaryWithObjectsAndKeys:
                                   [NSArray arrayWithObjects:@"SHKMail", @"SHKLogout", nil], @"actions",
                                   [NSArray arrayWithObjects:@"SHKTwitter", @"SHKFacebook", nil], @"services",
                                   nil]];
        [self resetFavoriteSharers];
        [SHK setRootViewController:self.appViewController];
        [SHK flushOfflineQueue];
    }

    return self;
}

- (void)dealloc {
    self.configurator = nil;

    [super dealloc];
}

- (NSString *)nullifyStringIfNeeded:(NSString *)string {
    if ([string isKindOfClass:[NSString class]] && ![string isEqualToString:@"null"]) {
        return string;
    }

    return nil;
}

- (NSString *)singleParameterForArguments:(NSArray *)arguments {
    if (arguments.count == 1) {
        NSString *argument = arguments.lastObject;

        if ([argument isKindOfClass:[NSString class]] && argument.length > 0) {
            return argument;
        }
    }

    return nil;
}

- (void)resetFavoriteSharers {
    [[NSUserDefaults standardUserDefaults] setObject:[NSArray arrayWithObjects:@"SHKMail", @"SHKTwitter", @"SHKFacebook", nil]
                                              forKey:[NSString stringWithFormat:@"%@%i", SHKCONFIG(favsPrefixKey), SHKShareTypeURL]];
    [[NSUserDefaults standardUserDefaults] setObject:[NSArray arrayWithObjects:@"SHKMail", @"SHKTwitter", @"SHKFacebook", nil]
                                              forKey:[NSString stringWithFormat:@"%@%i", SHKCONFIG(favsPrefixKey), SHKShareTypeText]];
}

- (void)setAppName:(NSArray *)arguments withDict:(NSDictionary *)options {
    self.configurator.appName = [self singleParameterForArguments:arguments];
}

- (void)setAppURL:(NSArray *)arguments withDict:(NSDictionary *)options {
    self.configurator.appURL = [self singleParameterForArguments:arguments];
}

- (void)setTwitterConsumerKey:(NSArray *)arguments withDict:(NSDictionary *)options {
    self.configurator.twitterConsumerKey = [self singleParameterForArguments:arguments];
}

- (void)setTwitterSecret:(NSArray *)arguments withDict:(NSDictionary *)options {
    self.configurator.twitterSecret = [self singleParameterForArguments:arguments];
}

- (void)setFacebookAppId:(NSArray *)arguments withDict:(NSDictionary *)options {
    self.configurator.facebookAppId = [self singleParameterForArguments:arguments];
}

- (void)share:(NSArray *)arguments withDict:(NSDictionary *)options {
    if (arguments.count != 3) return;

    SHKActionSheet *actionSheet = nil;
    SHKItem *item = [[SHKItem new] autorelease];
    NSString *title = [self nullifyStringIfNeeded:[arguments objectAtIndex:0]];
    NSString *text = [self nullifyStringIfNeeded:[arguments objectAtIndex:1]];
    NSString *url = [self nullifyStringIfNeeded:[arguments objectAtIndex:2]];

    if (text == nil) return;

    item.title = title;
    item.text = text;

    if (url != nil) {
        item.URL = [NSURL URLWithString:url];
        item.shareType = SHKShareTypeURL;
    } else {
        item.shareType = SHKShareTypeText;
    }

    [self resetFavoriteSharers];
    actionSheet = [SHKActionSheet actionSheetForType:item.shareType];
    actionSheet.item = item;
	[actionSheet showInView:self.appViewController.view];
}

@end
