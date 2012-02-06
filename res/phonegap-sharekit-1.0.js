(function() {
    if (typeof PhoneGap == "undefined") return;
     
    var ShareKitPlugin = function() {};

    ShareKitPlugin.NULL = "null";

    ShareKitPlugin.prototype.setAppName = function(appName) {
        if (!appName) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setAppName", appName);
    };

    ShareKitPlugin.prototype.setAppURL = function(appURL) {
        if (!appURL) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setAppURL", appURL);
    };

    ShareKitPlugin.prototype.setTwitterConsumerKey = function(twitterConsumerKey) {
        if (!twitterConsumerKey) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setTwitterConsumerKey", twitterConsumerKey);
    };

    ShareKitPlugin.prototype.setTwitterSecret = function(twitterSecret) {
        if (!twitterSecret) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setTwitterSecret", twitterSecret);
    };

    ShareKitPlugin.prototype.setFacebookAppId = function(facebookAppId) {
        if (!facebookAppId) return;
        return PhoneGap.exec("com.joshfire.factory.plugins.sharekit.setFacebookAppId", facebookAppId);
    };

    ShareKitPlugin.prototype.share = function(title, text, url) {
        return PhoneGap.exec(
            "com.joshfire.factory.plugins.sharekit.share",
            title || ShareKitPlugin.NULL,
            text || ShareKitPlugin.NULL,
            url || ShareKitPlugin.NULL
        );
    };

    PhoneGap.addConstructor(function() {
        if (!Joshfire.factory.plugins.sharekit) {
        Joshfire.factory.plugins.sharekit = new ShareKitPlugin();

        var rot13 = function(str,n){
          if (!str) return str;
          return str.replace(/[a-zA-Z]/g, function(c){
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + n) ? c : c - 26);
          });
        };

        var options = OPTIONS;
        Joshfire.factory.plugins.sharekit.setAppName(rot13(options[rot13("appname",12)],14));
        Joshfire.factory.plugins.sharekit.setAppURL(rot13(options[rot13("appurl",12)],14));
        Joshfire.factory.plugins.sharekit.setTwitterConsumerKey(rot13(options[rot13("twitterkey",12)],14));
        Joshfire.factory.plugins.sharekit.setTwitterSecret(rot13(options[rot13("twittersecret",12)],14));
        Joshfire.factory.plugins.sharekit.setFacebookAppId(rot13(options[rot13("facebookappid",12)],14));

      }

    });

})();