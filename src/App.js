import React, {Component} from 'react';
import bierGirl from './img/bierGirl.png'; // with import
import bierEmpty from './img/beerEmpty.png';
import bierFull from './img/beerFull.png';
import drunk1 from './img/drunk1.png';
import drunk2 from './img/drunk2.png';
import drunk3 from './img/drunk3.png';
import closeButton from './img/redX.png';

import './App.css';

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

class LikedCollection extends Component {

  state = { showing: true };

  hidePanel = () => {
    this.setState({
      showing:false
    })
  }

  render() {
      const showing  = this.state.showing;
      console.log(showing);
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
        <img onClick={() => this.changeABV(1)} src={drunk1} alt="" style={{width:'30px',marginRight: '20px'}} />
        <img onClick={() => this.changeABV(2)} src={drunk2} alt="" style={{width:'30px',marginRight: '20px'}} />
        <img onClick={() => this.changeABV(3)} src={drunk3} alt="" style={{width:'30px',marginRight: '20px'}} />
      </div>
    )
  }
}

class LikesCounter extends Component {
 
  render(){
    return (
      <div className="likesCounter"><img src={bierFull} alt="" style={{width:'30px'}} onClick={this.props.togglePopup}/>  {this.props.value}</div>
    )
    }
}

class Nutrition extends Component {
  render() {
    return(
    <div className="nutritionLabel">
        <div style={{fontFamily: "franklinGothic", fontHeight: '40px',textAlign: 'center'}}><h1>Alcohol Facts</h1></div>
        <div>
        <ul>
          <li>ABV: {this.props.beer.abv}%</li>
          <li>IBU: {this.props.beer.ibu}</li>
          <li>EBC: {this.props.beer.ebc}</li>
          <li>SRM: {this.props.beer.srm}</li>
          <li>pH: {this.props.beer.ph}</li>
        </ul>
        </div>
        <div>
          <ul>
            <li>Original Gravity: {this.props.beer.target_og}g</li>
            <li>Final Gravity: {this.props.beer.target_fg}g</li>
            <li>Attenuation: {this.props.beer.attenuation_level}</li>
            <li>Volume: {this.props.beer.volume.value} {this.props.beer.volume.unit}</li>
            <li>Boil Vol.: {this.props.beer.boil_volume.value} {this.props.beer.boil_volume.unit}</li>
          </ul>
        </div>
    </div>
    )
  }
}

class Facts extends Component {

   render() {
    if (!this.props.currentBeer.food_pairing) return (
      <div className="factsPanel">
      <img src={bierGirl} alt= "" className="bannerPicIntro"/>
      <div className="intro">Bier Bitte!</div>
      <div className="tagline">"One drink's not going to kill you..."</div>
      </div>
    );    
       return ( 
      
      <div className="factsPanel">
        <h1>{this.props.currentBeer.name}</h1>
        <br/>First Brewed: {this.props.currentBeer.first_brewed}
        <p className="drop-cap" style={{fontSize:'10pt'}}>{this.props.currentBeer.description}</p>
        <Nutrition beer={this.props.currentBeer} />
        <Ingredients beer={this.props.currentBeer} />
        <BrewingMethod beer={this.props.currentBeer} />
        <FoodPairing beer={this.props.currentBeer}/>
        <BrewersTip beer={this.props.currentBeer}/>
      </div>
     )
   }
}

class BrewersTip extends Component {
  render() {
    return (
      <div>
         <p><u>Brewer's Tips:</u></p>
      {this.props.beer.brewers_tips}
      <p>Contributed By: <b>{this.props.beer.contributed_by}</b></p>
      </div>
    )
  }
}

class Ingredients extends Component {

  render() {
    return(
      <div style={{marginBottom:'20px'}}>
      <p><u>Ingredients</u></p>
      Malt:
      <ul>
      {this.props.beer.ingredients.malt.map((maltIng,idx)=> {return <li><b>{maltIng.name}</b>:<span style={{fontSize:'10pt'}}> {maltIng.amount.value} {maltIng.amount.unit}</span> </li>})}
      </ul>
      Hops:
      <ul>
      {this.props.beer.ingredients.hops.map((hopsIng,idx)=> {return <li><b>{hopsIng.name}</b>:<span style={{fontSize:'10pt'}}>  {hopsIng.amount.value} {hopsIng.amount.unit} (add at: {hopsIng.add} attribute: {hopsIng.attribute})</span> </li>})}
      </ul>
      Yeast:
      <ul>
      <li><b>{this.props.beer.ingredients.yeast}</b></li>
      </ul>
      </div>
    )
  }
}

class BrewingMethod extends Component {

