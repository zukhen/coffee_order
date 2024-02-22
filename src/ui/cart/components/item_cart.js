import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  colorDark,
  colorDarkGray,
  colorOrange,
  colorWhite,
} from "../../../constant/colors";

const ItemCart = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity == 1) return;
    setQuantity(quantity - 1);
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 140, height: 150, borderRadius: 20 }}
      />
      <View style={{ paddingVertical: 3, gap: 15, flex: 1 }}>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 23, color: colorWhite }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: "#AEAEAE" }}>
            {item.subtitle}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 45,
                backgroundColor: colorDark,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              <Text
                style={{ color: colorWhite, fontSize: 14, fontWeight: "600" }}
              >
                {item.size[0].split("-")[0]}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 48,
                }}
              >
                <Text
                  style={{
                    color: colorOrange,
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  ${" "}
                  <Text style={{ color: colorWhite }}>
                    {item.price * quantity}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => decrementQuantity()}
            style={{
              width: 35,
              height: 35,
              backgroundColor: colorOrange,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 23, color: colorWhite }}>-</Text>
          </TouchableOpacity>

          <View
            style={{
              width: 80,
              height: 35,
              backgroundColor: "#141921",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              borderColor: colorOrange,
              borderWidth: 1,
            }}
          >
            <Text
              style={{ fontSize: 17, fontWeight: "700", color: colorWhite }}
            >
              {quantity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => incrementQuantity()}
            style={{
              width: 35,
              height: 35,
              backgroundColor: colorOrange,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 23, color: colorWhite }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemCart;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colorDarkGray,
    marginBottom: 15,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    gap: 15,
  },
});
