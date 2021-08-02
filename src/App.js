import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';


class App extends Component {

// constructor(props) {
//     super(props);
//     this.state = {
//       dishes: DISHES,
//       comments: DISHES.comments
//     };
//   }


  render() {
    return (
      <div>
        {/* <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar> */}
       <Main/>

      </div>
    );
  }
}


export default App;
