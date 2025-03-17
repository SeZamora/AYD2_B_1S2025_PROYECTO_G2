import React from 'react';
import Modal from 'react-modal';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import FacturaPDF from './FacturaPDF';
import { saveAs } from 'file-saver';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginTop: '40px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%', // Reducimos el tamaño del modal
        height: '80%', // Ajustamos la altura
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

const ModalFactura = ({ onClose, factura, id_factura, isOpen }) => {
    
    // Función para generar y descargar el PDF
    const handleDownloadPDF = async () => {
        const blob = await pdf(<FacturaPDF factura={factura} id_factura={id_factura} />).toBlob();
        saveAs(blob, `Factura_${id_factura}.pdf`);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
            ariaHideApp={false}
        >
            <div style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
                {/* Botón de Descargar y Cerrar */}
                <button 
                    onClick={handleDownloadPDF} 
                    style={{
                        backgroundColor: '#2C3E50',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderRadius: '5px',
                        marginRight: '10px',
                    }}
                >
                    Descargar PDF
                </button>
                <button 
                    onClick={onClose}
                    style={{
                        backgroundColor: '#E74C3C',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderRadius: '5px',
                    }}
                >
                    Cerrar
                </button>
            </div>

            {/* PDF Viewer con tamaño ajustado */}
            {factura ? (
                <PDFViewer style={{ width: '100%', height: '85%', border: '1px solid #ccc' }}>
                    <FacturaPDF factura={factura} id_factura={id_factura} />
                </PDFViewer>
            ) : (
                <p>Cargando factura...</p>
            )}
        </Modal>
    );
};

export default ModalFactura;
