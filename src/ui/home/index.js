import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { colorDark, colorGray, colorWhite } from "../../constant/colors";
import { Assets } from "../../constant/assets";
import { text1, text2 } from "../../constant/dimens";
import { data } from "./data/category_data";
import ItemCategory from "./components/item_category";
import { BASE_URL } from "../../constant/strings";
import ItemCoffee from "./components/item_coffee";

const HomeScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState("0");
  const [listData, setListData] = useState();
  const [filteredData, setFilteredData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const handleSelect = (id) => {
    setSelectedId(id);
    if (id === "0") {
      setFilteredData(listData);
    } else {
      console.log(id);
      const filtered = listData.filter((item) => item.type === id);
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/coffee`)
      .then((response) => {
        if (!response.ok) {
          console.log("mạng không ổn định");
        }
        return response.json();
      })
      .then((data) => {
        setListData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingEnd: 15,
        }}
      >
        <TouchableOpacity onPress={() => console.log("lon")}>
          <Image style={styles.icon} source={Assets.iconSetting} />
        </TouchableOpacity>
        <Image style={styles.icon} source={Assets.iconAvatar} />
      </View>
      <Text
        style={{
          marginTop: 40,
          marginBottom: 20,
          fontSize: text1 * 1.6,
          color: colorWhite,
          fontWeight: "700",
          lineHeight: 46,
          letterSpacing: 0.8,
        }}
      >
        Find the best{"\n"}coffee for you
      </Text>
      <View style={styles.viewSearch} onTouchEnd={() => {}}>
        <Image style={{ width: 25, height: 25 }} source={Assets.iconSearch} />

        <TextInput
          placeholder={"Find Your Coffee..."}
          placeholderTextColor={colorGray}
          maxLength={225}
          numberOfLines={1}
          editable={false}
          style={styles.input}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ItemCategory
              item={item}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colorWhite} />
        </View>
      ) : (
        <View>
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              renderItem={({ item }) => <ItemCoffee item={item} navigation={navigation} />}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 60,
              }}
            >
              <Text
                style={{ color: colorWhite, fontSize: 19, fontWeight: 700 }}
              >
                There is no data.
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 15,
    paddingVertical: 20,
    backgroundColor: colorDark,
  },
  icon: {
    width: 35,
    height: 35,
  },
  viewSearch: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#141921",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 15,
    marginVertical: 15,
  },
  input: {
    flex: 1,
    height: "100%",
  },
});
