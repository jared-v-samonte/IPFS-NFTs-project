import React, { Component } from 'react';
import {Button, View} from 'react-native'; 



class HomePage extends Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <h1>IPFS NFTs</h1>

      <Button
      title="Change to Videos"
      onPress={() => this.props.navigation.navigate('Video')}
      />
      <h3></h3>

      <Button
      title="Change to Images"
      onPress={() => this.props.navigation.navigate('Image')}
      />
      <h3></h3>


      <Button
      title="Change to MP3"
      onPress={() => this.props.navigation.navigate('MP3')}
      />
      <h1></h1>

      <div >Currently functioning in the Goerli test network. </div>
      <h3></h3>

      <div class="container">
      <p>This is a demonstration of Jared V. Samonte's capabilites in developing in Ethereum, IPFS, Web3.js, the Truffle framework, OpenZeppelin ERC721 library, the Ganache personal blockchain, and Goerli test network. Please email the following address to contact: jared.v.samonte@gmail.com</p>
      </div>
      <a href="https://www.linkedin.com/in/jared-samonte-9b9192157/">LinkedIn Account</a>
      <a href="https://github.com/jared-v-samonte/IPFS-NFTs-project">GitHup Repository</a>


      </View>
      
    )
  }
}
export default HomePage;