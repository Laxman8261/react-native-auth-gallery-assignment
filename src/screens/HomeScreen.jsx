import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    Alert,
    Dimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logoutUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.user);


    const pickImages = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 0,
                includeBase64: false,
                multiple: true,
            },
            (response) => {
                if (!response.didCancel && !response.errorCode && response.assets) {
                    setPhotos(prevPhotos => [
                        ...prevPhotos,
                        ...response.assets.map(asset => asset.uri)
                    ]);
                }
            }
        );
    };

    const clearPhotos = () => {
        setPhotos([]);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigation.navigate('Login');
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Menu Icon */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowMenu(true)}>
                    <Icon name="menu" size={height * 0.035} color="#1e2a3a" />
                </TouchableOpacity>
                <Text style={styles.title}>WellCome {user.name}</Text>
                <View style={{ width: width * 0.08 }} />
            </View>

            {/* Menu Modal */}
            <Modal
                visible={showMenu}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowMenu(false)}
            >
                <TouchableOpacity
                    style={styles.menuOverlay}
                    activeOpacity={1}
                    onPress={() => setShowMenu(false)}
                >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={handleLogout}
                        >
                            <Icon name="exit-to-app" size={height * 0.03} color="#1e2a3a" />
                            <Text style={styles.menuItemText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Photo Gallery Controls */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={pickImages}>
                    <Text style={styles.buttonText}>Select Photos</Text>
                </TouchableOpacity>

                {photos.length > 0 && (
                    <TouchableOpacity style={styles.clearButton} onPress={clearPhotos}>
                        <Text style={styles.buttonText}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Photo Gallery */}
            <FlatList
                data={photos}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.gallery}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
                ListEmptyComponent={
                    <Text style={styles.placeholder}>No photos selected yet</Text>
                }
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: height * 0.02,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: height * 0.028,
        fontWeight: 'bold',
        color: '#1e2a3a',
    },
    menuOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
    },
    menuContainer: {
        width: width * 0.7,
        backgroundColor: '#fff',
        padding: width * 0.05,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.018,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuItemText: {
        marginLeft: width * 0.04,
        fontSize: height * 0.02,
        color: '#1e2a3a',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: height * 0.025,
        marginBottom: height * 0.025,
        paddingHorizontal: width * 0.04,
    },
    button: {
        backgroundColor: '#00b3b3',
        padding: height * 0.015,
        borderRadius: width * 0.02,
        minWidth: width * 0.4,
        alignItems: 'center',
    },
    clearButton: {
        backgroundColor: '#ff6b6b',
        padding: height * 0.015,
        borderRadius: width * 0.02,
        minWidth: width * 0.4,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: height * 0.018,
    },
    gallery: {
        marginTop: height * 0.012,
        paddingBottom: height * 0.037,
        paddingHorizontal: width * 0.02,
    },
    image: {
        width: (width - width * 0.12) / 3,
        height: (width - width * 0.12) / 3,
        borderRadius: width * 0.02,
        margin: width * 0.01,
    },
    placeholder: {
        marginTop: height * 0.06,
        textAlign: 'center',
        color: '#999',
        fontSize: height * 0.02,
    },
});
