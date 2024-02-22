import { Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View,FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Assets } from "../../constant/assets";
import { colorDark, colorDarkGray, colorWhite } from "../../constant/colors";
import { text1 } from "../../constant/dimens";
import { BASE_URL_2 } from "../../constant/strings";
import ItemFavourite from "./components/item_favourite";

const FavouriteScreen = () => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleFetchData = () => {
    fetch(`${BASE_URL_2}`)
      .then((response) => {
        if (!response.ok) {
          console.log("mạng không ổn định");
        }
        return response.json();
      })
      .then((data) => {
        setListData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      })
      .finally(() => {
        setIsLoading(false);

        setRefreshing(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    handleFetchData();
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingEnd: 15,
        }}
      >
        <TouchableOpacity onPress={() => console.log("lon")}>
          <Image style={styles.icon} source={Assets.iconSetting} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: text1,
            color: colorWhite,
            fontWeight: "700",
            letterSpacing: 0.8,
          }}
        >
          Favourite
        </Text>
        <Image style={styles.icon} source={Assets.iconAvatar} />
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={listData}
        renderItem={({ item }) => <ItemFavourite item={item}/>}
        keyExtractor={(item) => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20, paddingRight: 10,paddingBottom:80 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colorWhite}
          />
        }
      />
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 15,
    paddingVertical: 20,
    backgroundColor: colorDark,
  },
});
