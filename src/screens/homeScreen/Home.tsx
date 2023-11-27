import React, { useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { styles } from './Styles';
import SearchBar from './SearchBar';
import YellowCard from '../../assets/icons/yellowCard.svg';
import BlankCard from '../../assets/icons/transparentCard.svg';
import { FontStyle } from '../../assets/fonts/font';
import { Theme } from '../../assets/themes/theme';
import { useNavigation } from '@react-navigation/native';
import ProductScreen from '../productScreen/productScreen';
import productServiceApi from '../../services/productService';
import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import AddIcon from '../../assets/icons/addButton.svg';
import { JumpingTransition } from 'react-native-reanimated';
import CartIcon from '../../assets/icons/Cart.svg';

const fetchProductData = async () => {
    try {
        const response = await productServiceApi('products');
        return response;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
}

const Home = (props: any) => {
    const isEmptyCart = props?.route?.params?.isEmptyCart ?? false;
    const [productData, setProductData] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    console.log('CARTScreen1: ', cartItems);
    const productDataArray = productData?.products;
    const navigation = useNavigation();
    const name = 'Harshit';
    const deliveryAddress = 'Green Way 3000, Sylhet';
    const deliveryTime = '1 Hour';
    const addItem = ({ item }) => {
        const newItem = {
            data: item,
            quantity: 1,
        };
        const existingIndex = cartItems.findIndex((item) => item.data.id === newItem.data.id);
        if(existingIndex === -1){
            setCartItems((prevItems) => [...prevItems, newItem]);
        }else {
            const updatedProducts = [...cartItems];
            updatedProducts[existingIndex].quantity += 1;
            setCartItems(updatedProducts);
        }
    };

    useMemo(async () => {
        const data = await fetchProductData();
        setProductData(data);
    }, []);

    useEffect(() => {
        if(isEmptyCart){
            setCartItems(null);
        }
    }, [isEmptyCart])

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productCard} onPress={() => {
            navigation.navigate('ProductScreen', { productData: item, cartItems: cartItems })
        }}>
            <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                {isFavorite ?
                    <RedHeart height={14} width={14} /> : <WhiteHeart height={14} width={14} />
                }
            </TouchableOpacity>
            <View style={styles.productIcon}>
                <Image source={{ uri: item.thumbnail }} height={70} width={70} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[FontStyle.Body2SemiBold, { color: '#1E222B' }]}>
                    {'$' + item.price}
                </Text>
                <TouchableOpacity onPress={() => {
                    Alert.alert('Item added to your Cart');
                    addItem({ item });
                }}>
                    <AddIcon />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[FontStyle.LabelRegular, {
                    flex: 1,
                    flexWrap: 'wrap',
                    width: '60%',
                }]}>
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <View style={[styles.homeCard]}>
                <View style={styles.containerPadding}>
                    <TouchableOpacity style={{alignSelf: 'flex-end'}}onPress={() => {
                        navigation.navigate('CartScreen', { data: cartItems });
                    }}>
                        <CartIcon />
                    </TouchableOpacity>
                    <Text style={styles.name}>{`Hey, ${name}`}</Text>
                    <SearchBar />
                    <View style={{ flexDirection: 'row', marginTop: 29, justifyContent: 'space-between' }}>
                        <Text style={styles.deliveryText}>{'delivery to'}</Text>
                        <Text style={styles.deliveryText}>{'within'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 4, justifyContent: 'space-between' }}>
                        <Text style={styles.addressTimeText}>{deliveryAddress}</Text>
                        <Text style={styles.addressTimeText}>{deliveryTime}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 28, marginLeft: 20, justifyContent: 'space-between' }}>
                <YellowCard />
                <BlankCard />
            </View>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
                <Text style={styles.recommendedText}>{'Recommended'}</Text>
            </View>
            <View>
                {productDataArray && (
                    <FlatList
                        data={productDataArray.slice(0, 10)}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={[styles.containerPadding]}
                    />
                )}
            </View>
        </ScrollView>
    )

}
export default Home;