import React from 'react';
import { RecoilRoot } from 'recoil';
import styled from "styled-components";

import Modal from "./components/Modal/Modal"
import Market from "./components/Market/Market"
import useModal from "./hooks/useModal"

import './App.scss';

const {  TRAVEL } = require("./data/config")

const Main = styled.div`
	// border: 1px solid black;
	width: 432px;
	height: 768px;
	`

const App = () => {
	const { isShowing, toggleShow, isSmall, toggleSmall } = useModal()

	const traveltext = () => {
		// if (current === 1) {return "Travel"}
		// else {
		return TRAVEL[Math.floor(Math.random() * TRAVEL.length)]
		// }
	}

	return (
		<RecoilRoot>
			<div className="container">
				<Main id="main" className="main">
					<Market />
					<div className="mainFooter">
						<button onClick={toggleShow}>{traveltext()}. . .</button>
					</div>
					<Modal isShowing={isShowing} hide={toggleShow} isSmall={isSmall} normal={toggleSmall} />
				</Main>
			</div>
		</RecoilRoot>
	)
}

export default App;
