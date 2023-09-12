import {useState} from 'react'
import axios from 'axios';



const InputBox = () => {
    
    axios.defaults.baseURL = "http://localhost:5000";
    const [inputValue, setInputValue] = useState('');
  
    const handleChange = (event) => {
    //   axios
    //   .post("/userInput", {

    //   })
        setInputValue(event.target.value);
        console.log(inputValue);

    };

    // ONCLICK FUNCTION TO BRING INFORNMATION FROM BOX TO BACKEND TO CHECK THE USER AND ADD TO DATABASE 
    const handleSubmit = () => {
        
    }
    return (
      <>
      <div>
        <input
          type="text"
          value={inputValue.message}
          onChange={handleChange}
          placeholder="Enter something..."
        />
        <p>{inputValue}</p>
      </div>
      <div>
      <button onClick={handleSubmit}>
        📩
      </button>
      </div>
      </>
    );
  };


export default InputBox;