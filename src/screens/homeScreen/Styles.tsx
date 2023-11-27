import { StyleSheet } from "react-native";
import { Theme } from '../../assets/themes/theme';
import { FontStyle } from "../../assets/fonts/font";
import { FullWindowOverlay } from "react-native-screens";

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  homeCard: {
    flexShrink: 0,
    backgroundColor: Theme.lightBlue.backgroundColor,
  },
  containerPadding: {
    padding: 20,
  },
  name: {
    color: Theme.black1.backgroundColor,
    fontFamily: 'Manrope',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: 52,
  },
  container: {
    marginTop: 35,
    height: 56,
  },
  searchInput: {
    borderRadius: 28,
    backgroundColor: Theme.navyBlue.backgroundColor,
    borderColor: Theme.navyBlue.backgroundColor,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 28,
    ...FontStyle.Body2Medium,
  },
  deliveryText: {
    color: Theme.black1.backgroundColor,
    ...FontStyle.deliveryText,
    opacity: 0.5,
  },
  addressTimeText: {
    color: Theme.black1.backgroundColor,
    ...FontStyle.Body2Medium,
  },
  recommendedText: {
    color: Theme.black0.backgroundColor,
    ...FontStyle.ManropeH1Regular
  },
  productCard: {
    borderRadius: 12,
    backgroundColor: Theme.black1.backgroundColor,
    flexShrink: 0,
    margin: 10,
    padding: 16,
    width: 160,
  },
  productIcon: {
    flexShrink: 0,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
    backgroundColor: 'white',
  },
  productfavoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  black0: {
    color: Theme.black0.backgroundColor,
  },
  grey: {
    color: '#A1A1AB'
  },
  grey1: {
    color: '#8891A5'
  },
  cartCheckout: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#F8F9FB',
    padding: 16,
  },
  addtoCart: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.navyBlue.backgroundColor,
    height: 56
  },
  buyNow: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Theme.navyBlue.backgroundColor,
    borderColor: Theme.navyBlue.backgroundColor,
    height: 56
  },
  discount: {
    borderRadius: 70,
    borderWidth: 1,
    backgroundColor: Theme.navyBlue.backgroundColor,
    borderColor: Theme.navyBlue.backgroundColor,
  }
});