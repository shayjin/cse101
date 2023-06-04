import React, { useState, FormEvent, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { NavBar } from '../navbar/NavBar';
import './App.css';
import { text } from 'stream/consumers';
import axios from 'axios';

type Course = {
  number: string;
  name: string;
  rating: string;
  tech: string[];
}

interface FormData {
  selectInput: string;
  difficulty: string;
  textInput: string;
  user: string;
  date: string;
}

export const Write = () => {
  const [textInput, setTextInput] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [courses, setCourse] = useState<Course[]>([]);  
  const [formData, setFormData] = useState<FormData>({
    "selectInput": "",
    "difficulty": "",
    "textInput": "",
    "user": "XXX",
    "date": "XXX"
  });

  const handleTextInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  
  const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const fetchItems = async (): Promise<void> => {
    const response = await fetch('/getClasses');
    const c: Course[] = await response.json();
  
    if (c) setCourse(c);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  var classOptions = [];
  var url = window.location.href;
  var numberIndex = 0;

  url = url.substring(url.lastIndexOf("/") + 1);

  for (var i = 0; i < url.length; i++) {
    var parsedInt = parseInt(url.charAt(i));

    if (!isNaN(parsedInt) && Number.isInteger(parsedInt)) {
        numberIndex = i;
        break;
    }
  }

  var x = url.substring(0, numberIndex) + " " + url.substring(numberIndex);
  const [courseName, setCourseName] = useState(x);

  const handleCourseChange = (event: { target: {
    [x: string]: any; value: React.SetStateAction<string>; 
    }; }) => {
    setCourseName(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  for (var course of courses) {
    classOptions.push(<option value={course.number}>{course.number}</option>);
  }

  return(
    <>
      <NavBar/>
      <div className="write">
        <h1 id="cr-title">CSE Course Review</h1>
        <form method="POST" action="/post">
          <div className="question">
            <label htmlFor="selectInput">Course: </label>
            <select
              id="select-input"
              name="selectInput"
              value={courseName}
              onChange={handleCourseChange}
              required
            >
              <option value="">Select an option</option>
              {classOptions}
            </select>
          </div>
          <select name="user">
            <option value="GUEST">Guest</option>
          </select>
          <div className="question">
            <label htmlFor="difficulty">Difficulty (0-5):</label>
            <div className="stars">          
              <input type="radio" id="star1" name="difficulty" value="5" checked={difficulty === '5'} onChange={handleDifficultyChange}/>
              <label htmlFor="star1">☆</label>

              <input type="radio" id="star2" name="difficulty" value="4" checked={difficulty === '4'} onChange={handleDifficultyChange}/>
              <label htmlFor="star2">☆</label>

              <input type="radio" id="star3" name="difficulty" value="3" checked={difficulty === '3'} onChange={handleDifficultyChange} />
              <label htmlFor="star3">☆</label>
  
              <input type="radio" id="star4" name="difficulty" value="2" checked={difficulty === '2'} onChange={handleDifficultyChange}/>
              <label htmlFor="star4">☆</label>
  
              <input type="radio" id="star5" name="difficulty" value="1" checked={difficulty === '1'} onChange={handleDifficultyChange}/>
              <label htmlFor="star5">☆</label>
            </div>

            <input type="radio" id="zero" name="difficulty" value="0" checked={difficulty === '0'} onChange={handleDifficultyChange}/>
            <Button className="reset-button">
              <label htmlFor="zero">Reset</label>  
            </Button>

            <div className='explanation'>
              <p>0 = Requires no brain</p>
              <p>1 = Easier side</p>
              <p>2 = Doable</p>
              <p>3 = Average</p>
              <p>4 = Harder side</p>
              <p>5 = Hardest class in CSE</p>
            </div>

            <div className="question">
              <label htmlFor="text-input">Review: </label>
              <textarea id="text-input" name="textInput" value={textInput} onChange={handleTextInputChange} />
            </div>

          </div>
          <input className="submit-btn" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}