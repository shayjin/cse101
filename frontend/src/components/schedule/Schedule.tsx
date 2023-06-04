import './App.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { NavBar } from '../navbar/NavBar';
import Example from '../schedule/Example'
  

export const Schedule = () => {
  return (
    <>  
      <NavBar/>
      <h1 className="subH1" id="sb">Schedule Builder (Drag & Drop)</h1>
      <DndProvider backend={HTML5Backend}>
      <Example />
      </DndProvider>
    </>
  );
}