import { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from "react-native";

function Book(props) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  //   const heightShrinkAnim = useRef(new Animated.Value(253)).current;

  function fadeOut() {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  function deleteBookHandler() {
    fadeOut();
    // heightShirnk();
    //props.onDeleteBook(props.id);
    setTimeout(() => {
      props.onDeleteBook(props.id);
    }, 1500);
  }

  //   function heightShirnk() {
  //     Animated.timing(heightShrinkAnim, {
  //       toValue: 0,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //   }

  return (
    <>
      <View>
        <Animated.View
          style={[
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.bookItem}>
            <Pressable onPress={deleteBookHandler}>
              <Animated.Image
                source={{ uri: props.imageUrl }}
                style={[
                  styles.image,
                  {
                    // height: heightShrinkAnim,
                  },
                ]}
                resizeMode="cover"
                onError={(e) => console.log("Error loading image:", e.nativeEvent.error)}
                
              ></Animated.Image>
            </Pressable>
            <Text style={styles.bookNameText}>{props.bookName}</Text>
            <Text style={styles.authorText}>{props.author}</Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
}

export default Book;

const styles = StyleSheet.create({
  bookItem: {
    flex: 1,
    // backgroundColor: "#66ccff",
    marginVertical: 50,
    alignItems: "center",
  },
  image: {
    width: 172,
    height: 253,
  },
  bookNameText: {
    fontSize: 20,
  },
  authorText: {
    color: "blue",
    fontSize: 14,
  },
});
