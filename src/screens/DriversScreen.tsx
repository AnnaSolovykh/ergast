import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchDrivers } from '../store/drivers/driversSlice';
import { AppDispatch, RootState } from '../store/store';
import { Driver, RootStackParamList } from '../types/types';

const DriversScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list, loading, error, offset, total } = useSelector(
    (state: RootState) => state.drivers,
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Drivers'>>();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchDrivers(0));
      hasFetched.current = true;
    }
  }, [dispatch]);

  const loadMore = () => {
    if (!loading && list.length < total) {
      dispatch(fetchDrivers(offset));
    }
  };

  const renderItem: ListRenderItem<Driver> = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('DriverDetails', { driverId: item.driverId })
      }
    >
      <Text style={styles.name}>
        {item.givenName} {item.familyName}
      </Text>
      <Text style={styles.details}>{item.nationality}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && list.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item, index) => `${item.driverId}-${index}`}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  details: { color: '#666', fontSize: 14 },
  error: { color: 'red', marginTop: 20, textAlign: 'center' },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 12,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
});

export default DriversScreen;
