import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native';


const App = () => {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState(1.2); // Default: Sedentary
    const [bmiResult, setBmiResult] = useState(null);
    const [caloriesResult, setCaloriesResult] = useState(null);
    const [tdeeResult, setTdeeResult] = useState(null); // Result for TDEE

    const validateForm = () => {
        if (!age || !height || !weight || !gender) {
            alert('All fields are required!');
        } else {
            countBmi();
            countBmr(); // Obliczanie kalorii do PPM - ang. BMR
            countTdee(); // Obliczanie TDEE
        }
    };

    const countBmi = () => {
        const bmi = (parseFloat(weight) /
            ((parseFloat(height) / 100) ** 2)).toFixed(2);

        let result = '';
        if (bmi < 18.5) {
            result = 'Underweight';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            result = 'Healthy';
        } else if (bmi >= 25 && bmi <= 29.9) {
            result = 'Overweight';
        } else if (bmi >= 30 && bmi <= 34.9) {
            result = 'Obese';
        } else if (bmi >= 35) {
            result = 'Extremely obese';
        }

        // Set the BMI result
        setBmiResult({ bmi, result });
    };

    //TO JEST CHYBA NIE UŻYWANE
    const countCalories = () => {
        // Obliczanie kalorii według wzoru Harrisa-Benedicta
        let calories = 0;
        if (gender === 'male') {
            calories = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
        } else if (gender === 'female') {
            calories = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
        }

        // Ustawienie wyniku kalorii
        setCaloriesResult(calories.toFixed(2));
    };

    const countBmr = () => {
                if (gender === 'male') {
                    calories = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
                } else if (gender === 'female') {
                    calories = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
                }
                setCaloriesResult(calories.toFixed(2));
    };

    const countTdee = () => {
            let bmr = 0;
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
            } else if (gender === 'female') {
                bmr = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
            }

            // Multiply by activity factor to get TDEE (Total Daily Energy Expenditure)
            const tdee = (bmr * parseFloat(activityLevel)).toFixed(2);
            setTdeeResult(tdee);
    };
  
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    BMI & BMR/TDEE Calculator
                </Text>
                <View style={styles.form}>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>
                            Age
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your age"
                            onChangeText={setAge}
                            value={age}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>
                            Height (cm)
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your height"
                            onChangeText={setHeight}
                            value={height}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>
                            Weight (kg)
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your weight"
                            onChangeText={setWeight}
                            value={weight}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.genderRow}>
                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                gender === 'male' && styles.selectedGender,
                            ]}
                            onPress={() => setGender('male')}
                        >
                            <Text style={styles.genderText}>
                                Male
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                gender === 'female' && styles.selectedGender,
                            ]}
                            onPress={() => setGender('female')}
                        >
                            <Text style={styles.genderText}>Female</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={styles.label}>
                            Activity Level
                        </Text>
                        <Picker
                            selectedValue={activityLevel}
                            style={styles.picker}
                            onValueChange={(itemValue) => setActivityLevel(parseFloat(itemValue))}
                        >
                            <Picker.Item label="Sedentary (little or no exercise)" value={1.2} />
                            <Picker.Item label="Lightly active (light exercise/sports 1-3 days/week)" value={1.375} />
                            <Picker.Item label="Moderately active (moderate exercise/sports 3-5 days/week)" value={1.55} />
                            <Picker.Item label="Very active (hard exercise/sports 6-7 days a week)" value={1.725} />
                            <Picker.Item label="Super active (very hard exercise/sports & physical job)" value={1.9} />
                        </Picker>
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={validateForm}
                    >
                        <Text style={styles.submitButtonText}>
                            Calculate BMI, BMR & TDEE
                        </Text>
                    </TouchableOpacity>
                    {bmiResult && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultLabel}>
                                BMI:
                            </Text>
                            <Text style={styles.resultText}>
                                {bmiResult.bmi}
                            </Text>
                            <Text style={styles.resultLabel}>
                                Result:
                            </Text>
                            <Text style={styles.resultText}>
                                {bmiResult.result}
                            </Text>
                        </View>
                    )}
                    {caloriesResult && ( // Wyświetlanie BMR (Podstawowa Przemiana Materii)
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultLabel}>
                                Basal metabolic rate (BMR):
                            </Text>
                            <Text style={styles.resultText}>
                                {caloriesResult} kcal
                            </Text>
                        </View>
                    )}
                    {tdeeResult && ( // Wyświetlanie TDEE (Całkowita Przemiana Materii)
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultLabel}>
                                Total Daily Energy Expenditure (TDEE):
                            </Text>
                            <Text style={styles.resultText}>
                                {tdeeResult} kcal
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}; 
  
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    container: { 
        flex: 1, 
        backgroundColor: '#eef2f3', 
        alignItems: 'center', 
        justifyContent: 'center', 
    }, 
    header: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#289df6', 
        marginBottom: 20, 
    }, 
    form: { 
        backgroundColor: '#fff', 
        borderRadius: 20, 
        padding: 20, 
        width: '90%', 
        elevation: 5, 
    }, 
    inputRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 20, 
    }, 
    label: { 
        flex: 1, 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginRight: 10, 
    }, 
    textInput: { 
        flex: 2, 
        height: 40, 
        borderWidth: 1, 
        borderColor: '#ddd', 
        borderRadius: 10, 
        paddingLeft: 10, 
        fontSize: 16, 
    }, 
    genderRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20, 
    }, 
    genderButton: { 
        flex: 1, 
        height: 40, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#dbeffe', 
        padding: 10, 
        margin: 10, 
    }, 
    selectedGender: { 
        backgroundColor: '#289df6', 
    }, 
    genderText: {
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#333', 
    }, 
    submitButton: { 
        backgroundColor: '#289df6', 
        borderRadius: 10, 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    submitButtonText: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#fff', 
    }, 
    resultContainer: { 
        marginTop: 20, 
    }, 
    resultLabel: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 5, 
    }, 
    resultText: { 
        fontSize: 16, 
    },
    picker: {
        flex: 2,
        height: 40,
    },
}); 
  
export default App;
