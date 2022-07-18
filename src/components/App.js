import React, { Component } from 'react';
import "./App.css";
import Web3 from 'web3'
import CarTrade from '../abis/CarTrade.json'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './landing';
import MyCars from './myCars';
import Trade from './trade'



class App extends Component {

 async  componentDidMount(){
    document.title = "Car Trade"
    console.log("hELlo")
    await this.loadWeb3(async ()=>{

      await this.loadBlockchainData()

    })
    

  }

  async loadBlockchainData(){

     const web3 = window.web3

    // const accounts = await web3.eth.getAccounts()
    // console.log(accounts[0])
    // this.setState({ account: accounts[0] })
    // console.log("account set")
   // console.log(this.state.account)
    console.log("load "+this.state.account)
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance:ethBalance })

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

      

      let accs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      

      this.setState({ account: accs[0]},()=>{
        console.log(this.state.account+" account")
      });
      

      
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

  listCars = () => {
    this.setState({ loading: true })
    this.state.carTrade.methods.getListedCars().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  myCars = () => {
    this.setState({ loading: true })
    this.state.carTrade.methods.getMyCars().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }




  constructor(props) {
    super(props)
    this.state = {
      account: "account",
      carTrade: {},
      
      ethBalance:null,
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

      

      </>


      
    );
  }
}

export default App;
