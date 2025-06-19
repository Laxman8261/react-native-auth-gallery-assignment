import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        try {
            const resultAction = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
                navigation.replace('Home');
            }
        } catch (err) {
            Alert.alert('Login Failed', err.message || 'Unknown error');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.card}>
                <View style={styles.signInHeader}>
                    <Text style={styles.signInText}>LOG IN</Text>
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
                    />
                </View>

                <View style={styles.row}>
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.loginButtonText}>
                        {loading ? 'Logging in...' : 'LOGIN'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.newaccountText}>
                    Don't have an account?
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.createAccountText}> Create New Account</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b3b3',
    },
    card: {
        width: width * 0.85,
        backgroundColor: '#1e2a3a',
        borderRadius: width * 0.025,
        paddingVertical: height * 0.05,
        paddingHorizontal: width * 0.06,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: height * 0.006 },
        shadowOpacity: 0.2,
        shadowRadius: width * 0.025,
        elevation: 10,
    },
    signInHeader: {
        position: 'absolute',
        top: -height * 0.015,
        alignSelf: 'center',
        backgroundColor: '#00f7ef',
        paddingHorizontal: width * 0.05,
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
    createAccountText: {
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
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: height * 0.025,
    },
    forgot: {
        color: '#00f7ef',
        fontSize: height * 0.015,
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
