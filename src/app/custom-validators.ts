import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  count = 0;

  static addition(form: AbstractControl) {
    const { a, b, answer } = form.value;
    return a + b === parseInt(answer) ? null : { addition: true };
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
