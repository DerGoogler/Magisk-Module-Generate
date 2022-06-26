import fs from "fs";
import mkDirByPathSync from "../../util/mkDirByPathSync";
import { archiveFolder } from "zip-lib";

interface IModuleProp {
  id: string | undefined;
  name: string | undefined;
  author: string | undefined;
  description: string | undefined;
  updateJson: string | undefined;
  needRamdisk: string | undefined;
  changeBoot: string | undefined;
  support: string | undefined;
  donate: string | undefined;
  config: string | undefined;
}

interface IBasicModule {
  prop: IModuleProp;
  useFoxMMMProps: boolean;
}

const HOME = process.env.HOME;
const MAIN_DIR = `${HOME}/.Magisk-Module-Generator`;

export const BasicModule = (config: IBasicModule) => {
  const MODULE_DIR = `${MAIN_DIR}/modules/${config.prop.id}`;

  const module_prop = `# Magisk properties
id=${config.prop.id}
name=${config.prop.name}
version=v1.0.0
versionCode=1
author=${config.prop.author}
description=${config.prop.description}
${config.prop.updateJson === "" ? "" : `updateJson=${config.prop.updateJson}`}
${
  config.useFoxMMMProps
    ? `# FoxMMM properties
${
  config.prop.needRamdisk === "" ? "" : `needRamdisk=${config.prop.needRamdisk}`
}
${config.prop.changeBoot === "" ? "" : `changeBoot=${config.prop.changeBoot}`}
${config.prop.support === "" ? "" : `support=${config.prop.support}`}
${config.prop.donate === "" ? "" : `donate=${config.prop.donate}`}
${config.prop.config === "" ? "" : `config=${config.prop.config}`}`
    : ""
}
  `.replace(/^\s*\n/gm, "");

  const updater_script = `#MAGISK`;
  const update_binary = `#!/sbin/sh
#################
# Initialization
#################

umask 022

# echo before loading util_functions
ui_print() { echo "$1"; }

require_new_magisk() {
  ui_print "*******************************"
  ui_print " Please install Magisk v20.4+! "
  ui_print "*******************************"
  exit 1
}

#########################
# Load util_functions.sh
#########################

OUTFD=$2
ZIPFILE=$3

mount /data 2>/dev/null

[ -f /data/adb/magisk/util_functions.sh ] || require_new_magisk
. /data/adb/magisk/util_functions.sh
[ $MAGISK_VER_CODE -lt 20400 ] && require_new_magisk

install_module
exit 0
`;

  const customize_sh = `#!/system/bin/sh
ui_print "--------------------------------"
ui_print "${config.prop.name}"
ui_print "1.0.0"
ui_print "--------------------------------"
ui_print "by ${config.prop.author}"
ui_print "--------------------------------"
ui_print " "
ui_print "- Done"

`;

  try {
    mkDirByPathSync(MODULE_DIR);
    mkDirByPathSync(`${MODULE_DIR}/META-INF/com/google/android/`);
    mkDirByPathSync(`${MAIN_DIR}/output`);
  } catch (e) {
    alert(e);
  }

  try {
    fs.writeFileSync(`${MODULE_DIR}/module.prop`, module_prop);
    fs.writeFileSync(
      `${MODULE_DIR}/META-INF/com/google/android/updater-script`,
      updater_script
    );
    fs.writeFileSync(
      `${MODULE_DIR}/META-INF/com/google/android/update-binary`,
      update_binary
    );
    fs.writeFileSync(`${MODULE_DIR}/customize.sh`, customize_sh);

    archiveFolder(MODULE_DIR, `${MAIN_DIR}/output/${config.prop.id}.zip`);
    alert("Generated");
  } catch (error) {
    alert(error);
  }
};
