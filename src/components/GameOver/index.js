import React, { useContext, } from 'react'
import { GameContext } from "../../contexts/GameContext"

import "./GameOver.scss"

const GameOver = () => {
	const { /* log, */ playerState: { cash, debt, bank, worth } } = useContext(GameContext)
	return (
		<div>
			<h2>After a year...</h2>
			<p>Cash: {cash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
			<p>Bank: {bank.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
			<p>Inventory value: {worth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
			<p>Debt: {debt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>

			<h1>{(cash + bank + worth - debt).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h1>
		</div>
	)
}

export default GameOver

// Basic turn log
// {log.map((turn, idx) => {
// 	return <div>
// 		<p key={idx}>Turn {idx} </p>
// 		<ul>
// 			{turn.map((item, i) => {
// 				return <li key={i}>{Object.keys(item)[0]}: {Object.values(item)[0]}</li>
// 			})}
// 		</ul>
// 	</div>
// })}