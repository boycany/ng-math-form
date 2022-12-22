import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  count = 0;

  static addition(target: string, source1: string, source2: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const firstNum = form.value[source1];
      const secondNum = form.value[source2];

      return firstNum + secondNum === parseInt(sum) ? null : { addition: true };
    };
  }

  callCount() {
    return this.count;
  }
}

//static function 可以不用創建 instance 就直接呼叫它
//在 static function 內也無法呼叫 property 'count'
// CustomValidators.addition();

// let c = new CustomValidators();
// c.callCount();
