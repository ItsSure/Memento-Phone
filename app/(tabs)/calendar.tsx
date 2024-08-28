import { View, Text, ScrollView, Alert, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useZustand } from "@/hooks/useZustand";
import { Href, router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const CalendarContainer = styled(View, "flex gap-[10px] mt-5");
const RectContainer = styled(View, "flex flex-col");
const AgeRow = styled(
  View,
  "flex gap-[5px] flex-wrap items-center justify-center"
);
const AgeNum = styled(
  ThemedText,
  "text-right mr-[20px] min-w-[30px] min-h-[24px]"
);
const MonthCell = styled(
  View,
  "border border-[#333] h-[10px] w-[10px] rounded-full mx-2"
);
const MonthCellWhite = styled(MonthCell, "bg-white");
const MonthCellBlack = styled(MonthCell, "bg-[#333]");

export default function TabTwoScreen() {
  const date = useZustand((state: any) => state.date);
  const [calendar, setCalendar] = useState<any>();
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
    if (bDay != null) setCalendar(populateCalendar());
  }, [bDay]);

  function populateCalendar() {
    const rectDiv = [];
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
        yearDiv.push(
          <AgeRow className="flex flex-row" key={`year-${i}-${id}`}>
            <AgeNum>{age2}</AgeNum>
            <View className="flex flex-row gap-[5px]">{monthDiv}</View>
          </AgeRow>
        );
        age2++;
      }
      rectDiv.push(
        <RectContainer key={`rect-${i}`} id={`rect-${i}`}>
          {yearDiv}
        </RectContainer>
      );
    }
    return rectDiv;
  }

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Date Required",
      "Please enter a date before accessing the calendar.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true, userInterfaceStyle: "dark" }
    );

  return (
    <SafeAreaView className="flex-1">
      <ThemedText className="mt-5" type="title">
        Memento Mori
      </ThemedText>
      {/* <Button title={"3-Button Alert"} onPress={createThreeButtonAlert} /> */}
      <ScrollView>
        <CalendarContainer className="mb-5">{calendar}</CalendarContainer>
      </ScrollView>
    </SafeAreaView>
  );
}
