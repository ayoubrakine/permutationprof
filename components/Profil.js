import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from './AuthContext';

const Profil = () => {
  const { user, setUser } = useContext(AuthContext);
  const [modifiedProfessor, setModifiedProfessor] = useState({
    nom: user.nom,
    prenom: user.prenom,
    tel: user.tel,
    email: user.email,
    grade: user.grade,
    specialite: user.specialite,
    faculteActuelle: user.faculteActuelle,
    villeFaculteActuelle: user.villeFaculteActuelle,
    villeDesiree: user.villeDesiree,
  });
  const navigation = useNavigation();

  const handleInputChange = (key, value) => {
    setModifiedProfessor({ ...modifiedProfessor, [key]: value });
  };

  const handleUpdate = async () => {
    if (validateFields()) {
      try {
        const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(modifiedProfessor),
        });

        if (response.ok) {
          Alert.alert(
            'Modification réussie',
            'Votre profil a été modifié avec succès.',
            [
              {
                text: 'OK',
              },
            ]
          );
        } else {
          const error = await response.json();
          console.error('Failed to update professor:', error.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Erreur',
          "Une erreur s'est produite lors de la modification du profil.",
          [
            {
              text: 'OK',
            },
          ]
        );
      }
    }
  };

  const handleDeleteProfessor = async () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce professeur ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(
                `https://troubled-red-garb.cyclic.app/professeurs/${user.email}`
              );
              Alert.alert('Success', 'Professor deleted successfully');
              navigation.goBack();
            } catch (error) {
              const message = error.response?.data?.message || 'An error occurred';
              Alert.alert('Error', message);
            }
          },
        },
      ]
    );
  };

  const validateFields = () => {

    return true;
  };

  return (
    <ScrollView >

      <Card  >
      
        <Card.Title style={styles.title}>  YOUR PROFIL
              </Card.Title>
              <Image source={require('../assets/profil.png')} style={styles.image} />
        
        <Card.Divider />


        <View style={styles.cont1}>

          <Icon name="person" type="material" size={20} color="#777" />
          <Text style={styles.text}> Nom :</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={modifiedProfessor.nom}
          onChangeText={(text) => handleInputChange('nom', text)}
        />





        <View style={styles.cont1}>

          <Icon name="person" type="material" size={20} color="#777" />
          <Text style={styles.text}> Prénom :</Text>
        </View>


        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={modifiedProfessor.prenom}
          onChangeText={(text) => handleInputChange('prenom', text)}
        />

        <View style={styles.cont1}>

          <Icon name="phone" type="material" size={20} color="#777" />
          <Text style={styles.text}> Téléphone :</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={modifiedProfessor.tel}
          onChangeText={(text) => handleInputChange('tel', text)}
        />

        <View style={styles.cont1}>

          <Icon name="mail" type="material" size={20} color="#777" />
          <Text style={styles.text}> E-mail :</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={modifiedProfessor.email}
          editable={false}
        />


        <View style={styles.cont1}>

          <Icon name="badge" type="material" size={20} color="#777" />
          <Text style={styles.text}> Grade :</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Grade"
          value={modifiedProfessor.grade}
          onChangeText={(text) => handleInputChange('grade', text)}
        />
        <View style={styles.cont1}>

          <Icon name="work" type="material" size={20} color="#777" />
          <Text style={styles.text}> Spécialité :</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Spécialité"
          value={modifiedProfessor.specialite}
          onChangeText={(text) => handleInputChange('specialite', text)}
        />
        <View style={styles.cont1} >

          <Icon name="school" type="material" size={20} color="#777" />
          <Text style={styles.text}> Faculté actuelle : </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Faculté actuelle"
          value={modifiedProfessor.faculteActuelle}
          onChangeText={(text) => handleInputChange('faculteActuelle', text)}
        />
        <View style={styles.cont1}>

          <Icon name="location-on" type="material" size={20} color="#777" />
          <Text style={styles.text}> Ville de la faculté actuelle : </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Ville de la faculté actuelle"
          value={modifiedProfessor.villeFaculteActuelle}
          onChangeText={(text) =>
            handleInputChange('villeFaculteActuelle', text)
          }
        />
        <View style={styles.cont1}>

          <Icon name="location-on" type="material" size={20} color="#777" />
          <Text style={styles.text}> Ville désirée : </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Ville désirée"
          value={modifiedProfessor.villeDesiree}
          onChangeText={(text) => handleInputChange('villeDesiree', text)}
        />




        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteProfessor}
        >
          <Text style={styles.buttonText}>Delete account</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = {
  element: {

    alignItems: 'center',

  },

  image: {
    borderRadius: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    marginLeft:120,
    marginBottom:15,
    

    

  },
  title: {

    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',

  },
  cont1: {

    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10

  },
  text: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',

  },

  inputContainer: {

    marginBottom: 15,
  },

  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: 9,
  },
  button: {

    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 15,
  },
};

export default Profil;





