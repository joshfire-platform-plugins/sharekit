ShareKitPlugin = function() {}

ShareKitPlugin.NULL = "null";

ShareKitPlugin.prototype.setAppName = function(appName) {
    return PhoneGap.exec("com.joshfire.sharekit.setAppName", appName);
}

ShareKitPlugin.prototype.setAppURL = function(appURL) {
    return PhoneGap.exec("com.joshfire.sharekit.setAppURL", appURL);
}

ShareKitPlugin.prototype.setTwitterConsumerKey = function(twitterConsumerKey) {
    return PhoneGap.exec("com.joshfire.sharekit.setTwitterConsumerKey", twitterConsumerKey);
}

ShareKitPlugin.prototype.setTwitterSecret = function(twitterSecret) {
    return PhoneGap.exec("com.joshfire.sharekit.setTwitterSecret", twitterSecret);
}

ShareKitPlugin.prototype.setFacebookAppId = function(facebookAppId) {
    return PhoneGap.exec("com.joshfire.sharekit.setFacebookAppId", facebookAppId);
}

ShareKitPlugin.prototype.share = function(title, text, url) {
    return PhoneGap.exec(
        "com.joshfire.sharekit.share",
        title || ShareKitPlugin.NULL,
        text || ShareKitPlugin.NULL,
        url || ShareKitPlugin.NULL
    );
}

PhoneGap.addConstructor(function() {
    if (!window.plugins) window.plugins = {};
    if (!window.plugins.sharekit) window.plugins.sharekit = new ShareKitPlugin();
});
