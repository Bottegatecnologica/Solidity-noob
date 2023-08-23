document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const joinRoomButton = document.getElementById("joinRoomButton");
    const roomNumberInput = document.getElementById("roomNumber");
    const tradeSection = document.getElementById("tradeSection");

    const nftContractAddress = "INDIRIZZO_DEL_CONTRATTO_DEI_TUOI_NFT";  // Sostituisci con l'indirizzo reale del contratto NFT
    const nftContractABI = [...];  // Inserisci l'ABI del contratto dei tuoi NFT

    let roomNumber = null;

    joinRoomButton.addEventListener("click", () => {
        roomNumber = parseInt(roomNumberInput.value);
        socket.emit('joinRoom', roomNumber);
    });

    socket.on('roomFull', () => {
        alert("The room is full. Please choose another room.");
    });

    socket.on('tradeInitiated', (data) => {
        // Aggiorna l'interfaccia con i dati dello scambio iniziato
        const tradeInfo = `Trade initiated: From ${data.from} to ${data.to} (NFT ID: ${data.nftId})`;
        displayTradeInfo(tradeInfo);
    });

    socket.on('tradeConfirmed', (data) => {
        // Aggiorna l'interfaccia con i dati dello scambio confermato
        const tradeInfo = `Trade confirmed: NFT ID ${data.nftId} has been exchanged.`;
        displayTradeInfo(tradeInfo);
    });

    function displayTradeInfo(info) {
        const tradeInfoDiv = document.createElement("div");
        tradeInfoDiv.textContent = info;
        tradeSection.appendChild(tradeInfoDiv);
    }
});
