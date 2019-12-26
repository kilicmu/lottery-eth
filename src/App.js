import React from 'react';
import { Card, Button } from 'antd';
import "./sass/app.scss"
import "./App.css"
// let { contract } = require('./js/contract-provider.js');
import { contract, web3 } from './js/contract-provider.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: '',
      round: 0,
      playersNum: '',
      hasEth: '',
      manager: '',
      accounts: [],
      isDisable: false,
      show: ''
    };
    this.betting = this.betting.bind(this);
    this.retired = this.retired.bind(this);
    this.lottery = this.lottery.bind(this);
  }

  async componentWillMount() {
    let winner = await contract.methods.getWinner().call();
    let manager = await contract.methods.manager().call();
    let hasEth = await contract.methods.getBalance().call();
    let round = await contract.methods.randNonce().call();
    let playersNum = new Set(await contract.methods.getPlayers().call()).size;
    let accounts = await web3.eth.getAccounts();
    let show = accounts[0] === manager ? "inline" : "none"
    this.setState({
      winner,
      manager,
      hasEth,
      round,
      playersNum,
      accounts,
      show
    });
  }

  async betting(e) {
    let accounts = await web3.eth.getAccounts();
    this.setState({ isDisable: true, accounts });

    try {
      await contract.methods.play().send({
        from: accounts[0],
        value: web3.utils.toWei('1', 'ether'),
      });
      this.setState({
        hasEth: await contract.methods.getBalance().call(),
        playersNum: new Set(await contract.methods.getPlayers().call()).size,
        isDisable: false
      })
    } catch (e) {
      console.log("交易失效");
      this.setState({ isDisable: false, accounts });
    }

  }

  async retired(e) {
    let accounts = await web3.eth.getAccounts();
    this.setState({ isDisable: true, accounts });

    try {
      await contract.methods.retired().send({
        from: accounts[0],
        gas: '300000'
      });
      this.setState({
        winner: await contract.methods.getWinner().call(),
        hasEth: await contract.methods.getBalance().call(),
        playersNum: new Set(await contract.methods.getPlayers().call()).size,
        round: await contract.methods.randNonce().call(),
        isDisable: false
      })
    } catch (e) {
      console.log("无法退奖请检查权限")
      this.setState({ isDisable: false, accounts });
    }

  }

  async lottery(e) {
    let accounts = await web3.eth.getAccounts();
    this.setState({ isDisable: true, accounts });

    try {
      await contract.methods.lottery().send({
        from: accounts[0],
        gas: '300000'
      });
      this.setState({
        hasEth: await contract.methods.getBalance().call(),
        playersNum: new Set(await contract.methods.getPlayers().call()).size,
        round: await contract.methods.randNonce().call(),
        isDisable: false
      })
    } catch (e) {
      console.log("开奖失败请检查权限")
      this.setState({ isDisable: false, accounts });
    }
  }

  render() {
    return (
      <Card
        hoverable
        style={{ width: 480 }}
        cover={<img alt="logo" src={window.location.origin + '/img/logo.png'} />}
        id="card"
      >
        <p>管理员地址：{this.state.manager}</p>
        <p>上一期中奖者: {this.state.winner}</p>
        <p>奖池: {web3.utils.fromWei(this.state.hasEth, "ether")} ETH</p>
        <p>第 {this.state.round} 场</p>
        <p>参与者人数：{this.state.playersNum}</p>

        <Button block type='primary' id="prim_btn" onClick={this.betting} disabled={this.state.isDisable}>投注</Button>
        <Button block type='dashed' style={{ display: this.state.show }} onClick={this.lottery} disabled={this.state.isDisable}>开奖</Button>
        <Button block type='link' style={{ display: this.state.show }} onClick={this.retired} disabled={this.state.isDisable}>退奖</Button>




      </Card>
    );
  }

}

export default App;
