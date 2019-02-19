interface LabelValue {
  label: string;
}

function printLable(value: LabelValue) {
  console.log(value);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLable(myObj);

interface SquareConfig {
  color?:string
  width?:number
  [propName:string]:any
}

function print(v:SquareConfig) {
  console.log(v)
}

print({color:"#f0f",width:100,height:100})


interface SearchFunc {
  (source:string,subString:string):boolean
}

let MySearch:SearchFunc

MySearch = function (src,sub) {
  let res = src.search(sub)
  return res > -1
}

interface StringArray {
  [index:number]:string
}

let myArray:StringArray = ["Bob","Alan"]

interface ClockInterface {
  currentTime:Date
  setTime(d:Date)
}

class Clock implements ClockInterface {
  currentTime:Date;
  setTime(d:Date) {
    this.currentTime = d
  }
  constructor(h:number,m:number) {
  }
}
