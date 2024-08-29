import { View } from "react-native";
import { styled } from "nativewind";
import React from "react";
import { ThemedText } from "./ThemedText";

// Componente AgeNum para mostrar la edad
const AgeNum = React.memo(({ children }: any) => {
  return (
    <ThemedText className="text-right mr-[20px] min-w-[30px] min-h-[24px]">
      {children}
    </ThemedText>
  );
});

// Componente MonthCell genérico
const MonthCell = styled(
  View,
  "border border-[#333] h-[15px] w-[15px] rounded-full mx-1"
);

// Versiones blancas y negras de MonthCell
const MonthCellWhite = React.memo(styled(MonthCell, "bg-white"));
const MonthCellBlack = React.memo(styled(MonthCell, "bg-[#333]"));

// Componente AgeRow para mostrar una fila de edad y meses
const AgeRow = React.memo(({ age, months }: any) => {
  return (
    <View className="flex flex-row items-center justify-center gap-[5px] flex-wrap">
      <AgeNum>{age}</AgeNum>
      <View className="flex flex-row gap-[5px]">{months}</View>
    </View>
  );
});

export { AgeRow, AgeNum, MonthCellWhite, MonthCellBlack };
