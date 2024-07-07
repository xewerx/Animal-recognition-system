import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import './frame.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FrameWithData } from '../../types/frame';

const Frame = () => {
  const { id: frameId } = useParams();
  const { token } = useAuth()

  const [frame, setFrame] = useState<FrameWithData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getFramesUrl = `${process.env.REACT_APP_API_URL as string}/prod/frames/${frameId}`

    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get<FrameWithData>(getFramesUrl, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          setFrame(response.data);
          setError(null)
          setLoading(false);
        }
      } catch (error) {
        console.log(error)
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [frameId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!frame) {
    return <div>No data available</div>;
  }

    return (
      <div className='frameContainer'>
        {frame.data && <img src={`data:image/png;base64, ${frame.data}`} alt="Base64" />}
      </div>
    )
}

export default Frame