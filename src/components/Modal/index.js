import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { GameContext } from "../../contexts/GameContext"

import "./Modal.scss"

/**
 * 1. import useModal methods in the component where the button is placed
 * 2. use toggleShow() on the button element
 * 3. pass the other modal hook methods as props to this modal content component.
 * 4. use this component to wrap the content for show in the modal.
 */

const Modal = ({ data, isShowing, hide, normal, okAction, children }) => {
	return isShowing && ReactDOM.createPortal(
		<React.Fragment>
			<div className="modal-overlay" />
			<div className={`modal-wrapper ${normal ? "modal-wrapper-regular" : "modal-wrapper-small"}`} aria-modal aria-hidden tabIndex={-1} role="dialog">
				<div className="modal">
					<div className="modal-header">
						<h1 style={{ padding: 0, margin: 0 }}>
							{data.type} {data?.name}
						</h1>
					</div>
					<div className="modal-content">
						{children}
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
	)
}

export default Modal;