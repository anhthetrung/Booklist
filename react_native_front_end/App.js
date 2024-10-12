import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

import Book from "./components/Book";

export default function App() {
  /*
  const [books, setBooks] = useState([
    {
      name: "Sống để kể lại những anh hùng",
      author: "Nguyễn Quang Chánh",
      id: "gn0y2rmj09to2tb6q2t1o1x1m5wdnt03",
      imagePath:
        "https://book365.vn/upload/resize_cache/uf/cc6/186_253_1/gn0y2rmj09to2tb6q2t1o1x1m5wdnt03.jpg",
    },
    {
      name: "Học, Đọc sách và Sáng tạo",
      author: "Nguyễn Như Ý - Trần Chí Đạt - Võ Thế Quân - Vũ Thùy Dương",
      id: "y8o3d04slxh5dtvwhefvbcwfgslfaly8",
      imagePath:
        "https://book365.vn/upload/resize_cache/uf/82f/186_253_1/y8o3d04slxh5dtvwhefvbcwfgslfaly8.jpg",
    },
    {
      name: "Quốc Sử Di Biên",
      author: "Phan Thúc Trực",
      id: "e4udknc6epuveyv0jhdtvhpabc2gb99e",
      imagePath:
        "https://book365.vn/upload/resize_cache/uf/bb0/186_253_1/e4udknc6epuveyv0jhdtvhpabc2gb99e.jpeg",
    },
    {
      name: "Viện Trợ Nước Ngoài Cho Việt Nam (Đối Với Giáo Dục Và Đào Tạo 1954 - 1975)",
      author: "TS. Nguyễn Thúy Quỳnh",
      id: "nbkeq8e0y2mq978j4cxqnd81sbk5vzw1",
      imagePath:
        "https://book365.vn/upload/resize_cache/uf/3fe/186_253_1/nbkeq8e0y2mq978j4cxqnd81sbk5vzw1.jpg",
    },
  ]); */

  const [books, setBooks] = useState();

  const [loading, setLoading] = useState(true);

  const serverIP = "http://172.20.10.2:8080"

  //fetch the data from server
  useEffect(() => {
    fetch(`${serverIP}/books`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function deleteBookHandler(id) {
    
    setBooks((currentBooks) => {
      return books.filter((item) => {
        return item.id != id;
      });
    });
  }

  return (
    <>
      <StatusBar style="light" />
        {/* <Text style={{ marginVertical: 50 }}>Hello World</Text> */}
        {loading ? (
          <Text style={{ marginVertical: 50 }}>Loading...</Text>
        ) : (
          <View style={styles.container}>
            <FlatList
              data={books}
              renderItem={(itemData) => {
                return (
                  <Book
                    bookName={itemData.item.name}
                    author={itemData.item.author}
                    imageUrl={`${serverIP}/images/` + itemData.item.id}
                    id={itemData.item.id}
                    onDeleteBook={deleteBookHandler}
                  />
                );
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
            /> 
          </View>)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#66ccff",
    backgroundColor: "#A7C7E7",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
