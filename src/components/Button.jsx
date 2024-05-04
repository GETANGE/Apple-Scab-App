import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, styles }) {
    return (
        <View >
            <Pressable onPress={() => alert('You pressed a button.')}>
                <Text >{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

});
