
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'nodes.get-scatter.com',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}
const options = {expireInSeconds:60};
const requiredFields = {accounts:[network]};

console.log("====== ScatterJS")
console.log(ScatterJS) 

console.log("====== network")
console.log(network) 

console.log("====== options")
console.log(options) 

ScatterJS.plugins(new ScatterEOS())
ScatterJS.scatter.connect("test")
.then(connected => {

        console.log("====== connected")
        console.log(connected);

        if(!connected) return false;
        const scatter = ScatterJS.scatter;

        console.log("====== scatter")
        console.log(scatter);

        scatter.getIdentity(requiredFields)
        .then(() => {
            const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
            console.log("====== account")
            console.log(account);
            
            const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
            console.log("====== transactionOptions")
            console.log(transactionOptions);
            
            //Using a Proxy Provider
            //const eos = scatter.eos( network, Eos, options );
            
            // Using a Hook Provider
            const eos = Eos({ httpEndpoint:'https://api.eosnewyork.io', signatureProvider:scatter.eosHook(network) })

            console.log("====== eos")
            console.log(eos);
        })
        .catch((error)=>{
            console.log("====== Identtity Error")
            console.log(error)
        });
            

            window.ScatterJS = null;

})
.catch((error)=>{
    console.log("====== Connection Error")
    console.log(error)
});