ScatterJS.plugins(new ScatterEOS())

const network = {
    blockchain:'eos',
    protocol:'https',
    host:'nodes.get-scatter.com',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}
const options = {};

console.log("====== ScatterJS")
console.log(ScatterJS) 

console.log("====== network")
console.log(network) 

console.log("====== options")
console.log(options) 

ScatterJS.scatter.connect("test").then(connected => {

console.log("====== connected")
console.log(connected);

    if(!connected) return false;
    const scatter = ScatterJS.scatter;

console.log("====== scatter")
console.log(scatter);

    const eos = scatter.eos( network, Eos, options );

console.log("====== eos")
console.log(eos);

    window.ScatterJS = null;

});