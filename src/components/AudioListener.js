import React, { Component } from 'react';
import {Button, View} from 'react-native';
import Web3 from 'web3';
import NFT from '../build/IpfsNft.json'


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/api/v0'}) 



class AudioListener extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()
    const networkData = NFT.networks[networkId]
    if(networkData) 
    {
      const contract = new web3.eth.Contract(NFT.abi, "0x279a5c3F134E3B187BF7e51fE552e5A8117301E3")
      this.setState({contractAddress : networkData.address})
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })

    } 
    else 
    {
      window.alert('Smart contract not deployed to detected network.')
    }
  }


  uploadFile = (title) => {
    
    console.log("Submitting file to IPFS...")
    ipfs.add(this.state.file, { pin: true }).then(result => {
      console.log('hash ', result.path)
      this.state.contract.methods.mint(result.path, title).send({from: this.state.account})
      .once('receipt', (receipt) => {
          this.setState({
            ipfsHash: result.path,
            files: [...this.state.files, result.path]
          })
      })
    })
  
    
    /*
    this.setState(prevState => ({
      files: [...prevState.files, this.state.ipfsHash]
    }))

    this.setState({
      files: [...this.state.files, this.state.ipfsHash]
    })


  
    const fileHash = await bee.uploadData(this.state.file)

    this.state.contract.methods.mint(fileHash, title).send({from: this.state.account})
      .once('receipt', (receipt) => {
        this.setState({
          files: [...this.state.files, title],
          loading: false
        })
      })
    */
  }

  captureFile = event => 
  {
    console.log('capturing ', this.state.file)
    event.preventDefault()
    const temp = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(temp)



    reader.onloadend = () => {
      this.setState({ file: temp })
      console.log('file', temp)
    }
  }


  

  constructor(props) 
  {
    super(props)
    this.state = 
    {
      ipfsHash: '',
      file: null,
      account: '',
      contract: null,      
      totalSupply: 0,
      files: [],
      title: null,
      contractAddress: null
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }




  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <h1>MP3 NFT</h1>

      <Button
      title="Home Page"
      onPress={() => this.props.navigation.navigate('Home')}
      />

    <h3></h3>

    <form onSubmit={(event) => {
        event.preventDefault()
        const tempTitle = this.fileTitle.value
        this.uploadFile(tempTitle)
        this.setState({title: tempTitle})
      }}>
        &nbsp;
        <input 
          type='file' 
          accept=".mp3"
          //accept=".mp4" 
          onChange={this.captureFile}
        />
        <div className="form-group mr-sm-2">
        <h1> </h1>

        <input
          id="fileTitle"
          type="text"
          ref={(input) => {this.fileTitle = input}}
          className="form-control-sm"
          placeholder="Title..."
          required 
        />
        </div>
        <input
        type='submit'
        className='btn btn-block btn-primary'
        value='MINT'
        />
    </form>
      
      <div className="row text-center">
      { 
        this.state.files.map((file, key) => {
        return(
          <div key={key} className="col-md-6 pt-2 ">  
            <audio controls>
              <source src={`https://ipfs.io/ipfs/${file}`} type="audio/mpeg">
              </source>
            </audio>
            <div>IPFS hash: {file}</div>
          </div>
        )})
      }
      </div>
      </View>
    )
  }
}

export default AudioListener;

