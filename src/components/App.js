import React, { Component } from 'react';
import '../css/App.css';
import data from '../logos.json';
import Grid from 'react-css-grid'

class App extends Component {

    state = {
        data: data.customers // array of customer objects
    };

    render() {

        let customers = this.state.data.map( (customer) => {
            return (
                <div key={customer.name}>
                    <img src={customer.image} alt={customer.name} className="img-responsive" />
                </div>
            )
        });

        return (
          <div className="App">
              <Grid
                  width={320}
                  gap={24}>
                    {customers}
              </Grid>
          </div>
        );
    }
}

export default App;
