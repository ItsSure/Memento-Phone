import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import { Href, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useZustand } from "../../hooks/useZustand";

export default function HomeScreen() {
  const date = useZustand((state: any) => state.date);
  const setDate = useZustand((state: any) => state.setDate);
  const loadDate = useZustand((state: any) => state.loadDate);
  // const resetDate = useZustand((state: any) => state.resetDate);

  const router = useRouter();

  useEffect(() => {
    loadDate();
  }, []);

  useEffect(() => {
    if (date != null) {
      //console.log(`${new Date()} y ${date}`);
      router.push("/calendar" as Href);
    }
  }, [date]);

  return (
    <SafeAreaView className="flex-1">
      <ThemedText className="mt-5 mb-6" type="title">
        Memento Mori
      </ThemedText>
      <View className="bg-[#0A0A0A] border border-[#333] rounded-lg p-2">
        <DateTimePicker
          mode="single"
          date={new Date()}
          onChange={(params: any) => setDate(params.date.toDate())}
          initialView="year"
          displayFullDays={true}
          calendarTextStyle={styles.calendarText} // Estilo para el texto del calendario
          selectedTextStyle={styles.selectedText} // Estilo para el texto seleccionado
          selectedItemColor="#333" // Color de fondo y borde del ítem seleccionado
          headerContainerStyle={styles.headerContainer} // Estilo para el contenedor del encabezado
          headerTextContainerStyle={styles.headerTextContainer} // Estilo para el contenedor del texto del encabezado
          headerTextStyle={styles.headerText} // Estilo para el texto del encabezado
          headerButtonStyle={styles.headerButton} // Estilo para los botones del encabezado
          headerButtonColor="#fff" // Color del ícono de los botones del encabezado
          headerButtonSize={24} // Tamaño del ícono de los botones del encabezado
          dayContainerStyle={styles.dayContainer} // Estilo para el contenedor de los días
          todayContainerStyle={styles.todayContainer} // Estilo para el contenedor de hoy
          todayTextStyle={styles.todayText} // Estilo para el texto de hoy
          monthContainerStyle={styles.monthContainer} // Estilo para el contenedor de los meses
          yearContainerStyle={styles.yearContainer} // Estilo para el contenedor de los años
          weekDaysContainerStyle={styles.weekDaysContainer} // Estilo para el contenedor de los días de la semana
          weekDaysTextStyle={styles.weekDaysText} // Estilo para el texto de los días de la semana
          timePickerContainerStyle={styles.timePickerContainer} // Estilo para el contenedor del selector de hora
          timePickerTextStyle={styles.timePickerText} // Estilo para el texto del selector de hora
          timePickerIndicatorStyle={styles.timePickerIndicator} // Estilo para el indicador de tiempo seleccionado
        />
      </View>
      {/* <Button title={"3-Button Alert"} onPress={resetDate} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendarText: {
    color: "#fff", // Color del texto dentro del calendario
  },
  selectedText: {
    color: "#fff", // Color del texto seleccionado
  },
  selectedItemColor: "#444", // Color de fondo del ítem seleccionado (ajustar según contraste deseado)
  headerContainer: {
    backgroundColor: "#0A0A0A", // Fondo del encabezado
  },
  headerTextContainer: {
    backgroundColor: "#0A0A0A", // Fondo del contenedor del texto del encabezado
  },
  headerText: {
    color: "#fff", // Color del texto del encabezado
  },
  headerButton: {
    backgroundColor: "#0A0A0A", // Fondo de los botones del encabezado
  },
  headerButtonColor: "#fff", // Color del ícono de los botones del encabezado
  dayContainer: {
    backgroundColor: "#222", // Fondo del contenedor de los días
  },
  todayContainer: {
    backgroundColor: "#444", // Fondo del contenedor de hoy
  },
  todayText: {
    color: "#fff", // Color del texto de hoy
  },
  monthContainer: {
    backgroundColor: "#222", // Fondo del contenedor de los meses
  },
  yearContainer: {
    backgroundColor: "#222", // Fondo del contenedor de los años
  },
  weekDaysContainer: {
    backgroundColor: "#0A0A0A", // Fondo del contenedor de los días de la semana
  },
  weekDaysText: {
    color: "#fff", // Color del texto de los días de la semana
  },
  timePickerContainer: {
    backgroundColor: "#0A0A0A", // Fondo del contenedor del selector de hora
  },
  timePickerText: {
    color: "#fff", // Color del texto del selector de hora
  },
  timePickerIndicator: {
    backgroundColor: "#555", // Color del indicador de tiempo seleccionado
  },
});
