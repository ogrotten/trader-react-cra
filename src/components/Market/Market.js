import React from 'react';
// import ReactDOM from 'react-dom';

import "./Market.scss"

const Market = () => {
	return (
		<section>
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
						<td>991</td>
						<td>9999999</td>
						<td>Fluxnet</td>
						<td>lovendale0@w3.org</td>
						<td>7850 Old Shore Drive</td>
					</tr>
					<tr>
						<td>992</td>
						<td>9999999</td>
						<td>Solo</td>
						<td>itassell1@ow.ly</td>
						<td>245 Merchant Circle</td>
					</tr>
					<tr>
						<td>993</td>
						<td>9999999</td>
						<td>Zillion</td>
						<td>emercer2@ow.ly</td>
						<td>70700 Kipling Pass</td>
					</tr>
					<tr>
						<td>994</td>
						<td>9999999</td>
						<td>Altered Calm</td>
						<td>cwhitley3@wsj.com</td>
						<td>03 Service Terrace</td>
					</tr>
					<tr>
						<td>995</td>
						<td>9999999</td>
						<td>Nails</td>
						<td>csmitheram4@rambler.ru</td>
						<td>9 Eliot Parkway</td>
					</tr>
					<tr>
						<td>996</td>
						<td>9999999</td>
						<td>Hyfit</td>
						<td>bsked5@51.la</td>
						<td>03418 Ludington Plaza</td>
					</tr>
					<tr>
						<td>997</td>
						<td>9999999</td>
						<td>Valeradone</td>
						<td>hcrother6@opera.com</td>
						<td>7932 Sloan Park</td>
					</tr>
					<tr>
						<td>998</td>
						<td>9999999</td>
						<td>Nanozine</td>
						<td>tajean7@sfgate.com</td>
						<td>2 Schurz Junction</td>
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