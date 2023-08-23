document.addEventListener("DOMContentLoaded", async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            const contractAddress = "CONTRACT_ADDRESS"; // Inserisci l'indirizzo del contratto TradeNFT
            window.tradeNFTContract = new web3.eth.Contract(ABI, contractAddress);
        } catch (error) {
            console.error("User denied account access.");
        }
    } else {
        console.error("Web3 not found in your browser.");
    }

    // Ottenere l'account attualmente connesso
    const accounts = await web3.eth.getAccounts();
    const currentUser = accounts[0];

    // Mostra gli scambi del mittente corrente
    await displayTrades(currentUser);
});

// Funzione per mostrare gli scambi di un utente
async function displayTrades(userAddress) {
    const tradeCount = await window.tradeNFTContract.methods.getTradeCount(userAddress).call();

    const tradesDiv = document.getElementById("tradesDiv");
    tradesDiv.innerHTML = ""; // Reset del contenuto precedente

    for (let i = 0; i < tradeCount; i++) {
        const tradeId = await window.tradeNFTContract.methods.getUserTradeId(userAddress, i).call();
        const trade = await window.tradeNFTContract.methods.getTrade(tradeId).call();
        
        const tradeInfo = document.createElement("p");
        tradeInfo.textContent = `Trade ID: ${tradeId}, From: ${trade.from}, To: ${trade.to}, NFT ID: ${trade.nftId}`;
        tradesDiv.appendChild(tradeInfo);
    }
}

document.getElementById("initiateTradeForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const fromAddress = document.getElementById("fromAddress").value;
    const toAddress = document.getElementById("toAddress").value;
    const nftId = parseInt(document.getElementById("nftId").value);
    
    try {
        const accounts = await web3.eth.getAccounts();
        await window.tradeNFTContract.methods.initiateTrade(fromAddress, toAddress, nftId).send({ from: accounts[0] });
        console.log("Trade initiated successfully!");

        // Aggiorna la visualizzazione degli scambi del mittente corrente
        await displayTrades(accounts[0]);
    } catch (error) {
        console.error("Error initiating trade:", error);
    }
});

document.getElementById("confirmTradeForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const confirmNftId = parseInt(document.getElementById("confirmNftId").value);
    
    try {
        const accounts = await web3.eth.getAccounts();
        await window.tradeNFTContract.methods.confirmTrade(confirmNftId).send({ from: accounts[0] });
        console.log("Trade confirmed successfully!");

        // Aggiorna la visualizzazione degli scambi del mittente corrente
        await displayTrades(accounts[0]);
    } catch (error) {
        console.error("Error confirming trade:", error);
    }
});
