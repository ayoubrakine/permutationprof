import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-chart-kit';

const Home = () => {
  const [professeursCount, setProfesseursCount] = useState(0);
  const [specialiteData, setSpecialiteData] = useState([]);
  const [villeDesireeData, setVilleDesireeData] = useState([]);
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs/')
      .then(response => response.json())
      .then(data => {
        const specialiteCounts = {};
        const villeDesireeCounts = {};
        const gradeCounts = {};


        data.forEach(professeur => {
          const specialite = professeur.specialite;
          specialiteCounts[specialite] = (specialiteCounts[specialite] || 0) + 1;

          const villesDesirees = professeur.villeDesiree.split(';');
          villesDesirees.forEach(ville => {
            villeDesireeCounts[ville] = (villeDesireeCounts[ville] || 0) + 1;
          });

          const grade = professeur.grade;
          gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
        });


        const sortedSpecialiteData = Object.keys(specialiteCounts).map((specialite, index) => ({
          name: specialite,
          value: specialiteCounts[specialite],
          color: chartColors.specialite[index % chartColors.specialite.length],
          legendFontColor: '#000000',
          legendFontSize: 12,
        })).sort((a, b) => b.value - a.value);



        const sortedVilleDesireeData = Object.keys(villeDesireeCounts).map((ville, index) => ({
          name: ville,
          value: villeDesireeCounts[ville],
          color: chartColors.ville[index % chartColors.ville.length],
          legendFontColor: '#000000',
          legendFontSize: 12,
        })).sort((a, b) => b.value - a.value);


        const sortedGradeData = Object.keys(gradeCounts).map((grade, index) => ({
          name: grade,
          value: gradeCounts[grade],
          color: chartColors.grade[index % chartColors.grade.length],
          legendFontColor: '#000000',
          legendFontSize: 12,
        })).sort((a, b) => b.value - a.value);

        setSpecialiteData(sortedSpecialiteData);
        setVilleDesireeData(sortedVilleDesireeData);
        setGradeData(sortedGradeData);
        setProfesseursCount(data.length);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.head}>-----  Statistiques  -----</Text>
        
        <Text style={styles.sectionContainer}>
    <Text style={styles.blueText}>⊛ Nombre de professeurs inscrits : </Text>
    <Text style={styles.redText}>{professeursCount}</Text>
  </Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.text}>⋆ Nombre de profs par spécialité </Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={specialiteData.slice(0, 15)}
              width={370}
              height={200}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.text}>⋆ Villes les plus demandées </Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={villeDesireeData.slice(0, 15)}
              width={370}
              height={200}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.text}>⋆ Nombre de profs par grade </Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={gradeData}
              width={370}
              height={200}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        </View>
      </View>
      <View>


        <View style={styles.sectionContainer}>
          <Text style={styles.text}>⋆ Nombre de profs par spécialité (Top 15)</Text>
          <View style={styles.specialiteContainer}>
            <View style={styles.specialiteRow}>
              <Text style={styles.specialiteHeading}>Spécialité</Text>
              <Text style={styles.specialiteHeading}>Nombre</Text>
            </View>
            {specialiteData.slice(0, 15).map(item => (
              <View style={styles.specialiteRow} key={item.key}>
                <Text style={styles.specialiteText}>{item.name}</Text>
                <Text style={styles.specialiteText}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.text}>⋆ Villes les plus demandées (Top 15)</Text>
          <View style={styles.villeDesireeContainer}>
            <View style={styles.villeDesireeRow}>
              <Text style={styles.villeDesireeHeading}>Ville</Text>
              <Text style={styles.villeDesireeHeading}>Nombre</Text>
            </View>
            {villeDesireeData.slice(0, 15).map(item => (
              <View style={styles.villeDesireeRow} key={item.key}>
                <Text style={styles.villeDesireeText}>{item.name}</Text>
                <Text style={styles.villeDesireeText}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.text}>⋆ Nombre de profs par grade</Text>
          <View style={styles.gradeContainer}>
            <View style={styles.gradeRow}>
              <Text style={styles.gradeHeading}>Grade</Text>
              <Text style={styles.gradeHeading}>Nombre</Text>
            </View>
            {gradeData.map(item => (
              <View style={styles.gradeRow} key={item.key}>
                <Text style={styles.gradeText}>{item.name}</Text>
                <Text style={styles.gradeText}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

const chartConfig = {
  color: (opacity = 1, index) => chartColors.default[index % chartColors.default.length],

};

const chartColors = {
  specialite: ['#ff0000', '#00ff00', '#2193b0', '#ffff00', '#00ffff', '#ff00ff', '#800080', '#008000', '#800000', '#808000', '#008080', '#000080', '#ff6347', '#00ced1', '#ff8c00'],
  ville: ['#800080', '#008000', '#800000', '#808000', '#008080', '#000080', '#ff6347', '#00ced1', '#ff8c00', '#ff0000', '#00ff00', '#2193b0', '#ffff00', '#00ffff', '#ff00ff'],
  grade: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#800080'],
  default: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#800080', '#008000', '#800000', '#808000', '#008080', '#000080', '#ff6347', '#00ced1', '#ff8c00'],
};

const styles = StyleSheet.create({
  sectionContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 370,
    alignSelf: 'center',
    flexDirection: 'row', // Ajout de la propriété flexDirection avec la valeur 'row'
    alignItems: 'center', // Aligner les éléments verticalement au centre
    justifyContent: 'center', // Centrer les éléments horizontalement
  },
  blueText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize:15,
  },
  redText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize:17,
  },


  head: {
    fontSize: 24,
    marginBottom:30,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'blue', // Ajout de la propriété color avec la valeur "blue"
   
  },
  text:{
    //color:'blue',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,

},

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'blue', // Ajout de la propriété color avec la valeur "blue"
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 370,
    alignSelf: 'center',
    fontWeight: 'bold',
    
    
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 10,
  },






  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 370,
    alignSelf: 'center'
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  specialiteContainer: {
    paddingHorizontal: 20,
  },
  specialiteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  specialiteHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    marginBottom: 5,
    color:'blue',
  },
  specialiteText: {
    flex: 1,
    textAlign: 'center',
  },
  villeDesireeContainer: {
    paddingHorizontal: 20,
  },
  villeDesireeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    color:'blue',
  },
  villeDesireeHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    marginBottom: 5,
    color:'blue',
  },
  villeDesireeText: {
    flex: 1,
    textAlign: 'center',
  },
  gradeContainer: {
    paddingHorizontal: 20,
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  gradeHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    marginBottom: 5,
    color:'blue',
  },
  gradeText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Home;


