import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerRequest: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1a2f68",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    marginTop:-10,
  },
  description: {
    marginTop: 10,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#B55A3E",
    textAlign: "center",
    width:330,
  },
  rectangle: {
    width: 310,
    height: 160,
    backgroundColor: "#f0f0f0",
    borderColor: "#1a2f68",
    borderWidth: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    //tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    //tabIconSelected: tintColorDark,
  },
  containerContent: {
    flexGrow: 1,
    marginTop: 50,
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius:120,
  },
  button:{
        backgroundColor: '#000', // negro
        marginTop: 20,
        padding: 15,        
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:150
      },
  buttonText:{
        color: '#fff', // blanco
        fontSize: 16,
        fontWeight: 'bold',
      },
  buttonTwo:{
        backgroundColor: "#198754",
        marginTop: 20,
        padding: 18,        
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:280
  },
  buttonTextTwo:{
        color: '#fff', // blanco
        fontSize: 16,
        fontWeight: 'bold',
  },
    
});
