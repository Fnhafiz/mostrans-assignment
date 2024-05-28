import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CharactersList() {
	const [characters, setCharacters] = useState([]);
	const [info, setInfo] = useState({});
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		fetchCharacters(currentPage);
	}, [currentPage]);

	const fetchCharacters = (page) => {
		axios
			.get(`https://rickandmortyapi.com/api/character?page=${page}`)
			.then((response) => {
				setCharacters(response.data.results);
				setInfo(response.data.info);
			})
			.catch((error) => {
				console.error("Error fetching the characters:", error);
			});
	};

	const handleNextPage = () => {
		if (info.next) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (info.prev) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div>
			<h1 className="mb-4">Characters List</h1>
			<div className="row">
				{characters.map((character) => (
					<div
						key={character.id}
						className="col-6 col-sm-4 col-md-3 mb-4"
					>
						<div className="card">
							<img
								src={character.image}
								className="card-img-top"
								alt={character.name}
							/>
							<div className="card-body">
								<h5 className="card-title">{character.name}</h5>
								<Link
									to={`/character/${character.id}`}
									className="btn btn-primary"
								>
									Details
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="d-flex justify-content-center mt-4 mb-5">
				<button
					className="btn btn-secondary mr-2"
					onClick={handlePrevPage}
					disabled={!info.prev}
				>
					Previous
				</button>
				<button
					className="btn btn-secondary ml-2"
					onClick={handleNextPage}
					disabled={!info.next}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default CharactersList;
