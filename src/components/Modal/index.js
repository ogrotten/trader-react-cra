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
 * 4. use this component to wrap the content to show in the modal.
 * 
 * toggleShow(): onClick method to show the modal
 * 
 */

const Modal = ({ isShowing, hide, isSmall, normal, children }) => {
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
						<h1 style={{ padding: 0, margin: 0 }}>{title()}</h1>
					</div>
					<div className="modal-content">
						{children}
					</div>
					<div className="modal-footer">
						<button data-dismiss="modal" aria-label="Close"
							onClick={() => { if (isSmall) normal(); hide(); }}
						>
							<span aria-hidden="true">OK</span>
						</button>
						<button data-dismiss="modal" aria-label="Close"
							onClick={() => { if (isSmall) normal(); hide(); }}
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