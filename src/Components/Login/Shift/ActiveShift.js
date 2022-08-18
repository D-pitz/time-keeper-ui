import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getActiveUser } from "../../../Context/UserContext";

const ActiveShift = () => {

};

export const validStartLunch = (shift) => {
  if ((shift.abreak.complete === true || shift.abreak.start === null) 
    && shift.start !== null
  ) {
    return false;
  } else {
    return true;
  }
}

export const validStartBreak = (shift) => {
  if (
    (shift.lunch.start === null || shift.lunch.complete) &&
    shift.start !== null
  ) {
    return false;
  } else {
    return true;
  }
};

export const validEndLunch = (shift) => {
  if (
    (shift.abreak.complete || shift.abreak.start === null) &&
    shift.lunch.start !== null &&
    shift.start !== null
  ) {
    return false;
  } else {
    return true;
  }
};

export const validEndBreak = (shift) => {
  if (
    (!shift.abreak.complete && shift.abreak.start !== null) &&
    shift.abreak.start !== null && 
    shift.start !== null
  ) {
    return false;
  } else {
    return true;
  }
};

export const validEndShift = (shift) => {
  if (shift.lunch.complete && shift.abreak.complete) {
    return false;
  }
  return true;
}
