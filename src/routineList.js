import React,{ useState,useEffect } from 'react';
import './mySurvey.css';
import { useNavigate } from 'react-router-dom';


function RoutineList() {

    const [routines, setRoutines] = useState([]);

     // Define the API URL you want to fetch data from
     const navigate = useNavigate();
     const handleClick = (event) => {
      // Navigate to another page when the button is clicked
      console.log(event.target.name);
      const params = {
        routine_id: event.target.name,
      };
      navigate('/Rating',{state:params});
    };
  // Define a function to fetch and update the data

    const fetchData = async () => {
    return fetch('http://localhost:3500/GetFitnessRoutines')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
 
    return response.json();
  })
  .then(data => {
    setRoutines(() => [...data]);
  })
  .catch(error => {
    console.error('Error:', error);
  });
      

  };

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, []);


      const renderStars = (numStars) => {
        const starSymbol = '★'; // Unicode star character
        const stars = starSymbol.repeat(numStars);
        return stars;
      };
      
      const stopColor=(avgRating)=> {
        return Math.round(100*(avgRating-parseInt(avgRating)));
      }
      

      const linearGradient = "linear-gradient(to right, red 30%, gray 70%)"

      const customStyle = (avgRating)=>{
        const firstColor = stopColor(avgRating);
        const restColor = 100-firstColor;  
      const specialStyle = {
        background: `linear-gradient(to right, red ${firstColor}%, gray ${restColor}%)`,
        WebkitBackgroundClip: 'text', // Use the camelCase for -webkit-background-clip
           color: 'transparent', // This sets the text color to transparent
      };
      return specialStyle;
    }
    return (
      <div>
        <p>Welcome to Alberta Wellness Programs</p>
        <table>
        {routines.map((x, index) => (
            <div key={`div${x.routine_id}`}>
                <tr>
                    <td>Routine ID </td>
                    <td>{x.routine_id}</td>
                    <td>Routine Name</td>
                    <td>{x.routine_name}</td>
                    <td>start at</td>
                    <td>{x.start_date}</td>
                    <td>
                    <p><span className='star selected'>{renderStars(parseInt(x.avg_rating))}</span>
                    <span key={stopColor(x.avg_rating)} style={customStyle(x.avg_rating)}>&#9733;</span>
                    <span className='star'>{renderStars(5 - parseInt(x.avg_rating) -1)}</span>
                    <span>{x.avg_rating}</span></p>
                    </td>
                </tr>
                <tr>
                    <td>our goal</td>
                    <td colSpan={6}>Keep your body in shape, and light</td>
                </tr>
                <tr>
                    <td colSpan={7}>life is not easy, keeping running make you alive!</td>
                </tr>
                <tr>
                  <td>
                   <button type="button" onClick={handleClick} name={x.routine_id}> Comments and Rating </button>
                  </td>
                </tr>
            </div>
             ))}
        </table>     
      </div>

    );
  }


export default RoutineList;
