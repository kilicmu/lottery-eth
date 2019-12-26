let Web3 = require('web3')
// let { abi, bytecode } = require('./complex')

let abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPlayers", "outputs": [{ "internalType": "address payable[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getWinner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lottery", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "manager", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "play", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "players", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "randNonce", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retired", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

let web3 = new Web3();
//此处为合约地址
let address = '0xBA939617231A0CA8db63bC5b72eD9040Eeb68631';
// web3.setProvider('http://127.0.0.1:8545');
//此处判断小狐狸的版本，决定网络供应API
if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    const provider = window['ethereum'] || window.web3.currentProvider
    web3.setProvider(provider);
}

let contract = new web3.eth.Contract(abi, address)

export { contract, web3 };