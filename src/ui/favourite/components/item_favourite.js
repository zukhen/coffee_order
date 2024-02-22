import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { Assets } from "../../../constant/assets";
import { colorDark, colorWhite } from "../../../constant/colors";

const ItemFavourite = ({ item }) => {
  const [isSelected, setIsSelected] = useState(true);

  const toggleAddTocart = () => {
    setIsSelected()
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 25,
          borderRadius:20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingEnd: 15,
          }}
        >
          <TouchableOpacity onPress={toggleAddTocart}>
            {isSelected ? (
              <Image style={styles.icon} source={Assets.iconAddToCard} />
            ) : (
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: colorDark,
                  alignItems: "center",
                  borderRadius: 8,
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={Assets.iconHeartUnSelected}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <BlurView
          intensity={10}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 150,
          }}
        >
          <View
            style={{
              height: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              backgroundColor: "black",
              width: "100%",
              opacity: 0.5,
            }}
          ></View>
          {/* button */}
          <View
            style={{
              position: "absolute",
              gap: 15,
              paddingVertical: 25,
              justifyContent: "space-between",
              paddingHorizontal: 15,
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <View style={{ gap: 8 }}>
              <Text
                style={{ color: colorWhite, fontSize: 24, fontWeight: "700" }}
              >
                {item.name}
              </Text>
              <Text style={{ color: colorWhite }}>{item.subtitle}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image style={{}} source={Assets.iconStar} />
              <Text
                style={{ fontSize: 19, fontWeight: "700", color: colorWhite }}
              >
                {item.star}{" "}
                <Text
                  style={{ fontSize: 14, fontWeight: 500, color: "#AEAEAE" }}
                >
                  {"(6789)"}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              gap: 15,
              paddingVertical: 25,
              justifyContent: "center",
              paddingHorizontal: 15,
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", gap: 20 }}>
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: colorDark,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  gap: 4,
                }}
              >
                <Image
                  style={{ width: 30, height: 26 }}
                  source={Assets.iconBean}
                />
                <Text style={{ color: colorWhite, fontSize: 12 }}>Bean</Text>
              </View>
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: colorDark,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  gap: 4,
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={Assets.iconLocation}
                />
                <Text style={{ color: colorWhite, fontSize: 12 }}>Africa</Text>
              </View>
            </View>
            <View
              style={{
                width: 135,
                height: 45,
                backgroundColor: colorDark,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: colorWhite, fontSize: 12 }}>
                Medium Roasted
              </Text>
            </View>
          </View>
        </BlurView>
      </ImageBackground>
      <View style={{  paddingHorizontal: 15 }}>
        <View style={{ paddingVertical: 25, gap: 10 }}>
          <Text style={{ color: "#AEAEAE", fontWeight: "600", fontSize: 17 }}>
            Description
          </Text>
          <Text style={{ color: "#AEAEAE", fontWeight: "400", fontSize: 14 }}>
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemFavourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 550,
    borderRadius:20,
    marginVertical:80
  },
});
