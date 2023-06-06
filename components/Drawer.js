  import React, { useContext } from 'react';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  import { AuthContext } from './AuthContext';

  import About from './About';
  import Connexion from './Connexion';
  import Inscription from './Inscription';
  import Rechercher from './Rechercher';
  import Logout from './Logout';
  import { Ionicons } from '@expo/vector-icons';
  import Profil from './Profil';
  import Combinaison from './Combinaison';
  import Home from './Home';





  const DrawerNav = createDrawerNavigator();

  const Drawer = () => {
    const { userLoggedIn } = useContext(AuthContext);

    return (
      <DrawerNav.Navigator>
        <DrawerNav.Screen
          name='Home'
          component={Home}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name='home' size={size} color={color} />
            ),
          }}
        />



        {!userLoggedIn && (
          <DrawerNav.Screen
            name='Inscription'
            component={Inscription}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='mail' size={size} color={color} />
              ),
            }}
          />
        )}

        <DrawerNav.Screen
          name='A propos'
          component={About}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name='information-circle' size={size} color={color} />
            ),
          }}
        />



        {userLoggedIn && (
          <DrawerNav.Screen
            name='Profil'
            component={Profil}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='person-circle' size={size} color={color} />
              ),
            }}
          />
        )}




        {userLoggedIn && (
          <DrawerNav.Screen
            name='Rechercher'
            component={Rechercher}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='search' size={size} color={color} />
              ),
            }}
          />


        )}


        {userLoggedIn && (
          <DrawerNav.Screen
            name='Combinaison'
            component={Combinaison}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='md-git-network' size={size} color={color} />
              ),
            }}
          />


        )}


        {userLoggedIn ? (
          <DrawerNav.Screen
            name='Logout'
            component={Logout}
            options={{
              drawerLabel: 'Logout',
              drawerIcon: ({ color, size }) => (
                <Ionicons name='log-out' size={size} color={color} />
              ),
            }}
          />
        ) : (

          <DrawerNav.Screen
            name='Connexion'
            component={Connexion}
            
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name='log-in' size={size} color={color} />
              ),
            }}
          />

        )}
      </DrawerNav.Navigator>
    );
  };

  export default Drawer;

