import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import BackButton from '../../assets/icons/back.svg';
import CartIcon from '../../assets/icons/Cart.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import MinusIcon from '../../assets/icons/minus.svg';
import { useNavigation } from '@react-navigation/native';
import { FontStyle } from '../../assets/fonts/font';
import { styles } from '../homeScreen/Styles';

const CartScreen = (props: any) => {
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState(props.route.params.data);
    const deliveryCharge = 2.00;
    console.log('SCREEEN 3: ', cartItems);

    const incrementQuantity = (productId) => {
        setCartItems((prevCart) =>
            prevCart.map((item) =>
                item.data.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (productId, quantity) => {
        if (quantity === 1) {
            const updatedProducts = cartItems.filter((item) => item.data.id !== productId);
            setCartItems(updatedProducts);
        }
        else {
            setCartItems((prevCart) =>
                prevCart.map((item) =>
                    item.data.id === productId && item.quantity > 0
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }
    };

    const renderCartItem = ({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.data.thumbnail }} height={40} width={40} />
                <View style={{ marginLeft: 26 }}>
                    <Text style={[FontStyle.Body1Medium, styles.black0]}>{item.data.title}</Text>
                    <Text style={[FontStyle.Body1Regular, styles.black0]}>${item.data.price}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => decrementQuantity(item.data.id, item.quantity)}>
                    <MinusIcon />
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => incrementQuantity(item.data.id)}>
                    <PlusIcon />
                </TouchableOpacity>
            </View>
        </View>
    );

    const getSubTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.data.price * item.quantity, 0).toFixed(2);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {
                    navigation.navigate('Home');
                }}>
                    <BackButton />
                </TouchableOpacity>
                <Text style={[FontStyle.Body1Regular, styles.black0]}>
                    {`Shopping cart (${cartItems?.length ?? 0})`}
                </Text>

            </View>
            <FlatList
                style={{ marginTop: 50 }}
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.data.id.toString()}
            />
            {cartItems?.length > 0 && (
            <View style={styles.cartCheckout}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={FontStyle.Body2Regular}>
                        {'Subtotal: '}
                    </Text>
                    <Text style={FontStyle.Body2Regular}>${getSubTotalPrice()}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={FontStyle.Body2Regular}>
                        {'Delivery: '}
                    </Text>
                    <Text style={FontStyle.Body2Regular}>
                        ${deliveryCharge.toFixed(2)}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={FontStyle.Body2Regular}>
                        {'Total: '}
                    </Text>
                    <Text style={FontStyle.Body2Regular}>
                        ${(parseInt(getSubTotalPrice(), 10) + deliveryCharge).toFixed(2)}
                    </Text>
                </View>
                <TouchableOpacity style={[styles.buyNow, {justifyContent: 'center', alignItems: 'center', marginVertical: 16 }]}
                    onPress={() => {
                        Alert.alert('Thank you for Shopping with us');
                        setCartItems(null);
                        navigation.navigate('Home', { isEmptyCart: true })
                    }}
                    >
                    <Text style={[FontStyle.Body2SemiBold, { color: 'white' }]}>{"Proceed to Checkout"}</Text>
                </TouchableOpacity>
            </View>
            )}

        </View>
    );
};

export default CartScreen;
