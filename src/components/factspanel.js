import React, {Component} from 'react';
import bierGirl from '../img/bierGirl.png';


// this is the white "nutrition label" in the details panel
// that shows information for the selected beer
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
  
  //this is the facts panel that shows details about
  // the selected beer
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
  
  // these brewer's tips also go on the facts panel
  // for the selected beer
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
  
  // this is another component on the facts panel
  // for the selected beer
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
  
  // facts panel information
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
  
  // more facts panel stuff!
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

  export {Facts}