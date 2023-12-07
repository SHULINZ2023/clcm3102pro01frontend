import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState,useEffect } from 'react';
import axios from 'axios'
import './mySurvey.css'
import { useNavigate,useLocation } from 'react-router-dom';

var avgRating = 0;

function Rating() {
    const createfeed= (comments,rating) =>{
        const feed={comments: comments,
        rating: rating
    }
    return feed;

    };

    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = () => {
      console.log("home click");
     // Navigate to another page when the button is clicked
     navigate('/ ');
   };

    const [inputValue, setInputValue] = useState('');
    const [inputValues, setInputValues] = useState([]);
    const [rating, setRating] = useState(0);

     // Define the API URL you want to fetch data from

  // Define a function to fetch and update the data
  async function postRating(data) {
    const apiUrl = 'http://localhost:3500/insertRating';
  
    try {
      const response = await axios.post(apiUrl, data,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
  
      // Handle the response as needed
      console.log('Data inserted:', response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }
    const fetchData = async (routine_id) => {
    return fetch(`http://localhost:3500/getRating?routine_id=${routine_id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
 
    return response.json();
  })
  .then(data => {
    const feeds = data.map(element => createfeed(element.comments,element.rating));
    const totalRating=feeds.reduce((accumulator, feed) => accumulator + feed.rating, 0);
    
    avgRating = Math.round((totalRating ) / (feeds.length) * 100) / 100;
    setInputValues(() => [...feeds]);
  })
  .catch(error => {
    console.error('Error:', error);
  });
      

  };

  useEffect(() => {
    const { state } = location;
    console.log(state.routine_id);
    fetchData(state.routine_id); // Call the fetchData function when the component mounts
  }, []);


    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
      };
    const handleNewComments = ()=> {
        const totalRating=inputValues.reduce((accumulator, x) => accumulator + x.rating, 0);
        avgRating = Math.round((totalRating + rating) / (inputValues.length + 1) * 100) / 100;
      
        const feed = createfeed(inputValue,rating);
        setInputValues((prevItems) => [...prevItems, feed]);
        const { state } = location;
     
        const data = {
          routine_id: state.routine_id,
          comments: inputValue,
          rating: rating
        };
        const jsonData = JSON.stringify(data);
        postRating(jsonData);
        setInputValue('');
        setRating(0);
    }  
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update the state with the input value
      };
      const renderStars = (numStars) => {
        const starSymbol = '★'; // Unicode star character
        const stars = starSymbol.repeat(numStars);
        return stars;
      };
      
      const stopColor= Math.round(100*(avgRating-parseInt(avgRating)));
      const restColor = 100-stopColor;
      const linearGradient = "linear-gradient(to right, red 30%, gray 70%)"
      const customStyle = {
        background: `linear-gradient(to right, red ${stopColor}%, gray ${restColor}%)`,
        WebkitBackgroundClip: 'text', // Use the camelCase for -webkit-background-clip
           color: 'transparent', // This sets the text color to transparent
      };
  
    return (
      <div>
        {inputValues.map((x, index) => (
          <h1 key={index}><span className='star selected'>{renderStars(x.rating)}</span>{x.comments}</h1>
        ))}
   

        <form onSubmit={handleNewComments}>
            <label>Enter your comments:<br/>
            <textarea cols='40' rows='2'
            onChange={handleInputChange} value={inputValue}
            />
            </label>
        </form>
        <p>Rate this product:
        <span className='star selected'>{renderStars(parseInt(avgRating))}</span><span key={stopColor} style={customStyle}>&#9733;</span><span className='star'>{renderStars(5 - parseInt(avgRating) -1)}</span><span>{avgRating}</span></p>
        <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star selected' : 'star'}
            onClick={() => handleStarClick(star)}
          >
            &#9733; {/* Unicode star character */}
          </span>
        ))}
      </div>
        <button
          type="button"
          onClick={handleNewComments}
        >Submit</button>
        <button type="button" onClick={handleClick}>Home</button>
      </div>
    );
  }

  export default Rating;
