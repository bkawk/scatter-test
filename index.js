let scatter, eos;
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'nodes.get-scatter.com',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
}
const options = {expireInSeconds:60};
const reqFields = {accounts:[network]};
ScatterJS.plugins(new ScatterEOS());
ScatterJS.scatter.connect("worbli")
.then(connected => {
        if (!connected) return false;
        scatter = ScatterJS.scatter;
        scatter.getIdentity(reqFields)
        .then(() => eos = scatter.eos(network, Eos, options))
        .catch(error => console.log(error));
})
.catch(error => console.log(error));

function transfer(){
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const options = { authorization:[`${account.name}@${account.authority}`] };
    eos.transfer(account.name, 'webcomponent', '0.1000 EOS', '', options)
    .then(trx => console.log('trx', trx))
    .catch(err => console.error(err));
}

function callContract(){
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const options = { authorization:[`${account.name}@${account.authority}`]};
    const contractAccount = 'worbliworbli';
    const functionName = 'reg';
    const owner = account.name;
    const securitycode = document.getElementById("securitycode").value;
    const args = {owner, securitycode}
    eos.transaction([contractAccount], sendTx => {
        sendTx[contractAccount][functionName](args, options)
     })
    .then(trx => console.log('trx', trx))
    .catch(err => console.error(err));
}