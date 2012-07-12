/**
 * @fileoverview Bootstrap hook that replaces occurrences of the string
 * "OPTIONS" in the bootstrap script by the parameters options slightly
 * encoded to ensure that they are not human-readable
 */
define([], function () {
  return function (runtime, params, callback) {
    runtime.readFile('res/phonegap-sharekit-1.0.js', function (err, cnt) {
      if (err) return callback(err);

      var rot13 = function(str) {
        if (!str) return str;
        return str.replace(/[a-zA-Z]/g, function(c){
          return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 12) ? c : c - 26);
        });
      };

      //TODO set provider ID
      callback(null, params.content + cnt.replace(/OPTIONS/g, rot13(JSON.stringify(params.options))));
    });
  };
});