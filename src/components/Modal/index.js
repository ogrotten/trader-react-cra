import React from 'react';
import ReactDOM from 'react-dom';

import "./Modal.scss"

/**
 * 1. import useModal methods in the component where the button is placed
 * 2. use toggleShow() on the button element
 * 3. pass the other modal hook methods as props to this modal content component.
 * 4. use this component to wrap the content for show in the modal.
 */

const Modal = ({ data, isShowing, hide, normal, okAction, children }, props) => {

	const doOkButton = () => {
		if (typeof data.eventAction === "function") {
			data.eventAction()
		}
		okAction()
	}

	return isShowing && ReactDOM.createPortal(
		<React.Fragment>
			<div className="modal-overlay" />
			<div className={`modal-wrapper ${normal ? "modal-wrapper-regular" : "modal-wrapper-small"}`} aria-modal aria-hidden tabIndex={-1} role="dialog">
				<div className="modal">
					<div className="modal-header">
						<h1 style={{ padding: 0, margin: 0 }}>
							{data.title || data.type} {data?.name}
						</h1>
					</div>
					<div className="modal-content">
						{children}
					</div>
					<div className="modal-footer">
						{okAction &&
							<button data-dismiss="modal" aria-label="Close"
								onClick={doOkButton}
							>
								<span aria-hidden="true">OK</span>
							</button>
						}
						{data.type !== "Event" &&
							<button data-dismiss="modal" aria-label="Close"
								onClick={hide}
							>
								<span aria-hidden="true">Cancel</span>
							</button>
						}
					</div>
				</div>
			</div>
		</React.Fragment>, document.getElementById("main")
	)
}

export default Modal;