import React, { useState } from 'react';
import useCourses from '../hooks/useCourses';
import CoursePreview from '../components/layout/CoursePreview';
import Layout from '../components/layout/Layout';
import NotAvailable from '../components/layout/NotAvailable';
import Spinner from '../components/ui/Spinner';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { courses } = useCourses('created', setLoading, setError);

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
