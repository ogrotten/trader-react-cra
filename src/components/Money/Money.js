import React, { useContext } from 'react';
import { GameContext } from "../../contexts/GameContext"

// import styled from "styled-components";

// import { d100, dAny, dRange } from "../../engines/dice"

import "./Money.scss"

const Money = (props) => {
	const { playerState: { cash, bank, debt } } = useContext(GameContext)

	return (
		<section className="money">
			<div className="cash">Cash: {cash}</div>
			<div className="bank">Bank: {bank}</div>
			<div className="debt">Debt: {debt}</div>
		</section>
	)
}

export default Money