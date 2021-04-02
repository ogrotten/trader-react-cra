import React, { useState, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"


export const BuyModal = ({ data: { price, name }, transaction: { transactionCount, setTransactionCount } }) => {
	const { playerState: { cash } } = useContext(GameContext)

	const getCount = (e) => {
		setTransactionCount(e.target.value)
	}

	return (
		<div>
			<p>How much {name} do you want to buy?</p>
			<input type="range" min={0} max={Math.floor(cash / price)} defaultValue={0} onChange={getCount} />
			<div>{transactionCount} at €${price} = {transactionCount * price}</div>
		</div>
	)
}