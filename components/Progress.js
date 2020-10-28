import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, useTheme, Text } from 'react-native-paper';
import { usePlayerContext } from '../contexts/PlayerContext';

const Progress = ({ }) => {
    const playerContext = usePlayerContext();
    const [progressBarWidth, setProgressBarWidth] = useState(0);

    const convertToMins = seconds => {
        let mins = Math.floor(seconds / 60);
        let secs = seconds - (mins * 60);
        return `${mins}:${("0" + secs).slice(-2)}`
    }

    const skipToTime = e => {
        playerContext.seekTo(playerContext.currentTrack.duration * e.nativeEvent.locationX/progressBarWidth)
    }

    return (
        <View style={styles.progressBarContainer}>
            <View onLayout={event => setProgressBarWidth(event.nativeEvent.layout.width)}>
                <ProgressBar style={styles.progressBar}
                    onTouchStart={(e) => skipToTime(e)}
                    progress={Math.round(playerContext.progress) / 300} color='black' />
            </View>
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
        fontSize: 16
    },
    progressBar: {
        height: 7,
        borderRadius: 5
    }
});

export default Progress;