import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { db } from "../FirebaseConfig";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

function CharacterDetail() {
	const { id } = useParams();
	const [character, setCharacter] = useState(null);
	const [locations, setLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch character details from API
				const characterResponse = await axios.get(
					`https://rickandmortyapi.com/api/character/${id}`
				);
				const characterData = characterResponse.data;

				// Fetch location ID from Firestore
				const characterRef = doc(db, "characters", `character_${id}`);
				const characterDoc = await getDoc(characterRef);
				if (characterDoc.exists()) {
					const characterLocationId = characterDoc.data().locationId;
					setSelectedLocation(characterLocationId || "");
				}

				// Fetch locations from API
				const locationsResponse = await axios.get(
					"https://rickandmortyapi.com/api/location"
				);
				const locationsData = locationsResponse.data.results;

				setCharacter(characterData);
				setLocations(locationsData);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching character details:", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const handleLocationChange = (event) => {
		setSelectedLocation(event.target.value);
	};

	const handleSubmit = async () => {
		if (character) {
			try {
				const characterRef = doc(
					db,
					"characters", // Collection name
					`character_${character.id}` // Document ID
				);

				const characterDoc = await getDoc(characterRef);

				if (characterDoc.exists()) {
					// Document exists, update it
					await updateDoc(characterRef, {
						locationId:
							selectedLocation === "" ? null : selectedLocation,
					});
					console.log("Character location updated successfully");
					alert("Character location updated successfully");
				} else {
					// Document doesn't exist, create it
					await setDoc(characterRef, {
						locationId:
							selectedLocation === "" ? null : selectedLocation,
					});
					console.log(
						"Character document created and location set successfully"
					);
					alert(
						"Character document created and location set successfully"
					);
				}
			} catch (error) {
				console.error("Error updating character location:", error);
				alert("Error updating character location");
			}
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<div className="text-center mb-3">
						<img
							src={character.image}
							className="card-img-top"
							alt={character.name}
							style={{ maxWidth: "100%", height: "auto" }}
						/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="card-body">
						<h1 className="mb-4">{character.name}</h1>
						<p className="card-text">
							<strong>Status:</strong> {character.status}
						</p>
						<p className="card-text">
							<strong>Species:</strong> {character.species}
						</p>
						<p className="card-text">
							<strong>Gender:</strong> {character.gender}
						</p>
						<p className="card-text">
							<strong>Origin:</strong> {character.origin.name}
						</p>
						<div className="form-group">
							<strong htmlFor="location">Location:</strong>
							<select
								className="form-control"
								id="location"
								value={selectedLocation}
								onChange={handleLocationChange}
							>
								<option value="">None</option>
								{locations.map((location) => (
									<option
										key={location.id}
										value={location.id}
									>
										{location.name}
									</option>
								))}
							</select>
						</div>
						<button
							className="btn btn-primary"
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CharacterDetail;
