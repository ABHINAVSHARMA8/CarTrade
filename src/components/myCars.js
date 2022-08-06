import React, { Component } from 'react';
import Header from "./Components/header";
import './myCars.css'

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
        <form  onSubmit={this.props.postCar(res.id,this.state.price)}>
        <label>
          Price:
          <input type="text" value={this.state.price} onChange={this.handlePrice} />
        </label>
        <input type="submit" value="Submit" />
      </form>
                  
      </div>
    );
  });
};

class MyCars extends Component {

  constructor(props){

    super(props)

    this.state={

      carList:null,
      price:null
    }

    this.handlePrice = this.handlePrice.bind(this);
    
  }
  handlePrice(event) {
    this.setState({price: event.target.value});

    
  }

  

  async componentDidMount(){

    const listings = await this.props.carTrade.methods.getMyCars().call()
    this.setState({carList:listings})
  }
    render() {
      return (
        
        <div>
        <Header/>
        <div>
          {this.state.carList == null
            ? <p>No  Cars</p>
            : getProductCards(this.state.carList, this)}
          </div>
      </div>
        
      );
    }
  }
  
  export default MyCars;
  