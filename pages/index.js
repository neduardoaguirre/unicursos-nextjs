import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import CoursePreview from '../components/layout/CoursePreview';
import Layout from '../components/layout/Layout';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getCourses = () => {
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
  }

  return (
    <div>
      <Layout>
        <div className="listing">
          <div className="container">
            <ul className="bg-white">
              {courses.map((course) => (
                <CoursePreview key={course.id} course={course} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
