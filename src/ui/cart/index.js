import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colorDark, colorOrange, colorWhite } from "../../constant/colors";
import { Assets } from "../../constant/assets";
import { BASE_URL } from "../../constant/strings";
import ItemCategory from "../home/components/item_category";
import ItemCart from "./components/item_cart";
import { text1 } from "../../constant/dimens";

const CartScreen = () => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleFetchData = () => {
    fetch(`${BASE_URL}/cart`)
      .then((response) => {
        if (!response.ok) {
          console.log("mạng không ổn định");
        }
        return response.json();
      })
      .then((data) => {
        setListData(data);
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
  const totalPrice = listData.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

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
          Cart
        </Text>
        <Image style={styles.icon} source={Assets.iconAvatar} />
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={listData}
        renderItem={({ item }) => <ItemCart item={item} />}
        keyExtractor={(item) => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20, paddingRight: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colorWhite}
          />
        }
      />
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View style={{ alignItems: "center", height: 48 }}>
          <Text style={{ color: "#AEAEAE", fontSize: 15 }}>Price</Text>
          <Text
            style={{ color: colorOrange, fontSize: 20, fontWeight: "bold" }}
          >
            $ <Text style={{ color: colorWhite }}>{totalPrice.toFixed(2)}</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {}}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 240,
            backgroundColor: colorOrange,
            borderRadius: 20,
            height: 60,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 600, color: colorWhite }}>
            Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

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
});
