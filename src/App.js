import React, { Component } from 'react';
import Navigation from './components/navigation/navigation'
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/faceRecognition/faceRecognition.js';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
    particles: {
      number: {
        value: 70,
        density: {
          enable: true,
          value_area: 600
        }
      },
      size: {
        anim: {
          value: 4,
          random: true
        }
      }
    }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  loading: 'true',
  user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          entries: data.entries,
          joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }  

  displayFaceBox = (box) => {
    this.setState({box: box})
  } 

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onLoading = (val) => {
    this.callForLoader().then(() => this.setState({ loading: val }));
  }

  onRouteChange = (route) => {
    if(route === 'SignIn') { 
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  onPicSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://intense-garden-09792.herokuapp.com/imageurl',  {
              method: 'post',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                input: this.state.input
              })
    })
    .then(res => res.json())
    .then(response => {
      if(response) {
        fetch('http://intense-garden-09792.herokuapp.com/image',  {
            method: 'put',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.user.id
            })
            })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
      }
      this.displayFaceBox( this.calculateFaceLocation(response) )
    })
    .catch(err => console.log(err))
  }


  callForLoader = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000))
  }

  componentDidMount() {
    this.callForLoader().then(() => this.setState({ loading: 'false' }))
  }


  render() {
    const {imageUrl, route, box, loading} = this.state;
    if (loading === 'true') {
      return null;
    } 
    else {
      return (
        <div className="App">
          <Particles 
            className="particles"
            params={particlesOptions}
          />
          { route === 'home' 
          ? 
          <div>
              <Navigation onRouteChange={this.onRouteChange} onLoading={this.onLoading}/>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPicSubmit={this.onPicSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} /> 
            </div>
          : (
              route === 'SignIn' ?
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} onLoading={this.onLoading} /> 
              :
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} onLoading={this.onLoading} />
            )
            
          }
        </div>
      )
    }
  }
}

export default App;
