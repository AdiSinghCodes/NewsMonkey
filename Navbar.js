import React, { Component } from 'react'    //remember to remove "components" also while making function based.
import { Link } from 'react-router-dom'
//Remember to make changes also like href , of and className and many more.
export class Navbar extends Component {                                                                  //Also remember to remove this class also while u are making function based components.
  render() {                                                   //For making all these codes into function based, just remove render() method and write "const Navbar = () => {" which will include all the codes inside the function and make it function based
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsMonkey</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/*yaha humne anchor tage i.e. <a> ke jagah <Link> tag ko use kiya since we are using react router*/}
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>  {/*Alwys remember to write {href = "\"} only*/}
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/business">Business</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/entertainment">Entertainment</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/general">General</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/health">Health</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/science">Science</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sports">Sports</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/technology">Technology</Link>
        </li>

        </ul>
     </div>
  </div>
</nav>
      </div>
    )
  }
}

export default Navbar
