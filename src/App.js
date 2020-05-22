import React, {Component} from 'react';
import bierGirl from './img/bierGirl.png'; // with import
import './App.css';

function Header() {
  return (
    <div className="bannerDiv">
      <img src={bierGirl} className="bannerPic"/>
      <div className="title">Bier Bitte!</div>
      <div className="tagline">"One drink's not going to kill you..."</div>
    </div>

  )
}

class Likes extends Component {
 
  render(){
    return (
      <div className="likesCounter">Liked: {this.props.value}</div>
    )
    }
}

class Nutrition extends Component {
  render() {
    return(
    <div className="nutritionLabel">
        <div style={{fontFamily: "franklinGothic", fontHeight: '40px'}}><h1>Nutrition Facts</h1></div>
    </div>
    )
  }
}

class Facts extends Component {
   render() {
     return (
      <div className="factsPanel">
        <h1>{this.props.currentBeer.name}</h1>
        <Nutrition beer={this.props.currentBeer} />
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
    this.setState ({
      liked : !this.state.liked
    })
    this.props.updateLikes(this.state.liked)
  }

  changeBeer = () => {
    this.props.changeBeer(this.props.beer);
  }
  
  render() {
  return (
    <div className="beerDiv" onClick={this.changeBeer}>
    <div><h1>{this.props.beer.name}</h1></div>
    <img src={this.props.beer.image_url} alt={this.props.beer.name} style={{width: '30px', float: 'left',paddingRight: '10px'}}/>
    {this.props.beer.description}
    <button className="likeButton" onClick={this.likedToggle}>{this.state.liked ? "Liked" : "like"}</button>
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
        currentBeer: {},
        page: 1,
        likes : 0
    }
  }

  changeBeer = (newBeer) => {
      this.setState({currentBeer: newBeer})
  }

  updatelikes = (liked) => {
    let currentLikes = this.state.likes;
    if (liked===true) { 
      currentLikes--;
      this.setState({likes: currentLikes}) 
      } else {
    currentLikes++;
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
 
render() {

    return (
      <div>
      <Header/>
      <div className="outputDiv">
     {this.state.beers.map((beerdata,idx) => (<Beer key={idx} beer={beerdata} changeBeer={this.changeBeer} updateLikes={this.updatelikes} />))}
     </div>
     <Likes value={this.state.likes} />
     <Facts currentBeer={this.state.currentBeer}/>
     </div>
    );
  }
}

export default App;
