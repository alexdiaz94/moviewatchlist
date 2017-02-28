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
              <img src="http://www.joblo.com/posters/images/full/rogue_one_a_star_wars_story_ver5_xxlg.jpg" height="400" width="50%"/>
                </div>
                <div className="second">
                <img src="http://www.joblo.com/posters/images/full/john-wick-fposter-gallery.jpg" height="400" width="50%"/>
               </div>
              <div className="third">
             <img src="http://www.joblo.com/posters/images/full/the-last-jedi.jpg" height="400" width="50%"/>
            </div>
          </React_Boostrap_Carousel>
        </div>
      )
    }
};


export default Home;
