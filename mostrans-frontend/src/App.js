import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CharactersList from "./pages/CharactersList";
import CharacterDetail from "./pages/CharacterDetail";
import CharactersByLocation from "./pages/CharactersByLocation";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="container mt-3">
				<Routes>
					<Route path="/" element={<CharactersList />} />
					<Route
						path="/character/:id"
						element={<CharacterDetail />}
					/>
					<Route
						path="/location"
						element={<CharactersByLocation />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
