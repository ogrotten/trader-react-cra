import React from 'react';
import ReactDOM from 'react-dom';
import { useRecoilValue } from "recoil"
import { getModalInfo } from '../../recoil/selectors';

import "./Modal.scss"

const Modal = ({ isShowing, hide, isSmall, normal }) => {
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
						<p>content</p>
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