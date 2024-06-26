import React, { Component } from 'react'    //While u are making function-based, remember to remove "components" also

export class NewsItem extends Component {    //Also remember to remove this class also while u are making function based components.

                                              //Since we are using "this" keyword here, write the function by using only props.
  render() {                                     //For making all these codes into function based, just remove render() method and write "const NewsItem = (props) => {" which will include all the codes inside the function and make it function based
    let {title, description,myUrl,newsUrl, author, date} = this.props;
    return (
      <div> 
        <div className="card" style={{width: "18rem"}}> {/*Make a object of style since we are doing react*/}
   {/*Here we will use ternary operator,if in the API, one of the news does not have its image or the image is "null", then there will be a common photo to it while if the news has image, then there will be its own image only*/}
  <img src={!myUrl?"https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_960_720.jpg":myUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"unknown": author} on {new Date(date).toGMTString()}</small></p>  {/*Yaha hum date ko acc to gmt state karenge and author par maine ternary operator lagaya hai for those jiska author "null hai", they will get "unknown" or the real author name acc to API*/}
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>                       {/*btn-sm apan isiliye use karte hai taki button ko chota kar sake*/}
</div>

</div>
      </div>
    )
  }
}

export default NewsItem