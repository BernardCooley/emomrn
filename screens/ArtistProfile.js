import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';


const ArtistProfileScreen = ({ navigation }) => {

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between'
            }}>
                <View style={styles.container}>
                    <Text>Profile</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollView: {

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ArtistProfileScreen;
