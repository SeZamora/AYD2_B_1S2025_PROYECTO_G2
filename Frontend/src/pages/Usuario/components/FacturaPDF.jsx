import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos mejorados
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#333',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        textTransform: 'uppercase',
        color: '#2C3E50',
    },
    section: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    table: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    tableHeader: {
        backgroundColor: '#2C3E50',
        flexDirection: 'row',
        padding: 8,
        color: '#fff',
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 6,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    totalSection: {
        marginTop: 10,
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
});

// Componente FacturaPDF
const FacturaPDF = ({ factura, id_factura }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.title}>Factura de Venta</Text>
                </View>

                <View style={styles.section}>
                    <Text>Número de Factura: {id_factura}</Text>
                    <Text>Vendedor: {factura.nombre_vendedor}</Text>
                    <Text>Comprador: {factura.nombre_comprador}</Text>
                    <Text>Fecha: {factura.fecha_hora}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Detalles de la Compra</Text>
                    <View style={styles.table}>
                        

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableCell}>Producto o Libro ID</Text>
                            <Text style={styles.tableCell}>Nombre</Text>
                            <Text style={styles.tableCell}>Unidades</Text>
                            <Text style={styles.tableCell}>Precio Unitario</Text>
                            <Text style={styles.tableCell}>Subtotal</Text>
                        </View>

                        {/* Filas de productos */}
                        {factura.detalles.map((detalle, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{detalle.producto_id || detalle.libro_id}</Text>
                                <Text style={styles.tableCell}>{detalle.nombre || detalle.titulo}</Text>
                                <Text style={styles.tableCell}>{detalle.unidades_compradas}</Text>
                                <Text style={styles.tableCell}>Q {detalle.precio_producto}</Text>
                                <Text style={styles.tableCell}>
                                    Q {(detalle.unidades_compradas * detalle.precio_producto).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.totalSection}>
                    <Text>Total: Q {factura.total_venta}</Text>
                </View>

            </Page>
        </Document>
    );
};

export default FacturaPDF;
