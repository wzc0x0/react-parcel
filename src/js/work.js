/**
 * learn how to use web worker
 */

const qiniu = require("qiniu-js");
const SparkMD5 = require("spark-md5");

onmessage = params => {
    console.log(params)
}

console.log(qiniu)

let a = 1

let stop = setInterval(() => {
    a = a + 1

    if (a > 10) {
        throw Error('errrrr')
    }

    postMessage({
        a,
        stop
    })
}, 1500);