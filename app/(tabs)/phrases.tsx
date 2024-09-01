import CardElement from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import data from "../../utils/data.json";
import { useFetch } from "../../hooks/useFetch";

export default function TabThreeScreen() {
  const { data, loading, error, handleCancelRequest } = useFetch(
    "https://raw.githubusercontent.com/ItsSure/Memento-Phone/master/utils/data.json"
  );
  return (
    <SafeAreaView className="flex-1">
      <ThemedText className="mt-5 mb-6" type="title">
        Memento Mori
      </ThemedText>
      <View className="flex-1 justify-center items-center">
        {error && <ThemedText type="default">Error: {error}</ThemedText>}
        {loading && <ThemedText type="default">Loading...</ThemedText>}
      </View>
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
