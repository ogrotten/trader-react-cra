import React, { useState, useContext } from 'react';
import { GameContext } from "../../contexts/GameContext"

import useModal from "../../hooks/useModal"
import Modal from "../Modal"

// import styled from "styled-components";

// import { d100, dAny, dRange } from "../../engines/dice"

import "./Money.scss"

const Money = (props) => {
	const [data, setData] = useState({})
	const [transactionCount, setTransactionCount] = useState(0)
	const [transactionType, setTransactionType] = useState("put")

	const { playerState: { cash, bank, debt, position } } = useContext(GameContext)
	const { modalShow, modalHide, isShowing } = useModal()

	const beginBank = () => {
		setTransactionCount(0)
		setTransactionType("put")
		setData({
			title: "Gonk National Bank",
			type: "bank",
			eventAction,
		})
		modalShow()
	}
	const beginShark = () => {
		setData({
			title: "Fast Eddies, LLC",
			type: "shark",
			eventAction,
		})
		modalShow()
	}

	const eventAction = () => {
		return
	}

	const endTransaction = () => {
		console.log(`conlog: `, transactionCount, transactionType)
		modalHide()
	}

	const getCount = (e) => {
		setTransactionCount(+e.currentTarget.value)
	}

	return (
		<section className="money">
			<div className="cash">Cash: {cash}</div>
			<div className="bank">
				Bank: {bank}
				{position === 1 &&
					<>
						<br />
						<button className="buysell-button" onClick={beginBank}>Go to Bank</button>
					</>
				}
			</div>
			<div className="debt">
				Debt: {debt}
				{position === 1 &&
					<>
						<br />
						<button className="buysell-button" onClick={beginShark}>Visit Loan Shark</button>
					</>
				}
			</div>
			<Modal data={data}
				isShowing={isShowing}
				hide={modalHide}
				normal={false}
				okAction={endTransaction}
			>
				{data.type === "bank"
					? <form onSubmit={endTransaction}>
						<input name="deposit" type="radio" checked={transactionType === 'put'} value="put" onChange={() => setTransactionType('put')} /> Deposit
						<input name="withdraw" type="radio" checked={transactionType === 'get'} value="get" onChange={() => setTransactionType('get')} /> Withdraw
						<input name="amount" type="range" min={0} max={cash} defaultValue={0} onChange={getCount} style={{ width: "100%" }} />
						{transactionCount}
					</form>
					: <>
						Shark
					</>
				}
			</Modal>
		</section>
	)
}

export default Money