import CardElement from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../utils/data.json";

export default function TabThreeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ThemedText className="mt-5 mb-6" type="title">
        Memento Mori
      </ThemedText>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardElement title={item.title} description={item.description} />
        )}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </SafeAreaView>
  );
}
