import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, Colors, useTheme, Text } from 'react-native-paper';
import { usePlayerContext } from '../contexts/PlayerContext';

const Progress = ({}) => {
    const playerContext = usePlayerContext();
    const { colors } = useTheme();

    const convertToMins = seconds => {
        let mins = Math.floor(seconds/60);
        let secs = seconds - (mins * 60);
        return `${mins}:${("0" + secs).slice(-2)}`
    }

    return (
        <View style={styles.progressBarContainer}>
            <ProgressBar progress={Math.round(playerContext.progress) / 300} color='black' />
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{convertToMins(parseInt(Math.round(playerContext.progress)))}</Text>
                <Text style={styles.timeText}>{convertToMins(parseInt(playerContext.currentTrack.duration))}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressBarContainer: {

    },
    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 18
    }
});

export default Progress;