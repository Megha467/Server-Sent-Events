import './App.css';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const[data, setData] = useState(0);

  useEffect(() => {
    const fetchData = new EventSource(`http://localhost:5000/sse`) 
      fetchData.addEventListener('open', () => {
        console.log("Connection made ");
      });

      fetchData.addEventListener('message', (e) => {
        console.log(e.data);
        const data = JSON.parse(e.data);
        setData(data);
      });

      fetchData.addEventListener('error', (e) => {
        console.error('Error: ',  e);
      });
      return () => {
        fetchData.close();
      };
       
  }, []);

  return (
    <div className='App'>
    <h1>Server Sent Events</h1>
    <Card style={{ width: '18rem', marginLeft: 280 }}>
 
  <Card.Body>
    {/* <Card.Title>Server Sent Events</Card.Title> */}
    <Card.Text>
    SSEs are best when we need real time traffice from the server to client.
    In this example, I am sending data from postman and we can see changes refleted in the progress bar, 
    <br/>
    Total Amount is {data}
    </Card.Text>
    <ProgressBar animated now={data} />
  </Card.Body>
    </Card>   
    </div>
  );
}

export default App;
