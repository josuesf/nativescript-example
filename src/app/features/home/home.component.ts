import { Component } from "@angular/core";
import { ItemEventData } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { FlickService } from "~/app/core";
import { Utils, Device } from "@nativescript/core";

@Component({
  moduleId: module.id,
  selector: "ns-home",
  templateUrl: "home.component.html",
})
export class HomeComponent {
  flicks = this.flickService.getFlicks();

  constructor(
    private routerExtensions: RouterExtensions,
    private flickService: FlickService
  ) {
    const BATTERY_SERVICE = "batterymanager";
    const BATTERY_PROPERTY_CAPACITY = 4;
    if (global.isAndroid && Device.sdkVersion >= "21") {
      const bm = Utils.android
        .getApplicationContext()
        .getSystemService(BATTERY_SERVICE);
      const batLevel = bm.getIntProperty(BATTERY_PROPERTY_CAPACITY);
      console.log('BATTERY LEVEL: ', batLevel);
    }
    if (global.isIOS) {
      const batteryLevel = UIDevice.currentDevice.batteryLevel
      console.log('BATTERY LEVEL IOS: ', batteryLevel);
    }
  }

  onFlickTap(args: ItemEventData): void {
    try {
      this.routerExtensions.navigate(["details", this.flicks[args.index].id]);
    } catch (error) {
      console.log("error routing", error);
    }
  }
}
