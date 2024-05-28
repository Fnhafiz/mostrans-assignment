import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CharacterDetail() {
	const { id } = useParams();
	const [character, setCharacter] = useState(null);

	useEffect(() => {
		axios
			.get(`https://rickandmortyapi.com/api/character/${id}`)
			.then((response) => {
				setCharacter(response.data);
			})
			.catch((error) => {
				console.error("Error fetching the character details:", error);
			});
	}, [id]);

	if (!character) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container">
			<div className="row mt-4">
				<div className="col-md-6">
					<div className="text-center mb-3">
						<img
							src={character.image}
							className="card-img-top"
							alt={character.name}
							style={{ maxWidth: "90%", height: "auto" }}
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
					</div>
				</div>
			</div>
		</div>
	);
}

export default CharacterDetail;
