import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Button, Rating, Divider } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../assets/icons/back.svg';
import CartIcon from '../../assets/icons/Cart.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import RedHeart from '../../assets/icons/redHeart.svg';
import { Theme } from '../../assets/themes/theme';
import { FontStyle } from '../../assets/fonts/font';
import { styles } from '../homeScreen/Styles';

const ProductScreen = (props: any) => {

  const [productDetails, setProductDetails] = useState(props.route.params.productData ?? undefined);
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState(props.route.params.cartItems);
  console.log('SCREEN 2: ', cartItems);

  useEffect(() => {
    const data = props.route.params.productData;
    setProductDetails(data);
  }, [productDetails])

  const product = {
    brand: productDetails.brand,
    title: productDetails?.title,
    images: productDetails?.images,
    price: '$' + productDetails?.price,
    discount: productDetails?.discountPercentage + '%',
    description: productDetails?.description,
    rating: productDetails?.rating,
  };
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Home');
        }}>
          <BackButton />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('CartScreen', { data: cartItems });
        }}>
          <CartIcon />
        </TouchableOpacity>

      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={[{ ...FontStyle.ManropeLargeTitle }, styles.black0]}>{product.brand}</Text>
        <Text style={[{ ...FontStyle.ManropeLargeBoldTitle }, styles.black0]}>{product.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={16}
            startingValue={product.rating}
            style={{ marginVertical: 10 }}
          />
          <Text style={[{ ...FontStyle.Body2Regular, marginLeft: 4 }, styles.grey]}>{'110 Reviews'}</Text>
        </View>

      </View>

      <View style={{ flex: 1 }}>
        {product.images && (
          <>
            <Swiper style={{ alignItems: 'center', justifyContent: 'center' }}>
              {product.images?.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={{ height: 207, resizeMode: 'contain' }} />
              ))}
            </Swiper>
            <TouchableOpacity style={styles.productfavoriteButton} onPress={toggleFavorite}>
              {isFavorite ?
                <RedHeart height={14} width={14} /> : <WhiteHeart height={14} width={14} />}
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={[FontStyle.Body1Medium, { marginRight: 4, color: Theme.navyBlue.backgroundColor }]}>{product.price}</Text>
          <Text style={[styles.discount, FontStyle.Body2SemiBold, { justifyContent: 'center', alignItems: 'center', color: 'white', padding: 4 }]}>{product.discount} OFF</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity style={[styles.addtoCart, { flex: 1, marginRight: 20, justifyContent: 'center', alignItems: 'center' }]}
            onPress={() => {
              const newItem = {
                data: productDetails,
                quantity: 1,
              };
              const existingIndex = cartItems.findIndex((item) => item.data.id === newItem.data.id);
              if (existingIndex === -1) {
                setCartItems((prevItems) => [...prevItems, newItem]);
              } else {
                const updatedProducts = [...cartItems];
                updatedProducts[existingIndex].quantity += 1;
                setCartItems(updatedProducts);
              }
            }}
          >
            <Text style={[FontStyle.Body2SemiBold, { color: Theme.lightBlue.backgroundColor }]}>{"Add to Cart"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buyNow, { flex: 1, marginRight: 20, justifyContent: 'center', alignItems: 'center' }]}
            onPress={() => {
              const newItem = {
                data: productDetails,
                quantity: 1,
              };
              const existingIndex = cartItems.findIndex((item) => item.data.id === newItem.data.id);
              if (existingIndex === -1) {
                setCartItems((prevItems) => [...prevItems, newItem]);
              } else {
                const updatedProducts = [...cartItems];
                updatedProducts[existingIndex].quantity += 1;
                setCartItems(updatedProducts);
              }
              navigation.navigate('CartScreen', { data: cartItems })
            }}>
            <Text style={[FontStyle.Body2SemiBold, { color: 'white' }]}>{"Buy Now"}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={[FontStyle.Body1Regular, styles.black0]}>{'Details'}</Text>
          <Text style={[FontStyle.Body1Regular, styles.grey1]}>{product.description}</Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;
