import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  colorDarkGray,
  colorOrange,
  colorWhite,
} from "../../../constant/colors";
import { Assets } from "../../../constant/assets";
import { BASE_URL, BASE_URL_2 } from "../../../constant/strings";

const ItemCoffee = ({ item, navigation }) => {
  const [first, setfirst] = useState("");
  const handleAddCart = () => {
    fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: item.image,
        name: item.name,
        subtitle: item.subtitle,
        quantity: 1,
        price: item.price,
        size: [item.type != 0 ? "S-1" : "250gm-1"],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("mạng không ổn định");
        }
        return response.json();
      })
      .then((data) => {
        setfirst("✓");
        setTimeout(() => {
          setfirst("");
        }, 1000);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  };
 
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", { item });
      }}
      style={{
        width: 170,
        height: 235,
        backgroundColor: colorDarkGray,
        marginRight: 30,
        borderRadius: 20,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <View style={{ width: 140, height: 135 }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: "100%", borderRadius: 20 }}
        />
        <View
          style={{
            width: 50,
            height: 22,
            right: -1,
            position: "absolute",
            backgroundColor: "#000000",
            opacity: 0.7,
            borderBottomLeftRadius: 26,
            borderTopRightRadius: 26,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            padding: 3,
            gap: 3,
          }}
        >
          <Image source={Assets.iconStar} style={{ width: 11, height: 11 }} />
          <Text
            style={{
              color: colorWhite,
              fontSize: 10,
              fontWeight: "600",
              lineHeight: 20,
            }}
          >
            {item.star}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
          paddingStart: 15,
          paddingVertical: 5,
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 500, color: colorWhite }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 10.5, fontWeight: 300, color: colorWhite }}>
          {item.subtitle}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: "row",
          paddingHorizontal: 15,
          paddingVertical: 5,
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 700, color: colorWhite }}>
          <Text style={{ fontSize: 18, color: colorOrange }}>$ </Text>
          {item.price}
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleAddCart();
          }}
          style={{
            width: 30,
            height: 30,
            backgroundColor: first ? "green" : colorOrange,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 23, color: colorWhite }}>
            {first ? "✓" : "+"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCoffee;

const styles = StyleSheet.create({});
