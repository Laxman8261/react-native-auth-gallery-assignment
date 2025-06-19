import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    Pressable,
    Modal,
    Alert,
    Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { registerUser, checkEmailExists } from '../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setDob(formattedDate);
        }
    };

    const handleSignin = async () => {
        if (!username || !email || !dob || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            const emailAlreadyExists = await checkEmailExists(email);
            if (emailAlreadyExists) {
                Alert.alert('Error', 'Email is already registered');
                return;
            }

            const newUser = { name: username, email, dob, password };
            const result = await registerUser(newUser);
            console.log('User registered:', result);

            Alert.alert('Success', 'Registration Successful');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Registration Error:', error);
            Alert.alert('Error', 'Registration failed. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.card}>
                    <View style={styles.signInHeader}>
                        <Text style={styles.signInText}>SIGN UP</Text>
                    </View>

                    <View style={styles.avatarContainer}>
                        <MaterialCommunityIcons
                            name="account-circle"
                            size={height * 0.1}
                            color="#aaa"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons
                            name="account"
                            size={height * 0.025}
                            color="#999"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="#999"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons
                            name="email"
                            size={height * 0.025}
                            color="#999"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons
                            name="calendar"
                            size={height * 0.025}
                            color="#999"
                            style={styles.icon}
                        />
                        <Pressable style={{ flex: 1 }} onPress={() => setShowDatePicker(true)}>
                            <Text style={[styles.input, {
                                paddingTop: height * 0.018,
                                color: dob ? '#fff' : '#999'
                            }]}>
                                {dob || 'Date of Birth'}
                            </Text>
                        </Pressable>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChangeDate}
                            maximumDate={new Date()}
                        />
                    )}

                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons
                            name="lock"
                            size={height * 0.025}
                            color="#999"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleSignin}
                    >
                        <Text style={styles.loginButtonText}>SIGN UP</Text>
                    </TouchableOpacity>

                    <Text style={styles.newaccountText}>
                        Already have an account?
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}> Login</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#00b3b3',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: height * 0.02,
    },
    card: {
        width: width * 0.85,
        alignSelf: 'center',
        backgroundColor: '#1e2a3a',
        borderRadius: width * 0.025,
        paddingVertical: height * 0.05,
        paddingHorizontal: width * 0.06,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: height * 0.006 },
        shadowOpacity: 0.2,
        shadowRadius: width * 0.025,
        elevation: 10,
        marginVertical: height * 0.025,
    },
    signInHeader: {
        position: 'absolute',
        top: -height * 0.015,
        alignSelf: 'center',
        backgroundColor: '#00f7ef',
        paddingHorizontal: width * 0.08,
        paddingVertical: height * 0.015,
        borderRadius: width * 0.015,
    },
    signInText: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        color: '#000',
    },
    newaccountText: {
        fontSize: height * 0.018,
        fontWeight: '400',
        marginTop: height * 0.006,
        color: '#fff',
        textAlign: 'center',
    },
    loginLink: {
        color: '#00b3b3',
        fontWeight: '600',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: height * 0.035,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2f3a4c',
        borderRadius: width * 0.015,
        paddingHorizontal: width * 0.025,
        marginBottom: height * 0.018,
    },
    icon: {
        marginRight: width * 0.025,
    },
    input: {
        flex: 1,
        color: '#fff',
        height: height * 0.06,
        fontSize: height * 0.018,
    },
    loginButton: {
        backgroundColor: '#00f7ef',
        paddingVertical: height * 0.018,
        borderRadius: width * 0.015,
        alignItems: 'center',
        marginBottom: height * 0.012,
    },
    loginButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: height * 0.02,
    },
});
