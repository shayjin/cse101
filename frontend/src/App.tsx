import './App.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import { NavBar } from './components/navbar/NavBar';
import { Schedule } from './components/schedule/Schedule';
import { Courses } from './components/courses/Courses';
import { Freshman } from './components/freshman/Freshman';
import { Prereq } from './components/prereq/Prereq';
import { Write } from './components/write/Write';
import { Review } from './components/review/Review';
import { Login } from './components/login/Login';
import { Signup } from './components/signup/Signup';
import { Verify } from './components/verify/Verify';

type Course = {
  number: string;
  name: string;
  rating: string;
  description: string;
}

type ClassType = {
  type: string;
  courses: Course[];
}

type SortBy = {
  type: string;
  options: string[];
}

function Main() {
  return (
    <>
      <NavBar/>
      <h1 className="introHeader">CSE 101 @ The Ohio State University</h1>
      
      <div className="topComps">
          <ScheduleBuilder/>
      </div>

      <div className="homeWrapper">
        <CourseRating/>
        <div className="smallComps">
          <FreshmanTips/>
          <PrereqCharts/>
        </div>
      </div>
    </>
  );
}

function CourseRating() {
  const [courses, setItems] = useState<Course[]>([]);

  const fetchItems = async() => {
    const data = await fetch('/getPreviewClasses');
    const courses: Course[] = await data.json();
    setItems(courses);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  var courseList: any[] = [];
  for (var course of courses) {
    var num = course.number.split(" ")[0] + course.number.split(" ")[1];
    courseList.push(
      <tr>
        <td className="courseNum">{course.number}</td>
        <td>{course.name}</td>
        <td className="rating">{course.rating}</td>
        <td>
            <Link to={`/review/${num}`}>
              <Button variant="light">View</Button>
            </Link>
        </td>
        <td>
            <Link to={`/write/${num}`}>
              <Button variant="light">Write</Button>
            </Link>
        </td>
      </tr>
    );
  }

  return (
    <div className="courseRating">
      <div>

        <div className="head">
          <div id="emoji">🛠️</div>
          <div className="imessage">
            <p className="from-them">Useful Tool</p>
          </div>
          <div id="date">Updated 05.21.2023</div>
        </div>

        <h1>CSE Course Ratings</h1>
        <div className="review-buttons">
          <Link to="/courses">
            <Button variant="success">View All Reviews</Button>
          </Link>
          <Link to={`/write/any`}>
            <Button variant="warning" style={{ marginLeft: "10px" }}>Write a Review</Button>                
          </Link>
        </div>

      </div>
      <table className="courseTable">
        <tr>
          <th>#️⃣</th>
          <th>📖</th>
          <th style={{ color: "rgb(203, 25, 25)" }}>Difficulty</th>
          <th colSpan={2}>Review</th>
        </tr> 
        
        {courseList}

      </table>
    </div>
  );
}

function ScheduleBuilder() {
  const sbDemo = require('./sb-demo.jpeg');

  return (
    <div className="sb-container">

      <div className="scheduleBuilder">
        <div>
          <div className="head">
            <div id="emoji">🛠️</div>
            <div className="imessage">
              <p className="from-them">Useful Tool</p>
            </div>
            <div id="date">Updated 05.21.2023</div>
          </div>
          <h1>CSE Schedule Builder</h1>
        </div>
        <div className="button">
          <Link to="/schedule">
            <Button variant="success">Try Schedule Builder</Button>
          </Link>
        </div>

        <p>
          With this web-based tool, you can easily plan your 4-year schedule by simply dragging and dropping courses.
          This tool checks prerequisites and corequisites in real-time, ensuring your schedule is feasible. 
        </p>
      </div>

      <div className="sb-demo">
        <img src={sbDemo}/>
      </div>

    </div>
  );
}

function FreshmanTips() {
  return (
    <div className="freshmanTips">
        <div>
          <div className="head">
            <div id="emoji">!</div>
            <div className="imessage">
              <p className="from-them">Tips</p>
            </div>
            <div id="date">Updated 05.21.2023</div>
          </div>
          <h1>Freshmen Must-Read's</h1>
        </div>
        <div>
          <Link to="/freshman">
            <Button variant="success">View Article</Button>
          </Link>
          <ul>
            <li>Applying to be a CSE major</li>
            <li>First semester scheuling</li>
            <li>Frehsman tips</li>
            <li>4-Year Sample Schedule</li>
            <li>Frequenty asked questions</li>
          </ul>
        </div>
    </div>
  );
}

function PrereqCharts() {
  return (
    <div className="prereqCharts">
        <div>
          <div className="head">
            <div id="emoji">!</div>
            <div className="imessage">
              <p className="from-them">Tips</p>
            </div>
            <div id="date">Updated 05.21.2023</div>
          </div>
          <h1>Pre-requisite Charts</h1>
        </div>
        <div>
          <Link to="/prereq">
            <Button variant="success">View Charts</Button>
          </Link>
          <ul>
            <li>Specializations Chart</li>
            <li>CSE Core Courses Chart</li>
          </ul>
        </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="/" element={<Main />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/freshman" element={<Freshman />} />
        <Route path="/prereq" element={<Prereq />} />
        <Route path="/write/:id" element={<Write />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;