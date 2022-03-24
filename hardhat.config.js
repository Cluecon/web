/* eslint-disable @typescript-eslint/no-var-requires */
require('@nomiclabs/hardhat-waffle')
const fs = require('fs')

const privateKey = fs.readFileSync('.secret').toString()

const projectId = '06915016ff024a21b48c95d749a47b85'

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    //  unused configuration commented out for now
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
