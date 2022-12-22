import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { delay, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent {
  secondsPerSolution = 0;

  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl('', [Validators.required]),
    },
    [CustomValidators.addition('answer', 'a', 'b')]
  );

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  ngOnInit() {
    /* 1.
    let startTime = new Date();
    let numberSolved = 0;
    */

    // console.log(this.mathForm.statusChanges);

    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(500),
        scan(
          //scan 有點像 reduce
          (acc, value) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          }, //callback function
          { numberSolved: 0, startTime: new Date() } //初始值
        )
      )
      .subscribe((value) => {
        /** 計算 user 解題時間 */
        /*-----1. Angular 原生寫法---*/
        // numberSolved++;
        // this.secondsPerSolution =
        //   (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
        //-----
        this.secondsPerSolution =
          (new Date().getTime() - value.startTime.getTime()) /
          value.numberSolved /
          1000;

        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
        //更新整個 form 全部的 property，使用 setValue()
        //如果要更新部分 property 的話，使用 this.mathForm.patchValue()
      });
  }
}
