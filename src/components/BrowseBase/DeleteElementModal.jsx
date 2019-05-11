import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export class DeleteElementModal extends Component {

  state = { open: false, element: null };

  open = (element) => {
    this.setState({ open: true, element });
  };

  close = () => {
    this.setState({ open: false, element: null });
  };

  render = () =>
    <Modal isOpen={this.state.open} toggle={this.close}>
      <ModalHeader toggle={this.close}>{this.props.title}</ModalHeader>
      <ModalBody>
        {this.state.element && this.props.renderContent(this.state.element)}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={this.close}>
          Cancelar
        </Button>
        <Button color="primary" onClick={() => this.props.deleteElement(this.state.element)
          .then(() => this.props.onDelete(this.state.element))
          .then(() => this.close())}
        >
          Confirmar
        </Button>
      </ModalFooter>
    </Modal>;
}
