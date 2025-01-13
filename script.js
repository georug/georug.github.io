const connectButton = document.getElementById('connectWallet');
const claimButton = document.getElementById('claimAirdrop');
const walletSelector = document.getElementById('walletSelector');
const connectSelectedButton = document.getElementById('connectSelectedWallet');
const walletDropdown = document.getElementById('walletDropdown');
const walletAddressDiv = document.getElementById('walletAddress');

// Solana Airdrop Token Address (Ganti dengan alamat token Anda)
const tokenAddress = 'YOUR_TOKEN_ADDRESS';
const claimAmount = 500; // Jumlah token yang akan diberikan

let wallet = null;

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// Fungsi untuk menghubungkan ke Phantom Wallet
async function connectPhantomWallet() {
    try {
        if (window.solana && window.solana.isPhantom) {
            const response = await window.solana.connect();
            const publicKey = response.publicKey.toString();
            walletAddressDiv.innerHTML = `Connected: ${publicKey}`;
            walletAddressDiv.style.display = 'block';
            connectButton.style.display = 'none';
            claimButton.style.display = 'inline-block';
        } else {
            alert("Please install Phantom wallet.");
        }
    } catch (err) {
        console.error("Error connecting Phantom:", err);
    }
}

// Fungsi untuk menghubungkan ke Sollet Wallet
async function connectSolletWallet() {
    try {
        if (window.sollet && window.sollet.isSollet) {
            const provider = window.sollet;
            await provider.connect();
            const publicKey = provider.publicKey.toString();
            walletAddressDiv.innerHTML = `Connected: ${publicKey}`;
            walletAddressDiv.style.display = 'block';
            connectButton.style.display = 'none';
            claimButton.style.display = 'inline-block';
        } else {
            alert("Please install Sollet wallet.");
        }
    } catch (err) {
        console.error("Error connecting Sollet:", err);
    }
}

// Fungsi untuk memilih wallet dan menghubungkan
async function connectWallet() {
    walletSelector.style.display = 'block'; // Menampilkan dropdown untuk memilih wallet
}

// Fungsi untuk menghubungkan wallet yang dipilih
async function connectSelectedWallet() {
    const selectedWallet = walletDropdown.value;

    if (selectedWallet === 'phantom') {
        await connectPhantomWallet();
    } else if (selectedWallet === 'sollet') {
        await connectSolletWallet();
    }
}

// Fungsi untuk klaim airdrop
async function claimAirdrop() {
    if (!wallet) {
        alert("Please connect your wallet first!");
        return;
    }

    try {
        const walletAddress = wallet.publicKey.toString();
        const balance = await connection.getBalance(wallet.publicKey);
        if (balance < 0.1 * solanaWeb3.LAMPORTS_PER_SOL) {
            alert("Insufficient balance for transaction fees!");
            return;
        }

        const transaction = new solanaWeb3.Transaction();
        const tokenMint = new solanaWeb3.PublicKey(tokenAddress);
        const destination = new solanaWeb3.PublicKey(walletAddress);
        const transferInstruction = new solanaWeb3.SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: destination,
            lamports: claimAmount * solanaWeb3.LAMPORTS_PER_SOL
        });

        transaction.add(transferInstruction);
        const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [wallet]);
        alert(`Airdrop claimed successfully! Transaction signature: ${signature}`);
    } catch (err) {
        console.error("Error claiming airdrop:", err);
    }
}

// Event listeners
connectButton.addEventListener('click', connectWallet);
connectSelectedButton.addEventListener('click', connectSelectedWallet);
claimButton.addEventListener('click', claimAirdrop);
