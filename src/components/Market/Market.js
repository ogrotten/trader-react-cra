import React from 'react';
import styled from "styled-components";

import MarketTable from "./MarketTable"

import { d100, dAny, dRange } from "../../engines/dice"

import "./Market.scss"

const Market = () => {
	return (
		<MarketTable />
	)
}

// function d100() {
// 	return Math.ceil(Math.random() * 100)
// }

// function dAny(x) {
// 	return Math.ceil(Math.random() * x)
// }

// function dRange(n, x) {
// 	const range = x - (n - 1)
// 	return Math.ceil(Math.random() * range) + (n - 1)
// }

function dicetest() {
	/* 
	
	For dicetest output, put this in the component return.
	
	const m = dicetest();
	<ul>
		{
			m.map((e, i) => {
				return <li key={i}>{i} count {e}</li>
			})
		}
	</ul>
	
	 */
	let i = 0
	let result = new Array(20).fill(0)
	while (i < 1000) {
		let roll = dRange(5, 10)
		result[roll] += 1
		i++
	}
	return result
}

export default Market