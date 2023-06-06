import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { grades, villes, specialites} from '../donneelist.js'

const Inscription = () => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('');
    const [specialite, setSpecialite] = useState('');
    const [faculteActuelle, setFaculteActuelle] = useState('');
    const [villeFaculteActuelle, setVilleFaculteActuelle] = useState('');
    const [villeDesiree, setVilleDesiree] = useState([]);
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({});



   


    const validateFields = () => {
        const errors = {};

        if (!nom) {
            errors.nom = '*Le champ Nom est obligatoire.';
        }

        if (!prenom) {
            errors.prenom = '*Le champ Prénom est obligatoire.';
        }

        if (!tel) {
            errors.tel = '*Le champ Téléphone est obligatoire.';
        }

        if (!email) {
            errors.email = '*Le champ Email est obligatoire.';
        } else if (!validateEmail(email)) {
            errors.email = Alert.alert('Veuillez utiliser une adresse e-mail académique !');
        }
        if (!password) {
            errors.password = '*Le champ Mot de Passe est obligatoire.';
        }
        if (!grade) {
            errors.grade = '*Le champ Grade est obligatoire.';
        }

        if (!faculteActuelle) {
            errors.faculteActuelle = '*Le champ Établissement est obligatoire.';
        }

        if (!specialite) {
            errors.specialite = '*Le champ Spécialité est obligatoire.';
        }

        if (!villeFaculteActuelle) {
            errors.villeFaculteActuelle = '*Le champ Ville actuelle est obligatoire.';
        }
        if (villeDesiree.length === 0) {
            errors.villeDesiree = '*Le champ Ville  désirées est obligatoire.';
        }
        setErrorMessages(errors);

        return Object.keys(errors).length === 0;
    };

    const validateEmail = (email) => {
      const emailString = email.toString();
      return emailString.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };



    const addProfessor = async () => {
        try {
            const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: nom,
                    prenom: prenom,
                    tel: tel,
                    email: email,
                    grade: grade,
                    specialite: specialite,
                    faculteActuelle: faculteActuelle,
                    villeFaculteActuelle: villeFaculteActuelle,
                    villeDesiree: villeDesiree.join(";"),
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Professor added successfully:', data);
            } else {
                const error = await response.json();
                console.error('Failed to add professor:', error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const _renderItem = useCallback((item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.nom}</Text>
            </View>
        );
    }, []);

    const handleSearchClique = () => {
        if (validateFields()) {
            addProfessor();
            Alert.alert('Inscription réussie', 'Vous êtes inscrit avec succès.', [
                {
                    text: 'OK',
                    onPress: () => {
                        setNom('');
                        setPrenom('');
                        setTel('');
                        setEmail('');
                        setGrade('');
                        setSpecialite('');
                        setFaculteActuelle('');
                        setVilleFaculteActuelle('');
                        setVilleDesiree([]);
                        setPassword('');
                    },
                },
            ]);
            console.log(nom, prenom, tel, email, password, grade, faculteActuelle, specialite, villeFaculteActuelle, villeDesiree);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.textHeader}>-----  Inscription  ----- </Text>
                    <Text style={styles.textelement}>
                        <Icon name="user" size={20} color="#333" /> Nom
                    </Text>
                    <TextInput

                        placeholder="Entrez votre nom"
                        value={nom}
                        onChangeText={setNom}
                        style={styles.textinput}
                    />
                    {errorMessages.nom && <Text style={styles.errorText}>{errorMessages.nom}</Text>}

                    <Text style={styles.textelement}>
                        <Icon name="user" size={20} color="#333" /> Prénom
                    </Text>
                    <TextInput

                        placeholder="Entrez votre prénom"
                        value={prenom}
                        onChangeText={setPrenom}
                        style={styles.textinput}
                    />
                    {errorMessages.prenom && <Text style={styles.errorText}>{errorMessages.prenom}</Text>}

                    <Text style={styles.textelement}>
                        <Icon name="phone" size={20} color="#333" /> Téléphone
                    </Text>
                    <TextInput

                        placeholder="Entrez votre numéro de téléphone"
                        value={tel}
                        onChangeText={setTel}
                        style={styles.textinput}
                    />
                    {errorMessages.tel && <Text style={styles.errorText}>{errorMessages.tel}</Text>}

                    <Text style={styles.textelement}>
                        <Icon name="envelope" size={20} color="#333" /> E-mail
                    </Text>
                    <TextInput

                        placeholder="Entrez votre adresse email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textinput}
                    />
                    {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}

                    <Text style={styles.textelement}>
                        <Icon name="lock" size={20} color="#333" /> Mot de passe
                    </Text>
                    <TextInput

                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textinput}
                        secureTextEntry
                    />
                    {errorMessages.password && <Text style={styles.errorText}>{errorMessages.email}</Text>}

                    <Text style={styles.textelement}>
                        <Icon name="graduation-cap" size={20} color="#333" /> Grade
                    </Text>
                    <Dropdown

                        style={styles.textinput}
                        containerStyle={styles.shadow}
                        data={grades}
                        labelField="nom"
                        valueField="nom"
                        label="Dropdown"
                        placeholder="Choisissez votre grade"
                        value={grade}
                        onChange={(item) => {
                            setGrade(item.nom);
                        }}
                        renderItem={(item) => _renderItem(item)}
                        textError={errorMessages.grade}
                    />
                    {errorMessages.grade && <Text style={styles.errorText}>{errorMessages.grade}</Text>}
                    <Text style={styles.textelement}>
                        <Icon name="university" size={20} color="#333" /> Etablissement ( FST, FS, EST, ENSA...)
                    </Text>
                    <TextInput

                        placeholder="Entrez votre établissement"
                        value={faculteActuelle}
                        onChangeText={setFaculteActuelle}
                        style={styles.textinput}
                    />
                    {errorMessages.faculteActuelle && (
                        <Text style={styles.errorText}>{errorMessages.faculteActuelle}</Text>
                    )}

                    <Text style={styles.textelement}>
                        <Icon name="flask" size={20} color="#333" /> Spécialité
                    </Text>

                    <Dropdown

                        style={styles.textinput}
                        containerStyle={styles.shadow}
                        data={specialites}
                        search
                        searchPlaceholder="Search"
                        labelField="nom"
                        valueField="nom"
                        label="Dropdown"
                        placeholder="Choisissez une spécialité"
                        value={specialite}
                        onChange={(item) => {
                            setSpecialite(item.nom);
                        }}
                        renderItem={(item) => _renderItem(item)}
                        textError={errorMessages.specialite}
                    />
                    {errorMessages.specialite && <Text style={styles.errorText}>{errorMessages.specialite}</Text>}
                    <Text style={styles.textelement}>
                        <Icon name="map-marker" size={20} color="#333" /> Ville actuelle
                    </Text>
                    <Dropdown

                        style={styles.textinput}
                        containerStyle={styles.shadow}
                        data={villes}
                        search
                        searchPlaceholder="Search"
                        labelField="nom"
                        valueField="nom"
                        label="Dropdown"
                        placeholder="Choisissez une ville"
                        value={villeFaculteActuelle}
                        onChange={(item) => {
                            setVilleFaculteActuelle(item.nom);
                        }}
                        renderItem={(item) => _renderItem(item)}
                        textError={errorMessages.villeFaculteActuelle}
                    />
                    {errorMessages.villeFaculteActuelle && <Text style={styles.errorText}>{errorMessages.villeFaculteActuelle}</Text>}

                    <Text style={styles.textelement}>
                        <Icon name="map-marker" size={20} color="#333" /> Villes désirées (une ou plusieurs)
                    </Text>
                    <MultiSelect

                        style={styles.textinput}
                        containerStyle={styles.shadow}
                        data={villes}
                        labelField="nom"
                        valueField="nom"
                        label="Multi Select"
                        placeholder="Choisissez les villes désirées"
                        search
                        searchPlaceholder="Search"
                        value={villeDesiree}
                        onChange={(item) => {
                            setVilleDesiree(item);
                        }}
                        textError={errorMessages.villeDesiree}
                    />
                    {errorMessages.villeDesiree && <Text style={styles.errorText}>{errorMessages.villeDesiree}</Text>}
                    <TouchableOpacity style={styles.button} onPress={handleSearchClique}>
                        <Text style={styles.buttonText}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Inscription;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        width: Dimensions.get('window').width,
    },
    header: {
        marginTop: 30,
        marginBottom: 30,
    },
    formContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 15,
        
    },
    textHeader: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 20,
        color : 'red',
        fontWeight:'bold',
        
    },
    textelement: {
        color: 'blue',
        fontSize: 16,
       
        marginBottom: 10,
        fontWeight: 'bold',
     
    },
    textinput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
    },
    button: {
        alignSelf:'center',
        backgroundColor: '#3498db',
        paddingVertical: 6,
        borderRadius: 4,
        alignItems: 'center',
        width:100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    item: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    textItem: {
        fontSize: 16,
        fontWeight: '400',
    },
});
