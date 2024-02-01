import React from 'react';
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProductModal = ({ isOpen, closeModal, product }) => {
    return(
        <Modal isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel='Product Details'
        >
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={closeModal}>Close</button>
        </Modal>
    )
}

export default ProductModal;