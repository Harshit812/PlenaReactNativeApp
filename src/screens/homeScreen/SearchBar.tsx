import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { styles } from './Styles';
// import SearchIcon from '../assets/icons/search.svg';

const SearchBarExample = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: any) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput  //search Icon will be added 
        style={styles.searchInput}
        placeholderTextColor={'#8891A5'}
        placeholder="Search Products or store"
        onChangeText={handleSearch}
        value={searchText}
      />
    </View>
  );
};

export default SearchBarExample;
