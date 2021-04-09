require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    mainnet:{
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          'https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}'
        )
      },
      gas: 5000000,
      gasPrice: 2500000000,
      confirmations: 2,
      network_id: '1'
    },
    goerli: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC, 
          'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY
        )
      },
      gas: 4465030,
      gasPrice: 10000000000,
      network_id: 5,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/build/',
  compilers: {
    solc: {
      version: "0.8.3",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}