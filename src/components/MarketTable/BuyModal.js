import React, { useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"


export const BuyModal = ({ data: { price, name }, transaction: { transactionCount, setTransactionCount } }) => {
	const { playerState: { cash, space }, remainingSpace } = useContext(GameContext)

	const maxBuy = () => {
		return Math.min(Math.floor(cash / price), space - remainingSpace())
	}

	const getCount = (e) => {
		setTransactionCount(+e.target.value)
	}

	return (
		<div>
			<p>How much {name} do you want to buy?</p>
			<input type="range" min={0} max={maxBuy()} defaultValue={0} onChange={getCount} style={{ width: "100%" }} />
			<div>{transactionCount} at €${price} = {transactionCount * price}</div>
		</div>
	)
}