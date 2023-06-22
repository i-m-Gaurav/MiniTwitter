'use client'
import { useState, useEffect } from "react";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";

const Todos = ({ userId }) => {
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
      <form onSubmit={handleSubmit}>
        Add todos
        <input required type="text" onChange={handleInput} value={newTodo} />
        <button type="submit">Add</button>
      </form>

      {todos.map((todo, index) => (
        <div key={index} onClick={() => handleDelete(index)}>
          {todo}
        </div>
      ))}
    </>
  );
};

export default Todos;
