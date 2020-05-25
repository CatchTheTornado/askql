// AskVM Error:
//  Unknown identifier times!  (and likely also toInt, divideBy and ceil)
const s = (5.1 * 2 + 1).toString();
const doubleS = s + s;
const int = parseInt(doubleS);

export const expectedResult = Math.ceil(int / 6);
