import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import IndiaMap from "./IndiaMap";
import { propertyData, Property } from "./propertyData";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #1976D2',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function App() {
  const [balance, setBalance] = useState(1000000); // Starting balance
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  // Remove lastTurnIncome and handleNextTurn

  const handleRegionClick = (regionName: string) => {
    setSelectedState(regionName);
    setSelectedProperty(null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedProperty(null);
    setSelectedState(null);
  };

  const handleBuy = () => {
    if (!selectedProperty || selectedProperty.owner || balance < selectedProperty.price) return;
    setBalance((b) => b - selectedProperty.price);
    selectedProperty.owner = "user"; // For now, just a placeholder
    setSelectedProperty({ ...selectedProperty }); // Force re-render
  };

  const handleSell = () => {
    if (!selectedProperty || selectedProperty.owner !== "user") return;
    setBalance((b) => b + selectedProperty.price);
    selectedProperty.owner = null;
    setSelectedProperty({ ...selectedProperty }); // Force re-render
  };

  // Remove lastTurnIncome and handleNextTurn

  const ownedProperties = propertyData.filter((p) => p.owner === "user");

  useEffect(() => {
    const interval = setInterval(() => {
      const income = ownedProperties.reduce((sum, p) => sum + p.incomePerTurn, 0);
      if (income > 0) setBalance((b) => b + income);
    }, 10000); // 10 seconds for demo
    return () => clearInterval(interval);
  }, [ownedProperties]);

  const stateProperties = selectedState ? propertyData.filter((p) => p.state.toLowerCase() === selectedState.toLowerCase()) : [];

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <div style={{ flex: 1, paddingRight: 24 }}>
        <h1>Real World Monopoly: India Edition</h1>
        <div style={{ fontSize: 20, marginBottom: 20 }}>
          <strong>Bank Balance:</strong> ₹{balance.toLocaleString()}
        </div>
        <IndiaMap onRegionClick={handleRegionClick} />
      </div>
      <div style={{ width: 320, background: '#f5f5f5', padding: 16, borderLeft: '1px solid #ddd' }}>
        <h2 style={{ fontSize: 20 }}>Your Properties</h2>
        {ownedProperties.length === 0 ? (
          <div style={{ color: '#888' }}>You don't own any properties yet.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {ownedProperties.map((p) => (
              <li key={p.id} style={{ marginBottom: 12, cursor: 'pointer' }} onClick={() => { setSelectedProperty(p); setModalOpen(true); setSelectedState(p.state); }}>
                <div style={{ fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 14, color: '#555' }}>{p.type}</div>
                <div style={{ fontSize: 14 }}>₹{p.price.toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
          {selectedState && !selectedProperty && (
            <>
              <h2>{selectedState}</h2>
              <div style={{ marginBottom: 8 }}>Select a property:</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {stateProperties.length === 0 && <li>No properties found for this state.</li>}
                {stateProperties.map((p) => (
                  <li key={p.id} style={{ marginBottom: 10, cursor: 'pointer', border: '1px solid #ddd', borderRadius: 4, padding: 8 }} onClick={() => setSelectedProperty(p)}>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 14, color: '#555' }}>{p.type}</div>
                    <div style={{ fontSize: 14 }}>₹{p.price.toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
          {selectedProperty && (
            <>
              <h2>{selectedProperty.name}</h2>
              <div>State: {selectedProperty.state}</div>
              <div>Type: {selectedProperty.type}</div>
              <div>Price: ₹{selectedProperty.price.toLocaleString()}</div>
              <div>Owner: {selectedProperty.owner ? "You" : "Unowned"}</div>
              <div style={{ margin: '8px 0', color: '#555' }}>{selectedProperty.description}</div>
              <div>Income per turn: ₹{selectedProperty.incomePerTurn.toLocaleString()}</div>
              <div>Upgrade Level: {selectedProperty.upgradeLevel}</div>
              <div style={{ marginTop: 16 }}>
                {!selectedProperty.owner && balance >= selectedProperty.price && (
                  <Button variant="contained" color="primary" onClick={handleBuy}>
                    Buy
                  </Button>
                )}
                {selectedProperty.owner === "user" && (
                  <Button variant="outlined" color="secondary" onClick={handleSell}>
                    Sell
                  </Button>
                )}
                {selectedProperty.owner && selectedProperty.owner !== "user" && (
                  <span>Owned by another player</span>
                )}
                {balance < (selectedProperty.price || 0) && !selectedProperty.owner && (
                  <span style={{ color: 'red', marginLeft: 8 }}>Insufficient funds</span>
                )}
                <Button style={{ marginLeft: 8 }} onClick={() => setSelectedProperty(null)}>
                  Back
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default App;
