import React from "react";
import { makeAutoObservable } from "mobx"
import AsyncStorage from '@react-native-community/async-storage';
import { create, persist } from "mobx-persist";

class Store {
    @persist token = null
    @persist('object') user = null

    constructor() {
        makeAutoObservable(this)
    }

    login(data) {
        //pass data to login api which return user data and token
        this.token = 'some token' //for example login
    }

    // setUserCredentials(AUTH_TOKEN, AUTH_USER) {
    //     this.token = AUTH_TOKEN
    //     this.user = AUTH_USER
    // }

    logout() {
        this.token = null
        this.user = null
    }

}

export const store = new Store() // new store instance

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
});// persisting data in asyncstorage

hydrate("user", store).then(r =>
    console.log("store has been hydrated")
); // refetching auth data on reopening app

const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);
