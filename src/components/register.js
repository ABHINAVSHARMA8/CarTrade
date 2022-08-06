import React, { Component } from 'react';
import Header from "./Components/header";
import './register.css'


class Register extends Component {

    constructor(props) {
      super(props)
      this.state = {
        
      }
      
    }

    
  
    render() {
        return (
          
          <div>
            <Header/>

            <h1>Click the button below</h1>
            <button onClick={this.props.register_as_manufacturer()}>Register</button>
                    
  
  
          </div>
          
        );
      }
    }
    
export default Register;