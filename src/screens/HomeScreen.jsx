import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Pressable, Modal, ToastAndroid, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, AntDesign, Fontisto, Foundation, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ErrorModal from '../components/errorModal';

const Home = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [predicted, setPredicted] = useState('');
    const [confidence, setConfidence] = useState(null);
    const [disease, setDiseaseData] = useState(null);
    const [recommend, setRecommendData] = useState(null);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ isVisible: false, message: '' });

    const showError = (message) => {
        setError({ isVisible: true, message });
    };

    // Fetch user details from AsyncStorage
    useEffect(() => {
        const fetchUserDetails = async () => {
        try {
            const username = await AsyncStorage.getItem('userName');
            if (username !== null) setUsername(username);
        } catch (error) {
            console.error('Error fetching user details', error);
        } finally {
            setLoading(false); // Set loading to false once the fetching is done
        }
        };

        fetchUserDetails();
    }, []);

    // Function to pick image from gallery
    const pickImageAsync = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 0.5,
            });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowModal(true);

            const { uri } = result.assets[0];
                if (!uri) {
                console.warn('No image URI found in the result');
                return;
            }

            const formData = new FormData();
            formData.append('file', {
                uri: uri,
                type: result.assets[0].mimeType,
                name: "apple.png",
            });

            // First API call
            try {
                const response = await axios.post('https://scab-model.onrender.com/predict', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data && response.data.Predicted && response.data.confidence !== undefined) {
                    setPredicted(response.data.Predicted);
                    setConfidence(response.data.confidence);

                    if (response.data.Predicted.length === 10) {
                    // Second API call
                    try {
                        const res = await axios.get('https://apple-plant-disease.onrender.com/api/v1/disease', {
                            params: {
                                diseases: response.data.Predicted,
                            },
                        });

                        if (res.data.status === 'success') {
                        const data = res.data.data.diseases[1];
                        setDiseaseData(data);

                        function getRandomItem(array) {
                            const randomIndex = Math.floor(Math.random() * array.length);
                            return array[randomIndex];
                        }

                        const randomItem = getRandomItem(data.treatment);
                        setRecommendData(randomItem);
                        }
                    } catch (err) {
                        console.error("Error fetching disease data:", err);
                        showError("Error occurred while fetching disease data");
                    }
                    }
                }
            } catch (error) {
            if (axios.isAxiosError(error)) {
                const statusCode = error.response?.status;
                if (statusCode === 502 || statusCode === 503) {
                    showError("This is not an apple leaf. Please try again later.");
                } else {
                    showError("An unexpected error occurred");
                }
            } else {
                console.error('Non-Axios error:', error);
                    showError("An unexpected error occurred");
            }
            }
        } else {
            console.log('Image selection cancelled');
        }
        } catch (error) {
        console.log('Error:', error);
        showError("An unexpected error occurred");
        }
    };

    const closeModal = () => {
        setDiseaseData(null);
        setPredicted('');
        setConfidence(null);
        setShowModal(!showModal);
    };

    const closeModalError = () =>{
        setError({ isVisible: false, message: '' });
    }

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
                            onPress={closeModal}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                        <Text style={styles.prediction}>Predicted:<Text style={styles.predict}>{predicted}</Text></Text>
                        <Text style={styles.prediction}>Confidence:<Text style={styles.predicting}>{confidence}</Text></Text>

                        {disease && (
                            <>
                                <Text style={styles.prediction}>Description:<Text style={styles.predict}> {disease.description}</Text></Text>
                                <Text style={styles.prediction}>Symptoms:</Text>
                                {disease.symptoms.map((symptom, index) => (
                                    <Text key={index}>- {symptom}</Text>
                                ))}
                                <Text style={styles.prediction}>Recomendation:<Text style={styles.predict}> {recommend}</Text></Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {showModal && (
                <View style={styles.faintTint}/>
            )}

            <Text style={styles.profile}>Hello, {username} 🥳</Text>
            <View style={styles.content}>
                {/* Home Card */}
                <View style={styles.card}>
                    <View style={styles.homeCard}>
                        <Text style={styles.text}>Welcome to Apple-apple-scab Disease detection system!  🌴</Text>
                        <Text style={styles.text}>Upload or snap an Image for instant analysis. Let's grow together 🌱</Text>
                    </View>
                    <View>
                        <Image
                            source={require("../../assets/healthy image.png")}
                            style={styles.image}
                        />
                    </View>
                </View>

                {/* Button Icons */}
                <Text style={styles.profile2}>Heal your crops 🌾</Text>
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
                        <Text>See a diagnosis </Text>
                    </View>
                    <AntDesign name="arrowright" size={20} color="black" />

                    {/* Get a recommendation */}
                    <View style={styles.icon}>
                        <Foundation name="clipboard-notes" size={24} color="green" />
                        <Text>Get a recommendation</Text>
                    </View>
                </View>

                {/* Upload Photo Buttons */}
                <Text style={styles.profile3}>Instant analysis </Text>
                <View style={styles.card2}>
                    {/* Take a photo button */}
                    <View style={styles.buttonContainer}>
                        <FontAwesome5 name="camera" size={24} color="green" style={styles.icon2} />
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText} onPress={()=>navigation.navigate("CameraButton")}>Take a photo</Text>
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
            <ErrorModal
                isVisible={error.isVisible}
                errorMessage={error.message}
                onClose={ closeModalError}
            />
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
        backgroundColor: 'green',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        width: 350,
        height:160
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
        fontSize: 18,
        color: 'white',
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
    profile3:{
        fontSize: 23,
        fontWeight: 'bold',
        color: 'green',
        marginTop:5,
        marginRight:210,
        marginLeft: 2
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
        marginBottom: 15
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
    prediction:{
        color:'green',
    },
    predict:{
        color:'black',
    },
    predicting:{
        color:'red',
    }
});

export default Home;