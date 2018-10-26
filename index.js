let scatter, eos;
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'nodes.get-scatter.com',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}
const options = {expireInSeconds:60};
const requiredFields = {accounts:[network]};
ScatterJS.plugins(new ScatterEOS())
ScatterJS.scatter.connect("worbli")
.then(connected => {
        if(!connected) return false;
        scatter = ScatterJS.scatter;
        scatter.getIdentity(requiredFields)
        .then(() => {       
            eos = scatter.eos( network, Eos, options );
        })
        .catch((error)=>{
            console.log(error)
        });
})
.catch((error)=>{
    console.log(error)
});

function transfer(){
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };  
    eos.transfer(account.name, 'helloeosblox', '0.0100 EOS', '', transactionOptions)          
}


function callContract(){
    console.log('WAIT FOR IT')
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
    eos.transaction(['worbliworbli'], push => {
        push.worbliworbli.reg('somestring', '1234567890123456')
     })
    .then(trx => console.log('trx', trx))
    .catch(err => console.error(err))     
}
