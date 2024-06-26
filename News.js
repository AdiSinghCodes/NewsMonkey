//Lawys remember ye project hum class based kar raha hai, isiliye use of "this" keyword is highly used.

import React, { Component } from 'react'   //remember to remove "components" also while making function based.
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";  //It is mandatory to import this infinite-scroll also if u want to work on this function
export class News extends Component {
  static defaultProps = {               //Remember to check about props and proptypes in the previous project
    country: 'in',                      //Props matlab values dena and files ke bich mai proper linking karna
    pagesize: 8,
    category: 'general',
};                              
      

    static propTypes = {
      country : PropTypes.string,  //Proptypes is used to determine the values according to their datatypes and many more
      pagesize: PropTypes.number,
      category : PropTypes.string
    }

   constructor(){
    super();           //whenever u want to work on constructor, remember to use "super" keyword, it is mandatory.
    console.log("Hello, here is constructor from News Component");
    this.state = {     //Here I made a state of objects
      articles : [],    //state hum tab use karte hai jab hume baar-baar changes karne hote hai and here we are accessing the article through our state
      loading : false,
      page:1,
      totalResults: 0,
    };
  }

   //Here since we are using fetcg api, the api will return some data or give promise, hence we will make it a async-await function

     componentDidMount = async() => { //componentDidMount() is a lifecycle method in React that gets called after a component is mounted, or inserted into the DOM. Matlab ye wala method only and only after render() ke baad exexcute hoga
     console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d07dd927e940405abcd523835d025fd1&page=${this.state.page}&pagesize=${this.props.pagesize}`;
     let data = await fetch(url);                         //This is real API = https://newsapi.org/v2/top-headlines?country=$(this.props.country}in&category=$(this.props.category}&apiKeyd07dd927e940405abcd523835d025fd1
     let parseddata = await data.json();                 //Here we will modify the API a bit beacause the user is moving to different page also
     console.log(parseddata);                          //Fetch API is a built-in JavaScript interface for making web requests in the browser, it is not specific to React, but it's commonly used in React applications to fetch data from a server or API. It allows you to make HTTP requests to a server and retrieve data in a simple and flexible way.
     this.setState({                                    //Since the "API" which we used in "SampleoUtput" and "NewsItem" file does not gives us the current news. We will use those API that gives current news or data and this is possible through fetch Api.
      articles: parseddata.articles,                      //The await keyword makes the function wait until the data is fetched. The fetched data is then assigned to the data variable.
      totalResults: parseddata.totalResults,
     });
    }                                                  
                    
   
    //the JSON data is the news headlines fetched from the NewsAPI, which provides access to a wide range of news articles and sources from around the world.
    //When the fetch method call is made with the url variable, a request is sent to the NewsAPI to retrieve the latest headlines from India (country=$(this.props.country}in). The API responds with a JSON (JavaScript Object Notation) object that contains information about the news headlines, such as the title, description, source, and URL of the article.
    //let parseddata = await data.json();: This line uses the json() method to parse the JSON data received from the API and assigns it to the parseddata variable. The await keyword is used again to wait until the data is parsed before moving to the next line.

    //Chahe next ya previous ya kaun sa bhi page ho, data to fetch karna hi padega and hence we ae copying the code dowm
   handlePrevClick = async() => {
      console.log("You went to previous page");
           //Explanation upar properly likha hai
           let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d07dd927e940405abcd523835d025fd1&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
           let data = await fetch(url);
           let parseddata = await data.json();
           console.log(parseddata);
           this.setState({          //Once the user clicks previous' button, the 'state' of the page will be changed from next to previous page.
             page: this.state.page - 1, //Since the state of the page or the website is changing we will use this keyword
             articles: parseddata.articles,
             totalResults : parseddata.totalResults
           });
    }           
       
       
    handlenextclick = async() => {
      console.log("You went to next page");
      //Explanation upar properly likha hai
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d07dd927e940405abcd523835d025fd1&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
      let data = await fetch(url);
      let parseddata = await data.json();
      console.log(parseddata);
      this.setState({              //Once the user clicks 'next' button, the 'state' of the page will be changed from previous to next page.
        page: this.state.page + 1, //Since the state of the page or the website is changing
        articles: parseddata.articles,
        totalResults : parseddata.totalResults
      });
  }


 fetchMoreData=async()=>{      //Here all the codes are similar to "handlenextclick" . If you are fetching data from an API and need to append the new data to the existing state, you can use concat as shown fetchMoreData function: this.state.articles.concat(parseddata.articles) merges the existing articles array with the newly fetched parseddata.articles array.
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d07dd927e940405abcd523835d025fd1&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;  // This approach ensures the state is updated immutably, which is a best practice in React.
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      page: this.state.page + 1, 
    });
  };
   
  //Agar tujhe 'next' and 'previous' button use karna hai, to 'fetchMoreData' ko delete karo aur uske saare realted functions ko bhi.

  render() 
  {
    return (
      <div className="container my-3">                                  {/*hasMore is a common property used in infinite scrolling or lazy loading implementations in web applications, particularly in React.It is typically used to indicate whether there are more items to load or fetch when the user scrolls down the page.*/}
        <h1 className="text-center"  style={{margin: '35px 0px', marginTop:'90px'}}>NewsMonkey-Top headlines</h1>     {/*Infinite scroll isiliye use kar rahe hai taki user bindass sirf scroll karte hue dekhte jaye instead of that next-previous nnutton but knowledge ke liye next-previous ko daal raha hu*/}
        <br></br>
        <InfiniteScroll                                                     
          dataLength={this.state.articles ? this.state.articles.length : 0}
          next={this.fetchMoreData}                                            
          hasMore={this.state.articles.length !== this.state.totalResults}          
        loader={<Spinner/>}
       >
        <div className="row">           {/*making all the newitems align in a row properly*/}
        {this.state.articles && this.state.articles.map((element) => {                {/*(this.state.articles) is used to access all the news data.In React, a map function is used to render a list of components or elements based on an array of data.Saare details of the news, 'element' ke form mai honge*/}
        return( 
        <div className="col-md-4" key={element.url}>              {/*a "key" is a special string attribute you can add to lists of elements to control the identity of each component instance. Keys help React identify which items have changed, are added, or are removed. Here "element" is used as an identity*/}
        <NewsItem
      title={element.title ? element.title.slice(0, 88) : ""}
      description={element.description ? element.description.slice(0, 88) : ""}
      myUrl={element.urlToImage}
      author={element.author}
      date={element.publishedAt}
     newsUrl={element.url}/>        {/*News data, news image and many more thing, sab humne url ke through access kar diya hai and remember that naming should be proper and same as in the 'API' file also*/}
     </div>  
        );
      })}                       {/*"slice" function isiliye use kiya saare box mai same characters and words ho i.e.(88) and same line mai ho*/}
    </div>                   {/*In many of the news in the api,it has its title, image and description as "null", so to handle this we will use ternary operator*/}                       
     </InfiniteScroll>                {/*These two buttons are created to move to next page and previous for more news*/}
        <div className="container d-flex justify-content-between">
                    <button
                        type="button"
                        onClick={this.handlePrevClick}
                        className="btn btn-dark"
                        disabled={this.state.page <= 1}
                    >
                        &laquo; Previous
                    </button>
                    <button
                        type="button"
                        onClick={this.handlenextclick}
                        className="btn btn-dark"
                        disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)}
                    >
                        Next &raquo;
                    </button>
                </div>
            </div>
    );
  }
}

export default News;