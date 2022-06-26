import { Module } from "./core/Module";
import fs from "fs";
import fse from "fs-extra";
import file from "../util/file";

export class DynamicModule extends Module.Create {
  public MODULE_PROP_PATH = "META-INF/com/google/android/magisk/module.prop";
  public CUSTOMIZE_SH_PATH = "META-INF/com/google/android/magisk/customize.sh";
  public UPDATE_BINARY_PATH = "META-INF/com/google/android/update-binary";
  public UPDATER_SCRIPT_PATH = "META-INF/com/google/android/updater-script";

  public constructor(config: Module.IModule) {
    super(config);
  }

  public init(): void {
    alert(this.MODULE_PROP_PATH);
    try {
      fse.copySync(file.getDynamicInstallerPath(), this.MODULE_DIR);
    } catch (error) {
      alert(error);
    }
  }

  public get customize(): string {
    return `import_config "$MODPATH/module.prop"
chmodBin="$addons/makeExecuteable.sh"
ui_print "--------------------------------"
ui_print "$name                          "
ui_print "$version                       "
ui_print "--------------------------------"
ui_print "by $author                     "
ui_print "--------------------------------"
ui_print " "
# Extract test folder
package_extract_dir "test" "$MODPATH/system/bin"
# Make test.sh execute able
$chmodBin "$MODPATH/system/bin/test.sh"

`;
  }

  public get update_binary(): string {
    return "false";
  }

  public get updater_script(): string {
    return `# Before: ui_print("  Hi! ");
# Now:    ui_print " Hi! "
#-----------Dynamic Installer Configs-----------#
#The #MAGISK tag is required, dont remove it
#MAGISK
setdefault magisk_support ${this.setMagiskSupport}
setdefault run_addons off
setdefault apex_mount off
setdefault extraction_speed default
setdefault permissions "0:0:0755:0644"
setdefault devices off
#-----------------------------------------------#
#Your script starts here:    
`;
  }
}
