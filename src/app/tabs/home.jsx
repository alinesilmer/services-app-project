import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import ProfilePicture from '../../components/ProfilePic';
import SearchBar from '../../components/SearchBar';
import BottomNavBar from '../../components/NavBar';
import ServiceList from '../../components/ServiceList';
import { Colors } from '../../constants/Colors';
import PublicityProfessional from '../../components/PublicityProfessional';
import Notifications from '../../components/Notifications';
import LongCard from '../../components/LongCard';
import Rate from '../../components/Rate';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.profile}>
            <ProfilePicture uris="https://randomuser.me/api/portraits/men/32.jpg" />
            <View style={styles.profileText}>
              <Text style={styles.welcome}>Bienvenido</Text>
              <Text style={styles.username}>Usuario</Text>
            </View>
          </View>
          <Notifications/>
        </View>
        <SearchBar />
      </View>

      
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Servicios</Text>
          <ServiceList />
          <View>
            <PublicityProfessional uris={[
              'https://i.ytimg.com/vi/OWlt_26nd_M/maxresdefault.jpg',
              'https://www.rankingbyseo.com/wp-content/uploads/2022/07/plumber-Marketing-2.jpg',
              'https://mobilemusicdjservices.ca/wp-content/uploads/2020/07/Mobile-Music-DJ-Services-Promo-Ad-1080x675.png']} />
          </View>
          <Text style={styles.sectionTitle}>Vistos Recientemente</Text>
           <LongCard
          title="Cecilia Molo"
          subtitle="Pintura"
          profilePicUri="https://img.freepik.com/free-photo/strict-young-builder-woman-uniform-gloves-holding-crossing-paint-brush-with-roller-brush-isolated-olive-green-wall_141793-86469.jpg"
          rate={<Rate rating={4.5} />}>
        </LongCard>
        </ScrollView>
      </View>
        <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: 40,
  },
  header: {
    marginTop: 40,
    paddingHorizontal: 35,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileText: {
    marginLeft: 10,
  },
  welcome: {
    fontSize: 18,
    color: Colors.whiteColor,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.whiteColor,
  },
  bellIcon: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: Colors.orangeColor,
    marginTop: 50,
    paddingHorizontal: 8
  },
});

export default Home;
