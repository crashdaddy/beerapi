import React, {Component} from 'react';
import Beer from './components/beer';
import {Header, LikedCollection} from './components/header';
import {Facts} from './components/factspanel';
import './App.css';


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
     {newArray.map((beerdata,idx) => (<Beer key={idx} beerID={idx} beer={beerdata} selected={beerdata.id===this.state.selectedBeerId} abvLevel={this.state.abvLevel} likedBeers={this.state.likedBeers} changeBeer={this.changeBeer} updateLikes={this.updatelikes} />))}
     
     </div>

     <Facts currentBeer={this.state.currentBeer}/>

     {this.state.showPopup  ? <LikedCollection likedBeersCollection={this.state.likedBeers} changeBeer={this.changeBeer} likedBeers={this.state.likedBeers} togglePopup={this.togglePopup} updateLikes={this.updatelikes}/> : null} 
     </div>
    );
  }
}

export default App;
