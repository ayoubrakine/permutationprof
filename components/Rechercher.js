import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Rechercher = () => {
  const [specialites, setSpecialites] = useState([]);
  const [villesActuelles, setVillesActuelles] = useState([]);
  const [villesDesirees, setVillesDesirees] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [selectedVilleActuelle, setSelectedVilleActuelle] = useState('');
  const [selectedVilleDesiree, setSelectedVilleDesiree] = useState('');
  const [professeurs, setProfesseurs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs/')
      .then(response => response.json())
      .then(data => {
        const specialitesList = [...new Set(data.map(professeur => professeur.specialite))];
        const villesActuellesList = [...new Set(data.map(professeur => professeur.villeFaculteActuelle || ''))];
        const villesDesireesList = [...new Set(data.flatMap(professeur => professeur.villeDesiree.split(';').map(ville => ville.trim())))];

        setSpecialites(specialitesList.sort());
        setVillesActuelles(villesActuellesList.sort());
        setVillesDesirees(villesDesireesList.sort());
        setProfesseurs(data);
        setSearchResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [selectedSpecialite, selectedVilleActuelle, selectedVilleDesiree]);

  const handleSearch = () => {
    const filteredProfesseurs = professeurs.filter(professeur =>
      (selectedSpecialite === '' || professeur.specialite === selectedSpecialite) &&
      (selectedVilleActuelle === '' || professeur.villeFaculteActuelle === selectedVilleActuelle) &&
      (selectedVilleDesiree === '' || professeur.villeDesiree.includes(selectedVilleDesiree))
    );

    setSearchResults(filteredProfesseurs);
  };

  const handleReset = () => {
    setSelectedSpecialite('');
    setSelectedVilleActuelle('');
    setSelectedVilleDesiree('');
    setSearchResults(professeurs);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'flex-end', alignSelf: 'center' }}>
      <View style={styles.tous}>
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

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Ville Actuelle:</Text>
            <Icon name="md-pin" size={20} color="black" style={styles.icon} />
          </View>
          <Picker
            selectedValue={selectedVilleActuelle}
            onValueChange={itemValue => setSelectedVilleActuelle(itemValue)}
          >
            <Picker.Item label="Toutes" value="" />
            {villesActuelles.map(villeActuelle => (
              <Picker.Item key={villeActuelle} label={villeActuelle} value={villeActuelle} />
            ))}
          </Picker>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Ville Désirée:</Text>
            <Icon name="md-star" size={20} color="black" style={styles.icon} />
          </View>
          <Picker
            selectedValue={selectedVilleDesiree}
            onValueChange={itemValue => setSelectedVilleDesiree(itemValue)}
          >
            <Picker.Item label="Toutes" value="" />
            {villesDesirees.map(villeDesiree => (
              <Picker.Item key={villeDesiree} label={villeDesiree} value={villeDesiree} />
            ))}
          </Picker>

          <Button
            title="Réinitialiser"
            onPress={handleReset}
            style={styles.button}
            icon={<Icon name="md-refresh" size={20} color="white" style={styles.buttonIcon} />}
          />
        </View>


        <View style={styles.container}>
          <Text style={styles.resultText}>Résultats de la recherche:</Text>

          {loading && <Text style={styles.loadingText}>LOADING...</Text>}

          {!loading && searchResults.length === 0 && <Text style={styles.avertissement}>AUCUN PROFESSEUR N'EST TROUVÉ !</Text>}

          {!loading && searchResults.length > 0 && (
            <View>
              {searchResults.map((professeur, index) => (
                <View key={professeur.email}>
                  <Text>
                    ◉ {`${professeur.nom} (${professeur.email || ''} | ${professeur.tel || ''} | ${professeur.grade || ''}) - ${professeur.specialite || ''} - (${professeur.faculteActuelle || ''} | ${professeur.villeFaculteActuelle || ''}) ---> ${professeur.villeDesiree || ''}`}
                  </Text>
                  {index !== searchResults.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </View>
          )}
        </View>

      </View>
    </ScrollView>
  );
};

export default Rechercher;

const styles = StyleSheet.create({
  separator: {
    marginLeft: 10,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'center',
    width: 50,
    borderRadius: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'red',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    color: "blue",
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
  },
  tous: {
    marginTop: 50,
  },
  loadingText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10,
  },
  avertissement: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10,
    color: 'red',
  },
  container: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});