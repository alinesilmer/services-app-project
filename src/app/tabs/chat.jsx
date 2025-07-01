"use client"
import { useState, useRef, useEffect } from "react"
import { Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, 
  ScrollView, StatusBar, } from "react-native"
import { Colors } from "../../constants/Colors"
import { Metrics } from "../../constants/Metrics"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { useLocalSearchParams, router } from "expo-router"

import SearchBar from "../../components/SearchBar"
import BackButton from "../../components/BackButton"
import BottomNavBar from "../../components/NavBar"
import ChatSpeech from "../../components/ChatSpeech"
import CustomFlatList from "../../components/CustomFlatList"
import LongCard from "../../components/LongCard"
import ProfilePic from "../../components/ProfilePic"

const currentUserPic = "https://randomuser.me/api/portraits/men/32.jpg"
const mockChats = [
  {
    id: "1",
    name: "Cecilia Molo",
    specialty: "Psicóloga",
    profilePic:
      "https://media.c5n.com/p/58f54261a52a7d13872a3b32af868317/adjuntos/326/imagenes/000/047/0000047835/1200x675/smart/viviana-canosa.jpg",
    lastMessage: "Nos vemos mañana",
    isOnline: true,
    unreadCount: 3,
  },
  {
    id: "2",
    name: "Nahuel Ranz",
    specialty: "Coach",
    profilePic: "https://www.newslinereport.com/online/nota_los-negocios-de-marcelo-tinelli.jpg",
    lastMessage: "Quedamos para el viernes",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Matías Velozo",
    specialty: "Estilista",
    profilePic: "https://i1.sndcdn.com/artworks-x8zI2HVC2pnkK7F5-4xKLyA-t1080x1080.jpg",
    lastMessage: "Never gonna give you up",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "4",
    name: "Florencia Luque",
    specialty: "Electricista",
    profilePic:
      "https://i.ytimg.com/vi/7FkCrPrYM1c/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUBoAC4AOKAgwIABABGFcgXyhlMA8=&rs=AOn4CLBgTrNs33-5dUBUNSjnWnZggdsHkg",
    lastMessage: "¿A qué hora le queda mejor para ir?",
    isOnline: true,
    unreadCount: 5,
  },
  {
    id: "5",
    name: "Aliné Silva",
    specialty: "Plomera",
    profilePic: "https://elonce-media.elonce.com/fotos-nuevo/2021/08/19/o_1629366666_1.jpg",
    lastMessage: "Cuando me digas voy a arreglarte el caño",
    isOnline: true,
    unreadCount: 12,
  },
]

