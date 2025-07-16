import loader from '../../../assets/loader.gif';
import { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div>
        <img src={loader} alt="Loading" />
      </div>
    );
  }
}

export default Loader;
