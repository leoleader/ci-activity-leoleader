import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

export class CalculatorModel implements ICalculatorModel {
  private _buffer: string = '';
  private curr_number: string = '';
  private input_history: Array<any> = [];

  public pressNumericKey(key: NumericKeys): void {
    this._buffer += key;
    this.curr_number += key;
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this._buffer += ' ' + key + ' ';
    this.input_history.push(+this.curr_number);
    this.curr_number = '';
    this.input_history.push(key);
  }

  public pressActionKey(key: ActionKeys): void {
    if (key === ActionKeys.EQUALS) {
      this.input_history.push(+this.curr_number);
      this.curr_number = '';
      const result: number = this.calcualteResultGood();
      this._buffer = result.toString();
      // calc result, display === result
    } else if (key === ActionKeys.CLEAR) {
      // clear display and input history
      this._buffer = '';
      this.curr_number = '';
      this.input_history = [];
    }
    if (key === ActionKeys.DOT) {
      if (this.curr_number !== '') {
        // add decimal to number and display
        this.curr_number += '.';
        this._buffer += '.';
      }
    }
  }

  public display(): string {
    return this._buffer;
  }

  public calcualteResultGood(): number {
    let opresult: number = 0;
    let result: number = 0;
    console.log('starting history' + this.input_history);
    /**
     * RN THIS ASSUMES GIVEN DATA IS VALID
     * valid data being num op num repeated
     * should iterate through input history first
     * looking for / and * then taking prev and next
     * num, perform the op then build new array and repeat
     *  */

    while (this.input_history.length >= 3) {
      // first do multiplication and division
      for (let i: number = 0; i < this.input_history.length; i++) {
        if (this.input_history[i] === '/') {
          const num1: number = this.input_history[i - 1];
          const num2: number = this.input_history[i + 1];
          opresult = num1 / num2;
          let new_history: Array<any> = [];
          new_history = this.input_history
            .slice(0, i - 1)
            .concat([opresult])
            .concat(this.input_history.slice(i + 2));
          this.input_history = new_history;
          console.log('div history' + this.input_history);
        }
        if (this.input_history[i] === '*') {
          const num1: number = this.input_history[i - 1];
          const num2: number = this.input_history[i + 1];
          opresult = num1 * num2;
          let new_history: Array<any> = [];
          new_history = this.input_history
            .slice(0, i - 1)
            .concat([opresult])
            .concat(this.input_history.slice(i + 2));
          this.input_history = new_history;
          console.log('mult history' + this.input_history);
        }
      }
      // then do addition and subtraction
      for (let i: number = 0; i < this.input_history.length; i++) {
        if (this.input_history[i] === '+') {
          const num1: number = this.input_history[i - 1];
          const num2: number = this.input_history[i + 1];
          opresult = num1 + num2;
          let new_history: Array<any> = [];
          new_history = this.input_history
            .slice(0, i - 1)
            .concat([opresult])
            .concat(this.input_history.slice(i + 2));
          this.input_history = new_history;
          console.log('add history' + this.input_history);
        }
        if (this.input_history[i] === '-') {
          const num1: number = this.input_history[i - 1];
          const num2: number = this.input_history[i + 1];
          opresult = num1 - num2;
          let new_history: Array<any> = [];
          new_history = this.input_history
            .slice(0, i - 1)
            .concat([opresult])
            .concat(this.input_history.slice(i + 2));
          this.input_history = new_history;
          console.log('sub history' + this.input_history);
        }
      }
    }
    result = this.input_history.pop();
    console.log(result);
    return result;
  }
}
