import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Combinaison = () => {
  const [specialites, setSpecialites] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs/')
      .then(response => response.json())
      .then(data => {
        const specialitesList = [...new Set(data.map(professeur => professeur.specialite))];
        setSpecialites(specialitesList.sort());
        setProfesseurs(data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [selectedSpecialite]);

  const handleSearch = () => {
    const filteredProfesseurs = professeurs.filter(professeur =>
      (selectedSpecialite === '' || professeur.specialite === selectedSpecialite)
    );
    setSearchResults(filteredProfesseurs);
  };

  const handleReset = () => {
    setSelectedSpecialite('');
    setSearchResults(professeurs);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-end' }}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Spécialité:</Text>
          <Icon name="md-school" size={20} color="black" style={styles.icon} />
        </View>
        <Picker
          selectedValue={selectedSpecialite}
          onValueChange={itemValue => setSelectedSpecialite(itemValue)}
        >
          <Picker.Item label="Toutes" value="" />
          {specialites.map(specialite => (
            <Picker.Item key={specialite} label={specialite} value={specialite} />
          ))}
        </Picker>

      </View>

    </ScrollView>
  );
};

export default Combinaison;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    width: 300,

  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
  },
});
