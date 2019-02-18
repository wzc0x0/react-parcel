/**
 * base types
 */

let isDone: boolean = false;
let num: number = 1;
let str: string = "aaaa";
let arr: number[] = [1, 2, 3];
let x: [number, string];
x[0] = 2;
x[1] = "aa";

let list: any[] = [1, 2, 3];
list[5] = 1;

enum Color {
  Red,
  blue,
  Yellow
}
let c: Color = Color.Red;

function hello(): any {
  console.log("helo");
}
