import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import api from '../api/api';
import { Race, RootStackParamList } from '../types/types';

type RacesRouteProp = RouteProp<RootStackParamList, 'Races'>;

const RacesScreen = () => {
  const { params } = useRoute<RacesRouteProp>();
  const { driverId } = params;

  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await api.get(`drivers/${driverId}/races.json`);
        const raceData = response.data.MRData.RaceTable.Races;
        setRaces(raceData);
      } catch (err) {
        console.error('❌ Error fetching races:', err);
        setError('Failed to load race history');
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, [driverId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>❌ {error}</Text>
      ) : races.length === 0 ? (
        <Text style={styles.details}>No races found for this driver.</Text>
      ) : (
        <FlatList
          data={races}
          keyExtractor={(item, index) => `${item.raceName}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.raceName}</Text>
              <Text style={styles.details}>Round: {item.round}</Text>
              <Text style={styles.details}>Date: {item.date}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  error: { color: 'red', marginTop: 50, textAlign: 'center' },
  loader: { marginTop: 50 },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  details: { fontSize: 14, color: '#666' },
});

export default RacesScreen;
