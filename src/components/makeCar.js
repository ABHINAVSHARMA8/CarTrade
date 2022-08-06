import React, { Component } from 'react';
import Header from "./Components/header";
import './makeCar.css'

class MakeCar extends Component {

    constructor(props) {
      super(props)
      this.state = {
  
        mileage:null,engine:null,fuel:null
        
      };
    }

    handlemileage(event) {
        this.setState({mileage: event.target.value});
    }

    handleengine(event) {
        this.setState({engine: event.target.value});
    }

    handleefuel(event) {
        this.setState({fuel: event.target.value});
    }

    handleSubmit(event){

        this.props.makeCar(this.state.mileage,this.state.engine,this.state.fuel,
        this.state.mileage+this.state.engine+this.state.fuel)
    }

    render() {
        return (
          
          <div>
            <Header/>
            <div>
            <form  onSubmit={this.handleSubmit()}>
                <label>
                Mileage:
                <input type="text" value={this.state.mileage} onChange={this.handlemileage} />
                </label>
                <label>
                Engine:
                <input type="text" value={this.state.engine} onChange={this.handleengine} />
                </label>
                <label>
                Fuel:
                <input type="text" value={this.state.fuel} onChange={this.handlefuel} />
                </label>
                <input type="submit" value="Submit" />
             </form>
            </div>
           
  
  
          </div>
          
        );
      }
    }
    
export default MakeCar;

