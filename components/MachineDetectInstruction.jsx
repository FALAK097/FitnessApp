import React, { useState, useEffect} from 'react';
import { TouchableOpacity,Button, Image, View, Text, StyleSheet, BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { Card } from 'react-native-elements';
import MachineDetectionTitle from '../components/machineDetectionTitle';
import MachineDetectInstruction from '../components/MachineDetectInstruction';
import { useTheme } from "../components/ThemeContext";

export default function MachineDetection() {
  const [image, setImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const { theme } = useTheme();

  const handleBackPress = () => {
    if (bottomSheetVisible) {
      setBottomSheetVisible(false);
      return true; // Prevent default back button behavior
    }
    return false;
  };



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      //cameraType: ImagePicker.CameraType.back,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
      setClassificationResult(null); // Clear previous classification result
      setIsImageSelected(true); // Set the flag to true when an image is selected
    }
  };
  

  const detectMachine = async () => {
    if (image) {
      // Send the image to the Flask API for detection
      uploadImage(image);
    } else {
      setClassificationResult('No image selected.');
    }
  };
  
  const uploadImage = async (imageUri) => {
    try {
      let formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg', // adjust the type based on the actual image type
        name: 'image.jpg',
      });

      let response = await fetch('http://192.168.0.102:5000/classify', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        let result = await response.json();
        setClassificationResult(result.class_name);
        setBottomSheetVisible(true);
      } else {
        console.log('Image upload failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const getMachineDetails = (machineName) => {
    switch (machineName) {
      case 'lat-pull-down':
        return {
          name: 'Lat Pull Down',
          difficulty: 'Intermediate',
          description: 'Builds and strengthens the muscles of the upper back.',
          instructions: 'Sit down at the machine and adjust the knee pad. Grasp the bar with an overhand grip and pull it down to your chest. Slowly return to the starting position.',
          targetMuscles: 'Upper back muscles',
          beginner: { reps: 12, sets: 3, weight: 'Light' },
          intermediate: { reps: 10, sets: 4, weight: 'Moderate' },
          expert: { reps: 8, sets: 5, weight: 'Heavy' },
        };
      case 'chest-press':
        return {
          name: 'Chest Press',
          difficulty: 'Beginner',
          description: 'Targets the muscles of the chest, shoulders, and triceps.',
          instructions: 'Sit or lie on the machine. Grasp the handles and push them forward. Slowly return to the starting position.',
          targetMuscles: 'Chest, shoulders, triceps',
          beginner: { reps: 15, sets: 3, weight: 'Light' },
          intermediate: { reps: 12, sets: 4, weight: 'Moderate' },
          expert: { reps: 10, sets: 5, weight: 'Heavy' },
        };
      case 'chest-fly':
        return {
          name: 'Chest Fly',
          difficulty: 'Intermediate',
          description: 'Isolates and develops the muscles of the chest.',
          instructions: 'Sit on the machine and adjust the handles. Bring the handles together in front of you, then slowly return to the starting position.',
          targetMuscles: 'Chest muscles',
          beginner: { reps: 12, sets: 3, weight: 'Light' },
          intermediate: { reps: 10, sets: 4, weight: 'Moderate' },
          expert: { reps: 8, sets: 5, weight: 'Heavy' },
        };
      case 'leg-press':
        return {
          name: 'Leg Press',
          difficulty: 'Expert',
          description: 'Targets the muscles of the legs, including quadriceps and hamstrings.',
          instructions: 'Sit on the machine and place your feet on the platform. Push the platform away from you, extending your legs. Slowly return to the starting position.',
          targetMuscles: 'Quadriceps, hamstrings',
          beginner: { reps: 10, sets: 3, weight: 'Light' },
          intermediate: { reps: 8, sets: 4, weight: 'Moderate' },
          expert: { reps: 6, sets: 5, weight: 'Heavy' },
        };
      default:
        return {};
    }
  };

  return (
    
<View style={[styles.container,{
  backgroundColor: theme.mainBackgroundColor
}]}>
  
{/* <Text style={{fontSize:30,fontWeight: '500', color: 'grey'}}>Machine Detection</Text>
<Text style={{fontSize:14,fontWeight: '500', color: 'grey'}}>Powered by FitHub</Text>  */}

  <MachineDetectionTitle/>


    <Image source={{ uri: image }} style={styles.image} />
    <View style={styles.buttonContainer}>
    <View style={styles.horizontalButtons}>
        <TouchableOpacity onPress={pickImage} style={[styles.buttonStyle,{
          backgroundColor: theme.backgroundColor
        }]}>
           <Text style={[styles.buttonTitleStyle,{
            color: theme.textColor
           }]}> PICK AN IMAGE </Text>
        </TouchableOpacity>
          {isImageSelected && (
        <TouchableOpacity onPress={detectMachine} style={[styles.buttonStyle,{
          backgroundColor: theme.backgroundColor

        }]}>
           <Text style={[styles.buttonTitleStyle,{
            color: theme.textColor
           }]}> DETECT MACHINE </Text>
        </TouchableOpacity>
  )}
    </View>
      <MachineDetectInstruction />
    </View>
    <Modal
        isVisible={bottomSheetVisible}
        style={styles.bottomModal}
        swipeDirection={['down']}
        onSwipeComplete={() => setBottomSheetVisible(false)}
        onBackdropPress={() => setBottomSheetVisible(false)} // Close on outside click
        onRequestClose={handleBackPress} // Handle back button press on Android
      >
      <View style={[styles.modalContent,{
        backgroundColor: theme.mainBackgroundColor
      }]}>
          {classificationResult && (
            <>
              <Text style={[styles.result,{
                        color: theme.textColor
                      }]}>Machine Detected: {classificationResult}</Text>
              {classificationResult && (
                <View>
                  <Text style={[styles.machineInfoTitle,{
                        color: theme.textColor
                      }]}>Machine Information:</Text>
                  {getMachineDetails(classificationResult) && (
                    <>
                      <Text style={[styles.machineInfoLabel,{
                        color: theme.textColor
                      }]}>Name:</Text>
                      <Text style={[styles.machineInfoText,{
                        color: theme.textColor
                      }]}>{getMachineDetails(classificationResult).name}</Text>
                      <Text style={[styles.machineInfoLabel,{
                        color: theme.textColor
                      }]}>Difficulty:</Text>
                      <Text style={[styles.machineInfoText,{
                        color: theme.textColor
                      }]}>{getMachineDetails(classificationResult).difficulty}</Text>
                      <Text style={[styles.machineInfoLabel,{
                        color: theme.textColor
                      }]}>Description:</Text>
                      <Text style={[styles.machineInfoText,{
                        color: theme.textColor
                      }]}>{getMachineDetails(classificationResult).description}</Text>
                      <Text style={[styles.machineInfoLabel,{
                        color: theme.textColor
                      }]}>Instructions:</Text>
                      <Text style={[styles.machineInfoText,{
                        color: theme.textColor
                      }]}>{getMachineDetails(classificationResult).instructions}</Text>
                      <Text style={[styles.machineInfoLabel,{
                        color: theme.textColor
                      }]}>Target Muscles:</Text>
                      <Text style={[styles.machineInfoText,{
                        color: theme.textColor
                      }]}>{getMachineDetails(classificationResult).targetMuscles}</Text>

                      {/* Cards for Beginner, Intermediate, and Expert Levels */}
                      <View style={styles.levelContainer}>
                        <Card title="Beginner Level" containerStyle={[styles.cardContainer,{
                          backgroundColor: theme.backgroundColor
                        }]}>
                          <Text style={styles.cardText}>Reps: {getMachineDetails(classificationResult).beginner.reps}</Text>
                          <Text style={styles.cardText}>Sets: {getMachineDetails(classificationResult).beginner.sets}</Text>
                          <Text style={styles.cardText}>Weight: {getMachineDetails(classificationResult).beginner.weight}</Text>
                          <Text style={styles.machineInfoLabel}>Novice</Text>
                        </Card>
                        <Card title="Intermediate Level" containerStyle={[styles.cardContainer,{
                          backgroundColor: theme.backgroundColor
                        }]}>
                          <Text style={styles.cardText}>Reps: {getMachineDetails(classificationResult).intermediate.reps}</Text>
                          <Text style={styles.cardText}>Sets: {getMachineDetails(classificationResult).intermediate.sets}</Text>
                          <Text style={styles.cardText}>Weight: {getMachineDetails(classificationResult).intermediate.weight}</Text>
                          <Text style={styles.machineInfoLabel}>Medium</Text>
                        </Card>
                        <Card title="Intermediate Level" containerStyle={[styles.cardContainer,{
                          backgroundColor: theme.backgroundColor
                        }]}>
                        <Text style={styles.cardText}>Reps: {getMachineDetails(classificationResult).expert.reps}</Text>
                        <Text style={styles.cardText}>Sets: {getMachineDetails(classificationResult).expert.sets}</Text>
                        <Text style={styles.cardText}>Weight: {getMachineDetails(classificationResult).expert.weight}</Text>
                        <Text style={styles.machineInfoLabel}>Expert</Text>
                        </Card>
                      </View>

                    </>
                  )}
                </View>
              )}
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%', // Set the width to 100%
  },
  buttonStyle: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderBottomColor: 'black',
    borderColor: 'grey',
    borderBottomWidth: 3,
    elevation: 11,
    
  },
  buttonTitleStyle: {
    color: 'white',
    fontWeight: '600',
    
  },
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Set the width to 100%
    paddingHorizontal: 20, // Add horizontal padding if needed
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  machineInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  machineInfoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  machineInfoText: {
    fontSize: 14,
    marginTop: 2,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardContainer: {
    width: '30%',
    margin: 5,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    borderColor: 'grey',
    borderBottomWidth: 4,
    elevation: 10,
  },
  instructionCardContainer: {
    width: '100%',
    margin: 5,
    marginTop: 30,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    borderColor: 'grey',
    borderBottomWidth: 4,
    elevation: 10,
  },
  cardText: {
    fontSize: 12,
    marginBottom: 5,
  },
});