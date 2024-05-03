import React from 'react';
import { SafeAreaView, View, Text, StyleSheet , Image} from 'react-native';
import { SimpleLineIcons, AntDesign, Fontisto, Foundation} from '@expo/vector-icons';
import Button from '../components/Button';


const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.profile}>Hello, Emmanuel</Text>
            <View style={styles.content}>
                <View style={styles.card}>
                    <View style={styles.homeCard}>
                        <Text style={styles.text}>Welcome to Apple-apple-scab Disease detection system!</Text>
                        <Text style={styles.text}>Upload or snap an Image for instant analysis.Let's grow together</Text>
                    </View>
                    <View>
                        <Image
                            source={require("../../assets/healthy image.png")}
                            style={styles.image}
                        />
                    </View>
                </View>
                <Text style={styles.profile2}>Heal your crops</Text>
                <View style={styles.iconInputContainer}>
                    <View style={styles.icon}>
                        <SimpleLineIcons name="camera" size={24} color="green" />
                        <Text>Take a picture</Text>
                    </View>
                    <AntDesign name="arrowright" size={20} color="black" />
                    <View>
                        <View style={styles.icon}>
                            <Fontisto name="test-tube" size={24} color="green" />
                            <Text>See a diagnosis</Text>
                        </View>
                    </View>
                    <AntDesign name="arrowright" size={20} color="black" />
                    <View>
                        <View style={styles.icon}>
                            <Foundation name="clipboard-notes" size={24} color="green" />
                            <Text>Get a recommendation</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card2}>
                    <View>
                        <Button
                            label="Take a photo"
                        />
                    </View>
                    <View>
                        <Button
                            label="Upload a photo"
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        marginTop: 40
    },
    content: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        marginTop: 30
    },
    card: {
        flexDirection: 'row', // Arrange children horizontally
        backgroundColor: 'whitesmoke',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        width: 350,
        height:150
    },
    card2:{
        backgroundColor: 'whitesmoke',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        width: 350,
        height:150,
        //flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
        marginLeft:10
    },
    image:{
        width: 100,
        height: 100,
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    profile:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:25,
        marginLeft:10
    },
    profile2:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        marginTop:25,
        marginRight:210
    },
    icon:{
        width:90,
        height:90,
        marginBottom: 10,
        backgroundColor:"white",
        padding:10,
        borderRadius:10,
        alignItems: "center",
        justifyContent: "center",
        margin: 5
    },
    iconInputContainer: {
        flexDirection: 'row', // Arrange children horizontally
        backgroundColor: 'whitesmoke',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        width: 350,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 40
    },
});

export default Home;