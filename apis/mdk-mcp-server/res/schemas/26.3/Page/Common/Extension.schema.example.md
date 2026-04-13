
----
## Examples

### Extension in a Page
```json
{
  "Caption": "Extension Example",
  "_Type": "Page",
  "_Name": "ExtensionExamplePage",
  "Controls": [{
    "_Type": "Control.Type.Extension",
    "_Name": "ExtensionExample",
    "Module": "MyExtModule",
    "Control": "MyExtControl",
    "Class": "MyExtension",
    "ExtensionProperties": {
      "Prop1": {
        "Value": "My Sample Extension Display Value"
      }
    },
  }]
}
```

### Extension Implementation
```ts
// MyExtControl.ts Example
import * as app from '@nativescript/core/application';
import { BaseObservable } from 'mdk-core/observables/BaseObservable';
import { Color } from '@nativescript/core/color';
import { IControl } from 'mdk-core/controls/IControl';
import { Label } from '@nativescript/core/ui/label';

export class MyExtension extends IControl {
  private _label: any;
  private _observable: BaseObservable;
  private _value: any;

  public initialize(props) {
    super.initialize(props);
    if (this.definition().data.ExtensionProperties.Prop1) {
      this._value = this.definition().data.ExtensionProperties.Prop1.Value;
    }
    else {
      this._value = "Default Value";
    }
    const color = new Color('gray');
    this._label = new Label();
    this._label.backgroundColor = color;
  }

  public view() {
    //Use provided ValueResolver to resolve value to support bindings, rules, etc in your extension
    this.valueResolver().resolveValue(this._value).then((resolvedValue)=> {
      this._label.text = resolvedValue;
    });
    return this._label;
  }

  public viewIsNative() {
    return true;
  }

  public observable() {
    if (!this._observable) {
      this._observable = new BaseObservable(this, this.definition(), this.page());
    }
    return this._observable;
  }

  public setValue(value: any, notify: boolean): Promise<any> {
    this._value = value;
    this._label.text = value;
    return Promise.resolve();
  }

  public setContainer(container: IControl) {
    // do nothing
  }

  get isBindable(): boolean {
    return true;
  }

  public bind(): Promise<any> {
    return this.observable().bindValue(this._value);
  }
}
```