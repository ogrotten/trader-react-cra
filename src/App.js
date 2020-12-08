import React from 'react';
import styled from "styled-components";

import Modal from "./components/Modal/Modal"
import Market from "./components/Market/Market"
import Infobar from "./components/Infobar/Infobar"
import useModal from "./hooks/useModal"

import './App.css';

const Main = styled.div`
	// border: 1px solid black;
	width: 432px;
	height: 768px;
	`

const App = () => {
	const {isShowing, toggleShow, isSmall, toggleSmall } = useModal()

	return (
		<div className="container">
			<Main id="main" className="main">
				<Infobar />
				<Market />
				<div className="mainFooter">
					<button onClick={toggleShow}>Modal</button>
					<button onClick={() => {toggleShow(); toggleSmall();}}>Small Modal</button>
				</div>
				<Modal isShowing={isShowing} hide={toggleShow} isSmall={isSmall} normal={toggleSmall}/>
			</Main>
		</div>
	)
}

export default App;
