import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Assets } from "../../constant/assets";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  colorDark,
  colorDarkGray,
  colorGray,
  colorOrange,
  colorWhite,
} from "../../constant/colors";
import { BlurView } from "expo-blur";
import { BASE_URL, BASE_URL_2 } from "../../constant/strings";

const DetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [selectedSize, setSelectedSize] = useState(item.size[0]);
  const [isSelected, setIsSelected] = useState(false);
  const [first, setFirst] = useState("Add to Cart");
  const selectSize = (size) => {
    setSelectedSize(size);
  };
  const toggleAddTocart = () => {
    setIsSelected(true);
    handleAddFavoutire();
  };
  const handleAddFavoutire = () => {
    fetch(`${BASE_URL_2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: item.image,
        name: item.name,
        subtitle: item.subtitle,
        star: item.star,
        description: item.description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("mạng không ổn định");
        }
        return response.json();
      })
      .then((data) => {
      
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  };
  const handleAddToCart = () => {
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
        size: `${selectedSize}-1`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("mạng không ổn định");
        }
        return response.json();
      })
      .then((data) => {
        setFirst("Success");
        setTimeout(() => {
          setFirst("Add to Cart");
        }, 1000);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  };
  const intest = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: item.image }}
        style={{
          flex: 1.3,
          width: "100%",
          paddingTop: intest.top + 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            justifyContent: "space-between",
            alignItems: "center",
            paddingEnd: 15,
          }}
        >
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Image style={styles.icon} source={Assets.iconBack} />
          </TouchableOpacity>
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
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <View style={{ paddingVertical: 25, gap: 10 }}>
          <Text style={{ color: "#AEAEAE", fontWeight: "600", fontSize: 17 }}>
            Description
          </Text>
          <Text style={{ color: "#AEAEAE", fontWeight: "400", fontSize: 14 }}>
            {item.description}
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ color: "#AEAEAE", fontWeight: "600", fontSize: 17 }}>
            Size
          </Text>
          <View style={{ flexDirection: "row", gap: 15 }}>
            {item.size.map((e, index) => (
              <TouchableOpacity
              key={index}          
                    onPress={() => selectSize(e)}
                style={{
                  width: 120,
                  height: 40,
                  backgroundColor: "#141921",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                  borderColor: selectedSize === e ? colorOrange : "transparent",
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    lineHeight: 20,
                    fontSize: 14,
                    fontWeight: "400",
                    color: selectedSize === e ? colorOrange : "#AEAEAE",
                  }}
                >
                  {e}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            paddingBottom: intest.bottom,
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
              $ <Text style={{ color: colorWhite }}>{item.price}</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleAddToCart()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 240,
              backgroundColor: first != "Add to Cart" ? "green" : colorOrange,
              borderRadius: 20,
              height: 60,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 600, color: colorWhite }}>
              {first}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDarkGray,
  },
});
