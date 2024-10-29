async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
  
    const MoviePurchase = await ethers.getContractFactory("Buying");

    const moviePrice = ethers.utils.parseEther("0.0001");  // 0.0001 ETH price
    const moviePurchase = await MoviePurchase.deploy(moviePrice);

    console.log("MoviePurchase contract deployed at:", moviePurchase.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  