const web3 = window.solanaWeb3;
const splToken = window.splToken;

// Ganti dengan mint address token Anda
const mintAddress = new web3.PublicKey('EbmcmsQ6JBTPzTM5m9ctxz5t3h2bMJ2CQGv2aYtvocFX');  
// Ganti dengan alamat akun pengirim
const senderTokenAccountAddress = new web3.PublicKey('8ALH6DHbcwF1w3TUBQPAkBsgycX4XZTy8SVK4yJ2h2sL');  
// Jumlah token yang akan diklaim
const airdropAmount = 500;  
// Desimal token SPL (biasanya 9)
const decimals = 9;

async function claimAirdrop() {
    try {
        // Cek apakah wallet sudah terhubung
        if (!window.solana || !window.solana.isConnected) {
            console.log("Wallet tidak terhubung!");
            alert('Silakan hubungkan wallet terlebih dahulu!');
            return;
        }

        const userPublicKey = window.solana.publicKey;
        console.log('Alamat wallet pengguna:', userPublicKey.toString());

        // Koneksi ke jaringan Solana (gunakan testnet atau devnet untuk testing)
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

        // Mendapatkan atau membuat akun token pengguna
        const userTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
            connection,
            userPublicKey,
            mintAddress,
            userPublicKey
        );
        console.log('Akun token pengguna:', userTokenAccount.address.toString());

        // Membuat transaksi untuk mentransfer token
        const transaction = new web3.Transaction().add(
            splToken.createTransferInstruction(
                senderTokenAccountAddress, 
                userTokenAccount.address, 
                userPublicKey, 
                airdropAmount * Math.pow(10, decimals) 
            )
        );

        // Kirim transaksi
        const { signature } = await window.solana.signAndSendTransaction(transaction);
        console.log('Transaksi berhasil dengan signature:', signature);

        // Menampilkan popup atau notifikasi
        alert(`Airdrop berhasil diklaim! ID Transaksi: ${signature}`);

    } catch (error) {
        console.error('Terjadi kesalahan saat klaim airdrop:', error);
        alert(`Gagal klaim airdrop: ${error.message}`);
    }
}
