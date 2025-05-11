import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from '../api/api';
import { Driver, RootStackParamList } from '../types/types';

type DriverDetailsRouteProp = RouteProp<RootStackParamList, 'DriverDetails'>;

const DriverDetailsScreen = () => {
  const route = useRoute<DriverDetailsRouteProp>();
  const { driverId } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Drivers'>>();

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
        console.error('Error loading driver:', err);
        setError('Failed to load driver data');
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
    return (
      <View style={styles.container}>
        <Text style={styles.error}>❌ {error || 'Data not found'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {driver.givenName} {driver.familyName}
        </Text>

        <Text style={styles.label}>
          Nationality: <Text style={styles.value}>{driver.nationality}</Text>
        </Text>

        <Text style={styles.label}>
          Date of Birth: <Text style={styles.value}>{driver.dateOfBirth}</Text>
        </Text>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Races', { driverId })}
        >
          <Text style={styles.link}>📊 See race history</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => Linking.openURL(driver.url)}
        >
          <Text style={[styles.link, styles.external]}>
            🔗 Driver details: Wiki ↗
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  value: {
    fontWeight: '500',
    color: '#000',
  },
  linkContainer: {
    marginTop: 12,
  },
  link: {
    color: '#007aff',
    fontSize: 16,
    textDecorationLine: 'none',
  },
  external: {
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    fontSize: 16,
    backgroundColor: '#ffeeee',
    padding: 16,
    borderRadius: 8,
    textAlign: 'center',
    maxWidth: 360,
  },
});

export default DriverDetailsScreen;
