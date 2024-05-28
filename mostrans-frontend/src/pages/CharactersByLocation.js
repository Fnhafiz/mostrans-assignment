import React from "react";
import { useParams, Link } from "react-router-dom";

function CharactersByLocation() {
	const { location } = useParams();
	const characters = [
		{ id: 1, name: "Character 1", location: "some-location" },
		{ id: 2, name: "Character 2", location: "some-location" },
		// Add more characters as needed
	];
	const filteredCharacters = characters.filter(
		(character) => character.location === location
	);

	return (
		<div>
			<h1>Characters in {location}</h1>
			<ul className="list-group">
				{filteredCharacters.map((character) => (
					<li key={character.id} className="list-group-item">
						<Link to={`/character/${character.id}`}>
							{character.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default CharactersByLocation;
