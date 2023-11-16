import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DataTable } from "react-native-paper";

const summary = () => {
  const router = useRouter();
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const nextMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(nextMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  const fetchAttendanceReport = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.3:8000/summaryReport`,
        {
          params: {
            month: 11,
            year: 2023,
          },
        }
      );
      setAttendanceData(response.data.report);
    } catch (error) {
      console.log("Error fetching the attendance report");
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, []);

  console.log("Attendance data:", attendanceData);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <TouchableOpacity
          onPress={() => router.push("/(home)")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <AntDesign name="caretleft" size={24} color="black" />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginVertical: 20,
        }}
      >
        <AntDesign
          onPress={goToPrevMonth}
          name="leftcircle"
          size={24}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="rightcircle"
          size={24}
          color="black"
        />
      </View>
      <View style={{ marginHorizontal: 12 }}>
        {attendanceData?.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#4B6CB7",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item?.name?.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Text style={{ fontSize: 12, marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </View>
            <View style={{marginTop:15, margin:5, padding:5, backgroundColor:"#A1FFCE", borderRadius:5}}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>P</DataTable.Title>
                        <DataTable.Title>A</DataTable.Title>
                        <DataTable.Title>HD</DataTable.Title>
                        <DataTable.Title>H</DataTable.Title>
                        <DataTable.Title>NW</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell>{item?.present}</DataTable.Cell>
                        <DataTable.Cell>{item?.absent}</DataTable.Cell>
                        <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                        <DataTable.Cell>1</DataTable.Cell>
                        <DataTable.Cell>8</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default summary;

const styles = StyleSheet.create({});
