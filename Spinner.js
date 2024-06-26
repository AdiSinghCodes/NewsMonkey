import React, { Component } from 'react'    //remember to remove "components" also while making function based.
import loading from './loading.gif'
export class Spinner extends Component {       //Also remember to remove this class also while u are making function based components.
  render() {                                       //For making all these codes into function based, just remove render() method and write "const Spinner = () => {" which will include all the codes inside the function and make it function based
    return (
      <div className="text-center">
        <img src={loading} alt="loading"/>
      </div>
    )
  }
}

export default Spinner
