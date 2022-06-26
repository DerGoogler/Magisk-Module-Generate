import { Module } from "./core/Module";

export class BasicModule extends Module.Create {
  public MODULE_PROP_PATH: string = "module.prop";
  public CUSTOMIZE_SH_PATH: string = "customize.sh";
  public UPDATE_BINARY_PATH: string =
    "META-INF/com/google/android/update-binary";
  public UPDATER_SCRIPT_PATH: string =
    "META-INF/com/google/android/updater-script";

  public constructor(config: Module.IModule) {
    super(config);
  }
}
