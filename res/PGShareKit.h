#import <PhoneGap/PGPlugin.h>

@interface PGShareKit : PGPlugin

- (void)setAppName:(NSArray *)arguments withDict:(NSDictionary *)options;
- (void)setAppURL:(NSArray *)arguments withDict:(NSDictionary *)options;
- (void)setTwitterConsumerKey:(NSArray *)arguments withDict:(NSDictionary *)options;
- (void)setTwitterSecret:(NSArray *)arguments withDict:(NSDictionary *)options;
- (void)setFacebookAppId:(NSArray *)arguments withDict:(NSDictionary *)options;
- (void)share:(NSArray *)arguments withDict:(NSDictionary *)options;

@end
