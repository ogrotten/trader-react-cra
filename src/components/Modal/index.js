import React from 'react';
import ReactDOM from 'react-dom';
import { selector, useRecoilState, useRecoilValue } from "recoil"
import { player, smallModalInfo } from "../../recoil/atoms"
import { getModalInfo } from '../../recoil/selectors';

import "./Modal.scss"

/**
 * 1. import useModal methods in the component where the button is placed
 * 2. use toggleShow() on the button element
 * 3. pass the other methods as props to the modal content component.
 * 4. use this component to wrap the content for show in the modal.
 */

const Modal = ({ data, isShowing, hide, isSmall, children, okAction }) => {
	const incoming = useRecoilValue(getModalInfo)

	const title = () => {
		// uses `incoming` to determin the title of small modal
		if (incoming === "buy") return "Buy"
		if (incoming === "sell") return "Sell"
		return "!"
	}

	return isShowing ? ReactDOM.createPortal(
		<React.Fragment>
			<div className="modal-overlay" />
			<div className={`modal-wrapper ${isSmall === true ? "modal-wrapper-small" : "modal-wrapper-regular"}`} aria-modal aria-hidden tabIndex={-1} role="dialog">
				<div className="modal">
					<div className="modal-header">
						<h1 style={{ padding: 0, margin: 0 }}>
							{data.type === "buy"
								? `Buy ${data.name}`
								: `Sell ${data.name}`
							}
						</h1>
					</div>
					<div className="modal-content">
						<div>MOVED sliders n stuff go here</div>
						<div>price: {data.price}</div>
					</div>
					<div className="modal-footer">
						{okAction
							? <button data-dismiss="modal" aria-label="Close"
								onClick={okAction}
							>
								<span aria-hidden="true">OK</span>
							</button>
							: null
						}
						<button data-dismiss="modal" aria-label="Close"
							onClick={hide}
						>
							<span aria-hidden="true">Cancel</span>
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>, document.getElementById("main")
	) : null
}

export default Modal;