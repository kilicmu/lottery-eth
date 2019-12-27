let Web3 = require('web3');
let { abi, bytecode } = require('./complex');
let HDWalletProvider = require('truffle-hdwallet-provider')
let web3 = new Web3();
//助记词（略）
let terms = ''
//ropsten测试网络服务供应商，访问https://infura.io/ 注册获取
let netIP = ''
let provider = new HDWalletProvider(terms, netIP)
web3.setProvider(provider)
//此处为部署用户
let account = ''

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
