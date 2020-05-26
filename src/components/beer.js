import React, {Component} from 'react';
import bierEmpty from '../img/beerEmpty.png';
import bierFull from '../img/beerFull.png';

// these are the tiles that show all the beers
// when the user clicks one, its details
// are displayed in the facts panel
class Beer extends Component {
    constructor(props) {
      super (props);
  
      this.state ={
        selected : false,
        liked: false
      }
    }
  
    likedToggle = () => {
      if(this.props.likeAll===undefined){
      this.setState ({
        liked : !this.state.liked
      })
      this.props.updateLikes(this.state.liked,this.props.beer)
    }
    }
  
    changeBeer = () => {
      this.setState({
        selected: this.props.beer.id
      })
      
      this.props.changeBeer(this.props.beer, this.props.beer.id);
    }
    
    render() {
      let bierABV = this.props.beer.abv;
      let opacityText = '1';
      let borderText = "2px solid white";
      if (this.props.selected) {borderText='2px solid blue';opacityText='.7';}
      let AbvStyle= {}
        if(bierABV <2)
        AbvStyle = {
          backgroundColor: "#7abff5",
          opacity: opacityText,
          border: borderText
          }
  
        if(bierABV > 2 && bierABV < 8) {
          AbvStyle = {
          backgroundColor: "#faee37",
          opacity: opacityText,
          border: borderText
          }
        }
        if(bierABV >= 8){
          AbvStyle = {
            backgroundColor: "#ff0303",
            opacity: opacityText,
            border: borderText
          }
        }
        let showAll = this.props.likeAll;
        if (showAll===undefined) {showAll=this.state.liked}
    return (
       <div className="beerDiv"  style={AbvStyle} onClick={this.changeBeer}>
      <div><span style={{fontSize: '1vw'}}>{this.props.beer.name}</span></div>
      <img src={this.props.beer.image_url} alt="" style={{width: '30px', float: 'left',paddingRight: '10px',paddingBottom: '10px'}}/>
      <p style={{fontSize:'10pt'}}>{this.props.beer.tagline}</p>
      {showAll ? 
      <img src={bierFull} alt="" style={{width:'30px',position: 'absolute',bottom: '3px',right: '3px'}} onClick={this.likedToggle}/>
      :
      <img src={bierEmpty} alt="" style={{width:'30px',position: 'absolute',bottom: '3px',right: '3px'}} onClick={this.likedToggle}/>
    }
      </div>
    )
  }
  }
  
  export default Beer