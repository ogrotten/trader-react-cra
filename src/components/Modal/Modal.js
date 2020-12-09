import React from 'react';
import ReactDOM from 'react-dom';

import "./Modal.scss"

const Modal = ({ isShowing, hide, isSmall, normal }) => {
	
	return isShowing ? ReactDOM.createPortal(
		<React.Fragment>
			<div className="modal-overlay" />
			<div className={`modal-wrapper ${isSmall === true ? "modal-wrapper-small" : "modal-wrapper-regular"}`} aria-modal aria-hidden tabIndex={-1} role="dialog">
				<div className="modal">
					<div className="modal-header">
						<h1 style={{ padding: 0, margin: 0 }}>header</h1>
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