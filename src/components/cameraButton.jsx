import React ,{ useState, useEffect, useRef }from 'react';
import { Modal, View, Text, StyleSheet , Image, ToastAndroid, TouchableOpacity} from 'react-native';
import { Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './Button';
import ErrorModal from './errorModal';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TakePicture(){
    const [hasCameraPermision, setHasCameraPermision]= useState(null);
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [predicted, setPredicted] = useState('');
    const [confidence, setConfidence] = useState(null);
    const [disease, setDiseaseData] = useState(false);
    const [recommend, setRecommendData] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [error, setError] = useState({ isVisible: false, message: '' });
    const cameraRef = useRef(null);

    const showError = (message) => {
        setError({ isVisible: true, message });
    };

    useEffect(()=>{
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermision(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async function(){
        if(cameraRef){
            try{
                const options = {
                    quality: 0.5,
                    ratio: '3:3'
                };
                const data = await cameraRef.current.takePictureAsync(options);
                console.log(data);
                setImage(data.uri);
            }catch{
                console.log('Error taking picture');
            }
        }
    }
    

    if(hasCameraPermision === false){
        return <Text>No camera permision</Text>
    }

    const saveImage = async function(){
        try{
            if(image){
                setShowModal(true)
                try{
                    const mimeType = 'image/jpeg';
    
                    const formData = new FormData();
                    formData.append('file', {
                        uri: image,
                        type: mimeType,
                        name: 'apple.jpg',
                    });
    
                    const config = {
                        method: 'post',
                        url: `https://scab-model.onrender.com/predict`,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData
                    };
    
                    const response = await axios(config);
                    console.log(JSON.stringify(response.data, null, 2));
    
                    // Store the API response data in the state
                    if (response.data && response.data.Predicted && response.data.confidence !== undefined) {
                        setPredicted(response.data.Predicted);                    
                        setConfidence(response.data.confidence);
                    
                        if(response.data.Predicted.length === 10){
                                try{
                                    // Calling the second API
                                    const diseaseDataPayload = {
                                        diseases: disease
                                    };
                        
                                axios.get('https://apple-plant-disease.onrender.com/api/v1/disease', diseaseDataPayload)
                                    .then(res => {
                                        if (res.data.status === 'success') {
                                            const data = res.data.data.diseases[1];
                                            setDiseaseData(data);
                        
                                            function getRandomItem(array){
                                                const randomIndex = Math.floor(Math.random()*array.length);
                                                return array[randomIndex];
                                            }
                        
                                            const randomItem= getRandomItem(data.treatment);
                                            console.log(JSON.stringify(randomItem, null, 2));
                                            setRecommendData(randomItem);
                                        }
                                    })
                                    .catch(err => {
                                        console.log("Error is:", err);
                                        showError("Error occured while fetching data")
                                    });
                                }catch(e){

                                }
                            }
                    }
                }catch(error){
                    if(axios.isAxiosError(error)){
                        const statusCode = error.response?.status;
                        if(statusCode === 502 || statusCode === 503){
                            showError("This is not an apple leaf. Please try again later.");
                        }else{
                            showError("An unexpected error occurred");
                        }
                    }else{
                        showError("An unexpected error occurred while saving")
                    }
                }
            }
        }catch(err){
            showError("An error occurred while saving")
        }
    }

    const closeModal=()=>{
        setDiseaseData('');
        setPredicted('');
        setConfidence('');
        setImage(null)
        setShowModal(!showModal);
    }

    const closeModalError = () =>{
        setError({ isVisible: false, message: '' });
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
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
                        {image && <Image source={{ uri: image }} style={{width: 300, height:200, borderRadius: 10}} />}
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

            {!image ?
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                >
                <View style={{
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    padding: 30
                }}> 
                    <Button icon={"retweet"} 
                        color={flash === Camera.Constants.FlashMode.off ? "grey" : "#f1f1f1"}
                        onPress={()=>{
                            setType(type === CameraType.back ? CameraType.front : CameraType.back)
                    }}/>
                    <Button icon={"flash"} 
                        color={flash === Camera.Constants.FlashMode.off ? "grey" : "#f1f1f1"}
                        onPress={()=>{
                            setFlash(flash === Camera.Constants.FlashMode.off 
                            ? Camera.Constants.FlashMode.on
                            : Camera.Constants.FlashMode.off)
                    }}/>
                </View>
                </Camera>
                :
                <Image source={{uri: image}} style={styles.camera}/>
            }
            <View>
            {image ?
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 50
                }}>
                    <Button title={'Re-take'} icon="retweet" onPress={()=>{
                        setImage(null)
                    }}/>
                    <Button title={'Save'} icon="check" onPress={saveImage}/>
                </View>
                :
                <Button title={'Take a picture'} icon="camera" onPress={takePicture}/>
            }
            </View>
        </View>
        <ErrorModal
                isVisible={error.isVisible}
                errorMessage={error.message}
                onClose={ closeModalError}
            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        paddingButtom: 20
    },
    camera:{
        flex: 1,
        borderRadius: 20
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
})