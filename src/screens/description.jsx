import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image, FlatList} from "react-native";

const DATA =[
    "Olive-green to black lesions on leaves, fruit and twigs",
    "Leaf curling and distortion",
    "Reduced fruit quality and yield"
]

const Description = () => {

    const renderItem = ({ item, index }) => (
        <Text style={styles.textList}>{`${index + 1}. ${item}`}</Text>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.ScrollView}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Apple-Apple-Scab Disease
                    </Text>
                    <Image
                        style={styles.image}
                        source={require('../../assets/Apple_Apple_scab8.jpg')}
                    />
                    <Text style={styles.subTitle}>Description</Text>
                    <Text style={styles.text}>
                        Apple Scab is a fungal disease caused by the pathogen Venturia inaequalis. 
                        It affects apple trees and appears as olive-green to black lesions on leaves, fruit, and twigs.
                    </Text>
                    <Text style={styles.subTitle}>Symptoms</Text>
                    <FlatList
                        data={DATA}
                        style={styles.text}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.toString()}
                    />
                    <Text style={styles.subTitle}>Treatment</Text>
                    <Text style={styles.text}>
                        Treatment involves pruning infected branches,
                        applying fungicides, and practicing good orchard hygiene to minimize disease spread.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    ScrollView:{
        width: '100%',
        height: '100%',
        marginTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:25
    },
    image: {
        width: 330,
        height: 200,
        marginBottom: 20,
        // marginLeft: 15,
        borderRadius: 10
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%'
    },
    subTitle:{
        fontSize: 20,
        color: 'green',
        marginRight:'65%',
        marginTop: 10
    },
    text: {
        marginLeft: 10,
        marginTop: 5,
        fontSize: 15,
        color: 'grey',
        marginBottom: 10
    },
    textList:{
        color: 'grey',
        fontSize: 15,
    }
})

export default Description;