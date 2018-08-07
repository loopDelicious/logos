import React, { Component } from 'react';
import '../css/App.css';
// import data from '../logos.json';
import logos from '../team_logos.json';
import Grid from 'react-css-grid';
// import csv from 'csvtojson';

class App extends Component {

    state = {
        customers: [],
        logos: []
    };

    // componentDidMount() {
    //     fetch('https://8bf5a572-4c03-4396-9b29-2aea34ff338f.mock.pstmn.io/logos')
    //         .then((results) =>  {
    //         return results.json();
    //         }).then((data) => {
    //         this.setState({
    //             customers: data.customers
    //         })
    //     })
    //
    // };

    render() {

        // // if using mock response data
        // let customers = this.state.customers.map( (customer) => {
        //     return (
        //         <div key={customer.name}>
        //             <img src={customer.image} alt={customer.name} className="img-responsive" />
        //         </div>
        //     )
        // });

        // if using local json file
        let customers = logos.map( (logo) => {

            let thumbnailStyle = {
                backgroundImage: `url(${logo.FIELD3})`
            };

            return (
                <div key={logo.FIELD1}>
                    {/*<div className="thumbnail" style={ thumbnailStyle }></div>*/}
                    <img src={logo.FIELD3} alt={logo.FIELD2} className="img-responsive imageStyle" />
                </div>
            )
        });

        return (
          <div className="App">
              <div className="box">
                  <Grid
                      width={320}
                      gap={24}>

                        {customers}

                  </Grid>
              </div>
          </div>
        );
    }
}

export default App;
