import React, { useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"


export const SellModal = ({ data: { price, name, id }, transaction: { transactionCount, setTransactionCount } }) => {
	const { playerState: { inv } } = useContext(GameContext)

	const avail = inv[id]
	const getCount = (e) => {
		setTransactionCount(+e.target.value)
	}

	return (
		<div>
			<p>How much {name} do you want to sell?</p>
			<input type="range" min={0} max={avail} defaultValue={0} onChange={getCount} style={{ width: "100%" }} />
			<div>{transactionCount} at €${price} = {transactionCount * price}</div>
		</div>
	)
}