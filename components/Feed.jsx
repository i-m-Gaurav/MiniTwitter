'use client'
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Feed = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const firestore = getFirestore();
        const todosRef = collection(firestore, 'todos');
        const querySnapshot = await getDocs(todosRef);
        const todosData = querySnapshot.docs.map((doc) => doc.data());
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  console.log('Todos:', todos);

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          {todo.todos}
        </div>
      ))}
    </div>
  );
};

export default Feed;
