import { Button, View } from "react-native";
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
      <ThemedText className="mt-5" type="title">
        Memento Mori
      </ThemedText>
      <View className="flex-1 mt-6 bg-[#F5FCFF]">
        <DateTimePicker
          mode="single"
          date={new Date()}
          onChange={(params: any) => setDate(params.date.toDate())}
          initialView="year"
          displayFullDays={true}
        />
      </View>
      {/* <Button title={"3-Button Alert"} onPress={resetDate} /> */}
    </SafeAreaView>
  );
}
