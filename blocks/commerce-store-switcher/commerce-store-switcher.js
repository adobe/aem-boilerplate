import React, { useState, useEffect } from "react";

const CommerceStoreSwitcher = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/stores.json")
      .then((response) => response.json())
      .then((data) => setStores(data.stores))
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  return (
    <div>
      <label htmlFor="store-switcher">Select Store:</label>
      <select
        id="store-switcher"
        value={selectedStore}
        onChange={handleStoreChange}
      >
        <option value="">--Select a store--</option>
        {stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommerceStoreSwitcher;
