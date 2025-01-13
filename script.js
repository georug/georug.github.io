// Menyimpan referensi ke tombol
const connectButton = document.getElementById('connectWallet');
const claimButton = document.getElementById('claimAirdrop');
const walletAddressDiv = document.getElementById('walletAddress');

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    try {
        // Mengecek apakah wallet Solana tersedia di browser
        if (window.solana) {
            // Cek wallet yang tersedia
            if (window.solana.isPhantom) {
                // Jika Phantom tersedia
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();
                walletAddressDiv.innerHTML = `Connected to Phantom: ${publicKey}`;
                walletAddressDiv.style.display = 'block';
                connectButton.style.display = 'none'; // Sembunyikan tombol Connect
                claimButton.style.display = 'inline-block'; // Tampilkan tombol claim
            } 
            // Cek Sollet wallet
            else if (window.solana.isSollet) {
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();
                walletAddressDiv.innerHTML = `Connected to Sollet: ${publicKey}`;
                walletAddressDiv.style.display = 'block';
                connectButton.style.display = 'none'; // Sembunyikan tombol Connect
                claimButton.style.display = 'inline-block'; // Tampilkan tombol claim
            }
            // Cek Solflare wallet
            else if (window.solana.isSolflare) {
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();
                walletAddressDiv.innerHTML = `Connected to Solflare: ${publicKey}`;
                walletAddressDiv.style.display = 'block';
                connectButton.style.display = 'none'; // Sembunyikan tombol Connect
                claimButton.style.display = 'inline-block'; // Tampilkan tombol claim
            }
            // Jika wallet tidak dikenali
            else {
                alert("Wallet yang terdeteksi tidak didukung.");
            }
        } else {
            alert("Tidak ada wallet Solana yang terdeteksi di browser Anda. Harap instal wallet seperti Phantom, Sollet, atau Solflare.");
        }
    } catch (err) {
        console.error("Error connecting wallet:", err);
        alert("Terjadi kesalahan saat menghubungkan wallet.");
    }
}

// Menambahkan event listener pada tombol connect wallet
connectButton.addEventListener('click', connectWallet);
