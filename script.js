// Tombol untuk menghubungkan wallet dan claim
const connectButton = document.getElementById('connectWallet');
const claimButton = document.getElementById('claimAirdrop');
const walletAddressDiv = document.getElementById('walletAddress');

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    try {
        // Mengecek apakah window.solana ada
        if (window.solana) {
            // Cek apakah Phantom wallet terdeteksi
            if (window.solana.isPhantom) {
                await connectToPhantom();
            }
            // Cek Sollet wallet
            else if (window.solana.isSollet) {
                await connectToSollet();
            }
            // Cek Solflare wallet
            else if (window.solana.isSolflare) {
                await connectToSolflare();
            }
            // Cek wallet lain jika tersedia
            else {
                alert("Wallet yang terdeteksi tidak didukung.");
            }
        } else {
            alert("Tidak ada wallet Solana yang terdeteksi di browser Anda. Harap install Phantom, Sollet, atau Solflare.");
        }
    } catch (err) {
        console.error("Terjadi kesalahan saat menghubungkan wallet:", err);
    }
}

// Fungsi untuk koneksi ke Phantom Wallet
async function connectToPhantom() {
    const response = await window.solana.connect();
    const publicKey = response.publicKey.toString();
    displayWalletInfo(publicKey, "Phantom");
}

// Fungsi untuk koneksi ke Sollet Wallet
async function connectToSollet() {
    const response = await window.solana.connect();
    const publicKey = response.publicKey.toString();
    displayWalletInfo(publicKey, "Sollet");
}

// Fungsi untuk koneksi ke Solflare Wallet
async function connectToSolflare() {
    const response = await window.solana.connect();
    const publicKey = response.publicKey.toString();
    displayWalletInfo(publicKey, "Solflare");
}

// Fungsi untuk menampilkan informasi wallet
function displayWalletInfo(publicKey, walletName) {
    walletAddressDiv.innerHTML = `Connected to ${walletName}: ${publicKey}`;
    walletAddressDiv.style.display = 'block';
    connectButton.style.display = 'none';  // Menyembunyikan tombol Connect
    claimButton.style.display = 'inline-block';  // Menampilkan tombol Claim
}

// Event listener untuk tombol Connect Wallet
connectButton.addEventListener('click', connectWallet);
