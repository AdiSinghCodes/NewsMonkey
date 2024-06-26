//Phicle project mai humne function based or component-based react pada aur yaha hum class-based padenge
//Here we will completely make this project class-based components {All OOPS concept will be required here}.
import logo from './logo.svg';
import './App.css';

import Navbar from './Components/Navbar';

import React, { Component } from 'react'     //remember to remove "components" also while making function based.

import NewsItem from './Components/NewsItem';
import News from './Components/News';


//Here we are setting up our react router such that the user clicks the link on the navbar and gets the news accordingly.
//before using react-router, its initial step is to install by the command on the terminal "npm install react-router-dom@latest"
import {
  BrowserRouter as Router,
  Routes,  //Phale switches used hota tha, abhi routes hota hai
  Route,
  Link
} from "react-router-dom";
//here we make use of class-based components{Use of 'this keyword will be many}
export default class App extends Component {
  //Koi bhi hamara api key le kar use kar sakta hai, so its necessary to hide your api key and use it limited.
  apikey = process.env.REACT_APP_NEWS_API   //Humne env.local karke bhi ek file banaya hai, jisme apna api key daala hai

  render() {  // It is a required method for every React component class, and it is automatically called by React when the component needs to be rendered or re-rendered.
    return (
      <div>
       <Router>                   {/*Mandotaory to write inside <Router>*/}
       
       <Navbar/>                   {/*Yaha se page ka size send kiya hai. yaha har page par '5' news honge*/}
        <br></br>
       <Routes>                       {/*From here,we will pass on which field related data or news we need and other files will make use of "this" keyword and "props" to deal with it */}
       <Route exact path="/" element={<News pagesize={5}  key="general" country="in" category="general" />} />
            <Route exact path="/business"  element={<News pagesize={5} key="business" country="in" category="business" />} />
            <Route exact path="/entertainment"  element={<News pagesize={5} key="entertainment" country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News pagesize={5} key="health" country="in" category="health" />} />
            <Route exact path="/science" element={<News pagesize={5} key="science" country="in" category="science" />} />
            <Route exact path="/sports"  element={<News pagesize={5} key="sports" country="in" category="sports" />} />
            <Route exact path="/technology" element={<News pagesize={5} key="technology" country="in" category="technology" />} />
           </Routes>
       </Router>
      </div>
    );
  }
}

