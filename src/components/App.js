import React, {Component} from 'react';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import './App.css';
import ImageViewer from './ImageViewer.js'
import VideoViewer from './VideoViewer.js'
import AudioListener from './AudioListener.js'
import HomePage from './HomePage.js'



class App extends Component {
  render() 
  {
    return(
      <AppContainer />
    )
  }
}


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomePage
  },
  Image: {
    screen: ImageViewer
  },
  Video: {
    screen: VideoViewer
  },
  MP3: {
    screen: AudioListener
  }
});


const AppContainer = createAppContainer(AppNavigator);

export default App



