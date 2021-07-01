import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import CoursePreview from '../components/layout/CoursePreview';
import Layout from '../components/layout/Layout';
import NotAvailable from '../components/layout/NotAvailable';
import Spinner from '../components/ui/Spinner';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getCourses = () => {
      setLoading(true);
      firebase.db
        .collection('courses')
        .orderBy('created', 'desc')
        .onSnapshot(handleSnapshot);
    };
    getCourses();
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

  return (
    <div>
      <Layout>
        {loading && !error ? (
          <Spinner />
        ) : error ? (
          <NotAvailable message="No hay cursos disponibles" />
        ) : (
          <div className="listing">
            <div className="container">
              <ul className="bg-white">
                {courses.map((course) => (
                  <CoursePreview key={course.id} course={course} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
