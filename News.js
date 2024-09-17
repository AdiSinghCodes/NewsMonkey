

import React, { Component } from 'react'   
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";  
export class News extends Component {
  static defaultProps = {              
    country: 'in',                     
    pagesize: 8,
    category: 'general',
};                              
      

    static propTypes = {
      country : PropTypes.string,  
      pagesize: PropTypes.number,
      category : PropTypes.string
    }

   constructor(){
    super();          
    console.log("Hello, here is constructor from News Component");
    this.state = {     
      articles : [],    
      loading : false,
      page:1,
      totalResults: 0,
    };
   }

     componentDidMount = async() => {
     console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={YOURAPIKEY}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
     let data = await fetch(url);                         
     let parseddata = await data.json();
     console.log(parseddata);                          
     this.setState({                                    
      articles: parseddata.articles,                     
      totalResults: parseddata.totalResults,
     });
    }                                                  
                    
handlePrevClick = async() => {
      console.log("You went to previous page");
           
           let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={YOURAPIKEY}&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
           let data = await fetch(url);
           let parseddata = await data.json();
           console.log(parseddata);
           this.setState({         
             page: this.state.page - 1, 
             articles: parseddata.articles,
             totalResults : parseddata.totalResults
           });
    }           
       
       
    handlenextclick = async() => {
      console.log("You went to next page");
      //Explanation upar properly likha hai
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={YOURAPIKEY}&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
      let data = await fetch(url);
      let parseddata = await data.json();
      console.log(parseddata);
      this.setState({              
        page: this.state.page + 1, 
        articles: parseddata.articles,
        totalResults : parseddata.totalResults
      });
  }


 fetchMoreData=async()=>{      
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={YOURAPIKEY}&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;  
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      page: this.state.page + 1, 
    });
  };
   
  
  render() 
  {
    return (
        <h1 className="text-center"  style={{margin: '35px 0px', marginTop:'90px'}}>NewsMonkey-Top headlines</h1>     
        <br></br>
        <InfiniteScroll                                                     
          dataLength={this.state.articles ? this.state.articles.length : 0}
          next={this.fetchMoreData}                                            
          hasMore={this.state.articles.length !== this.state.totalResults}          
        loader={<Spinner/>}
       >
        <div className="row">          
        {this.state.articles && this.state.articles.map((element) => {                
        return( 
        <div className="col-md-4" key={element.url}>              
        <NewsItem
      title={element.title ? element.title.slice(0, 88) : ""}
      description={element.description ? element.description.slice(0, 88) : ""}
      myUrl={element.urlToImage}
      author={element.author}
      date={element.publishedAt}
     newsUrl={element.url}/>        
     </div>  
        );
      })}                       
    </div>                                       
     </InfiniteScroll>                
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
