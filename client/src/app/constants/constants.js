const contractaddress ="0xe92ed8A64bf46c7D837347AA13Fe1272a6620bBd";

const contractAbi =  [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_moviePrice",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "movieName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "movieYear",
          "type": "uint256"
        }
      ],
      "name": "MoviePurchased",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "moviePrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "movieName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "movieYear",
          "type": "uint256"
        }
      ],
      "name": "purchaseMovie",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newPrice",
          "type": "uint256"
        }
      ],
      "name": "setMoviePrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  export {contractaddress,contractAbi}