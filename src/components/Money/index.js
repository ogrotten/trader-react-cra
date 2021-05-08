import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from "../../contexts/GameContext"

import useModal from "../../hooks/useModal"
import Modal from "../Modal"

// import styled from "styled-components";

// import { d100, dAny, dRange } from "../../engines/dice"

import "./Money.scss"

const Money = (props) => {
	const [data, setData] = useState({})
	const [txCount, setTxCount] = useState(0)
	const [txMax, setTxMax] = useState(0)
	const [txType, setTxType] = useState("")
	const [enableShark, setEnableShark] = useState(0)

	const { playerState, playerState: { cash, bank, debt, position }, changeBank, changeDebt, changeFlag } = useContext(GameContext)
	const { modalShow, modalHide, isShowing } = useModal()

	const beginBank = () => {
		setTxCount(0)
		setTxType("put")
		setData({
			title: "Gonk National Bank",
			type: "bank",
			eventAction,
		})
		modalShow()
	}
	const beginShark = () => {
		setTxCount(0)
		setTxType("put")
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
		const doChange = data.type === "bank" ? changeBank : changeDebt
		if (txType === "put") {
			doChange(txCount)
		} else if (txType === "get") {
			doChange(0 - txCount)
		}
		modalHide()
	}

	const getCount = (e) => {
		setTxCount(+e.currentTarget.value)
	}

	useEffect(() => {
		let duckets
		if (txType === "put") {
			if (data.type === "bank") {
				duckets = cash
			} else if (data.type === "shark") {
				duckets = debt
			}
		} else if (txType === "get") {
			if (data.type === "bank") {
				duckets = bank
			} else if (data.type === "shark") {
				duckets = cash / 4 || 2000
			}
		}
		setTxMax(duckets)
		setTxCount(0)
	}, [isShowing, txType])

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
						<button disabled={playerState.flags.shark} className="buysell-button" onClick={beginShark}>Visit Loan Shark</button>
					</>
				}
			</div>
			<Modal data={data}
				isShowing={isShowing}
				hide={modalHide}
				normal={false}
				okAction={endTransaction}
			>
				{data.type === "bank" &&
					<form onSubmit={endTransaction}>
						<input name="deposit" type="radio" checked={txType === 'put'} value="put" onChange={() => setTxType('put')} /> Deposit
						<input name="withdraw" type="radio" checked={txType === 'get'} value="get" onChange={() => setTxType('get')} /> Withdraw
						<input name="amount" type="range" min={0} max={txMax} defaultValue={0} onChange={getCount} style={{ width: "100%" }} />
						<p>{txCount}</p>
						<p>{cash === 0 && txType === "put" && "No cash to deposit!"}</p>
						<p>{bank === 0 && txType === "get" && "No funds in bank!"}</p>
					</form>
				}
				{data.type === "shark" &&
					<form onSubmit={endTransaction}>
						<input name="payoff" type="radio" checked={txType === 'put'} value="put" onChange={() => setTxType('put')} /> Pay off
						<input name="incur" type="radio" checked={txType === 'get'} value="get" onChange={() => setTxType('get')} /> Get loan
						<input name="amount" type="range" min={0} max={txMax} defaultValue={0} onChange={getCount} style={{ width: "100%" }} />
						<p>{txCount}<br /></p>
						<p>{debt === 0 && txType === "put" && "No debt to pay off!"}</p>
					</form>
				}
			</Modal>
		</section>
	)
}

export default Money