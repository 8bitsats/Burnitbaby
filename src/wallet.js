// src/Wallet.js
import React from 'react';
import { useWallet, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function Wallet() {
  const { publicKey, connected } = useWallet();

  return (
    <div className="text-center">
      <WalletMultiButton className="bg-green-500 p-2 rounded-lg text-black" />
      {connected && <p>Wallet Connected: {publicKey.toBase58()}</p>}
    </div>
  );
}

export default Wallet;
