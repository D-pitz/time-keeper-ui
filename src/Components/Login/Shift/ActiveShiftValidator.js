import React from 'react';
export const ActiveShiftValidator = () => {

}

export const validEndShift = (shift) => {
  if (shift.lunch.complete && shift.abreak.complete) {
    return false;
  }
  return true;
}
