import React from 'react';
import { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet , Image, Pressable, Modal, Button, Alert} from 'react-native';
import { SimpleLineIcons, AntDesign, Fontisto, Foundation, FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Function to pick image from gallery
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        });
        if (!result.canceled) {
            setSelectedImage(result.uri);
            setShowModal(true);
        } else {
            alert('You did not select any image.');
        }
    };

return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.profile}>Hello, Emmanuel</Text>
            <View style={styles.content}>
                {/* Home Card */}
                <View style={styles.card}>
                    <View style={styles.homeCard}>
                        <Text style={styles.text}>Welcome to Apple-apple-scab Disease detection system!</Text>
                        <Text style={styles.text}>Upload or snap an Image for instant analysis. Let's grow together</Text>
                    </View>
                    <View>
                        <Image
                            source={require("../../assets/healthy image.png")}
                            style={styles.image}
                        />
                    </View>
                </View>

                {/* Button Icons */}
                <Text style={styles.profile2}>Heal your crops</Text>
                <View style={styles.iconInputContainer}>
                    {/* Take a picture */}
                    <View style={styles.icon}>
                        <SimpleLineIcons name="camera" size={24} color="green" />
                        <Text>Take a picture</Text>
                    </View>
                    <AntDesign name="arrowright" size={20} color="black" />

                    {/* See a diagnosis */}
                    <View style={styles.icon}>
                        <Fontisto name="test-tube" size={24} color="green" />
                        <Text>See a diagnosis</Text>
                    </View>
                    <AntDesign name="arrowright" size={20} color="black" />

                    {/* Get a recommendation */}
                    <View style={styles.icon}>
                        <Foundation name="clipboard-notes" size={24} color="green" />
                        <Text>Get a recommendation</Text>
                    </View>
                </View>

                {/* Upload Photo Buttons */}
                <View style={styles.card2}>
                    {/* Take a photo button */}
                    <View style={styles.buttonContainer}>
                        <FontAwesome5 name="camera" size={24} color="green" style={styles.icon2} />
                        <Pressable onPress={pickImageAsync} style={styles.button}>
                            <Text style={styles.buttonText}>Take a photo</Text>
                        </Pressable>
                    </View>

                    {/* Upload a photo button */}
                    <View style={styles.buttonContainer}>
                        <FontAwesome5 name="upload" size={24} color="green" style={styles.icon2} />
                        <Pressable onPress={() => setShowModal(true)} style={styles.button}>
                            <Text style={styles.buttonText}>Upload a photo</Text>
                        </Pressable>
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
        //marginTop: 40
    },
    content: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        marginTop: 5,
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
        flexDirection: 'row',
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
        marginTop:5,
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
        marginTop: 10,
        marginBottom: 40
    },
    buttonContainer: {
        flex: 1, // Take up equal space
        marginHorizontal: 5, // Add some space between buttons
        marginTop: 30,
        width:'50%'
    },
    button: { 
        backgroundColor: 'green', 
        borderRadius: 5, 
        padding: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        height:39,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    icon2: {
        marginBottom: 10, // Add some space between icon and button text
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 50
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default Home;