  render() {
    return (
      <div style={{marginBottom:'20px'}}>
      <p><u>Brewing Method</u></p>
        <div style={{marginLeft:'10px',marginBottom:'10px'}}>
        Mash:
        <ul>
          {this.props.beer.method.mash_temp.map((mash,idx) => {return <li key={idx}>{mash.temp.value}° {mash.temp.unit} for {mash.duration} minutes</li>})}
        </ul>
        Fermentation:
        <ul>
          <li>{this.props.beer.method.fermentation.temp.value}° {this.props.beer.method.fermentation.temp.unit}</li>
        </ul>
        Twist:
        <ul>
          <li>{this.props.beer.method.twist}</li>
        </ul>   
        </div>
      </div>
    )
  }

}

class FoodPairing extends Component {

  render() {    
    if (this.props.beer.food_pairing) return(

    <div>
        <p><u>Food Pairing</u></p>
        <ul style={{marginLeft:'10px',marginBottom:'10px'}}>
        {this.props.beer.food_pairing.map((foodPairing,idx) => {return <li style={{marginBottom:'5px'}} key={idx}>{foodPairing}</li>})}
        </ul>
    </div>
    )
    
}
}

class Beer extends Component {
  constructor(props) {
    super (props);

    this.state ={
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
    this.props.changeBeer(this.props.beer);
  }
  
  render() {
    let abvTarget = this.props.abvLevel;
    let bierABV = this.props.beer.abv;
    let AbvStyle= {
      backgroundColor: "#ffffff"
      }
      if(abvTarget===1&& bierABV <2)
      AbvStyle = {
        backgroundColor: "#7abff5"
        }

      if(abvTarget===2 && bierABV > 2 && bierABV < 8) {
        AbvStyle = {
        backgroundColor: "#faee37"
        }
      }
      if(abvTarget===3 && bierABV > 8){
        AbvStyle = {
          backgroundColor: "#ff0303"
        }
      }
      let showAll = this.props.likeAll;
      if (showAll===undefined) {showAll=this.state.liked}
  return (
     <div className="beerDiv" style={AbvStyle} onClick={this.changeBeer}>
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

class App extends Component {
  // All Classes must have a "constructor", in React we always pass "props"
  constructor(props) {
    // Remember that if we "extend" a "class" of a "class" we have to call the "super()" method. Just pass it "props" as well.
    super(props);
    // class-based Components allow us to have "state"! And this is why/when we use class-based components.
    this.state = {
        beers: [],
        likedBeers: [],
        showPopup: false,
        abvLevel : 1,
        currentBeer: {},
        page: 1,
        likes : 0
    }
  }

  togglePopup = () => {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
    
  }  

  changeBeer = (newBeer) => {
      this.setState({currentBeer: newBeer})
  }

  changeABV = (newLevel) => {
    this.setState({abvLevel:newLevel})
  }

  updatelikes = (liked, likedBeer) => {
    let currentLikes = this.state.likes;
    if (liked===true) { 
    currentLikes--;
    let beersLiked = this.state.likedBeers; // make a separate copy of the array
    let index = beersLiked.indexOf(likedBeer)
    if (index !== -1) {
      beersLiked.splice(index, 1);
      this.setState({likedBeers: beersLiked});
    }
    this.setState({likes: currentLikes}) 
    } else {
    currentLikes++;
    let beersLiked = this.state.likedBeers;
    beersLiked.push(likedBeer)
    this.setState({likedBeer:beersLiked});
    this.setState({likes: currentLikes});
  }
  console.log(this.state.likedBeers);
}


  componentDidMount = () => {
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchData(this.state.page);
  }

// this event-handler checks if the scrollbar is at the
// bottom of the page and if it is it fetches another
// set of records
infiniteScroll = () => {
  // End of the document reached?
  if (
    window.innerHeight + document.documentElement.scrollTop
    === document.documentElement.offsetHeight
  ) 
  {
    let newPage = this.state.page;
    newPage++;
    this.setState({
      page: newPage
    });
    
    this.fetchData(newPage);
  }
}

  fetchData = (pageNum) => {

    let beerUrl = 'https://api.punkapi.com/v2/beers?page='+pageNum;

    fetch(beerUrl)
    .then(res=>res.json())
    .then(data => {
      this.setState({
        beers: [...this.state.beers,...data]
      })
    })
  }
 
render() {

    return (
      <div>
      <Header likes={this.state.likes} abvLevel={this.state.abvLevel} changeABV={this.changeABV} togglePopup={this.togglePopup}/>
      <div className="outputDiv">
     {this.state.beers.map((beerdata,idx) => (<Beer key={idx} beer={beerdata} abvLevel={this.state.abvLevel} likedBeers={this.state.likedBeers} changeBeer={this.changeBeer} updateLikes={this.updatelikes} />))}
     
     </div>

     <Facts currentBeer={this.state.currentBeer}/>

     {this.state.showPopup  ? <LikedCollection likedBeersCollection={this.state.likedBeers} changeBeer={this.changeBeer} likedBeers={this.state.likedBeers} updateLikes={this.updatelikes}/> : null} 
     </div>
    );
  }
}

export default App;
