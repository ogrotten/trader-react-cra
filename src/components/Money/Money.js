import React from 'react';
import styled from "styled-components";

import { d100, dAny, dRange } from "../../engines/dice"

import "./Money.scss"

const Money = (props) => {
	console.log(`Money.js 9: `, props.player)
	const {cash, debt, bank} = props.player

	return (
		<section className="money">
			<div className="cash">Cash: {cash}</div>
			<div className="bank">Bank: {bank}</div>
			<div className="debt">Debt: {debt}</div>
		</section>
	)
}

export default Money