// {
//     "id": "598fd8c4-3276-4157-bc40-253378545293",
//     "createdAt": "2024-05-15T19:57:26.160Z",
//     "predictedClass": "shark",
//     "predictionConfidence": 100,
//     "processedAt": "2024-05-15T19:57:55.158401",
//     "updatedAt": "2024-05-15T19:57:55.158401"
//    }

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Data {
  id: string;
  createdAt: string;
  predictedClass: string;
  predictionConfidence: number;
  processedAt: string;
  updatedAt: string;
}

interface DataTableProps {
  token: string;
}

const DataTable: React.FC<DataTableProps> = ({ token }) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>(process.env.REACT_APP_API_URL || '', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Created At</th>
          <th>Predicted Class</th>
          <th>Prediction Confidence</th>
          <th>Processed At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.id}</td>
          <td>{new Date(data.createdAt).toLocaleString()}</td>
          <td>{data.predictedClass}</td>
          <td>{data.predictionConfidence}</td>
          <td>{new Date(data.processedAt).toLocaleString()}</td>
          <td>{new Date(data.updatedAt).toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DataTable;
