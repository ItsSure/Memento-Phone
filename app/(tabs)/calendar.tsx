import { View, Alert, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useZustand } from "@/hooks/useZustand";
import { Href, router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { AgeRow, MonthCellBlack, MonthCellWhite } from "@/components/Memos";

const RectContainer = styled(View, "flex flex-col mb-5");

export default function TabTwoScreen() {
  const date = useZustand((state: any) => state.date);
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const bDay = useZustand((state: any) => state.date);

  useFocusEffect(
    React.useCallback(() => {
      if (date == null) {
        createThreeButtonAlert();
        router.replace("/" as Href); // Redirige a "index" si no hay fecha
      }
    }, [date])
  );

  useEffect(() => {
    if (bDay != null) setCalendarData(populateCalendar());
  }, [bDay]);

  function populateCalendar() {
    const data = [];
    let id: number = 1;
    let age2: number = 1;
    let now = new Date();
    let dayDiff = (now.getTime() - bDay.getTime()) / (1000 * 3600 * 24);
    let years = Math.floor(dayDiff / 365);
    let remainingMonths = Math.round((dayDiff % 365) / 30.44);
    let numMonths = years * 12 + remainingMonths;

    for (let i = 1; i <= 10; i++) {
      const yearDiv = [];
      for (let age = 0; age < 10; age++) {
        const monthDiv = [];
        for (let col = 1; col <= 12; col++) {
          const isLived: boolean = numMonths > 0;
          monthDiv.push(
            isLived ? (
              <MonthCellWhite key={`${i}-${id}`} id={`month-${id}`} />
            ) : (
              <MonthCellBlack key={`${i}-${id}`} id={`month-${id}`} />
            )
          );
          id++;
          numMonths--;
        }
        yearDiv.push({
          id: `${i}-${age2}`,
          age: age2,
          months: monthDiv,
        });
        age2++;
      }
      data.push({
        id: `rect-${i}`,
        rows: yearDiv,
      });
    }
    return data;
  }

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Date Required",
      "Please enter a date before accessing the calendar.",
      [{ text: "OK", onPress: () => null }],
      { cancelable: true, userInterfaceStyle: "dark" }
    );

  const renderItem = ({ item }: any) => (
    <RectContainer>
      {item.rows.map((row: any) => (
        <AgeRow key={row.id} age={row.age} months={row.months} />
      ))}
    </RectContainer>
  );

  return (
    <SafeAreaView className="flex-1">
      <ThemedText className="mt-5 mb-6" type="title">
        Memento Mori
      </ThemedText>
      <FlatList
        data={calendarData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </SafeAreaView>
  );
}
