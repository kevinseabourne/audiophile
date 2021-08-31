// Easy Copy Paste
// import { isObjEmpty, isArrayEmpty } from "./common/utils/isEmpty";
// isObjEmpty()
// isArrayEmpty()

export const isObjEmpty = (obj: any) => {
  const result =
    typeof obj === "object" &&
    Object.keys(obj).length === 0 &&
    obj.constructor === Object;
  return result;
};

export const isArrayEmpty = (array: any) => {
  if (
    Array.isArray(array) ||
    Object.prototype.toString.call(array) === "[object Array]"
  ) {
    return Boolean(array.length);
  }
  return false;
};
