import React, { Component } from 'react';
import Header from "./Components/header";
import './trade.css'

const getProductCards = (arrayOfProducts, self) => {
  // console.log(arrayOfProducts);
  return arrayOfProducts.map((res, i) => {
    return (
      <div id={i} className="Card">
        <p> ID: {res.id}</p>
        <p>On Sale: {res.onSale}</p>
        <p>Mileage: {res.mileage}</p>
        <p>Engine: {res.engine}</p>
        <p>Fuel: {res.fuel}</p>
        <p>Price :  {res.price}</p>
        <button onClick={this.props.buy(res.id,res.price)}>Buy</button>
      </div>
    );
  });
};

class Trade extends Component {

  constructor(props) {
    super(props)
    this.state = {

      carList:null
      
    };
  }

  async componentDidMount(){

    const listings = await this.props.carTrade.methods.getListedCars().call()
    this.setState({carList:listings})
  }



  

    render() {
      return (
        
        <div>
          <Header/>
          <div>
          {this.state.carList == null
            ? <p>No Listed Cars</p>
            : getProductCards(this.state.carList, this)}
          </div>
         


        </div>
        
      );
    }
  }
  
  export default Trade;
  