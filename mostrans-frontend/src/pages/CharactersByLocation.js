import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { db } from "../FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

function CharactersByLocation() {
	const [locations, setLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				// Fetch all characters from Firestore
				const charactersCollection = collection(db, "characters");
				const charactersSnapshot = await getDocs(charactersCollection);
				const charactersData = charactersSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				// Extract unique location IDs from characters
				const locationIds = Array.from(
					new Set(
						charactersData.map((character) => character.locationId)
					)
				);

				// Filter out null or empty location IDs
				const filteredLocationIds = locationIds.filter((id) => id);

				// Fetch location details based on location IDs
				const locationsData = await Promise.all(
					filteredLocationIds.map(async (locationId) => {
						if (locationId) {
							const response = await axios.get(
								`https://rickandmortyapi.com/api/location/${locationId}`
							);
							const locationData = response.data;
							const locationCharacters = charactersData.filter(
								(character) =>
									character.locationId === locationId
							);
							return {
								id: locationId,
								name: locationData.name,
								characters: locationCharacters,
							};
						}
						return null;
					})
				);

				setLocations(locationsData.filter((loc) => loc));
			} catch (error) {
				console.error("Error fetching locations:", error);
			}
		};

		fetchLocations();
	}, []);

	useEffect(() => {
		const savedLocationId = localStorage.getItem("selectedLocationId");
		if (savedLocationId) {
			handleLocationClick(savedLocationId);
		}
	}, []);

	const handleLocationClick = async (locationId) => {
		try {
			// Save selected location ID to local storage
			localStorage.setItem("selectedLocationId", locationId);

			const charactersCollection = collection(db, "characters");
			const charactersQuery = query(
				charactersCollection,
				where("locationId", "==", locationId)
			);
			const charactersSnapshot = await getDocs(charactersQuery);
			const charactersData = charactersSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			const location = locations.find((loc) => loc.id === locationId);
			setSelectedLocation(location);

			// Fetch character details from the API
			const charactersWithDetails = await Promise.all(
				charactersData.map(async (character) => {
					const characterId = character.id.split("_")[1];
					const response = await axios.get(
						`https://rickandmortyapi.com/api/character/${characterId}`
					);
					return {
						id: character.id,
						...response.data,
					};
				})
			);

			setCharacters(charactersWithDetails);
		} catch (error) {
			console.error("Error fetching characters in location:", error);
		}
	};

	return (
		<div className="container">
			<h1>Characters By Location</h1>
			<div className="row">
				<div className="col-md-4">
					<h2>Locations</h2>
					<ul className="list-group">
						{locations.map((location) => (
							<li
								key={location.id}
								className="list-group-item"
								onClick={() => handleLocationClick(location.id)}
								style={{ cursor: "pointer" }}
							>
								{location.name}
							</li>
						))}
					</ul>
				</div>
				<div className="col-md-8">
					<h2>
						Characters in{" "}
						{selectedLocation
							? selectedLocation.name
							: "Selected Location"}
					</h2>
					<ul className="list-group">
						{characters.map((character) => {
							return (
								<li
									key={character.id}
									className="list-group-item"
								>
									<Link to={`/character/${character.id}`}>
										{character.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default CharactersByLocation;
