import './App.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { NavBar } from '../navbar/NavBar';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

type Course = {
    number: string;
    name: string;
    rating: number;
    tech: string[];
    description: string;
}
  
type ClassType = {
  type: string;
  courses: string[];
}
  
type SortBy = {
  type: string;
  options: string[];
}

export const Courses = () => {
  var buttonList: SortBy[] = [
      {
        type: "Course Category",
        options: ["CSE Prereq", "Core", "Non-Major Core", "Math & Sci Elective", "Tech Elective", "Non-Major"],
      },
      {
        type: "Specialization",
        options: ["SWE", "AI", "Data", "Networking", "Information"],
      },
      {
        type: "Requirements",
        options: ["All Courses", "Minimum Graduation Requirements"],
      }
  ];

  const [activeVariant, setActiveVariant] = useState("All Courses");
  const [courses, setItems] = useState<Course[]>([]);
  const [classTypes, setClassType] = useState<ClassType[]>([]);
  var courseList: any[] = [];
    
  const handleClick = (categoryIndex: number, optionIndex: number) => {
    setActiveVariant(buttonList[categoryIndex].options[optionIndex]);
  };

  const fetchItems = async() => {
    const data = await fetch('/getClasses');
    const c: Course[] = await data.json();
    setItems(c);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems2 = async() => {
    const data = await fetch('/getClassTypes');
    const c: ClassType[] = await data.json();
    setClassType(c);
  };

  useEffect(() => {
    fetchItems2();
  }, []);

  const type = classTypes.find((t) => t.type === activeVariant);

  for (var c of type?.courses ?? []) {
    var course = (courses.find((cc) => cc.number === c))!; 
    console.log(type);
    if (course) {
      var num = course.number.split(" ")[0] + course?.number.split(" ")[1];
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
  }

  const buttonListComponents = buttonList.map((category, categoryIndex) => (
    <>
      <h3>Sort by {category.type}</h3>
      <div key={category.type}>
        {category.options.map((option, optionIndex) => (
          <Button
            key={option}
            variant={activeVariant === option ? 'success' : 'light'}
            onClick={() => handleClick(categoryIndex, optionIndex)}
          >
            {option}
          </Button>
        ))}
      </div>
    </>
  ));

  return (
    <> 
      <NavBar/>
      <div className="courseRating-bigger">

        <div>
          <h1 className="subH1">CSE Course Ratings</h1>
        </div>

        <div className="category">
          {buttonListComponents}
        </div>

        <Table striped hover className="courseTable">
            <tr>
              <th>#️⃣</th>
              <th>📖</th>
              <th style={{ color: "rgb(203, 25, 25)" }}>☆</th>
              <th colSpan={2}>Review</th>
            </tr> 
          <tbody>
                   {courseList}   
          </tbody>

        </Table>

      </div>
    </>
  );
}