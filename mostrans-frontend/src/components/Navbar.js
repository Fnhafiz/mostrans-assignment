// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<Link className="navbar-brand" to="/">
				Rick&Morty
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" to="/">
							Characters List
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/location">
							Characters By Location
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
