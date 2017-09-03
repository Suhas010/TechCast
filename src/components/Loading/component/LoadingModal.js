import React, { Component } from "react";
import { Col, Modal, Button, Row } from "react-bootstrap";

class LoadingModal extends Component {

	constructor(props) {
		super(props);

	}


	/**
	 * @description Returns Popup Modal Loading gif  
	 * 
	 * @author Suhas R More
	 * @returns 
	 * @memberof LoadingModal
	 */
	render() {

		return (
			<Modal show={true}>

				<Modal.Body>
					<Row>
						<Col sm={5}>
						</Col>
						<Col sm={3}>
							<div>
								<img src="../image/loading.gif" height="100px;" width="139px" />
								<br />
								Loading...
						</div>
						</Col>

					</Row>
				</Modal.Body>

			</Modal>
		);
	}
}

export default LoadingModal;

