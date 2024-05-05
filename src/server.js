// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL, SystemProgram } = require('@solana/web3.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = new Connection('https://api.mainnet-beta.solana.com');
const rewardAccountPublicKey = new PublicKey('reward-wallet-public-key');
const rewardPrivateKey = [/* private key bytes */];
const rewardAccount = {
  publicKey: rewardAccountPublicKey,
  secretKey: Uint8Array.from(rewardPrivateKey)
};

app.post('/reward', async (req, res) => {
  const { walletAddress, burnedTokenAddress } = req.body;

  // Verify burned token (custom logic, placeholder)
  const isBurned = true; // Implement verification logic here

  if (isBurned) {
    // Transfer reward (Solana in this case)
    const recipient = new PublicKey(walletAddress);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: rewardAccountPublicKey,
        toPubkey: recipient,
        lamports: 0.01 * LAMPORTS_PER_SOL // Set your reward amount here
      })
    );

    // Sign and send transaction
    const signature = await connection.sendTransaction(transaction, [rewardAccount]);
    await connection.confirmTransaction(signature);

    res.json({ success: true, signature });
  } else {
    res.status(400).json({ success: false, message: 'Token not verified' });
  }
});

app.listen(port, () => {
  console.log(`Reward server listening on port ${port}`);
});
