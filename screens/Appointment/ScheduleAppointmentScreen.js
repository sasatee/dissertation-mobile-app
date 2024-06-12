import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";
import axios from "axios";
import { format } from "date-fns";
import useLoginState from "../../hooks/UseLoginState";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentSchedule } from "../../services/appointment";

const { width } = Dimensions.get("window");

export default function ModalScreen() {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const token = useLoginState();
  const userId = token?.userId;
  const [queryParams, setQueryParams] = useState({ date: null, userId: null });
  //function
  function getDateAndUserId(value) {
    const date = moment(value).format("YYYY-MM-DD");
    const userId = token?.userId;
    const data = { date, userId };
    //retunrn date and userId
    return data;
  }

  useEffect(() => {
    if (value && userId) {
      const params = getDateAndUserId(value, userId);
      setQueryParams(params);
    }
  }, [value, userId]);

  const {
    data,
    isSuccess,
    error: errorQUERY,
  } = useQuery({
    queryKey: ["Appointment", queryParams],
    queryFn: ({ signal }) => getAppointmentSchedule(queryParams, signal),
    staleTime: 5000,
    onSuccess: () => {},
  });

  const weeks = useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Appointment</Text>
        </View>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={(ind) => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, "week").toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}
          >
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: "#2b85cf",
                            borderColor: "#111",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: "#fff" },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: "#fff" },
                          ]}
                        >
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>{value.toDateString()}</Text>

          {!isSuccess && (
            <View className="justify-center my-12 flex-row">
              <Text className="font-mulishbold text-end text-md text-slate-400">
                No Schedule for{" "}
                <Text className="bottom-1 text-gray-500">
                  {value.toDateString()}
                </Text>
              </Text>
            </View>
          )}

          {isSuccess && (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity className="my-3 px-5 ">
                  <View className="bg-gray-200/40 rounded-3xl  border-r-2">
                    <View className="flex  flex-row">
                      <Image
                        source={{
                          uri: `${item?.profilePicture}`,
                        }}
                        style={{
                          //margin:3,
                          width: 50,
                          height: 50,
                          resizeMode: "cover",
                          borderRadius: 20,
                        }}
                        className="rounded-3xl m-3"
                      />
                      <View className="flex-1 flex-col justify-center items-start pl-4">
                        <Text className="text-xs self-end p-3 text-gray-500">
                          {format(new Date(item.bookedTime), "MMMM do yyyy")}
                        </Text>

                        <Text className="text-xs font-light">
                          Time Booked:
                          <Text className="font-semibold text-xs items-end text-amber-800">
                            {item.bookedTimeAMOrPM}
                          </Text>
                        </Text>

                        <View className=" my-5">
                          <Text className="right-20 font-mulishextrabold text-xs">
                            {item.doctorName}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

{
  /* <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.btn}>
              {/* <Text style={styles.btnText}>Schedule</Text> */
}
//     </View>
//   </TouchableOpacity>
// </View>  */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 12,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  appointmentItem: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
