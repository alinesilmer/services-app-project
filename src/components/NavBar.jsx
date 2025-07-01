// NavBar: bottom navigation bar with icons for different routes, highlights active route.
// Uses Pressable and Feather icons; routes via useRouter.
//------------------------------------------------------------------//

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useRouter, usePathname } from "expo-router"
import { Colors } from "../constants/Colors"
import { Metrics } from "../constants/Metrics"
import { getUserProfile, isUserLoggedIn } from "../utils/storage"

const NavBar = () => {
  const [userType, setUserType] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router   = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    ;(async () => {
      setIsLoggedIn(await isUserLoggedIn())
      const profile = await getUserProfile()
      setUserType(profile?.userType || null)
    })()
  }, [])

  const handleProtectedRoute = (route) => {
    if (!isLoggedIn) return router.push("/auth/login")
    router.push(route)
  }

  const isActiveRoute = (routeKey) => {
    if (!pathname) return false
    switch (routeKey) {
      case "home":
        return (
          pathname.includes("/home") ||
          pathname === "/tabs/client/home" ||
          pathname === "/tabs/professional/home"
        )
      case "chat":
        return pathname.includes("/chat")
      case "calendar":
        return (
          pathname.includes("/myAppointments") ||
          pathname.includes("/agenda") ||
          pathname.includes("/schedule")
        )
      case "profile":
        return pathname.includes("/dashboard") || pathname.includes("/profile")
      default:
        return false
    }
  }

  const renderItem = (icon, label, route, routeKey) => {
    const isActive = isActiveRoute(routeKey)
    const iconColor = isActive ? Colors.orangeColor : Colors.whiteColor
    const textColor = isActive ? Colors.orangeColor : Colors.whiteColor

    const onPress = () => {
      if (isActive) return             
      if (routeKey === "home") {
        const homeRoute =
          userType === "professional"
            ? "/tabs/professional/home"
            : "/tabs/client/home"
        handleProtectedRoute(homeRoute)
      } else if (routeKey === "chat") {
        handleProtectedRoute("/tabs/chat")
      } else {
        const base = userType === "professional" ? "professional" : "client"
        handleProtectedRoute(`/tabs/${base}/${route}`)
      }
    }

    return (
      <Pressable key={routeKey} style={styles.item} onPress={onPress}>
        <Feather name={icon} size={Metrics.iconXSmall} color={iconColor} />
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        {isActive && <View style={styles.activeIndicator} />}
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      {renderItem("home", "Inicio", "home", "home")}
      {renderItem("message-square", "Chat", "chat", "chat")}
      {renderItem("calendar", "Agenda", "myAppointments", "calendar")}
      {renderItem("user", "Perfil", "dashboard", "profile")}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Metrics.animationXXXL,
    height: Metrics.navBarArea,
    flexDirection: "row",
    backgroundColor: Colors.blueColor,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: Metrics.marginS,
  },
  item: {
    alignItems: "center",
    position: "relative",
  },
  label: {
    fontSize: Metrics.fontXS,
    marginTop: Metrics.marginS,
  },
  activeIndicator: {
    position: "absolute",
    bottom: -Metrics.marginS,
    width: Metrics.marginM,
    height: Metrics.marginXS,
    backgroundColor: Colors.orangeColor,
    borderRadius: Metrics.radiusS,
  },
})

export default NavBar
