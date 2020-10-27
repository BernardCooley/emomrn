import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, Colors, useTheme, Text } from 'react-native-paper';
import { usePlayerContext } from '../contexts/PlayerContext';

const Progress = ({}) => {
    const playerContext = usePlayerContext();
    const { colors } = useTheme();

    return (
        <View style={styles.progressBarContainer}>
            <Text>{Math.round(playerContext.progress)}</Text>
            <ProgressBar progress={Math.round(playerContext.progress) / 300} color={colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    progressBarContainer: {

    }
});

export default Progress;