let { contract } = require('./contract-provider')

let res = async () => {
    try {
        let v1 = await contract.methods.manager().call();
        console.log(v1);
    } catch (e) {
        console.log(e);
    }
};
res();
