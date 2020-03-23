import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout} from "react-native-maps";
import {requestPermissionsAsync, getCurrentPositionAsync} from "expo-location";
import {MaterialIcons} from '@expo/vector-icons';

import api from "../services/api";

function Main({navigation}) {

    const [developers, setDevelopers] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState([]);


    useEffect(() => {
        async function loadInitialPosition() {
            const {granted} = await requestPermissionsAsync();
            if (granted) {
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });
                const {latitude, longitude} = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                });
            }
        }
        loadInitialPosition();
    }, []);

    async function loadDevelopers() {
        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });
        if (response.data.devs && response.data.devs.length > 0) {
            setDevelopers(response.data.devs);
        } else {
            setDevelopers([]);
        }
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    return (
        <>
            <MapView style={styles.mapView}
                     initialRegion={currentRegion}
                     onRegionChangeComplete={handleRegionChanged}>

                {developers.map(developer => (
                    <Marker
                        key={developer._id}
                        coordinate={{
                            longitude: developer.location.coordinates[0],
                            latitude: developer.location.coordinates[1],
                        }}
                    >
                        <Image
                            style={styles.avatar}
                            source={{ uri: developer.avatar_url }}
                        />

                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: developer.github_username });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{developer.name}</Text>
                                <Text style={styles.devBio}>{developer.bio}</Text>
                                <Text style={styles.devTechs}>{developer.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}

            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search devs by techs"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorret={false}
                    onChangeText={setTechs}
                />
                <TouchableOpacity style={styles.loadButton} onPress={loadDevelopers}>
                    <MaterialIcons name="my-location" size={20} color="#FFF"/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    devBio: {
        color: '#666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
});

export default Main;