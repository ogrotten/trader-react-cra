import React from 'react';
import styled from "styled-components";

import "./Market.scss"

const Market = () => {
	return (
		<section className="market-table">
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Price</th>
						<th>Name</th>
						<th>&nbsp;</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="count">991</td>
						<td className="price">9999999</td>
						<td className="name">Fluxnet</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>992</td>
						<td>9999999</td>
						<td>Solo</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>993</td>
						<td>9999999</td>
						<td>Zillion</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>997</td>
						<td>9999999</td>
						<td>Valeradone</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>994</td>
						<td>9999999</td>
						<td>Altered Calm</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>995</td>
						<td>9999999</td>
						<td>Nails</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>996</td>
						<td>9999999</td>
						<td>Hyfit</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
					<tr>
						<td>998</td>
						<td>9999999</td>
						<td>Nanozine</td>
						<td className="buysell-cell"><button className="buysell-button">buy</button></td>
						<td className="buysell-cell"><button className="buysell-button">sell</button></td>
					</tr>
				</tbody>
			</table>
		</section>
	)
}

function d100() {
	return Math.ceil(Math.random() * 100)
}

function dAny(x) {
	return Math.ceil(Math.random() * x)
}

function dRange(n, x) {
	const range = x - (n - 1)
	return Math.ceil(Math.random() * range) + (n - 1)
}

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