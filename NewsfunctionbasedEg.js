//Function based components
//Saare OOPs ke concept ya class-based cmponents ko nikal kar function based banaya hai.  "this" keyword ka use totally mana hai.
//News.js ka example hai
import React, {useEffect,useState} from 'react'     //In React, useEffect is a hook that lets you perform side effects in functional components. Side effects can include data fetching, subscriptions, or manually changing the DOM. By using useEffect, you can manage these effects cleanly within your component's lifecycle.
import NewsItem from './NewsItem'                 
//useState is a React hook that allows you to add state to functional components. Before hooks were introduced, only class components could have state. With useState, functional components can also manage state effectively.
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";  //It is mandatory to import this infinite-scroll also if u want to work on this function
const NewsfunctionbasedEg = (props) => {
    const[articles,setArticles] = useState([])
    const[loading,setLoading] = useState(true);
    const[page,setPage] = useState(1)
    const[totalResults,settotalResults] = useState(0)


   //Here since we are using fetcg api, the api will return some data or give promise, hence we will make it a async-await function

    useEffect(() => {
        this.handlenextclick();
    },[])


  const componentDidMount= async()=>{ //componentDidMount() is a lifecycle method in React that gets called after a component is mounted, or inserted into the DOM. Matlab ye wala method only and only after render() ke baad exexcute hoga
     console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d07dd927e940405abcd523835d025fd1&page=${page}&pagesize=${props.pagesize}`;
     let data = await fetch(url);                         //This is real API = https://newsapi.org/v2/top-headlines?country=$(props.country}in&category=$(props.category}&apiKeyd07dd927e940405abcd523835d025fd1
     let parseddata = await data.json();                 //Here we will modify the API a bit beacause the user is moving to different page also
     console.log(parseddata);                          //Fetch API is a built-in JavaScript interface for making web requests in the browser, it is not specific to React, but it's commonly used in React applications to fetch data from a server or API. It allows you to make HTTP requests to a server and retrieve data in a simple and flexible way.
     setArticles(parseddata.articles)
     settotalResults(parseddata.totalResults)
     setLoading(false)
    }                                                  
                    
   
    //the JSON data is the news headlines fetched from the NewsAPI, which provides access to a wide range of news articles and sources from around the world.
    //When the fetch method call is made with the url variable, a request is sent to the NewsAPI to retrieve the latest headlines from India (country=$(props.country}in). The API responds with a JSON (JavaScript Object Notation) object that contains information about the news headlines, such as the title, description, source, and URL of the article.
    //let parseddata = await data.json();: This line uses the json() method to parse the JSON data received from the API and assigns it to the parseddata variable. The await keyword is used again to wait until the data is parsed before moving to the next line.

    //Chahe next ya previous ya kaun sa bhi page ho, data to fetch karna hi padega and hence we ae copying the code dowm
    const handlePrevClick = async () => {
      console.log("You went to previous page");
           //Explanation upar properly likha hai
           let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d07dd927e940405abcd523835d025fd1&page=${page - 1}&pagesize=${props.pagesize}`;
           let data = await fetch(url);
           let parseddata = await data.json();
           console.log(parseddata);
           setArticles(parseddata.articles)
           settotalResults(parseddata.totalResults)
           setLoading(false)
           setPage(page-1)
    }           
       
       
   const handlenextclick = async () => {
      console.log("You went to next page");
      //Explanation upar properly likha hai
       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d07dd927e940405abcd523835d025fd1&page=${page + 1}&pagesize=${props.pagesize}`;
      let data = await fetch(url);
      let parseddata = await data.json();
      console.log(parseddata);
      setArticles(parseddata.articles)
      settotalResults(parseddata.totalResults)
      setLoading(false)
      setPage(page+1)
  }

 const fetchMoreData = async () => {      //Here all the codes are similar to "handlenextclick" . If you are fetching data from an API and need to append the new data to the existing state, you can use concat as shown fetchMoreData function: articles.concat(parseddata.articles) merges the existing articles array with the newly fetched parseddata.articles array.
   setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d07dd927e940405abcd523835d025fd1&page=${page + 1}&pagesize=${props.pagesize}`;  // This approach ensures the state is updated immutably, which is a best practice in React.
    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(articles.concat(parseddata.articles))
    settotalResults(parseddata.totalResults)
 };
   
  //Agar tujhe 'next' and 'previous' button use karna hai, to 'fetchMoreData' ko delete karo aur uske saare realted functions ko bhi.

 
    return (
      <div className="container my-3">                                  {/*hasMore is a common property used in infinite scrolling or lazy loading implementations in web applications, particularly in React.It is typically used to indicate whether there are more items to load or fetch when the user scrolls down the page.*/}
        <h1 className="text-center">NewsMonkey-Top headlines</h1>     {/*Infinite scroll isiliye use kar rahe hai taki user bindass sirf scroll karte hue dekhte jaye instead of that next-previous nnutton but knowledge ke liye next-previous ko daal raha hu*/}
        <br></br>
        <InfiniteScroll                                                     
          dataLength={articles.length}
          next={fetchMoreData}                                            
          hasMore={articles.length !== totalResults}          
        loader={<Spinner/>}
       >
        <div className="row">           {/*making all the newitems align in a row properly*/}
        {articles && articles.map((element) => {                {/*(articles) is used to access all the news data.In React, a map function is used to render a list of components or elements based on an array of data.Saare details of the news, 'element' ke form mai honge*/}
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
                        onClick={handlePrevClick}
                        className="btn btn-dark"
                        disabled={page <= 1}
                    >
                        &laquo; Previous
                    </button>
                    <button
                        type="button"
                        onClick={handlenextclick}
                        className="btn btn-dark"
                        disabled={page + 1 > Math.ceil(totalResults / props.pagesize)}
                    >
                        Next &raquo;
                    </button>
                </div>
            </div>
    );
  }


News.defaultProps = {               //Remember to check about props and proptypes in the previous project
    country: 'in',                      //Props matlab values dena and files ke bich mai proper linking karna
    pagesize: 8,
    category: 'general',
};                              
      

   News.propTypes = {
      country : PropTypes.string,  //Proptypes is used to determine the values according to their datatypes and many more
      pagesize: PropTypes.number,
      category : PropTypes.string
    }

export default News;