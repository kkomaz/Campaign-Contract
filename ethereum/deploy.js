const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const { SECRET_KEY, NETWORK_KEY } = require('../env.config.js');

const provider = new HDWalletProvider(
  SECRET_KEY,
  NETWORK_KEY,
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({ from: accounts[0], gas: '1000000' })

  console.log('Contract deployed to', result.options.address); // Contract Address
};

// https://rinkeby.etherscan.io/
deploy();
