import React, { Component } from 'react';
import '../css/App.css';
import Grid from 'react-css-grid';
import secret from '../secrets.js';

// local data sources
// import data from '../logos.json';
// import logos from '../team_logos.json';
// import csv from 'csvtojson';


class App extends Component {

    state = {
        customers: []
    };

    componentDidMount() {

        // // load data from mock response
        // fetch('https://8bf5a572-4c03-4396-9b29-2aea34ff338f.mock.pstmn.io/logos')
        //     .then((results) =>  {
        //     return results.json();
        //     }).then((data) => {
        //     this.setState({
        //         customers: data.customers
        //     })
        // })

        const stripe_source_id = "3ULj4Re5w1wg3k";

        fetch(`https://api.baremetrics.com/v1/${stripe_source_id}/customers?per_page=200`, {
            headers: {
                "Authorization": `Bearer ${secret.baremetrics}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json',
            },
            credentials: 'same-origin'
        }).then(function(response) {
            return response.json();
        }).then( (json) => {
            this.setState({
                customers: json.customers
            });
        });

        // // for pagination
        // function getCustomers(progress,
        //     url = `https://api.baremetrics.com/v1/${stripe_source_id}/customers?per_page=200`,
        //     options = {
        //         headers: {
        //             "Authorization": `Bearer ${secret.baremetrics}`
        //         },
        //         credentials: 'same-origin'
        //     },
        //     customers = []) {
        //     return new Promise((resolve, reject) => fetch(url, options)
        //         .then(response => {
        //             if (response.status !== 200)  {
        //                 throw `${response.status}: ${response.statusText}`;
        //             }
        //             response.json().then(data => {
        //                 customers = customers.concat(data.customers);
        //
        //                 if(data.next) {
        //                     progress && progress(customers);
        //                     getCustomers(progress, data.next, customers).then(resolve).catch(reject)
        //                 } else {
        //                     resolve(customers);
        //                 }
        //             }).catch(reject);
        //         }).catch(reject));
        // }
        //
        // function progressCallback(customers) {
        //     // render progress
        //     console.log(`${customers.length} loaded`);
        // }
        //
        // getCustomers(progressCallback)
        //     .then(customers => {
        //         // all customers have been loaded
        //         console.log(customers.map(p => p.display_name))
        //     })
        //     .catch(console.error);
    };

    render() {

        // // if using mock response data
        // let customers = this.state.customers.map( (customer) => {
        //     return (
        //         <div key={customer.name}>
        //             <img src={customer.image} alt={customer.name} className="img-responsive" />
        //         </div>
        //     )
        // });

        // // if using local json file
        // let customers = logos.map( (logo) => {
        //
        //     let thumbnailStyle = {
        //         backgroundImage: `url(${logo.FIELD3})`
        //     };
        //
        //     return (
        //         <div key={logo.FIELD1} className="wrapper">
        //             {/*<div className="thumbnail" style={ thumbnailStyle }></div>*/}
        //             <img src={logo.FIELD3} alt={logo.FIELD2} className="img-responsive imageStyle" />
        //         </div>
        //     )
        // });

        let customers = this.state.customers.map( (customer) => {

            let thumbnailStyle = {
               backgroundImage: `url(${customer.display_name})`
            };

            let logoUrl = `https://logo.clearbit.com/${customer.email.split("@")[1]}`;

            return (
                <div key={customer.oid} className="wrapper">
                    <img src={ logoUrl } alt={customer.display_name} onError={(e)=>{e.target.src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Example_image.png"}} className="img-responsive imageStyle" style={ thumbnailStyle } />
                    {/*<img src={customer.display_image} alt={customer.display_name} className="img-responsive imageStyle" style={ thumbnailStyle } />*/}
                    {/*<img src={customer.display_image} alt={customer.display_name} className="img-responsive imageStyle"/>*/}
                </div>
            )

        });

        return (
          <div className="App">
              <div className="box">
                  { this.state.customers ? <div className="inner-box">{customers}</div> : null }
              </div>
          </div>
        );
    }
}

export default App;
