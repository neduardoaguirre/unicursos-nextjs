import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import useCourses from '../hooks/useCourses';
import CoursePreview from '../components/layout/CoursePreview';
import { useRouter } from 'next/router';
import Spinner from '../components/ui/Spinner';
import NotAvailable from '../components/layout/NotAvailable';

export default function Search() {
  const [notFound, setNotFound] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { courses } = useCourses('created', setLoading, setError);
  const router = useRouter();
  const {
    query: { q },
  } = router;

  useEffect(() => {
    if (q) {
      const search = q.toLocaleLowerCase();
      if (!error) {
        const filteredCourses = courses.filter((course) => {
          return (
            course.name.toLowerCase().includes(search) ||
            course.description.toLowerCase().includes(search)
          );
        });
        setResult(filteredCourses);
        result.length === 0 && setNotFound(true);
      }
    }
  }, [q, courses]);

  return (
    <div>
      <Layout>
        {loading && !error ? (
          <Spinner />
        ) : error || notFound ? (
          <NotAvailable message="No hay cursos disponibles con su búsqueda" />
        ) : (
          <div className="listing">
            <div className="container">
              <ul className="bg-white">
                {result.map((course) => (
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
