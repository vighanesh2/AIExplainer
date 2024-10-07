"use client";

import { useEffect, useState } from 'react';
import { getPosts } from "@/_actions/postAction"; 

export default function Catalog() {
  const [data, setData] = useState([]); 
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(true); 
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      const { data, errMsg } = await getPosts();
      if (errMsg) {
        setErrMsg(errMsg); 
      } else {
        setData(data);
      }
      setLoading(false);
    };

    fetchData(); 
  }, []); 
  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name); 
      } else {
        return b.name.localeCompare(a.name); 
      }
    });
    setData(sortedData); 
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <p>Loading...</p>; 
  if (errMsg) return <h1>{errMsg}</h1>; 

  return (
    <div>
      <h2>Catalog</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Topic (Prompt)</th>
            <th>5-year-old Explanation</th>
            <th>
              <button onClick={handleSort} style={styles.sortButton}>
                Submitter Name {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id} style={styles.row}>
                <td>{item.prompt}</td>
                <td>{item.msg}</td>
                <td>{item.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No posts available.</td> 
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  row: {
    borderBottom: '1px solid #ccc',
  },
  sortButton: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
