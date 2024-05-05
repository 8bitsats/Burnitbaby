// src/Burner.js
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { programs } from '@metaplex/js';

function Burner() {
  const wallet = useWallet();
  const [tokens, setTokens] = useState([]);
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  useEffect(() => {
    const fetchTokens = async () => {
      if (wallet.connected) {
        const { metadata: { Metadata } } = programs;
        const metadataList = await Metadata.findDataByOwner(connection, wallet.publicKey.toBase58());
        setTokens(metadataList);
      }
    };
    fetchTokens();
  }, [wallet, connection]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">View Tokens/NFTs</h2>
      {tokens.length > 0 ? (
        tokens.map((token, index) => (
          <div key={index} className="mb-4">
            <p>{token.data.name}</p>
          </div>
        ))
      ) : (
        <p>No tokens/NFTs found</p>
      )}
    </div>
  );
}

export default Burner;
