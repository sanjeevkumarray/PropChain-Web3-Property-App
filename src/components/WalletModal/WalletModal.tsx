import React, { useState } from "react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectMetaMask: (account: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnectMetaMask,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMetaMaskConnect = async () => {
    setError(null);
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).ethereum) {
        setError("MetaMask not found. Please install MetaMask.");
        setLoading(false);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];
      onConnectMetaMask(account);
      setLoading(false);
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("User rejected the connection or an error occurred.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Connect Your Wallet
        </h2>

        <button
          onClick={handleMetaMaskConnect}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-600 transition-all duration-300"
        >
          {loading ? "Connecting..." : "Connect with MetaMask"}
        </button>

        {error && (
          <p className="text-sm text-red-500 text-center mt-3">{error}</p>
        )}

        {error?.includes("install") && (
          <div className="text-center mt-3">
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Install MetaMask
            </a>
          </div>
        )}
      </div>
    </div>
  );
};


