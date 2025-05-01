import React, { useState, useRef } from 'react';
import {
  Text, View, SafeAreaView, StyleSheet,
  TextInput, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

import SearchBar      from '../../components/SearchBar';
import BackButton     from '../../components/BackButton';
import BottomNavBar   from '../../components/NavBar';
import ChatSpeech     from '../../components/ChatSpeech';
import CustomFlatList from '../../components/CustomFlatList';
import LongCard       from '../../components/LongCard';
import ProfilePic     from '../../components/ProfilePic';

const currentUserPic = 'https://randomuser.me/api/portraits/men/32.jpg';
const mockChats = [
  {
    id: '1',
    name: 'Cecilia Molo',
    specialty: 'Psicóloga',
    profilePic: 'https://media.c5n.com/p/58f54261a52a7d13872a3b32af868317/adjuntos/326/imagenes/000/047/0000047835/1200x675/smart/viviana-canosa.jpg',
    lastMessage: 'Nos vemos mañana',
    isOnline: true,
    unreadCount: 3,
    //add an isOpened value to handle the unreadCount update
  },
  {
    id: '2',
    name: 'Nahuel Ranz',
    specialty: 'Coach',
    profilePic: 'https://www.newslinereport.com/online/nota_los-negocios-de-marcelo-tinelli.jpg',
    lastMessage: 'Quedamos para el viernes',
    isOnline: false,
    unreadCount: 0 
  },
  {
    id: '3',
    name: 'Matías Velozo',
    specialty: 'Estilista',
    profilePic: 'https://i1.sndcdn.com/artworks-x8zI2HVC2pnkK7F5-4xKLyA-t1080x1080.jpg',
    lastMessage: 'Never gonna give you up',
    isOnline: false,
    unreadCount: 0 
  },
  {
    id: '4',
    name: 'Florencia Luque',
    specialty: 'Electricista',
    profilePic: 'https://i.ytimg.com/vi/7FkCrPrYM1c/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUBoAC4AOKAgwIABABGFcgXyhlMA8=&rs=AOn4CLBgTrNs33-5dUBUNSjnWnZggdsHkg',
    lastMessage: '¿A qué hora le queda mejor para ir?',
    isOnline: true,
    unreadCount: 5
  },
  {
    id: '5',
    name: 'Aliné Silva',
    specialty: 'Plomera',
    profilePic: 'https://elonce-media.elonce.com/fotos-nuevo/2021/08/19/o_1629366666_1.jpg',
    lastMessage: 'Cuando me digas voy a arreglarte el caño',
    isOnline: true,
    unreadCount: 12
  },
];

export default function Chat() {
  const navigation = useNavigation();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageList, setMessageList]   = useState([]);
  const [inputText, setInputText]       = useState('');
  const scrollViewRef = useRef(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = { text: inputText, sender: 'me', avatar: currentUserPic };
    setMessageList(prev => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setSelectedChat(item);
      setMessageList(item.lastMessage
        ? [{ text: item.lastMessage, sender: 'other', avatar: item.profilePic }]
        : []
      );
    }}>
      <View style={styles.cardWrapper}>
        <LongCard
          profilePicUri={item.profilePic}
          title={item.name}
          subtitle={item.specialty}
          isOnline={item.isOnline}
        />
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (!selectedChat) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.headerWrapper}>
          <Text style={styles.title}>Chat</Text>
          <SearchBar placeholder="Buscar..." />
        </View>

        <CustomFlatList
          data={mockChats}
          renderItem={renderChatItem}
          keyExtractor={i => i.id}
        />

        <BottomNavBar />
      </SafeAreaView>
    );
  }

 
  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => setSelectedChat(null)} />

      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Chat</Text>
      </View>

      <View style={styles.chatHeader}>
        <ProfilePic uri={selectedChat.profilePic} size={hp('7%')} />
        <View style={styles.chatHeaderText}>
          <Text style={styles.chatName}>{selectedChat.name}</Text>
          <Text style={styles.chatSpecialty}>{selectedChat.specialty}</Text>
        </View>
        <View style={[
          styles.statusDot,
          { backgroundColor: selectedChat.isOnline ? '#46BF36' : '#CC0000' }
        ]} />
      </View>

       <KeyboardAvoidingView
        style={[styles.chatWrapper, { marginVertical: hp('1.5%') }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.scrollContent}
        >
          {messageList.map((msg, i) => {
            const isMe = msg.sender === 'me';
            const showAvatar =
              i === 0 ||
              messageList[i - 1].sender !== msg.sender;

            const avatarSize = hp('4%');
            const gap = wp('4%');
            const indent = avatarSize + gap;

            return (
              <View
                key={i}
                style={[
                  styles.messageRow,
                  isMe ? styles.messageRowRight : styles.messageRowLeft
                ]}
              >
                {!isMe && showAvatar && (
                  <ProfilePic
                    uri={msg.avatar}
                    size={avatarSize}
                    style={{ marginRight: gap }}
                  />
                )}
                <View style={[
                  !showAvatar && !isMe && { marginLeft: indent },
                  !showAvatar && isMe && { marginRight: indent }
                ]}>
                  <ChatSpeech
                    message={msg.text}
                    isCurrentUser={isMe}
                  />
                </View>
                {isMe && showAvatar && (
                  <ProfilePic
                    uri={msg.avatar}
                    size={avatarSize}
                    style={{ marginLeft: gap }}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe un mensaje…"
            placeholderTextColor={Colors.blueColor}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <BottomNavBar />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor
  },

  headerWrapper: {
    marginHorizontal: wp('5%'),
    marginTop:        hp('4%'),
    marginBottom:     hp('2%'),
  },
  title: {
    fontSize:    wp('8%'),
    fontWeight:  '700',
    color:       'white',
    textAlign:   'center',
    marginBottom: hp('1.5%'),
  },

  cardWrapper: {
    position: 'relative'
  },
  unreadBadge:    {
    position:     'absolute',
    top:          hp('3%'),
    right:        wp('7%'),
    backgroundColor: '#CC0000',
    borderRadius: wp('3%'),
    minWidth:     wp('6%'),
    minHeight:    hp('2.5%'),
    paddingHorizontal: wp('1%'),
    borderWidth:  1,
    borderColor:  Colors.inputGray,
    alignItems:   'center',
    justifyContent: 'center',
  },
  unreadBadgeText: {
    color: 'white',
    fontSize: wp('3%'),
    fontWeight: 'bold'
  },

  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%')
  },
  chatHeaderText: {
    flex: 1,
    marginLeft: wp('3%')
  },
  chatName: {
    fontSize: wp('5%'),
    fontWeight: '600', color: 'white'
  },
  chatSpecialty: {
    fontSize: wp('4%'),
    color: '#ccc'
  },
  statusDot:       {
    width:        wp('3%'),
    height:       wp('3%'),
    borderRadius: wp('1.5%'),
    borderWidth:  1,
    borderColor:  'white',
    marginLeft:   wp('2%'),
  },

  chatWrapper: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    overflow: 'hidden'
  },
  messagesContainer: {
    flex: 1,
    padding: wp('3%')
  },
  scrollContent: {
    paddingBottom: hp('2%')
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: hp('1%')
  },
  messageRowLeft: {
    justifyContent: 'flex-start'
  },
  messageRowRight: {
    justifyContent: 'flex-end'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('3%'),
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    backgroundColor: Colors.inputGray,
    borderRadius: wp('8%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginRight: wp('2%'),
    color: Colors.blueColor
  },
  sendButton: {
    backgroundColor: Colors.blueColor,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});