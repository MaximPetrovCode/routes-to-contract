module.exports = (app) => {

    const Web3 = require('web3'); //npm install ethereum/web3.js --save

    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        // http://demo-pos.ic-i.ru:8080/
        web3 = new Web3(new Web3.providers.HttpProvider("http://185.89.10.103:8541/"));
    }
    web3.eth.defaultAccount = web3.eth.accounts[0];


    //Contract's address for pos
    //0x5c0131255b4cf219ef6198d34c9b50669f25adae
    var myPosContract = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "emitent", "type": "string" }, { "name": "organisation", "type": "string" }, { "name": "order", "type": "string" }, { "name": "val", "type": "uint256" }], "name": "buyOrder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "emitent", "type": "string" }, { "name": "organisation", "type": "string" }], "name": "getCreditorBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "emitent", "type": "string" }], "name": "getTotalBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "emitent", "type": "string" }, { "name": "organisation", "type": "string" }, { "name": "val", "type": "uint256" }], "name": "emit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "emitent", "type": "string" }, { "name": "order", "type": "string" }], "name": "isPaid", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }]);
    var contract = myPosContract.at("0x5c0131255b4cf219ef6198d34c9b50669f25adae");


    app.get('/', (req, res, next) => {
        res.send('<p>Middleware!</p>');
    });


    // эмиссия токенов кредитору
    app.get('/emit', (req, res) => {
        let emitent = req.query.emitentId;
        let creditor = req.query.creditorId;
        let val = req.query.amount; //uint

        let txid = contract.emit(emitent, creditor, val);
        res.send({ txid: txid });
    });
    //function emit(string cb, string organisation, uint val) public

    // Оплата заказа, погашение токенов
    app.get('/buy-order', (req, res) => {
        let emitent = req.query.emitentId;
        let creditor = req.query.creditorId;
        let order = req.query.orderId;
        let val = req.query.amount;

        let txid = contract.buyOrder(emitent, creditor, order, val);

        res.send({ txid: txid });
    });
    //function buyOrder(string cb, string organisation, string order, uint val) public

    // Эмитировано для кредитора
    app.get('/get-organisation-balance', (req, res) => {
        let emitent = req.query.emitentId;
        let creditor = req.query.creditorId;

        contract.getCreditorBalance(emitent, creditor, (error, result) => {
            res.send({ result: result });
        });
    });
    //function getCreditorBalance(string cb, string organisation) public constant returns (uint)

    // всего эмитированно
    app.get('/get-total-balance', (req, res) => {
        let emitent = req.query.emitentId;

        contract.getTotalBalance(emitent, (error, result) => {
            console.log(result);
            res.send({ result: result });
        });
    });
    //function getTotalBalance(string cb) public constant returns (uint)

    // был ли оплачен заказ? если > 0, то оплачен
    app.get('/is-paid', (req, res) => {
        contract.isPaid(req.query.emitent, req.query.orderId, (error, result) => {
            if (result > 0) {
                console.log('Оплачено '+result);
                //res.send('Оплачено ' + result);
                //res.send({ result: result });
                res.send({result: 1});
            }
            else{
                console.log('Не оплачено ');
                //res.send('Не оплачено')
                //res.send({ result: result });
                res.send({result: -1});
            }
        });
    });
    //function isPaid(string cb, string order) public constant returns (uint)
    

    app.get('/check-txid', (req, res)=>{
        let txid = req.query.txid;

        web3.eth.getTransaction(txid, (error, result)=>{
            if (error){
                console.log(error);
            }else{
                console.log(result);
                res.send({result: result.blockNumber});
            }
        });

        

    });


}