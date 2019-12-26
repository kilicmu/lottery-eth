let solc = require('solc');
let fs = require('fs');
let sourceCode = fs.readFileSync('./contract/Lottery.sol');


let input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: sourceCode.toString(),
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};
let output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {
    'abi': output['contracts']['Lottery.sol']['Lottery'].abi,
    'bytecode': output['contracts']['Lottery.sol']['Lottery'].evm.bytecode,
}

