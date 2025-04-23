import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProfilePicture from '../../components/ProfilePic';
import SearchBar from '../../components/SearchBar';
import BottomNavBar from '../../components/NavBar';
import ServiceList from '../../components/ServiceList';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfilePicture uri="https://randomuser.me/api/portraits/men/32.jpg" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.welcome}>Bienvenido</Text>
          <Text style={styles.username}>martingzz</Text>
        </View>
      </View>

      <SearchBar />

      <Text style={styles.sectionTitle}>Servicios</Text>
<ServiceList />

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#E67E22',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Home;