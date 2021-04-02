import React, { useState, useContext } from 'react'
import { GameContext } from "../../contexts/GameContext"


export const BuyModal = ({ data: { price, name } }) => {
	const [count, setCount] = useState(0)
	const { playerState: { cash }, buyItem } = useContext(GameContext)

	const afford = Math.floor(cash / price)

	const getCount = (e) => {
		setCount(e.target.value)
	}
	return (
		<div>
			<p>How much {name} do you want to buy?</p>
			<input type="range" min="0" max={Math.floor(cash / price)} defaultValue="0" onChange={getCount} />
			<div>{count} at €${price} = {count * price}</div>
		</div>
	)
}