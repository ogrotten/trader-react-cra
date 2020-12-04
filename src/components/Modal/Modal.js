import React from 'react';
import ReactDOM from 'react-dom';

import "./Modal.css"

const Modal = ({ isShowing, hide }) => isShowing ? (
	<React.Fragment>
		<div className="modal-overlay" />
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				<div className="modal-header">
					<h1 style={{padding: 0, margin: 0}}>header</h1>
				</div>
				<div className="modal-content">
					<p>content</p>
				</div>
				<div className="modal-footer">
					<button type="button" className="modal-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
						<span aria-hidden="true">OK</span>
					</button>
					<button type="button" className="modal-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
						<span aria-hidden="true">Cancel</span>
					</button>
				</div>
			</div>
		</div>
	</React.Fragment>
) : null; 

export default Modal;