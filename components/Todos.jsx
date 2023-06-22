'use client'
import { useState, useEffect } from "react";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import Image from "next/image";
import firebase from 'firebase/app'

const Todos = ({ userId ,user}) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const firestore = getFirestore();

  async function fetchTodos() {
    try {
      const firestore = firebase.firestore();
  
      // Fetch data from a specific collection
      const collectionRef = firestore.collection('todos');
      const querySnapshot = await collectionRef.get();
      const todos = querySnapshot.docs.map((doc) => doc.data());
  
      return todos;
    } catch (error) {
      console.error('Failed to fetch data from Firestore:', error);
      throw error;
    }
  }
  
  // Call the fetchTodos function and use the returned data
  fetchTodos()
    .then((todos) => {
      console.log('Todos:', todos);
      // Use the `todos` array in your application
    })
    .catch((error) => {
      // Handle any errors that occurred during fetching
      console.error('Error fetching todos:', error);
    });

  

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoDocRef = doc(firestore, "todos", userId);
        const todoDocSnap = await getDoc(todoDocRef);

        if (todoDocSnap.exists()) {
          const data = todoDocSnap.data();
          setTodos(data.todos);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  useEffect(() => {
    if (todos.length > 0) {
      saveTodoList(todos);
    }
  }, [todos]);

  const saveTodoList = async (todos) => {
    try {
      const todoDocRef = doc(firestore, "todos", userId);
      await setDoc(todoDocRef, { todos });
      console.log("Todo list saved successfully!", userId);
    } catch (error) {
      console.error("Error saving todo list:", error);
    }
  };

  const handleInput = (e) => {
    setNewTodo(e.target.value);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <>
   <div className="max-w-[1240px] mx-auto px-4">
  <form onSubmit={handleSubmit} className="text-gray-800 flex flex-col">
    <label htmlFor="todoInput" className="mr-2">
      Add todos
    </label>
    <textarea
      required
      id="todoInput"
      onChange={handleInput}
      value={newTodo}
      className="w-96 h-40 rounded-md p-2 resize-none"
    />
    <button type="submit" className="bg-white text-blue-700 px-4 py-2 w-32 mt-2 rounded-md">
      Add
    </button>
  </form>

  <div className="max-w-[1240px] mx-auto">
    <div className="flex flex-col-reverse items-start-reverse">
      {todos.map((todo, index) => (
        <div
          className="w-96 my-4 bg-[#ebebeb] rounded-lg shadow-lg relative"
          key={index}
        >
          <div className="flex p-2">
            <Image
              src={user.photoURL}
              width={35}
              height={35}
              alt="ProfileImage"
              className="rounded-full"
            />
            <span className="flex items-center ml-2 text-gray-600 font-bold">
              {user.displayName}
            </span>
          </div>
          <hr className="border-white my-2" />
          <div className="flex p-2 text-gray-600 overflow-hidden">
            <div className="flex-grow">{todo}</div>
          </div>
          <div className="mr-4 flex justify-end bottom-2 right-2 flex space-x-2">
            <button
              className="text-blue-600 px-2 py-1 rounded-md"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
            <button
              className="text-red-500 px-2 py-1 rounded-md"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



    </>
  );
};

export default Todos;
