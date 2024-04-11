// export function isEmail(value) {
//   return value.includes("@");
// }

export function isEmail(value) {
  if (typeof value !== "string") {
    return false; // Return false if value is not a string
  }
  return value.includes("@");
}


export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
