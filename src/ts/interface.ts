interface LabelValue {
  label: string;
}

function printLable(value: LabelValue) {
  console.log(value);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLable(myObj);
