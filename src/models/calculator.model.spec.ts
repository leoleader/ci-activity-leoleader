import { CalculatorModel } from './calculator.model';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ActionKeys } from '../enums/action-keys.enum';

describe('CalculatorModel', (): void => {
  let calculator: ICalculatorModel;

  beforeEach((): void => {
    calculator = new CalculatorModel();
  });

  it('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {
    expect(calculator).toBeDefined();
  });

  it('should have an empty display on init', (): void => {
    // Act
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('');
  });

  it('should display `1` when the `1` key is pressed', (): void => {
    // Act
    calculator.pressNumericKey(NumericKeys.ONE);
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual('1');
  });

  it('should display `2` when the `2` key is pressed', (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('2');
  });

  it('should display `98` when the `9` key is pressed followed by the `8` key', (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('98');
  });

  it('should display `+` when operator key is pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.PLUS);

    const displayValue: string = calculator.display();

    expect(displayValue).toEqual(' + ');
  });

  it('should display `*` when operator key is pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.MULT);

    const displayValue: string = calculator.display();

    expect(displayValue).toEqual(' * ');
  });

  it('should display `/` when operator key is pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.DIV);

    const displayValue: string = calculator.display();

    expect(displayValue).toEqual(' / ');
  });

  it('should display ` - ` when operator key is pressed', (): void => {
    calculator.pressOperatorKey(OperatorKeys.MINUS);

    const displayValue: string = calculator.display();

    expect(displayValue).toEqual(' - ');
  });

  it('should display operation 3 + 4 - 1', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.ONE);

    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('3 + 4 - 1');
  });

  it('PEMDAS, 3 + 4 - 1 / 2 * 4 === 12', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);

    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('5');
  });

  it('Clearing should clear display and input history', (): void => {
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    let displayValue: string = calculator.display();
    expect(displayValue).toEqual('3 + 4');

    calculator.pressActionKey(ActionKeys.CLEAR);
    displayValue = calculator.display();
    expect(displayValue).toEqual('');

    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    displayValue = calculator.display();
    expect(displayValue).toEqual('7');
  });

  it('should do decimal operation 5.2 + 3.6', (): void => {
    calculator.pressNumericKey(NumericKeys.FIVE);
    calculator.pressActionKey(ActionKeys.DOT);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressActionKey(ActionKeys.DOT);
    calculator.pressNumericKey(NumericKeys.SIX);
    calculator.pressActionKey(ActionKeys.EQUALS);

    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('8.8');
  });
});
