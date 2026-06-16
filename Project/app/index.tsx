

import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import { useState, useEffect } from "react";
import Fallback from "@/component/fallback";
import { getAllTodos, addTodo, updateTodo, deleteTodo } from "@/api";

export default function Index() {
  // Creating Local State
  const [todo, setTodo] = useState("");
  const [todolist, settodolist] = useState<{ id: number; title: string }[]>([]);
  const [editedtodo, seteditedtodo] = useState(null);

  // Fetch todos from backend on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getAllTodos();
      settodolist(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  // Handle Add Todo
  const handleaddtodo = async () => {
    try {
      await addTodo(todo);
      setTodo("");
      fetchTodos();
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  // Handle Delete Todo
  const handledeletetodo = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  // Handle Edit Todo
  const handleedittodo = (todo) => {
    seteditedtodo(todo);
    setTodo(todo.title);
  };

  // Handle Update Todo
  const handleupdatetodo = async () => {
    try {
      await updateTodo(editedtodo.id, todo);
      seteditedtodo(null);
      setTodo("");
      fetchTodos();
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  // const renderTodos = ({ item, index }: { item: { id: string; title: string }, index: number }) => {
  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 14,
          padding: 16,
          marginBottom: 10,
          marginHorizontal: 6,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
          borderLeftWidth: 5,
          borderLeftColor: "#E31A22",
          // marginTop:10
        }}
      >
        <Text style={{ color: "#1A1A1A", fontWeight: "600", fontSize: 16, flex: 1 }}>
          {item.title}
        </Text>
        <IconButton icon="pencil" iconColor="#E31A22" size={20} onPress={() => handleedittodo(item)} />
        <IconButton icon="trash-can" iconColor="#E31A22" size={20} onPress={() => handledeletetodo(item.id)} />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View>
<Text style={{ marginLeft: 16, marginTop: 16, fontWeight: "700", fontSize: 26, color: "#1A1A1A", letterSpacing: 0.3 }}>
          Welcome to ToDo List
        </Text>
        <Text style={{ marginLeft: 16, marginTop: 4, marginBottom: -4, fontSize: 14, fontWeight: "500", color: "#E31A22" }}>
          {`${new Date().toLocaleDateString("en-US", {
            weekday: "long",
          })} • ${new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
          })}`}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            color: "black",
            borderRadius: 6,
            padding: 15,
            margin: 10,
            marginTop: 16,
          }}
          placeholder="Enter Task"
          value={todo}
          onChangeText={(userinput) => setTodo(userinput)}
        />
        {editedtodo ? (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#E31A22",
              alignItems: "center",
              padding: 10,
              margin: 10,
              borderRadius: 20,
              marginTop: 2,
              backgroundColor: "#E31A22",
              paddingVertical:15
            }}
            onPress={handleupdatetodo}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Update Todo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#E31A22",
              alignItems: "center",
              padding: 10,
              margin: 10,
              borderRadius: 20,
              marginTop: 2,
              backgroundColor: "#E31A22",
              paddingVertical:15
            }}
            onPress={handleaddtodo}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", }}>Add Todo</Text>
          </TouchableOpacity>
          
        )}
        <Text style={{marginBottom:-3}}></Text>
        <FlatList data={todolist} renderItem={renderTodos} />
        <View style={{ alignItems: "center" }}>
          {todolist.length <= 0 && <Fallback />}
        </View>
      </View>
    </SafeAreaView>
  );
}
















































// import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { IconButton } from "react-native-paper";
// import { useState } from "react";
// import Fallback from "@/component/fallback";

// // const dumydata=[ 
// //   {
// //     id:1,
// //     title:"Watch Movie"
// //   },
// //   {
// //     id:2,
// //     title:"Wash Car"
// //   },
// //   {
// //     id:3,
// //     title:"Buy a Car"
// //   },
// // ];

// export default function Index() {
//   // Creating Local State
//   const [todo, setTodo] = useState("");
//   const [todolist, settodolist] = useState<{ id: string; title: string }[]>([]);
//   const [editedtodo, seteditedtodo] = useState(null);

//   // Handle Add Todo
//   const handleaddtodo = () => {
//     // structure
//     // {
//     //   id:
//     //   title:
//     // }
//     settodolist([...todolist, { id: Date.now().toString(), title: todo }]);
//     setTodo("");
//   };

//   // Handle Delete Todo
//   const handledeletetodo = (id) => {
//     const updatedtodolist = todolist.filter((todo) => todo.id !== id);
//     settodolist(updatedtodolist);
//   };

//   // Handle Edit Todo
//   const handleedittodo = (todo) => {
//     seteditedtodo(todo);
//     setTodo(todo.title);
//   };

//   // Handle Update Todo
//   const handleupdatetodo = () => {
//     const updatedtodo = todolist.map((item) => {
//       if (item.id === editedtodo.id) {
//         return { ...item, title: todo };
//       }
//       return item;
//     });
//     settodolist(updatedtodo);
//     seteditedtodo(null);
//     setTodo("");
//   };

//   // const renderTodos = ({ item, index }: { item: { id: string; title: string }, index: number }) => {
//   const renderTodos = ({ item, index }) => {
//     return (
//       <View
//         style={{
//           borderWidth: 2,
//           borderColor: "#E31A22",
//           backgroundColor: "#E31A22",
//           borderRadius: 6,
//           padding: 10,
//           paddingVertical: 20,
//           marginBottom: 6,
//           margin: 6,
//           flexDirection: "row",
//           alignItems: "center",
//           elevation: 8,
//         }}
//       >
//         <Text style={{ color: "white", fontWeight: "800", fontSize: 17, flex: 1 }}>
//           {item.title}
//         </Text>
//         <IconButton icon="pencil" iconColor="white" onPress={() => handleedittodo(item)} />
//         <IconButton icon="trash-can" iconColor="white" onPress={() => handledeletetodo(item.id)} />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView>
//       <View>
//         <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 25, marginBottom: 2 }}>
//           Welcome to ToDo List
//         </Text>
//         <Text style={{ marginLeft: 10 }}>
//           {`${new Date().toLocaleDateString("en-US", {
//             weekday: "long",
//           })} : ${new Date().toLocaleDateString("en-US", {
//             day: "numeric",
//             month: "long",
//           })}`}
//         </Text>
//         <TextInput
//           style={{
//             borderWidth: 1,
//             color: "black",
//             borderRadius: 6,
//             padding: 15,
//             margin: 10,
//             marginTop: 16,
//           }}
//           placeholder="Enter Task"
//           value={todo}
//           onChangeText={(userinput) => setTodo(userinput)}
//         />
//         {editedtodo ? (
//           <TouchableOpacity
//             style={{
//               borderWidth: 1,
//               borderColor: "black",
//               alignItems: "center",
//               padding: 10,
//               margin: 10,
//               borderRadius: 20,
//               marginTop: 2,
//               backgroundColor: "#E31A22",
//             }}
//             onPress={handleupdatetodo}
//           >
//             <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Save</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={{
//               borderWidth: 1,
//               borderColor: "black",
//               alignItems: "center",
//               padding: 10,
//               margin: 10,
//               borderRadius: 20,
//               marginTop: 2,
//               backgroundColor: "#E31A22",
//             }}
//             onPress={handleaddtodo}
//           >
//             <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Add</Text>
//           </TouchableOpacity>
//         )}
//         <FlatList data={todolist} renderItem={renderTodos} />
//         <View style={{ alignItems: "center" }}>
//           {todolist.length <= 0 && <Fallback />}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

























