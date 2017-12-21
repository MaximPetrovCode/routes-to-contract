pragma solidity ^0.4.16;
contract Pos {
    address creator;
    mapping (string => uint)  totalBalance;
    mapping (string => mapping (string => uint)) emissions;
    mapping (string => mapping (string => uint)) orders;
    function Pos() public
    {
        creator = msg.sender;
    }
    // эмиссия токенов кредитору
    function emit(string emitent, string creditor, uint val) public
    {
        require(creator == msg.sender);
        totalBalance[emitent] += val;
        emissions[emitent][creditor] += val;
    }
    // Оплата заказа, погашение токенов
    function buyOrder(string emitent, string creditor, string order, uint val) public
    {
        require(creator == msg.sender);
        require(emissions[emitent][creditor] >= val);
        emissions[emitent][creditor] -= val;
        totalBalance[emitent] -= val;
        orders[emitent][order] = val;
    }
    // Эмитировано для кредитора
    function getCreditorBalance(string emitent, string creditor) public constant returns (uint)
    {
        return emissions[emitent][creditor];
    }
    // всего эмитированно
    function getTotalBalance(string emitent) public constant returns (uint)
    {
        return totalBalance[emitent];
    }
    // был ли оплачен заказ? если > 0, то оплачен
    function isPaid(string emitent, string order) public constant returns (uint)
    {
        return orders[emitent][order];
    }
}