const path = require("path");
var HDWalletProvider = require('truffle-hdwallet-provider');
var privateKey = 'PRIVATE_KEY';  // Private key for deployment

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(privateKey, "https://rinkeby.infura.io/v3/7f598ceb06b14da7b98db0bbc47f1e40");
      },
      network_id: 4,
      gasPrice: 20000000000, // 20 GWEI
      gas: 3716887 // gas limit, set any number you want
    }
  }
};
