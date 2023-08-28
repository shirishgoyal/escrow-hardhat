require('@nomicfoundation/hardhat-toolbox');
require("hardhat-contract-sizer");
require('hardhat-storage-layout');


module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/lib/artifacts",
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  }
};
