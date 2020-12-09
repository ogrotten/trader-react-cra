import React from 'react';
import ReactDOM from 'react-dom';
import { selector, useRecoilState, useRecoilValue } from "recoil"
import { player, stateBuysell } from "../../recoil/atoms"
import { whichBuysell } from '../../recoil/selectors';

import "./Modal.scss"

const Modal = ({ isShowing, hide, isSmall, normal }) => {
	// const [buysell, setBuysell] = useRecoilState(stateBuysell)
	const title = useRecoilValue(whichBuysell)
	
	return isShowing ? ReactDOM.createPortal(
		<React.Fragment>
			<div className="modal-overlay" />
			<div className={`modal-wrapper ${isSmall === true ? "modal-wrapper-small" : "modal-wrapper-regular"}`} aria-modal aria-hidden tabIndex={-1} role="dialog">
				<div className="modal">
					<div className="modal-header">
						<h1 style={{ padding: 0, margin: 0 }}>{title}</h1>
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