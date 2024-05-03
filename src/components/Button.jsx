import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '50%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'green',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: 'white',
        fontSize: 16,
    },
});