export default function Chat() {
  const params = useLocalSearchParams()
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageList, setMessageList] = useState([])
  const [inputText, setInputText] = useState("")
  const scrollViewRef = useRef(null)

  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (params.professionalId && params.professionalName && params.professionalAvatar && !hasInitialized) {
      const professionalChat = {
        id: params.professionalId,
        name: params.professionalName,
        specialty: params.profession || "Profesional",
        profilePic: params.professionalAvatar,
        lastMessage: "",
        isOnline: true,
        unreadCount: 0,
      }

      // Verificar si ya existe en mockChats
      const existingChat = mockChats.find((chat) => chat.id === params.professionalId)
      if (!existingChat) {
        // Agregar al inicio de la lista si no existe
        mockChats.splice(0, 0, professionalChat)
      }

      // Seleccionar automáticamente este chat
      setSelectedChat(professionalChat)
      setMessageList([]) // Empezar con lista de mensajes vacía
      setHasInitialized(true) // Marcar como inicializado
    }
  }, [params.professionalId, params.professionalName, params.professionalAvatar, params.profession, hasInitialized])

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMsg = { text: inputText, sender: "me", avatar: currentUserPic }
    setMessageList((prev) => [...prev, newMsg])
    setInputText("")
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50)
  }


  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedChat(item)
        setMessageList(item.lastMessage ? [{ text: item.lastMessage, sender: "other", avatar: item.profilePic }] : [])
      }}
    >
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
  )

  if (!selectedChat) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.blueColor} barStyle="light-content" />
        <BackButton/>

        <View style={styles.headerWrapper}>
          <Text style={styles.title}>Chat</Text>
          <SearchBar placeholder="Buscar..." />
        </View>

        <CustomFlatList data={mockChats} renderItem={renderChatItem} keyExtractor={(i) => i.id} />

        <BottomNavBar />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.blueColor} barStyle="light-content" />
      <BackButton/>

      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Chat</Text>
      </View>

      <View style={styles.chatHeader}>
        <ProfilePic uri={selectedChat.profilePic} size={Metrics.iconLarge} />
        <View style={styles.chatHeaderText}>
          <Text style={styles.chatName}>{selectedChat.name}</Text>
          <Text style={styles.chatSpecialty}>{selectedChat.specialty}</Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: selectedChat.isOnline ? "#46BF36" : "#CC0000" }]} />
      </View>

      <KeyboardAvoidingView
        style={[styles.chatWrapper, { marginVertical: Metrics.marginS }]}
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.scrollContent}>
          {messageList.length === 0 && (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>¡Inicia una conversación con {selectedChat.name}!</Text>
              <Text style={styles.emptyStateSubtext}>Escribe tu primer mensaje abajo</Text>
            </View>
          )}
          {messageList.map((msg, i) => {
            const isMe = msg.sender === "me"
            const showAvatar = i === 0 || messageList[i - 1].sender !== msg.sender

            const avatarSize = Metrics.iconMedium
            const gap = Metrics.marginS
            const indent = avatarSize + gap

            return (
              <View key={i} style={[styles.messageRow, isMe ? styles.messageRowRight : styles.messageRowLeft]}>
                {!isMe && showAvatar && <ProfilePic uri={msg.avatar} size={avatarSize} style={{ marginRight: gap }} />}
                <View
                  style={[
                    !showAvatar && !isMe && { marginLeft: indent },
                    !showAvatar && isMe && { marginRight: indent },
                  ]}
                >
                  <ChatSpeech message={msg.text} isCurrentUser={isMe} />
                </View>
                {isMe && showAvatar && <ProfilePic uri={msg.avatar} size={avatarSize} style={{ marginLeft: gap }} />}
              </View>
            )
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
  },
  headerWrapper: {
    marginHorizontal: Metrics.marginXXL,
    marginTop: Metrics.marginXXL,
    marginBottom: Metrics.marginM,
  },
  title: {
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    color: Colors.whiteColor,
    textAlign: "center",
    marginBottom: Metrics.marginS,
  },
  cardWrapper: {
    position: "relative",
  },
  unreadBadge: {
    position: "absolute",
    top: Metrics.marginS,
    right: Metrics.marginS,
    backgroundColor: "#CC0000",
    borderRadius: Metrics.radiusS,
    minWidth: Metrics.marginS,
    minHeight: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.inputGray,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadBadgeText: {
    color: Colors.light.background,
    fontSize: Metrics.fontXS,
    fontWeight: "bold",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Metrics.marginL,
  },
  chatHeaderText: {
    flex: 1,
    marginLeft: Metrics.marginXL,
  },
  chatName: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.whiteColor
  },
  chatSpecialty: {
    fontSize: Metrics.fontS,
    color: Colors.disabledColor,
  },
  statusDot: {
    width: Metrics.marginM,
    height: Metrics.marginM,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.whiteColor,
    marginLeft: Metrics.marginS,
  },
  chatWrapper: {
    flex: 1,
    width: wp("100%"),
    bottom: 0,
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
  },
  messagesContainer: {
    flex: 1,
    padding: Metrics.marginS,
  },
  scrollContent: {
    paddingBottom: Metrics.marginM,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Metrics.marginS,
  },
  emptyStateText: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.blueColor,
    textAlign: "center",
    marginBottom: Metrics.marginS,
  },
  emptyStateSubtext: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
    textAlign: "center",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: Metrics.marginS,
  },
  messageRowLeft: {
    justifyContent: "flex-start",
  },
  messageRowRight: {
    justifyContent: "flex-end",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Metrics.marginS,
    borderTopWidth: Metrics.marginXS,
    borderColor: Colors.disabledColor,
    backgroundColor: Colors.whiteColor,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.inputGray,
    borderRadius:Metrics.radiusS,
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
    marginRight: Metrics.marginS,
    color: Colors.blueColor,
  },
  sendButton: {
    backgroundColor: Colors.blueColor,
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
    borderRadius:Metrics.radiusS,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: Colors.whiteColor,
    fontWeight: "bold",
  },
})
