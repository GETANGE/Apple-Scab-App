import React ,{ useState, useEffect, useRef }from 'react';
import { SafeAreaView, View, Text, StyleSheet , Image, Pressable, Modal, ToastAndroid, TouchableOpacity} from 'react-native';
import { Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './Button';

export default function TakePicture(){
    const [hasCameraPermision, setHasCameraPermision]= useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

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
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            }catch{
                console.log('Error taking picture');
            }
        }
    }

    const saveImage = async function(){
        if(image){
            try{
                await MediaLibrary.createAssetAsync(image);
                alert('Picture saved successfully 🥳')
                setImage(null);
            }catch{
                console.log('Error saving image');
            }
        }
    }

    if(hasCameraPermision === false){
        return <Text>No camera permision</Text>
    }

    return(
        <View style={styles.container}>
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
    }
})