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

	const { playerState: { cash, bank, debt, position, worth }, changeBank, changeDebt, flags } = useContext(GameContext)
	const { modalShow, modalHide, isShowing } = useModal()

	const beginBank = () => {
		setTxCount(0)
		setTxType("put")
		setData({
			title: "Gonk National Bank",
			type: "bank",
		})
		modalShow()
	}
	const beginShark = () => {
		setTxCount(0)
		setTxType("get")
		setData({
			title: "Fast Eddies, LLC",
			type: "shark",
		})
		modalShow()
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
				duckets = Math.max(worth / 4, 2000)
			}
		}
		setTxMax(duckets)
		setTxCount(0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShowing, txType])

	return (
		<div>
			<section className="money">
				<div className="cash">Cash: {cash}</div>
				<div className="bank">
					Bank: {bank}
				</div>
				<div className="debt">
					Debt: {debt}
				</div>
			</section>
			<section className="money">
				<div>&nbsp;</div>
				{position === 1 &&
					<button className="buysell-button" onClick={beginBank}>Go to Bank</button>
				}
				{position === 1 &&
					<button className="buysell-button" onClick={beginShark} disabled={flags.shark}>Visit Loan Shark</button>
				}
			</section>
			<Modal data={data}
				isShowing={isShowing}
				hide={modalHide}
				normal={false}
				okAction={endTransaction}
			>
				{data.type === "bank" &&
					<form className="money-modal">
						<div className="choice">
							<label>
								<input name="deposit" type="radio" checked={txType === 'put'} value="put" onChange={() => setTxType('put')} /> Deposit
							</label>
							<label>
								<input name="withdraw" type="radio" checked={txType === 'get'} value="get" onChange={() => setTxType('get')} /> Withdraw
							</label>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
							<span style={{}}>Amount: ${txCount}</span>
							<span>
								{cash === 0 && txType === "put" && "No cash to deposit!"}
								{bank === 0 && txType === "get" && "No funds in bank!"}
							</span>
						</div>
						<input name="amount" type="range" min={0} max={txMax} defaultValue={0} onChange={getCount} style={{ width: "100%" }} />
					</form>
				}
				{data.type === "shark" &&
					<>
						<form className="money-modal">
							<div className="choice">
								<label>
									<input name="incur" type="radio" checked={txType === 'get'} value="get" onChange={() => setTxType('get')} /> Get loan
								</label>
								<label>
									<input name="payoff" type="radio" checked={txType === 'put'} value="put" onChange={() => setTxType('put')} /> Payoff
								</label>
							</div>
							<div className="amounter" style={{ display: "flex", justifyContent: "space-between", margin: "0 0 0 3px" }}>
								<span>Amount: ${txCount}</span>
								<span>
									{debt === 0 && txType === "put" && "No debt to pay off!"}
								</span>
							</div>
							<input name="amount" type="range" min={0} max={txMax} defaultValue={0} onChange={getCount} style={{ width: "100%" }} />
						</form>
						{/* <form>
							<input name="payoff" type="radio" checked={txType === 'put'} value="put" onChange={() => setTxType('put')} /> Pay off
						<input name="incur" type="radio" checked={txType === 'get'} value="get" onChange={() => setTxType('get')} /> Get loan
						<input name="amount" type="range" min={0} max={txMax} defaultValue={0} onChange={getCount} style={{ width: "100%" }} />
							<p>{txCount}<br /></p>
							<p>{debt === 0 && txType === "put" && "No debt to pay off!"}</p>
						</form> */}
					</>
				}
			</Modal>
		</div >
	)
}

export default Money