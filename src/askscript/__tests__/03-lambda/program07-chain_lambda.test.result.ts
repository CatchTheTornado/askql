// AskVM Error:
//  params is not iterable
const s = (5.1 * 2 + 1).toString();
const doubleS = s + s;
const int = parseInt(doubleS);

export const expectedResult = Math.ceil(int / 6);
