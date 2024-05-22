import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Frame {
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
  const [frames, setFrames] = useState<Frame[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFramesUrl = `${process.env.REACT_APP_API_URL as string}/prod/frames`

    const fetchData = async () => {
      try {
        const response = await axios.get<Frame[]>(getFramesUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(response.data)
        setFrames(response.data);
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

  if (!frames) {
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
        {
          frames.map((frame, i) => (
            <tr>
              {/* <td>{frame.id}</td> */}
              <td>{i}</td>
              <td>{new Date(frame.createdAt).toLocaleString()}</td>
              <td>{frame.predictedClass}</td>
              <td>{frame.predictionConfidence}</td>
              <td>{new Date(frame.processedAt).toLocaleString()}</td>
              <td>{new Date(frame.updatedAt).toLocaleString()}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )

};

export default DataTable;
