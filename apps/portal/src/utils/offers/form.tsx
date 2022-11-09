/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError } from '~/components/offers/constants';

/**
 * Removes empty objects, empty strings, `null`, `undefined`, and `NaN` values from an object.
 * Does not remove empty arrays.
 * @param object
 * @returns object without empty values or objects.
 */
export function cleanObject(object: any) {
  Object.entries(object).forEach(([k, v]) => {
    if ((v && typeof v === 'object') || Array.isArray(v)) {
      cleanObject(v);
    }
    if (
      (v &&
        typeof v === 'object' &&
        !Object.keys(v).length &&
        !Array.isArray(v)) ||
      v === null ||
      v === undefined ||
      v === '' ||
      v !== v
    ) {
      if (Array.isArray(object)) {
        const index = object.indexOf(v);
        object.splice(index, 1);
      } else if (!(v instanceof Date)) {
        delete object[k];
      }
    }
  });
  return object;
}

/**
 * Removes empty objects from an object.
 * @param object
 * @returns object without empty values or objects.
 */
export function removeEmptyObjects(object: any) {
  Object.entries(object).forEach(([k, v]) => {
    if ((v && typeof v === 'object') || Array.isArray(v)) {
      removeEmptyObjects(v);
    }
    if (
      v &&
      typeof v === 'object' &&
      !Object.keys(v).length &&
      !Array.isArray(v)
    ) {
      if (Array.isArray(object)) {
        const index = object.indexOf(v);
        object.splice(index, 1);
      } else if (!(v instanceof Date)) {
        delete object[k];
      }
    }
  });
  return object;
}

/**
 * Removes invalid money data from an object.
 * If currency is present but value is not present, money object is removed.
 * @param object
 * @returns object without invalid money data.
 */
export function removeInvalidMoneyData(object: any) {
  Object.entries(object).forEach(([k, v]) => {
    if ((v && typeof v === 'object') || Array.isArray(v)) {
      removeInvalidMoneyData(v);
    }
    if (k === 'currency') {
      if (object.value === undefined) {
        delete object[k];
      } else if (
        object.value === null ||
        object.value !== object.value ||
        object.value === ''
      ) {
        delete object[k];
        delete object.value;
      }
    }
  });
  return object;
}

export function validatePositiveNumber(v?: number | null) {
  return (
    v === null ||
    v === undefined ||
    v !== v ||
    v > 0 ||
    FieldError.POSITIVE_NUMBER
  );
}
