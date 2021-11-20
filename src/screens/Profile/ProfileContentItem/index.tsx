import React from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { styles } from '../style'
import { Feather } from "@expo/vector-icons";
import { theme } from "../../../styles/theme";
import { IconProfile } from "./Icon";

interface ProfileContentItemProps {
  route: "MyFeedbacks" | "ChangePassword" | "QuestionnaireAfter";
  text: string;
  isFirst?: boolean;
  icon: "star" | "lock" | "answers"
}

export function ProfileContentItem({ route, text, icon, isFirst = false }: ProfileContentItemProps) {
  const { navigate } = useNavigation() as any

  return(
    <RectButton 
      rippleColor={theme.colors.gray200}
      style={[styles.profileContentButton, isFirst && { marginTop: 0 }]} 
      onPress={() => navigate(route)}
      activeOpacity={0.6}
    >
      <Text style={styles.profileContentItemText}>{text}</Text>
      <IconProfile icon={icon}/>
    </RectButton>
  )
}