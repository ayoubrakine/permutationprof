import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const About = () => {
  return (
    <ScrollView style={styles.back}>

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>
          Plateforme de Permutation pour Enseignants Universitaires
        </Text>
      </View>
      <View style={styles.total}>
        <Text style={styles.description}>
          ↪ Cette plateforme est simplement un espace permettant aux professeurs universitaires de rechercher un partenaire pour une permutation. Elle se limite à cette fonctionnalité. Les enseignants peuvent rechercher des partenaires intéressés par un échange dans d'autres établissements d'enseignement supérieur. Le système facilite la recherche et la correspondance entre les enseignants ayant une volonté mutuelle d'échanger.
        </Text>

        <Text style={styles.description}>
          ↪ La plateforme offre une interface conviviale et sécurisée aux enseignants pour communiquer et échanger les informations nécessaires. Les membres peuvent créer des profils personnels et renseigner des informations concernant leurs spécialités, les établissements et les informations de contact. Les enseignants peuvent consulter les profils des partenaires potentiels et entrer en contact avec eux pour discuter des détails de l'accord d'échange.
        </Text>

        <Text style={styles.description}>
          ↪ En utilisant cette plateforme, les enseignants peuvent faciliter leur recherche de partenaires d'échange, économiser du temps et des efforts en évitant les communications individuelles et les recherches continues d'opportunités d'échange. Ce système est efficace et utile pour les enseignants souhaitant changer d'institution ou travailler dans un nouvel établissement pour élargir leur expérience académique.
        </Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  back: {

    backgroundColor: 'white',


  },
  containerr: {

    marginTop: 40,


  },
  container: {
    flex: 1,
    padding: 20,


  },
  contentContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#DAE2F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'center',



  },
  description: {
    fontSize: 16,
    marginBottom: 10,

    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
  },
  total: {
    fontSize: 16,
    marginBottom: 10,

    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#DAE2F8',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default About;
