/**
 * @fileoverview xcodeproj hook that completes the adds Sharekit files to the project
 * and updates the pbx file appropriately.
 */
define([], function () {
  return function (runtime, params, callback) {
    //runtime.copyFileInXcodeProject("res/PGShareKit.h","Project/Plugins/PGShareKit.h");
    //runtime.copyFileInXcodeProject("res/PGShareKit.m","Project/Plugins/PGShareKit.m");
    runtime.copyFileInXcodeProject("res/ShareKit-1.0","Project/Externals/");
    
    runtime.readPlist("Project/PhoneGap.plist",function(err,data) {
      if (err) return callback(err);

      data["Plugins"]["com.joshfire.factory.plugins.sharekit"] = "PGShareKit";

      runtime.writePlist("Project/PhoneGap.plist",data,function(err) {
        if (err) return callback(err);

        runtime.modifyPbxproj([
          

          ["add_file_to_group",[ "ShareKit-1.0", "B8FC1CF214DC05580091258F", "Externals"]],
          ["add_group",[ "ShareKit-1.0", "B8FC1CF214DC05580091258F", "ShareKit-1.0"]],

          ["add_file_to_group",["FBDialog.bundle", "B8FC1CE614DBFED80091258F", "ShareKit-1.0"]],
          ["add_filereference",["FBDialog.bundle","plug-in","B8FC1CE614DBFED80091258F","FBDialog.bundle","\"<group>\""]],
          ["add_buildfile",["FBDialog.bundle","B8FC1CE614DBFED80091258F","B8FC1CE314DBFED80091258F"]],
          ["add_file_to_resources_phase",["FBDialog.bundle", "B8FC1CE314DBFED80091258F"]],

          ["add_file_to_group",["ShareKit.bundle", "B8FC1CE814DBFED80091258F", "ShareKit-1.0"]],
          ["add_filereference",["ShareKit.bundle","plug-in","B8FC1CE814DBFED80091258F","ShareKit.bundle","\"<group>\""]],
          ["add_buildfile",["ShareKit.bundle","B8FC1CE814DBFED80091258F","B8FC1CE514DBFED80091258F"]],
          ["add_file_to_resources_phase",["ShareKit.bundle", "B8FC1CE514DBFED80091258F"]],


          ["add_buildfile",["libShareKit.a","B8FC1CE714DBFED80091258F","B8FC1CE414DBFED80091258F"]],
          ["add_filereference",["libShareKit.a","archive.ar","B8FC1CE714DBFED80091258F","libShareKit.a","\"<group>\""]],
          ["add_file_to_group",["libShareKit.a", "B8FC1CE714DBFED80091258F","ShareKit-1.0" ]],
          ["add_file_to_phase",["libShareKit.a","B8FC1CE414DBFED80091258F","B8438B4C14C5E33D0061526C","Frameworks"]],

          
          
          ["add_build_setting",["Debug", "FRAMEWORK_SEARCH_PATHS", "\"\\\"$(SRCROOT)/Project/Externals\\\"\"", "B8438B9714C5E33E0061526C"]],
          ["add_build_setting",["Debug", "LIBRARY_SEARCH_PATHS", "\"\\\"$(SRCROOT)/Project/Externals/ShareKit-1.0\\\"\"", "B8438B9714C5E33E0061526C"]],
          ["add_build_setting",["Debug", "OTHER_LDFLAGS", "\"-ObjC\"", "B8438B9714C5E33E0061526C"]],
          
          
          ["add_build_setting",["Release", "FRAMEWORK_SEARCH_PATHS", "\"\\\"$(SRCROOT)/Project/Externals\\\"\"", "B8438B9814C5E33E0061526C"]],
          ["add_build_setting",["Release", "LIBRARY_SEARCH_PATHS", "\"\\\"$(SRCROOT)/Project/Externals/ShareKit-1.0\\\"\"", "B8438B9814C5E33E0061526C"]],
          ["add_build_setting",["Release", "OTHER_LDFLAGS", "\"-ObjC\"", "B8438B9814C5E33E0061526C"]],


          ["add_file_to_group",["CFNetwork.framework", "B8FC1CF014DC03CB0091258F", "Frameworks"]],
          ["add_filereference",["CFNetwork.framework","framework","B8FC1CF014DC03CB0091258F","System/Library/Frameworks/CFNetwork.framework","SDKROOT"]],
          ["add_buildfile",["CFNetwork.framework","B8FC1CF014DC03CB0091258F","B8FC1CF114DC03CB0091258F"]],
          ["add_file_to_frameworks_phase",["CFNetwork.framework","B8FC1CF114DC03CB0091258F"]],

          ["add_file_to_group",["MessageUI.framework", "B8FC1CEA14DC039E0091258F", "Frameworks"]],
          ["add_filereference",["MessageUI.framework","framework","B8FC1CEA14DC039E0091258F","System/Library/Frameworks/MessageUI.framework","SDKROOT"]],
          ["add_buildfile",["MessageUI.framework","B8FC1CEA14DC039E0091258F","B8FC1CEB14DC039E0091258F"]],
          ["add_file_to_frameworks_phase",["MessageUI.framework","B8FC1CEB14DC039E0091258F"]],

          ["add_file_to_group",["Security.framework", "B8FC1CEC14DC03B90091258F", "Frameworks"]],
          ["add_filereference",["Security.framework","framework","B8FC1CEC14DC03B90091258F","System/Library/Frameworks/Security.framework","SDKROOT"]],
          ["add_buildfile",["Security.framework","B8FC1CEC14DC03B90091258F","B8FC1CED14DC03B90091258F"]],
          ["add_file_to_frameworks_phase",["Security.framework","B8FC1CED14DC03B90091258F"]],

          ["add_file_to_group",["Twitter.framework", "B8FC1CEE14DC03C00091258F", "Frameworks"]],
          ["add_filereference",["Twitter.framework","framework","B8FC1CEE14DC03C00091258F","System/Library/Frameworks/Twitter.framework","SDKROOT"]],
          ["add_buildfile",["Twitter.framework","B8FC1CEE14DC03C00091258F","B8FC1CEF14DC03C00091258F",true]],
          ["add_file_to_frameworks_phase",["Twitter.framework","B8FC1CEF14DC03C00091258F"]]

/*
          ["add_buildfile",["PGShareKit.m","B8FC1CF414DC079F0091258F","B8FC1CF514DC07A00091258F"]],
          ["add_filereference",["PGShareKit.m","sourcecode.c.objc","B8FC1CF414DC079F0091258F","Plugins/PGShareKit.m","\"<group>\""]],
          ["add_file_to_group",[ "PGShareKit.m", "B8FC1CF414DC079F0091258F", "Plugins"]],
          ["add_file_to_phase",["PGShareKit.m", "B8FC1CF514DC07A00091258F", "B8438B4B14C5E33D0061526C", "Sources"]],
          
          ["add_filereference",["PGShareKit.h","sourcecode.c.h","B8FC1CF314DC079F0091258F","Plugins/PGShareKit.h","\"<group>\""]],
          ["add_file_to_group",[ "PGShareKit.h", "B8FC1CF314DC079F0091258F", "Plugins"]]
  */

        ],function(err) {
          callback(err);
        });


      });
    });
  };
});
