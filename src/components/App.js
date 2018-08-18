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

    // getAllLogos = () => {

        // while (true) {
        //     let pageResults = this.getPage(page);
        //     console.log(pageResults);
        //     aggregateResults = aggregateResults.concat(pageResults.customers); 
        //     if (pageResults.meta.pagination.has_more) {
        //         page = pageResults.meta.pagination.page++;
        //         console.log(page);
        //     } else {
        //         break;
        //     }
        //     return aggregateResults;
        // }
    aggregateResults = [];
    getAllLogos = async () => {
        let pageIndex = 0;
        while (true) {
            let pageResults = await this.getPage(pageIndex);
            console.log(pageResults);
            console.log(pageResults.customers);
            this.aggregateResults = this.aggregateResults.concat(pageResults.customers); 
            if (pageResults.meta.pagination.has_more) {
                pageIndex++;
                console.log(pageIndex);
            } else {
                console.log('no more pages');
                break;
            }
        }
        return this.aggregateResults;
   
        // let pageResults = this.getpage(pageIndex);
        // if (pageResults.meta.pagination.has_more) {
        //     return aggregateResults.concat(this.getAllLogos(pageResults.meta.pagination.page++));
        // } else {
        //     return pageResults.customers;
        // }
    }  

    getPage = async (page) => {
        
        const stripe_source_id = "3ULj4Re5w1wg3k";
        let url = `https://api.baremetrics.com/v1/${stripe_source_id}/customers?sort=ltv&order=desc&per_page=200&page=${page}`;
        // console.log(url);
        let pageResults = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${secret.baremetrics}`,
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                },
                credentials: 'same-origin'
            }).then(function(response) {
                console.log(response);
                return response.json();
            }).then((data) => {
                console.log(data);
                return data;
            })
        return pageResults;
    }

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

        this.getAllLogos( (aggregateResults) => {
            console.log(aggregateResults);
            this.setState({
                customers: aggregateResults
            });
        });
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
            let domainsToExclude = ["gmail.com", "qq.com", "163.com"];

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
              <div className="box">
                  { this.state.customers ? <div className="inner-box">{customers}</div> : null }
              </div>
          </div>
        );
    }
}

export default App;
