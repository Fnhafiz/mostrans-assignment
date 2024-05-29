import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import CharactersList from "./CharactersList";

// Mock axios
jest.mock("axios");

const mockCharactersData = {
	data: {
		results: [
			{
				id: 1,
				name: "Rick Sanchez",
				image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
			},
			{
				id: 2,
				name: "Morty Smith",
				image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
			},
		],
		info: {
			count: 826,
			pages: 42,
			next: "https://rickandmortyapi.com/api/character?page=2",
			prev: null,
		},
	},
};

describe("CharactersList", () => {
	beforeEach(() => {
		axios.get.mockResolvedValue(mockCharactersData);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("renders CharactersList and fetches data", async () => {
		render(
			<Router>
				<CharactersList />
			</Router>
		);

		expect(screen.getByText("Characters List")).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.getByText("Morty Smith")).toBeInTheDocument();
		});
	});

	test("navigates to the next page", async () => {
		render(
			<Router>
				<CharactersList />
			</Router>
		);

		await waitFor(() => {
			expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
		});

		const nextButton = screen.getByText("Next");
		fireEvent.click(nextButton);

		await waitFor(() => {
			expect(axios.get).toHaveBeenCalledWith(
				"https://rickandmortyapi.com/api/character?page=2"
			);
		});
	});

	test("previous button is disabled on the first page", async () => {
		render(
			<Router>
				<CharactersList />
			</Router>
		);

		const prevButton = screen.getByText("Previous");
		expect(prevButton).toBeDisabled();
	});
});
