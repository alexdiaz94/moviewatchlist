import React from 'react';
import ReactDOM from 'react-dom';
import {React_Boostrap_Carousel} from 'react-boostrap-carousel';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return(
        <div style={{height:300,margin:20}}>
          <React_Boostrap_Carousel animation={true} className="carousel-fade">
            <div className="first">

            </div>
            <div className="second">

            </div>
            <div style={{height:400,width:"100%",backgroundColor:"lightpink"}}>

            </div>
          </React_Boostrap_Carousel>
        </div>
      )
    }
};


export default Home;
