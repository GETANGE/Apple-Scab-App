import React from 'react';
import { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet , Image, Pressable, Modal, ToastAndroid, TouchableOpacity} from 'react-native';
import { SimpleLineIcons, AntDesign, Fontisto, Foundation, FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

// Function to pick image from gallery
const pickImageAsync = async () => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });


        console.log(JSON.stringify(result));

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowModal(true);

            const { uri } = result.assets[0]; // Destructure uri from the object
                if (!uri) {
                console.warn('No image URI found in the result');
                return; // Handle the case where uri is missing
                }

                console.log("image has been selected");
                const formData = new FormData();
        
                formData.append('file',  {
                    uri: uri,
                    type: result.assets[0].mimeType ,
                    name: "apple.png",
                });  // Append image data with filename

                const config = {
                    method: 'post',
                    url: `https://scab-model.onrender.com/predict`,
                    headers: { 
                      'Content-Type': 'multipart/form-data'
                    },
                    data : formData
                  };
                  
        
                const response = await axios(config)
                console.log(response.data);
            } else {
                console.log('Image selection cancelled');
            }
    } catch (error) {
        console.log('Error:', error);
    }
};

return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    ToastAndroid.show("Modal has been closed.", ToastAndroid.SHORT)
                    setShowModal(!showModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {selectedImage && <Image source={{ uri: selectedImage }} style={{width: 300, height:200, borderRadius: 10}} />}
                        <TouchableOpacity
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={() => setShowModal(!showModal)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                        <Text>{selectedImage}</Text>

                        {/* <TouchableOpacity
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={handlePickImage}
                        >
                            <Text style={styles.textStyle}>Predict</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal>

            {showModal && (
                <View style={styles.faintTint}/>
            )}

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
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Take a photo</Text>
                        </Pressable>
                    </View>

                    {/* Upload a photo button */}
                    <View style={styles.buttonContainer}>
                        <FontAwesome5 name="upload" size={24} color="green" style={styles.icon2} />
                        <Pressable onPress={pickImageAsync} style={styles.button}>
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
        // marginTop: 40
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
        marginTop:50,
        marginLeft:10,
        marginBottom:10
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 580,
        width: 330,
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'green', 
        borderRadius: 5, 
        padding: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        height:39,
        width: 100,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    faintTint: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        zIndex: 6, // Ensure the tint is behind the modal
    },
});

export default Home;