import React, { useState } from 'react';
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from 'recoil';
import styled from "styled-components";

import Modal from "./components/Modal"
import useModal from "./hooks/useModal"

import Market from "./components/Market/Market"
import Location from "./components/Location"

import './App.scss';

const { MINIMUM_AVAILABLE, TRAVEL } = require("./data/config")

const Main = styled.div`
	// border: 1px solid black;
	width: 432px;
	height: 768px;
	`

const App = () => {
	const { isShowing, toggleShow, isSmall, toggleSmall } = useModal()

	const traveltext = () => {
		return TRAVEL[Math.floor(Math.random() * TRAVEL.length)]
	}

	return (
		<RecoilRoot>
			<div className="container">
				<Main id="main" className="main">
					<Market />
					<div className="mainFooter">
						<button onClick={toggleShow}>{traveltext()}. . .</button>
					</div>
					<Location isShowing={isShowing} hide={toggleShow} isSmall={isSmall} normal={toggleSmall}>
						<div>a child of the thing</div>
					</Location>
				</Main>
			</div>
		</RecoilRoot>
	)
}

export default App;
