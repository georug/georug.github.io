const web3 = window.solanaWeb3; // Web3.js untuk Solana
const splToken = window.splToken; // SPL Token API untuk transfer token SPL

// Konfigurasi Airdrop
const mintAddress = new web3.PublicKey('EbmcmsQ6JBTPzTM5m9ctxz5t3h2bMJ2CQGv2aYtvocFX'); // Ganti dengan mint address token Anda
const senderTokenAccountAddress = new web3.PublicKey('8ALH6DHbcwF1w3TUBQPAkBsgycX4XZTy8SVK4yJ2h2sL'); // Akun token pengirim
const decimals = 9; // Desimal token SPL (biasanya 9)
const airdropAmount = 500; // Jumlah token yang akan diklaim (misal 500 token)

async function claimAirdrop() {
    try {
        // Cek apakah wallet pengguna sudah terhubung
        if (!window.solana || !window.solana.isConnected) {
            alert('Silakan connect wallet terlebih dahulu!');
            return;
        }

        // Ambil alamat wallet pengguna
        const userPublicKey = window.solana.publicKey;
        console.log('Alamat Wallet Pengguna:', userPublicKey.toString());

        // Koneksi ke jaringan Solana (mainnet atau devnet)
        const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

        // Mendapatkan atau membuat akun token pengguna di jaringan Solana
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
                senderTokenAccountAddress, // Akun pengirim
                userTokenAccount.address,  // Akun penerima
                userPublicKey,             // Wallet pengguna yang menandatangani transaksi
                airdropAmount * Math.pow(10, decimals) // Jumlah token dalam unit terkecil
            )
        );

        // Kirim dan tanda tangani transaksi dengan wallet pengguna
        const { signature } = await window.solana.signAndSendTransaction(transaction);
        console.log('Transaksi Berhasil:', signature);

        alert(`Airdrop berhasil diklaim! Transaksi ID: ${signature}`);
    } catch (error) {
        console.error('Error saat klaim airdrop:', error);
        alert(`Gagal klaim airdrop: ${error.message}`);
    }
}
