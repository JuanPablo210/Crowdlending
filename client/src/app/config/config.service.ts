import { Injectable } from '@angular/core';
import { InConfiguration } from '../core/models/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public configData: InConfiguration;

  constructor() {
    this.setConfigData();
  }

  setConfigData() {
    this.configData = {
      layout: {
        variant: 'white', // options:  light & dark
        theme_color: 'dark', // options:  white, cyan, black, purple, orange, green, red
        logo_bg_color: 'dark', // options:  white, cyan, black, purple, orange, green, red
        sidebar: {
          collapsed: false, // options:  true & false
          backgroundColor: 'dark' // options:  light & dark
        }
      }
    };
  }
}
