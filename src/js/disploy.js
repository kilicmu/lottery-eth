let Web3 = require('web3');
let { abi, bytecode } = require('./complex');

let web3 = new Web3();
let account = '0xc19eea99843C6bA64D8A3338a5d2E7f1Fc0e95EF'
web3.setProvider('http://127.0.0.1:8545');

let contract = new web3.eth.Contract(abi);

contract.deploy({
    data: '0x' + bytecode.object,
    arguments: []
}).send({
    from: account,
    gas: 3000000,
    gasPrice: 1,
}).then(instance => {
    console.log(instance.options.address);
})
