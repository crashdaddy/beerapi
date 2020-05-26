import React, {Component} from 'react';
import Beer from './beer';
import drunk1 from '../img/drunk1.png';
import drunk2 from '../img/drunk2.png';
import drunk3 from '../img/drunk3.png';
import closeButton from '../img/redX.png';
import bierGirl from '../img/bierGirl.png';
import bierFull from '../img/beerFull.png';

// this is the header that runs across the top of the page
class Header extends Component {
    render(){
    return (
      <div className="bannerDiv">
        <img src={bierGirl} alt="" className="bannerPic"/>
        <div className="title">Bier Bitte!</div>
        <div className="tagline">"One drink's not going to kill you..."</div>
        <ABV abvLevel={this.props.abvLevel} changeABV={this.props.changeABV}/>
        <LikesCounter value={this.props.likes} togglePopup={this.props.togglePopup}/>
      </div>
    )
    }
  }
  
  // the popup window that shows all the beers the user has "liked"
  // when the user clicks the beer mug on the header
  class LikedCollection extends Component {
  
    state = { showing: true };
  
    hidePanel = () => {
      this.setState({
        showing:false
      })
      this.props.togglePopup()
    }
  
    render() {
        const showing  = this.state.showing;
        return (
            <div className="windowPane" style={{display : showing===true ? 'inline' : 'none' }}>
                      <div id="closeButton" style={{position: 'absolute',top:'5px',right:'5px'}}>
                      <img src={closeButton} alt="" style={{width:'30px'}} onClick={this.hidePanel} />
                      </div>
              <fieldset>
                <legend>My Favorite Biers!</legend>
                { showing 
                    ? this.props.likedBeersCollection.map((beerdata,idx) => (<Beer key={idx} beer={beerdata} abvLevel={this.state.abvLevel} likedBeers={this.state.likedBeers} likeAll = "true" changeBeer={this.props.changeBeer} updateLikes={this.props.updatelikes} />))
                    : null
                }
              </fieldset>
            </div>  
        )
    }
  }
  
  // this is the counter next to the beer mug on the header
  // it shows the number of beers the user has "liked"
  class LikesCounter extends Component {
   
    render(){
      return (
        <div className="likesCounter"><img src={bierFull} alt="" style={{width:'30px'}} onClick={this.props.togglePopup}/>  {this.props.value}</div>
      )
      }
  }
  
  // these are the smileys on the header that sort by Alcohol By Volume
  class ABV extends Component {
    constructor(props) {
      super (props);
  
      this.state ={
        abvLevel: 1
      }
    }
  
    changeABV = (level) => {
      this.setState ({
        abvLevel : level
      })
      this.props.changeABV(level);
    }
  
    render() {
      return (
        <div className="abvLevels" style={{display:'inline-block'}}>
          <img onClick={() => this.changeABV(1)} src={drunk1} alt="" title="Beers with ABV < 2%" class="smiley" style={{backgroundColor:'#7abff5'}} />
          <img onClick={() => this.changeABV(2)} src={drunk2} alt="" title="Beers with ABV > 2% and < 8%" class="smiley" style={{backgroundColor:'#faee37'}} />
          <img onClick={() => this.changeABV(3)} src={drunk3} alt="" title="Beers with ABV >= 8%" class="smiley" style={{backgroundColor:'#ff0303'}} />
        </div>
      )
    }
  }

  export {Header, LikedCollection, LikesCounter, ABV}