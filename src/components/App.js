import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import CarTrade from '../abis/CarTrade.json'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './landing';
import MyCars from './myCars';
import Trade from './trade'
import Navbar from './Components/Navbar';


class App extends Component {

 async  componentDidMount(){
    document.title = "Car Trade"
    console.log("hELlo")
    await this.loadWeb3()
    await this.loadBlockchainData()

  }

  async loadBlockchainData(){

    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load CarTrade
    const networkId =  await web3.eth.net.getId()
    const carTradeData = CarTrade.networks[networkId]
    if(carTradeData) {
      const carTrade = new web3.eth.Contract(CarTrade.abi, carTradeData.address)
      this.setState({ carTrade })
      let carTradeBalance = await web3.eth.getBalance(this.state.account)
      this.setState({ Balance: carTradeBalance })
    } else {
      window.alert('CarTrade contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  //functions

  register_as_manufacturer = (etherAmount) => {
    this.setState({ loading: true })
    this.state.carTrade.methods.register_as_manufacturer().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  makeCar = (mileage,engine,fuel,etherAmount) => {
    this.setState({ loading: true })
    this.state.carTrade.methods.makeCar(mileage,engine,fuel).send({value:etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      })
    
  }

  postCar = (id,price) => {
    this.setState({ loading: true })
    this.state.carTrade.methods.postCar(id,price).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  buy = (id,etherAmount) => {
    this.setState({ loading: true })
    this.state.carTrade.methods.buy(id).send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      carTrade: {},
      
      
      carTradeBalance: '0',
      loading: true
    }
  }

  

  render() {

    
    return (
      <>
      <Router>
        <Routes>
          <Route path="/" element = {<Landing/>} / >
          <Route path="/myCars" element = {<MyCars/>} / >
          <Route path="/trade" element = {<Trade/>} / >
        </Routes>
      </Router>

      <div>
        <Navbar/>
      </div>

      </>


      
    );
  }
}

export default App;
