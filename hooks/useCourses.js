import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useCourses = (order, setLoading, setError) => {
  const [courses, setCourses] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const courses = firebase.db
      .collection('courses')
      .orderBy(order, 'desc')
      .onSnapshot(handleSnapshot);
    const unsubscribe = courses;
    const getCourses = async () => {
      setLoading(true);
      await courses;
    };
    getCourses();

    return () => {
      unsubscribe();
    };
  }, []);

  function handleSnapshot(snapshot) {
    const courses = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setCourses(courses);
    setLoading(false);
    Object.keys(courses).length === 0 && setError(true);
  }

  return {
    courses,
  };
};

export default useCourses;
