import React, { Component } from 'react';
import '../css/App.css';
import data from '../logos.json';

class App extends Component {

    state = {
        data: data.customers // array of customer objects
    };

    render() {

        let customers = this.state.data.map( (customer) => {
            return (
                <tr key={customer.name}>
                    <td>
                        <img src={customer.image} alt={customer.name} className="img-responsive" />
                    </td>
                </tr>
            )
        });

        return (
          <div className="App">
              <table>
                  <tbody>

                    {customers}

                  </tbody>
              </table>
          </div>
        );
    }
}

export default App;
