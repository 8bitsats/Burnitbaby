// src/App.js
import React from 'react';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

function App() {
  return (
    <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
      <WalletProvider>
        <WalletModalProvider>
          <div className="min-h-screen bg-gray-900 text-white p-8">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold">Solana Burner</h1>
              <p className="text-lg">Burn your tokens securely and receive rewards!</p>
            </header>
            <main className="max-w-3xl mx-auto space-y-8">
              <Wallet />
              <Burner />
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
