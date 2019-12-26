pragma solidity ^0.6.0;
contract Lottery {
    address payable[] public players;
    address payable public manager;
    address payable winner;
    uint public randNonce = 0;

    constructor () public{
        manager = msg.sender;
    }

    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
    
    function play() payable public {
        require(msg.value == 1 ether);
        players.push(msg.sender);
    }
    
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function getPlayers() public view returns(address payable[] memory){
        return players;
    }

    function lottery() public onlyManager{
        bytes memory v1 = abi.encodePacked(block.timestamp, block.difficulty, players.length);
        uint random = uint(keccak256(v1));
        winner = players[random % players.length];
        uint winnerMoney = address(this).balance * 99 / 100;
        uint managerMoney = address(this).balance - winnerMoney;
        winner.transfer(winnerMoney);
        manager.transfer(managerMoney);
        randNonce++;
        delete players;
    }

    function retired() public onlyManager{
        for (uint index = 0; index < players.length; index++) {
            players[index].transfer(1 ether);
        }
        delete players;
        randNonce++;
    }
    
    function getWinner() public view returns(address){
        return winner;
    }

    
}