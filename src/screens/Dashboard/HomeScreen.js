import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { observer } from "mobx-react";
import { useStore } from "../../store/Store";

const Home = ({ }) => {
    const store = useStore()
    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
            <Text style={{ padding: 15, backgroundColor: '#fff', elevation: 3 }} onPress={() => store.logout()}>Logout</Text>
        </View>
    )
};
export default observer(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})