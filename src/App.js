import React, { useState } from "react";

const initialRestaurants = [
  {
    id: 1,
    name: "Padella",
    cuisine: "Italian",
    rating: 5,
    visited: false,
    notes: "",
  },
  {
    id: 2,
    name: "Dishoom",
    cuisine: "Indian",
    rating: 4,
    visited: false,
    notes: "",
  },
];

export default function App() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [filterCuisine, setFilterCuisine] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Add new restaurant
  const handleAddRestaurant = (restaurant) => {
    setRestaurants([
      ...restaurants,
      { ...restaurant, id: crypto.randomUUID(), visited: false, notes: "" },
    ]);
  };

  // Toggle visited
  const handleToggleVisited = (id) => {
    setRestaurants(
      restaurants.map((r) => (r.id === id ? { ...r, visited: !r.visited } : r))
    );
  };

  // Pick random unvisited restaurant
  const handlePickRestaurant = () => {
    const unvisited = restaurants.filter((r) => !r.visited);
    if (unvisited.length === 0) return alert("All restaurants visited!");
    const random = unvisited[Math.floor(Math.random() * unvisited.length)];
    setSelectedRestaurant(random);
  };

  // Filter change
  const handleFilterChange = (e) => {
    setFilterCuisine(e.target.value);
  };

  // Controlled form state
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    rating: 1,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.cuisine) return;
    handleAddRestaurant(formData);
    setFormData({ name: "", cuisine: "", rating: 1 });
  };

  // Filter restaurants
  const displayedRestaurants = restaurants.filter(
    (r) => !filterCuisine || r.cuisine === filterCuisine
  );

  // Cuisine options
  const cuisineOptions = [...new Set(restaurants.map((r) => r.cuisine))];

  return (
    <div className="app">
      <h1>Favorestik</h1>

      {/* Add Restaurant Form */}
      <form className="add-restaurant-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={formData.cuisine}
          onChange={handleFormChange}
        />
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleFormChange}
        />
        <button type="submit" className="add-btn">
          Add Restaurant
        </button>
      </form>

      {/* Filter Bar */}
      <div className="filter-bar">
        <label>Filter by cuisine:</label>
        <select value={filterCuisine} onChange={handleFilterChange}>
          <option value="">All</option>
          {cuisineOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Pick Button */}
      <button onClick={handlePickRestaurant} className="pick-btn">
        Pick Random Restaurant
      </button>

      {/* Selected Restaurant */}
      {selectedRestaurant && (
        <div className="selected-restaurant">
          {selectedRestaurant.name} ({selectedRestaurant.cuisine}) - Rating:{" "}
          {selectedRestaurant.rating}
        </div>
      )}

      {/* Restaurant List */}
      <div className="restaurant-list">
        {displayedRestaurants.map((r) => (
          <div key={r.id} className="restaurant-item">
            <div className="restaurant-info">
              <div className="restaurant-name">{r.name}</div>
              <div className="restaurant-cuisine">{r.cuisine}</div>
              <div className="restaurant-rating">{"★".repeat(r.rating)}</div>
            </div>
            <div>
              {r.visited && <span className="visited">Visited</span>}
              <button
                onClick={() => handleToggleVisited(r.id)}
                className="toggle-visited-btn"
              >
                {r.visited ? "Unmark" : "Mark Visited"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
