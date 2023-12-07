import { connect } from "react-redux";
import { addOrUpdateItem, removeItem } from "../redux/action";
import { FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
//tên src1 là tên file js muốn đổi sang tên khác cx đc
const src1 = ({ addOrUpdateItem, removeItem }) => {
  const [list, setList] = useState([]);
  const [close, setClose] = useState(false);
  //name đổi tên theo thuộc tính api mình đặt
  const [todojob, setName] = useState("");
  const [id, setId] = useState(null);
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    //link api đổi sang link mình
    fetch("https://65465bfefe036a2fa9558ece.mockapi.io/Donut/redux", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res) {
          setList(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const save = (item) => {
    // Kiểm tra có nhập hay chưa
    // cái name  đổi theo thuộc tính api của mình nếu muốn thêm thuộc tính nữa thi gõ || ! rồi ghi thêm
    if (!todojob) {
      console.log("Nhập tên dùm");
      return;
    }
    // tạo đối tượng mới chuẩn bị cho thêm hoặc cập nhật
    const newData = {
      //cái name đổi theo thuộc tính api của mình muốn thêm vì viết tên thuộc tính vào
      todojob: todojob,
    };
    const apiEndpoint = id
    //link api đổi sang link mình còn lại giữ nguyên
      ? `https://65465bfefe036a2fa9558ece.mockapi.io/Donut/redux/${id}`
      : "https://65465bfefe036a2fa9558ece.mockapi.io/Donut/redux";
    const method = id ? "PUT" : "POST";
    // gửi yêu cầu post hoặc put lên api
    fetch(apiEndpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // cập nhật dữ liệu
        if (id) {
          setList((prevList) =>
            prevList.map((item) => (item.id === id ? res : item))
          );
        } else {
          // cập nhật dữ liệu
          setList((prevList) => [...prevList, res]);
        }
        // set lại input sau khi thêm hoặc cập nhật thành công
        //set này khai báo ở trên có thể thay đổi
        setClose(false);
        setName("");
        setId(null);
      })
      .catch((err) => {
        console.log(err);
      });
    // Gửi hành động để thêm hoặc cập nhật mục trong Redux
    //tên này khai báo bên action.js
    addOrUpdateItem(res);
  };
  //xóa
  const remove = (item) => {
    // ... Existing remove logic
    fetch(`https://65465bfefe036a2fa9558ece.mockapi.io/Donut/redux/${item.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // Cập nhật trạng thái sau khi xóa thành công
          setList((prevList) => prevList.filter((i) => i.id !== item.id));
        } else {
          console.log("Xóa đéo được");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // gửi hành động xóa đến Redux
    //tên này khai báo bên action.js
    removeItem(item.id);
  };
  //showEdit đổi thành edit cx đc cái j edit cx đc
  const showEdit = (item) => {
    //set này khai báo ở trên có thể thay đổi
    setName(item.name);
    setId(item.id);
    setClose(true);
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal visible={close}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}>New</Text>
          <TouchableOpacity
            onPress={() => {
              //set này khai báo ở trên có thể thay đổi
              setClose(false);
            }}
            >
            <Text style={{ color: "#DC143C", fontSize: 20 }}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 19 }}>
          <Text>Họ và Tên</Text>
          <TextInput style={{margin: 10,height: 60,borderWidth: 1, borderColor: "gray",
            }}
            placeholderTextColor={"gray"}
            placeholder="Nhập tên"
            value={todojob}
            onChangeText={(text) => {
              //set này khai báo ở trên có thể thay đổi
              setName(text);
            }}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={save}>
            <Text style={{ color: "#07f7f7", fontSize: 20 }}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}>
        Ten
      </Text>
      <View style={{}}>
        <Pressable
          onPress={() => {
            //set này khai báo ở trên có thể thay đổi
            setClose(true);
          }}
          style={{ height: "40px", width: "80px", backgroundColor: "blue" }}
        >
          <Text
            style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}
          >
            New
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={list}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 18 }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  Ten: {item.todojob}
                </Text>
              </View>
              <View>
                <Pressable
                  onPress={() => {
                    remove(item);
                  }}
                  style={{ height: "35px", width: 40, backgroundColor: "red" }}
                >
                  <Text style={{ textAlign: "center", marginTop: 6 }}>
                    Delete
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    //này khai báo ở trên có thể thay đổi
                    showEdit(item);
                  }}
                  style={{ height: "35px", width: 40, backgroundColor: "blue" }}
                >
                  <Text style={{ textAlign: "center", marginTop: 6 }}>
                    Edit
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
const mapStateToProps = (state) => ({
  list: state.list,
});
const mapDispatchToProps = {
  //khai bái bên action.js
  addOrUpdateItem,
  removeItem,
};
//tên src1 là tên file js muốn đổi sang tên khác cx đc
export default connect(mapStateToProps, mapDispatchToProps)(src1);
