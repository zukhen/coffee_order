import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colorGray, colorOrange } from "../../../constant/colors";

const ItemCategory = ({ item, selectedId, onSelect }) => {
    return (
      <View style={styles.category}>
        <TouchableOpacity
          style={{ alignItems: "center", flexDirection: "column", gap: 2 }}
          onPress={() => onSelect(item.id)}
        >
          <Text
            style={{
              color: selectedId === item.id ? colorOrange : colorGray,
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            {item.name}
          </Text>
          {selectedId === item.id && (
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: colorOrange,
                borderRadius: 100,
              }}
            ></View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  
  export default ItemCategory;
  
  const styles = StyleSheet.create({
    category: {
      flexDirection: "row",
      marginRight: 40,
    },
  });
  