import file from "../../util/file";
import fs from "fs";
import { archiveFolder } from "zip-lib";

export namespace Module {
  export interface IModuleProp {
    id: string;
    name: string;
    author: string;
    description: string;
    updateJson: string;
    needRamdisk: string;
    changeBoot: string;
    support: string;
    donate: string;
    config: string;
  }

  export interface IModule {
    prop: IModuleProp;
    useFoxMMMProps: boolean;
    setMagiskSupport?: string;
  }

  /**
   * Creates an new module template
   */
  export class Create {
    private HOME = process.env.HOME;
    private MAIN_DIR = `${this.HOME}/.Magisk-Module-Generator`;
    public MODULE_DIR: string;
    public prop: IModuleProp;
    public useFoxMMMProps: boolean;
    public setMagiskSupport: string | undefined;
    public MODULE_PROP_PATH: string = "";
    public CUSTOMIZE_SH_PATH: string = "";
    public UPDATE_BINARY_PATH: string = "";
    public UPDATER_SCRIPT_PATH: string = "";

    public constructor(config: IModule) {
      this.prop = config.prop;
      this.useFoxMMMProps = config.useFoxMMMProps;
      this.setMagiskSupport = config.setMagiskSupport;
      this.MODULE_DIR = `${this.MAIN_DIR}/modules/${this.prop.id}`;
      try {
        file.mkDirByPathSync(this.MODULE_DIR);
        file.mkDirByPathSync(`${this.MODULE_DIR}/META-INF/com/google/android/`);
        file.mkDirByPathSync(`${this.MAIN_DIR}/output`);
      } catch (e) {
        alert(e);
      }
      try {
        fs.writeFileSync(
          `${this.MODULE_DIR}/${this.MODULE_PROP_PATH}`,
          this.properties
        );

        if (this.updater_script !== "false") {
          fs.writeFileSync(
            `${this.MODULE_DIR}/${this.UPDATER_SCRIPT_PATH}`,
            this.updater_script
          );
        }

        if (this.update_binary !== "false") {
          fs.writeFileSync(
            `${this.MODULE_DIR}/${this.UPDATE_BINARY_PATH}`,
            this.update_binary
          );
        }

        fs.writeFileSync(
          `${this.MODULE_DIR}/${this.CUSTOMIZE_SH_PATH}`,
          this.customize
        );

        archiveFolder(
          this.MODULE_DIR,
          `${this.MAIN_DIR}/output/${this.prop.id}.zip`
        );
        alert("Generated");
      } catch (error) {
        alert(error);
      }

      this.init();
    }

    /**
     * Method to pre initalize module creation.
     */
    public init() {
      "Place here your code";
    }

    /**
     * Make the module.prop file (Not recommended to override)
     * @returns {ModuleUtil.IModuleProp} Module properties
     */
    public get properties(): string {
      return `# Magisk properties
  id=${this.prop.id}
  name=${this.prop.name}
  version=v1.0.0
  versionCode=1
  author=${this.prop.author}
  description=${this.prop.description}
  ${this.prop.updateJson === "" ? "" : `updateJson=${this.prop.updateJson}`}
  ${
    this.useFoxMMMProps
      ? `# FoxMMM properties
  ${this.prop.needRamdisk === "" ? "" : `needRamdisk=${this.prop.needRamdisk}`}
  ${this.prop.changeBoot === "" ? "" : `changeBoot=${this.prop.changeBoot}`}
  ${this.prop.support === "" ? "" : `support=${this.prop.support}`}
  ${this.prop.donate === "" ? "" : `donate=${this.prop.donate}`}
  ${this.prop.config === "" ? "" : `config=${this.prop.config}`}`
      : ""
  }`.replace(/^\s*\n/gm, "");
    }

    /**
     * Create your customize.sh script
     */
    public get customize(): string {
      return `#!/system/bin/sh
  ui_print "--------------------------------"
  ui_print "${this.prop.name}"
  ui_print "1.0.0"
  ui_print "--------------------------------"
  ui_print "by ${this.prop.author}"
  ui_print "--------------------------------"
  ui_print " "
  ui_print "- Done"
  
  `;
    }

    public get update_binary(): string {
      return `#!/sbin/sh
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
    }

    public get updater_script(): string {
      return `#MAGISK`;
    }
  }
}
