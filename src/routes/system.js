import React, {useState} from "react"
import {Stack, Button, Container, Modal} from 'react-bootstrap'

function System() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showreset, setReset] = useState(false);
    const handleCloseReset = () => setReset(false);
    const handleReset = () => setReset(true);
    return(
        // <div className="mb-2">
        //     <Button type='reset' variant="primary" size="lg">Reboot</Button>
        // </div>
        <div class="d-flex flex-row justify-content-center align-items-center" style={{height: '750px'}}>
            <Container>
                {/* <div class="d-grid gap-2 col-6 mx-auto"> */}
                <Stack gap={2} style={{display: 'flex'}}>
                {/* <button type="button" class="btn btn-warning btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#exampleModal">Reboot</button> */}
                <Button variant="primary" onClick={handleShow}>Reboot</Button>
                <Button variant="primary" onClick={handleReset}>Reset</Button>
                {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>
                <button type="button" class="btn btn-danger btn-lg btn-block" text-align>Factory Reset</button> */}
                {/* </div> */}
                </Stack>

                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Reboot Device</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Reboot will take around 2 minutes.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            <Button variant="primary" onClick={handleClose}>Yes</Button>
                        </Modal.Footer>
                </Modal>
                <Modal show={showreset} onHide={handleCloseReset} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Factory Reset</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Warning: Your networks and related data will be deleted. This action cannot be undone.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseReset}>Cancel</Button>
                            <Button variant="primary" onClick={handleCloseReset}>Yes</Button>
                        </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}

export default System;