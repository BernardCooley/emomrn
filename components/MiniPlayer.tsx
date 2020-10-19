import React, { useContext } from 'react';
import { Box, Text, Image } from 'react-native-design-utility';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { usePlayerContext } from '../contexts/PlayerContexts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigationState } from '@react-navigation/native';
import { NavigationContext } from '../contexts/NavigationContext';

const MiniPlayer = () => {
    const playerContext = usePlayerContext();
    const navigationContext = useContext(NavigationContext);

    if(playerContext.isEmpty || !playerContext.currentTrack || !navigationContext.isMusicScreen) {
        return null;
    }

    return (
        <Box h={75} bg='white' px='sm'>
            <Box f={1} dir='row' align='center' justify='between'>
                <Box 
                    h={50} 
                    w={50} 
                    bg='lightblue' 
                    radius={10} 
                    mr={10}
                    style={{overflow: 'hidden'}}>
                </Box>
                <Box f={1}>
                    <Text>This is the title</Text>
                </Box>
                <Box>
                    {playerContext.isPaused && 
                        <TouchableOpacity onPress={() => playerContext.play()}>
                            <MaterialCommunityIcons name="play" size={30} />
                        </TouchableOpacity>
                    }
                    {playerContext.isPlaying && 
                        <TouchableOpacity onPress={playerContext.pause}>
                            <MaterialCommunityIcons name="pause" size={30} />
                        </TouchableOpacity>
                    }
                    {playerContext.isStopped && 
                        <TouchableOpacity onPress={() => playerContext.play()}>
                            <MaterialCommunityIcons name="play" size={30} />
                        </TouchableOpacity>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default MiniPlayer;