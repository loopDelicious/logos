import React, { Component } from 'react';
import '../css/App.css';
// import data from '../logos.json';
import Grid from 'react-css-grid'

class App extends Component {

    state = {
        customers: []
    };

    componentDidMount() {
        fetch('https://8bf5a572-4c03-4396-9b29-2aea34ff338f.mock.pstmn.io/logos')
            .then((results) =>  {
            return results.json();
            }).then((data) => {
            this.setState({
                customers: data.customers
            })
        })

    };

    render() {

        let customers = this.state.customers.map( (customer) => {
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
