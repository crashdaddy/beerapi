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
        <img onClick={() => this.changeABV(1)} src={drunk1} alt="" title="Beers with ABV < 2%" style={{width:'30px',marginRight: '20px',backgroundColor:'#7abff5'}} />
        <img onClick={() => this.changeABV(2)} src={drunk2} alt="" title="Beers with ABV > 2% and < 8%" style={{width:'30px',marginRight: '20px',backgroundColor:'#faee37'}} />
        <img onClick={() => this.changeABV(3)} src={drunk3} alt="" title="Beers with ABV >= 8%" style={{width:'30px',marginRight: '20px',backgroundColor:'#ff0303'}} />
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
      <p><span style={{fontSize:'10pt'}}>Data Provided by: <a href="https://www.punkapi.com/" target="blank">PunkAPI</a></span></p>
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
        <p><span style={{fontSize:'10pt'}}>Data Provided by: <a href="https://www.punkapi.com/" target="blank">PunkAPI</a></span></p>
      </div>
     )
   }
}

class BrewersTip extends Component {
  render() {
    return (
      <div style={{marginBottom:'20px'}}>
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
      {this.props.beer.ingredients.malt.map((maltIng,idx)=> {return <li key={maltIng.name+idx}><b>{maltIng.name}</b>:<span style={{fontSize:'10pt'}}> {maltIng.amount.value} {maltIng.amount.unit}</span> </li>})}
      </ul>
      Hops:
      <ul>
      {this.props.beer.ingredients.hops.map((hopsIng,idx)=> {return <li key={hopsIng.name+idx}><b>{hopsIng.name}</b>:<span style={{fontSize:'10pt'}}>  {hopsIng.amount.value} {hopsIng.amount.unit} (add at: {hopsIng.add} attribute: {hopsIng.attribute})</span> </li>})}
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
          <li key={new Date().getTime()}>{this.props.beer.method.fermentation.temp.value}° {this.props.beer.method.fermentation.temp.unit}</li>
        </ul>
        Twist:
        <ul>
          <li  key={this.props.beer.id}>{this.props.beer.method.twist}</li>
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
      selected: this.props.beerID
    })
    
    this.props.changeBeer(this.props.beer, this.props.beerID);
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

class App extends Component {
  // All Classes must have a "constructor", in React we always pass "props"
  constructor(props) {
    // Remember that if we "extend" a "class" of a "class" we have to call the "super()" method. Just pass it "props" as well.
    super(props);
    // class-based Components allow us to have "state"! And this is why/when we use class-based components.
    this.state = {
        beers: [],
        likedBeers: [],
        selectedBeerId: '',
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

  changeBeer = (newBeer,selectedBeer) => {
      this.setState({currentBeer: newBeer});
      this.setState({selectedBeerId: selectedBeer})
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

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  
 
render() {

  const newArray = this.state.beers;
  
  if(this.state.abvLevel===3) {
    newArray.sort(this.compareValues('abv', 'desc'));
  }
  if(this.state.abvLevel===2) {
    newArray.sort(this.compareValues('abv', 'asc'));
  }
  if(this.state.abvLevel===1) {
    newArray.sort(this.compareValues("name",'asc'));
  }
  

    return (
      <div>
      <Header likes={this.state.likes} abvLevel={this.state.abvLevel} changeABV={this.changeABV} togglePopup={this.togglePopup}/>
      <div className="outputDiv">
     {newArray.map((beerdata,idx) => (<Beer key={idx} beerID={idx} beer={beerdata} selected={idx===this.state.selectedBeerId} abvLevel={this.state.abvLevel} likedBeers={this.state.likedBeers} changeBeer={this.changeBeer} updateLikes={this.updatelikes} />))}
     
     </div>

     <Facts currentBeer={this.state.currentBeer}/>

     {this.state.showPopup  ? <LikedCollection likedBeersCollection={this.state.likedBeers} changeBeer={this.changeBeer} likedBeers={this.state.likedBeers} togglePopup={this.togglePopup} updateLikes={this.updatelikes}/> : null} 
     </div>
    );
  }
}

export default App;
