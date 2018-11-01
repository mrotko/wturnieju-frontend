import {ValidatorFn} from '@angular/forms';

type Comparator<T> = (a: T, b: T) => boolean;

function twoFieldsValidator(siblingsName: string, errName: string, comp: Comparator): ValidatorFn {
  return control => {
    const otherField = control.parent.get(siblingsName);
    if (!otherField.value || !control.value) {
      return null;
    }
    const err = {};
    err[errName] = control.value;
    return comp(control.value, otherField.value) ? null : err;
  };
}

export function lessThanValidator(field: string): ValidatorFn {
  return twoFieldsValidator(field, 'lessThan', (a, b) => Number(a) < Number(b));
}

export function lessEqThanValidator(field: string): ValidatorFn {
  return twoFieldsValidator(field, 'lessEqThan', (a, b) => Number(a) <= Number(b));
}

export function greaterThanValidator(field: string): ValidatorFn {
  return twoFieldsValidator(field, 'greaterThan', (a, b) => Number(a) > Number(b));
}

export function greaterEqThanValidator(field: string): ValidatorFn {
  return twoFieldsValidator(field, 'greaterEqThan', (a, b) => Number(a) >= Number(b));
}

export function matchValidator(field: string): ValidatorFn {
  return twoFieldsValidator(field, 'match', (a, b) => a === b);
}
