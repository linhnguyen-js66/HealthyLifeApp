import React from 'react'
import {LineChart} from "react-native-chart-kit"
import { Dimensions } from "react-native";
const Data = [1000,1200,1000,950,1000,1100,1350]
const Chart = ({dataKcal,label}) => {
    const screenWidth = Dimensions.get("window").width -32;
    const data = {
        labels: label,
        datasets: [
          {
            data:dataKcal,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Số liệu hàng tuần"] // optional
      };
      const chartConfig = {
        backgroundGradientFrom: "#A762FE",
        backgroundGradientTo: "#F558F8",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `white`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
    return(
        <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{marginHorizontal:16,marginTop:16, borderRadius:20}}
      />
    )
}
export default Chart