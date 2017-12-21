const Web3 = require('web3'); //npm install ethereum/web3.js --save


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    // http://demo-pos.ic-i.ru:8080/
    web3 = new Web3(new Web3.providers.HttpProvider("http://185.89.10.103:8541/"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var myContract = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "_fName", "type": "string" }, { "name": "_age", "type": "uint256" }], "name": "setInstructor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getInstructor", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }]);

// Contract Address 
// 0x04fe42094a783a87dc418df274e2cab2756c8aab
var contract = myContract.at('0x04fe42094a783a87dc418df274e2cab2756c8aab');

//Get transaction
contract.getInstructor(function (error, result) {
    if (!error) {
        console.log(result[0]);
        console.log(result[1]);
    }
    else {
        console.log('error');
    }
});

//Set transaction
//contract.setInstructor("Query", 77);


//Contract's address for pos
//0xf3b08f51debc776b6ca7669160d8b6245bd97dd2
var myPosContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"emitent","type":"string"},{"name":"organisation","type":"string"},{"name":"order","type":"string"},{"name":"val","type":"uint256"}],"name":"buyOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"emitent","type":"string"},{"name":"organisation","type":"string"}],"name":"getCreditorBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"emitent","type":"string"}],"name":"getTotalBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"emitent","type":"string"},{"name":"organisation","type":"string"},{"name":"val","type":"uint256"}],"name":"emit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"emitent","type":"string"},{"name":"order","type":"string"}],"name":"isPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var contractPos = myPosContract.at("0xf3b08f51debc776b6ca7669160d8b6245bd97dd2");

