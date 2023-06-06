import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from './AuthContext';
import bcrypt from 'react-native-bcrypt';

const Connexion = () => {
  const { setUserLoggedIn, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const professors = await response.json();

      const foundProfessor = professors.find(
        (professor) => professor.email === email.toLowerCase() && bcrypt.compareSync(password, professor.password)
      );

      if (foundProfessor) {
        
        Alert.alert('Connexion réussie', 'Vous êtes maintenant connecté');
        setUserLoggedIn(true); 
        setUser(foundProfessor); 
      } else {
        Alert.alert('Erreur de connexion', 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion');
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSendForgotPassword = () => {
    // Sending password reset email
  
    Alert.alert('Email envoyé', 'Un email a été envoyé à votre boîte de réception');

    
    setShowForgotPassword(false);
    setForgotPasswordEmail('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Adresse Email:</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Entrez votre adresse email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>

      {!showForgotPassword && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Mot de passe:</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Entrez votre mot de passe"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>CONNEXION</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.passoublier}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      )}

      {showForgotPassword && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre adresse email"
            value={forgotPasswordEmail}
            onChangeText={(text) => setForgotPasswordEmail(text)}
          />
          <TouchableOpacity onPress={handleSendForgotPassword} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowForgotPassword(false)} style={styles.sendButtonAnnuler}>
            <Text style={styles.forgotPasswordText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAE2F8',
  },
  formContainer: {

    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,

    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: 'white',

    
    textAlign: 'center',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  passoublier: {
    marginTop:15,
    textDecorationLine:'underline',
    color: 'blue',
  
    
    textAlign: 'center',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  sendButtonAnnuler: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Connexion;





// import React, { useState, useContext } from 'react';
// import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { AuthContext } from './AuthContext';
// import bcrypt from 'react-native-bcrypt';

// const Connexion = () => {
//   const { setUserLoggedIn, setUser } = useContext(AuthContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
//       const professors = await response.json();

//       const foundProfessor = professors.find(
//         (professor) => professor.email === email.toLowerCase() && bcrypt.compareSync(password, professor.password)
//       );

//       if (foundProfessor) {
//         // Successful login
//         Alert.alert('Connexion réussie', 'Vous êtes maintenant connecté');
//         setUserLoggedIn(true); // Update user login status to true
//         setUser(foundProfessor); // Set the user information
//       } else {
//         Alert.alert('Erreur de connexion', 'Email ou mot de passe incorrect');
//       }
//     } catch (error) {
//       Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion');
//       console.error(error);
//     }
//   };

//   const handleForgotPassword = () => {
//     setShowForgotPassword(true);
//   };

//   const handleSendForgotPassword = () => {
//     // Sending password reset email
//     // Assuming we already have a function to send the email
//     // Here, we will simply display a success message
//     Alert.alert('Email envoyé', 'Un email a été envoyé à votre boîte de réception');

//     // Reset fields
//     setShowForgotPassword(false);
//     setForgotPasswordEmail('');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Adresse Email:</Text>
//         <View style={styles.inputContainer}>
//           <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Entrez votre adresse email"
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//           />
//         </View>
//       </View>

//       {!showForgotPassword && (
//         <View style={styles.formContainer}>
//           <Text style={styles.label}>Mot de passe:</Text>
//           <View style={styles.inputContainer}>
//             <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Entrez votre mot de passe"
//               secureTextEntry={true}
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//             />
//           </View>

//           <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
//             <Text style={styles.loginButtonText}>CONNEXION</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleForgotPassword}>
//             <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {showForgotPassword && (
//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Entrez votre adresse email"
//             value={forgotPasswordEmail}
//             onChangeText={(text) => setForgotPasswordEmail(text)}
//           />
//           <TouchableOpacity onPress={handleSendForgotPassword} style={styles.sendButton}>
//             <Text style={styles.sendButtonText}>Envoyer</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => setShowForgotPassword(false)}>
//             <Text style={styles.forgotPasswordText}>Annuler</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#DAE2F8',
//   },
//   formContainer: {

//     width: '80%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,

//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//   },
//   loginButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#FFFFFF',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   forgotPasswordText: {
//     color: '#007AFF',
//     marginTop: 10,
//     textAlign: 'center',
//     fontSize: 14,
//   },
//   sendButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   sendButtonText: {
//     color: '#FFFFFF',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default Connexion;



