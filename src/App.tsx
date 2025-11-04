import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { WalletModal } from "./components/WalletModal/WalletModal";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { DashboardPage } from "./pages/DashboardPage";

const AppContent: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(["1", "4"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenWalletModal = () => setIsModalOpen(true);
  const handleCloseWalletModal = () => setIsModalOpen(false);

  const handleConnectMetaMask = (account: string) => {
    setWalletAddress(account);
    setWalletConnected(true);
    setIsModalOpen(false);
  };

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <>
      <Navbar
        onConnectWallet={handleOpenWalletModal}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
      />

      <WalletModal
        isOpen={isModalOpen}
        onClose={handleCloseWalletModal}
        onConnectMetaMask={handleConnectMetaMask}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/listings"
          element={
            <ListingsPage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/property/:id"
          element={<PropertyDetailPage onToggleFavorite={handleToggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              walletConnected={walletConnected}
              onConnectWallet={handleOpenWalletModal}
            />
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
