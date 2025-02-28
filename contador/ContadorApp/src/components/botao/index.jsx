
import { TouchableOpacity, Text } from "react-native";
import styles from "./style.jsx";
export default function Botao({ onPress, title, estilo }) {
return (
<TouchableOpacity style={[styles.button, estilo]} onPress={onPress}>
<Text style={styles.buttonText}>{title}</Text>
</TouchableOpacity>
);
}