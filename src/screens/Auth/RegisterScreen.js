import { observer } from "mobx-react";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

const Register = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Register</Text>
        </View>
    )
};
export default observer(Register);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})