import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import { tracks } from '../Actions/index';

const useGetTracks = (collectionName, orderBy, limit) => {
    const dispatch = useDispatch();
    const collectionRef = firestore().collection(collectionName);
    const [error, setError] = useState(null);
    const [lastItem, setLastItem] = useState(null);
    const [tracksTemp, setTracksTemp] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getTrackImages();
    }, [tracksTemp]);

    const getData = async () => {
        try {
            await collectionRef.orderBy(orderBy).limit(limit).get().then(
                response => {
                    const data = response.docs.map(doc => doc.data());
                    setTracksTemp(data);
                    setLastItem(data[data.length - 1][orderBy]);
                }
            );
        } catch (error) {
            setError(error);
        }
    };

    const getTrackImages = () => {
        const tr = [];

        tracksTemp.map(async (track, index) => {
            await storage().ref(`trackImages/${track.id}.jpg`).getDownloadURL().then(url => {
                track['trackImage'] = url;
                tr.push(track);
            }).catch(error => {
                console.log('GET TRACK IMAGE =========>', error)
            })
            if (index === tracksTemp.length - 1) {
                dispatch(tracks(tr));
            }
        })
    }

    const getNextItems = async () => {
        if (tracksTemp.length > 0) {
            try {
                await collectionRef.orderBy(orderBy).startAfter(lastItem).limit(limit).get().then(
                    response => {
                        const data = response.docs.map(doc => doc.data());
                        const concatData = [...tracksTemp, ...data];
                        setTracksTemp(concatData);
                        setLastItem(concatData[concatData.length - 1][orderBy]);
                    }
                );
            } catch (error) {
                console.log(error)
                setError(error);
            }
        }
    };

    return [getData, error, getNextItems];
}

export default useGetTracks;