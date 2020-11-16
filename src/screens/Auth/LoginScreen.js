import React, { useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication'; //both face ID and touch ID
import { Text, TextInput, View } from "react-native";
import { observer } from "mobx-react";
import { useStore } from "../../store/Store";

const AUTH_TOKEN = 'sgfgdrfgr'; //sample only. should get from server.
const AUTH_USER = {
    username: "username",
    password: "password"
} //sample only. should get from server.

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [incorrect, setIncorrect] = useState(false)
    const [scanned, setScanned] = useState(false)
    const store = useStore()

    useEffect(() => {
        checkDeviceForHardware();
        checkForBiometrics();
        if (!scanned)
            handleLoginPress();
    }, [])

    const checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        if (compatible) {
            console.log('Compatible Device!');
        }
        else alert('Current device does not have the necessary hardware!')
    };

    const checkForBiometrics = async () => {
        let biometricRecords = await LocalAuthentication.isEnrolledAsync();
        if (!biometricRecords) {
            alert('No Biometrics Found')
        }
        else {
            console.log('Biometrics Found')
        }
    };

    const handleLoginPress = async () => {
        handleAuthentication();
    };

    const handleAuthentication = async () => {
        let result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
            alert('Biometric Authentication Success')
            store.login() //set user credentials and login user
        }
        else {
            alert('Biometric Authentication error! Enter your username and password!');
        }
    };

    const login = async () => {
        const data = { username, password }; // pass to login api
        store.login()
    } // fallback login method

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.placeholder}
                placeholder="Username"
                autoCompleteType="username"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.placeholder}
                placeholder="Password"
                autoCompleteType="password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            {incorrect && <Text>Inccorect username or password</Text>}
            <Text style={{ padding: 15, backgroundColor: 'red' }} onPress={login}>Login</Text>
        </View>
    );
}

export default observer(Login);

const styles = {
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10
    },
    placeholder: {
        height: 40,
        width: '80%',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginVertical: 10,
        padding: 10
    }
}