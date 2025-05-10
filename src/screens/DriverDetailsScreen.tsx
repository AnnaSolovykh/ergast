import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import api from '../api/api';
import { Driver, RootStackParamList } from '../types/types';

type DriverDetailsRouteProp = RouteProp<RootStackParamList, 'DriverDetails'>;

const DriverDetailsScreen = () => {
  const route = useRoute<DriverDetailsRouteProp>();
  const { driverId } = route.params;

  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await api.get(`drivers/${driverId}.json`);
        const data = response.data.MRData.DriverTable.Drivers[0];
        setDriver(data);
      } catch (err) {
        setError('Не удалось загрузить данные гонщика');
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, [driverId]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  if (error || !driver) {
    return <Text style={styles.error}>{error || 'Данные не найдены'}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {driver.givenName} {driver.familyName}
      </Text>
      <Text>Nationality: {driver.nationality}</Text>
      <Text>Date of Birth: {driver.dateOfBirth}</Text>
      <Text>
        Racer details:{' '}
        <Text
          style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => Linking.openURL(driver.url)}
        >
          {driver.url}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  error: { color: 'red', marginTop: 50, textAlign: 'center' },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});

export default DriverDetailsScreen;
