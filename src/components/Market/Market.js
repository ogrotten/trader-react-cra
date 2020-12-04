import React from 'react';
import ReactDOM from 'react-dom';

import "./Market.css"

const Market = () => {


	const m = dicetest();
	return (
		<div>
		</div>
	)
}

const d100 = () => {
	return Math.ceil(Math.random() * 100)
}

const dAny = (x) => {
	return Math.ceil(Math.random() * x)
}

const dRange = (n, x) => {
	const range = x - (n - 1)
	return Math.ceil(Math.random() * range) + (n - 1)
}

const dicetest = () => {
/* 

For dicetest output, put this in the component return.

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