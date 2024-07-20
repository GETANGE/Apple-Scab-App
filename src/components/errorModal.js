import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const ErrorModal = ({ isVisible, errorMessage, onClose }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} onBackButtonPress={onClose}>
        <View style={styles.modalContainer}>
            <Text style={styles.errorTitle}>Error</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ff5c5c',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ErrorModal;
