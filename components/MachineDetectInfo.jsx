import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function MachineDetectInfo(classificationResult) {
  const getMachineDetails = (machineName) => {
    switch (machineName) {
      case 'lat-pull-down':
        return {
          name: 'Lat Pull Down',
          difficulty: 'Intermediate',
          description: 'Builds and strengthens the muscles of the upper back.',
          instructions:
            'Sit down at the machine and adjust the knee pad. Grasp the bar with an overhand grip and pull it down to your chest. Slowly return to the starting position.',
          targetMuscles: 'Upper back muscles',
          beginner: { reps: 12, sets: 3, weight: 'Light' },
          intermediate: { reps: 10, sets: 4, weight: 'Moderate' },
          expert: { reps: 8, sets: 5, weight: 'Heavy' },
        };
      case 'chest-press':
        return {
          name: 'Chest Press',
          difficulty: 'Beginner',
          description:
            'Targets the muscles of the chest, shoulders, and triceps.',
          instructions:
            'Sit or lie on the machine. Grasp the handles and push them forward. Slowly return to the starting position.',
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
          instructions:
            'Sit on the machine and adjust the handles. Bring the handles together in front of you, then slowly return to the starting position.',
          targetMuscles: 'Chest muscles',
          beginner: { reps: 12, sets: 3, weight: 'Light' },
          intermediate: { reps: 10, sets: 4, weight: 'Moderate' },
          expert: { reps: 8, sets: 5, weight: 'Heavy' },
        };
      case 'leg-press':
        return {
          name: 'Leg Press',
          difficulty: 'Expert',
          description:
            'Targets the muscles of the legs, including quadriceps and hamstrings.',
          instructions:
            'Sit on the machine and place your feet on the platform. Push the platform away from you, extending your legs. Slowly return to the starting position.',
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
    <View style={styles.modalContent}>
      {classificationResult && (
        <>
          <Text style={styles.result}>
            Machine Detected: {classificationResult}
          </Text>
          {classificationResult && (
            <View>
              <Text style={styles.machineInfoTitle}>Machine Information:</Text>
              {getMachineDetails(classificationResult) && (
                <>
                  <Text style={styles.machineInfoLabel}>Name:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).name}
                  </Text>
                  <Text style={styles.machineInfoLabel}>Difficulty:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).difficulty}
                  </Text>
                  <Text style={styles.machineInfoLabel}>Description:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).description}
                  </Text>
                  <Text style={styles.machineInfoLabel}>Instructions:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).instructions}
                  </Text>
                  <Text style={styles.machineInfoLabel}>Target Muscles:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).targetMuscles}
                  </Text>

                  {/* Cards for Beginner, Intermediate, and Expert Levels */}
                  {/* <View style={styles.levelContainer}>
                        <Card title="Beginner Level" containerStyle={styles.cardContainer}>
                          <Text style={styles.cardText}>Reps: {getMachineDetails(classificationResult).beginner.reps}</Text>
                          <Text style={styles.cardText}>Sets: {getMachineDetails(classificationResult).beginner.sets}</Text>
                          <Text style={styles.cardText}>Weight: {getMachineDetails(classificationResult).beginner.weight}</Text>
                          <Text style={styles.machineInfoLabel}>Novice</Text>
                        </Card>
                        <Card title="Intermediate Level" containerStyle={styles.cardContainer}>
                          <Text style={styles.cardText}>Reps: {getMachineDetails(classificationResult).intermediate.reps}</Text>
                          <Text style={styles.cardText}>Sets: {getMachineDetails(classificationResult).intermediate.sets}</Text>
                          <Text style={styles.cardText}>Weight: {getMachineDetails(classificationResult).intermediate.weight}</Text>
                          <Text style={styles.machineInfoLabel}>Normal</Text>
                        </Card>
                        <Card title="Expert Level" containerStyle={styles.cardContainer}>
                          <Text style={styles.cardText}>Reps: {getMachineDetails(classificationResult).expert.reps}</Text>
                          <Text style={styles.cardText}>Sets: {getMachineDetails(classificationResult).expert.sets}</Text>
                          <Text style={styles.cardText}>Weight: {getMachineDetails(classificationResult).expert.weight}</Text>
                          <Text style={styles.machineInfoLabel}>Expert</Text>
                        </Card>
                      </View> */}
                </>
              )}
            </View>
          )}
        </>
      )}
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
