/**
 * ts 泛型
*/

function identity<T>(params:T):T {
  return params
}

let output = identity("MyString")

function loggingIdentity<T>(arg:Array<T>):Array<T>{
  console.log(arg.length)
  return arg
}

// I don't like ts
