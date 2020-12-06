import React from 'react';
import styled from "styled-components";

import Modal from "./components/Modal/Modal"
import Market from "./components/Market/Market"
import useModal from "./hooks/useModal"

import './App.css';

const Main = styled.div`
	border: 1px solid black;
	width: 432px;
	height: 768px;
	`

const App = () => {
	const {isShowing, toggle} = useModal()

	return (
		<div className="container">
			<Main className="main">
				<Market />
				<div className="mainFooter">
					<button onClick={toggle}>Modal</button>
				</div>
				<Modal isShowing={isShowing} hide={toggle} />
			</Main>
		</div>
	)
}

export default App;
