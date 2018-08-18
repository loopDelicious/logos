import React, { Component } from 'react';
import '../css/App.css';
// import Grid from 'react-css-grid';
import secret from '../secrets.js';

// local data sources
// import data from '../logos.json';
// import logos from '../team_logos.json';
// import csv from 'csvtojson';


class App extends Component {

    state = {
        customers: [],
        more: true
    };

    getAllLogos = async () => {
        let pageIndex = 0;
        while (true) {
            let pageResults = await this.getPage(pageIndex);
            if (pageResults && pageResults.meta.pagination.has_more) {
                pageIndex++;
            } else {
                break;
            }
        }
    }  

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    getPage = async (page) => {
        
        const stripe_source_id = "3ULj4Re5w1wg3k";
        let url = `https://api.baremetrics.com/v1/${stripe_source_id}/customers?sort=ltv&order=desc&per_page=200&page=${page}`;
        console.log(url);
        let pageResults = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${secret.baremetrics}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                },
                credentials: 'same-origin'
            })
            .then(this.handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    customers: data.customers ? this.state.customers.concat(data.customers) : this.state.customers
                })                
                return data;
            })
            .catch(error => console.log(error));
        return pageResults;
    }

    componentDidMount() {

        this.getAllLogos();

        // // load data from mock response
        // fetch('https://8bf5a572-4c03-4396-9b29-2aea34ff338f.mock.pstmn.io/logos')
        //     .then((results) =>  {
        //     return results.json();
        //     }).then((data) => {
        //     this.setState({
        //         customers: data.customers
        //     })
        // })
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

            let domain = customer.email.split("@")[1];
            let domainsToExclude = ["gmail.com", "googlemail.com", "qq.com", "163.com", "hotmail.com"];

            if (!domainsToExclude.includes(domain)) {

                let logoUrl = `https://logo.clearbit.com/${domain}`;
                // console.log(customer);
                let displayName = customer.display_name.includes("(") ? customer.name.split("(")[1].slice(0,-1) : customer.display_name;

                return (
                    <div key={customer.oid} className="wrapper">
                        <img src={ logoUrl } alt={ displayName } onError={(e) => {e.target.className = "hidden"}} className="img-responsive imageStyle" style={ thumbnailStyle }/>
                        <p className="imgDescription">{ displayName }</p>
                        {/*<img src={customer.display_image} alt={customer.display_name} className="img-responsive imageStyle" style={ thumbnailStyle } />*/}
                        {/*<img src={customer.display_image} alt={customer.display_name} className="img-responsive imageStyle"/>*/}
                    </div>
                )
            }

        });

        return (
          <div className="App">
              {/* <marquee behavior="scroll" className="box"> */}
              <div className="box">
                  { this.state.customers ? <div className="inner-box">{customers}</div> : null }
              </div>
              {/* </marquee> */}
          </div>
        );
    }
}

export default App;
