require("dotenv").config();

console.log("HOLESKY_SCHRODINGER_BOX_ADDRESS:", process.env.HOLESKY_SCHRODINGER_BOX_ADDRESS);
console.log("HOLESKY_FEE_COLLECTOR_ADDRESS:", process.env.HOLESKY_FEE_COLLECTOR_ADDRESS);
console.log("HOLESKY_PARADOX_TOKEN_ADDRESS:", process.env.HOLESKY_PARADOX_TOKEN_ADDRESS);
console.log("HOLESKY_SCHRODINGER_CAT_NFT_ADDRESS:", process.env.HOLESKY_SCHRODINGER_CAT_NFT_ADDRESS);

if (!process.env.HOLESKY_SCHRODINGER_BOX_ADDRESS) {
    throw new Error("Variabile d'ambiente HOLESKY_SCHRODINGER_BOX_ADDRESS non trovata!");
}
