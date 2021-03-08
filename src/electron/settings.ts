'use strict';

import { app } from 'electron';
import { inspect } from 'util';
import fs from 'fs';
import { join } from 'path';

export class Settings extends Map<string, any> {
  private name: string;
  private file: string;
  constructor() {
    super();
    this.name = inspect(Object.getPrototypeOf(this)).split(' ')[0];
    this.file = join(app.getPath('userData'), `${this.name}.json`);
    if (!fs.existsSync(this.file)) fs.writeFileSync(this.file, '[]');
    else {
      
      let json = JSON.parse(fs.readFileSync(this.file, 'utf8'));
      json.forEach((a: Array<any>) => {
        super.set(a[0] as string, a[1]);
      });
    }
  }

  public set(key: string, value: any): this {
    super.set(key, value);
    fs.writeFileSync(this.file, JSON.stringify(Array.from(this.entries())));
    return this;
  }

  public toJSON(): any {
    let constructed: {[k: string]: any} = {};

    Array.from(this.entries()).forEach((a: Array<any>) => {
      constructed[a[0] as string] = a[1];
    });

    return constructed;
  }
};