import update from 'immutability-helper'
import { useEffect } from 'react';
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { Box } from './Box'
import { Dustbin } from './Dustbin'
import { ItemTypes } from './ItemTypes'
import { Colors } from './Colors'
import { Button } from 'react-bootstrap';

interface DustbinState {
  accepts: string[]
  lastDroppedItem: BoxState[]
}

interface BoxState {
  name: string
  type: string
  credit: number
  prereq: string[][]
  coreq: string[][]
}

export interface DustbinSpec {
  accepts: string[]
  lastDroppedItem: BoxState[]
}

export interface BoxSpec {
  name: string
  type: string
  credit: number
  prereq: string[][]
  coreq: string[][]
}

export interface ContainerState {
  droppedBoxNames: string[]
  dustbins: DustbinSpec[]
  boxes: BoxSpec[]
}

var allTypes = [ItemTypes.A, ItemTypes.B, ItemTypes.C, ItemTypes.D, ItemTypes.E, ItemTypes.F, ItemTypes.G,ItemTypes.H];

const progress: Map<string, [number, string]> = new Map();
progress.set("Prereq", [0, "20-24"]);
progress.set("Core", [0, "24"]);
progress.set("Core Choice", [0, "18-21"]);
progress.set("Non-Major Core", [0, "23"]);
progress.set("Tech Electives", [0, "17"]);
progress.set("Math/Sci Electives", [0, "7"]);
progress.set("Non-Credit", [0, "0"]);
progress.set("GE", [0, "24"]);
  
export const Container: FC = memo(
    function Container() {
    const [dustbins, setDustbins] = useState<DustbinState[]>([
        { accepts: allTypes, lastDroppedItem: [] },
        { accepts: allTypes, lastDroppedItem: [] },
        { accepts: allTypes, lastDroppedItem: [] },
        { accepts: allTypes, lastDroppedItem: [] },
        { accepts: allTypes, lastDroppedItem: [] },
        { accepts: allTypes, lastDroppedItem: [] },
        { accepts: allTypes, lastDroppedItem: [] },
        { accepts: allTypes, lastDroppedItem: [] },
        { accepts: allTypes, lastDroppedItem: [] },
      ]);
    
    const [boxes, setBoxes] = useState<BoxState[]>([]);

    const fetchItems = async() => {
        const data = await fetch('/getClassDetails');
        var cd: BoxState[] = await data.json();
        setBoxes(cd);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

    function isDropped(boxName: string) {
        return droppedBoxNames.indexOf(boxName) > -1
    }

  function adjustCategory(boxes: BoxState[], course: string, type: string) {
    if (course === "CSE 3241") {
        helper(boxes, type, "CSE 3231", "CSE 3241", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 3231") {
        helper(boxes, type, "CSE 3241", "CSE 3231", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 3231") {
        helper(boxes, type, "CSE 3241", "CSE 3231", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 3461") {
        helper(boxes, type, "CSE 3421", "CSE 3461", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 3521") {
        helper(boxes, type, "CSE 3541", "CSE 3521", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 3541") {
        helper(boxes, type, "CSE 3521", "CSE 3541", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 3901") {
        helper(boxes, type, "CSE 3902", "CSE 3901", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 3903", "CSE 3901", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 3902") {
        helper(boxes, type, "CSE 3901", "CSE 3902", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 3903", "CSE 3902", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 3903") {
        helper(boxes, type, "CSE 3901", "CSE 3903", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 3902", "CSE 3903", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 2501") {
        helper(boxes, type, "PHILOS 2338", "CSE 2501", ItemTypes.H, ItemTypes.C);
    } else if (course === "PHILOS 2338") {
        helper(boxes, type, "CSE 2501", "PHILOS 2338", ItemTypes.H, ItemTypes.C);
    } else if (course === "ENGR 1181") {
        helper(boxes, type, "ENGR 1281H", "ENGR 1181", ItemTypes.H, ItemTypes.A);
    } else if (course === "ENGR 1182") {
        helper(boxes, type, "ENGR 1282H", "ENGR 1182", ItemTypes.H, ItemTypes.A);
    } else if (course === "ENGR 1281H") {
        helper(boxes, type, "ENGR 1181", "ENGR 1281H", ItemTypes.H, ItemTypes.A);
    } else if (course === "ENGR 1282H") {
        helper(boxes, type, "ENGR 1182", "ENGR 1282H", ItemTypes.H, ItemTypes.A);
    } else if (course === "CSE 5911") {
        helper(boxes, type, "CSE 5912", "CSE 5911", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5913", "CSE 5911", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5914", "CSE 5911", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5915", "CSE 5911", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 5912") {
        helper(boxes, type, "CSE 5911", "CSE 5912", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5913", "CSE 5912", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5914", "CSE 5912", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5915", "CSE 5912", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 5913") {
        helper(boxes, type, "CSE 5911", "CSE 5913", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5912", "CSE 5913", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5914", "CSE 5913", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5915", "CSE 5913", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 5914") {
        helper(boxes, type, "CSE 5911", "CSE 5914", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5912", "CSE 5914", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5913", "CSE 5914", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5915", "CSE 5914", ItemTypes.E, ItemTypes.C);
    } else if (course === "CSE 5915") {
        helper(boxes, type, "CSE 5911", "CSE 5915", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5912", "CSE 5915", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5913", "CSE 5915", ItemTypes.E, ItemTypes.C);
        helper(boxes, type, "CSE 5915", "CSE 5915", ItemTypes.E, ItemTypes.C);
    } 
  }

  function getHours(index: number) {
    var hours: number = 0;

    for (var i = 0; i < dustbins[index].lastDroppedItem.length; i++) {
        hours += dustbins[index].lastDroppedItem[i].credit;
    }

    return hours;
  }

  function helper(boxes: BoxState[], type: string, course1: string, course2: string, type1: string, type2: string) {
    var i = boxes.findIndex(obj => obj.name === course1);
    var j = boxes.findIndex(obj => obj.name === course2);
    if (i !== -1 && type === "convert") boxes[i].type = type1;
    if (i !== -1 && type === "revert") {
        boxes[i].type = type2;
        boxes[j].type = type2;
    }
  }
  const handleDrop = useCallback(
    (index: number, item: { name: string }, boxes: BoxState[]) => {
      const { name } = item;

      if (dustbins[index].lastDroppedItem.length >= 8) {
        alert("That's an impossible schedule!");
      } else {
        setDroppedBoxNames(
          update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
        );
          
        var course = boxes.find(obj => obj.name === name);
        var cont = course!.prereq.length === 0;
    
        for (var prereqList of course!.prereq) {
          cont = false;

          for (var prereq of prereqList) {
            var c = dustbins[8].lastDroppedItem.find(obj => obj.name === prereq);
            cont = false;

            if (c) {
              cont = true;
              break;
            }

            for (var i = 0; i < index; i++) {
              c = dustbins[i].lastDroppedItem.find(obj => obj.name === prereq);
              if (c) {
                  cont = true;
                  break;
              } 
            }

            if (cont) {
              cont = true;
              break;
            } 
          }
  
          if (!cont) break;
        }
    
        var cont2 = course!.coreq.length === 0;
  
        for (var coreqList of course!.coreq) {
          cont2 = false;

          for (var coreq of coreqList) {
            var c = dustbins[8].lastDroppedItem.find(obj => obj.name === coreq);
            cont2 = false;
            if (c) {
              cont2 = true;
              break;
            }

            for (var i = 0; i <= index; i++) {
              c = dustbins[i].lastDroppedItem.find(obj => obj.name === coreq);
              if (c) {
                cont2 = true;
                break;
              }
            }

            if (cont2) {
              cont2 = true;
              break;
            } 
          }
          
          if (!cont2) break;
        }
  
        if (cont && cont2 || index == 8) {
          const newDustbins = [...dustbins];
          newDustbins[index].lastDroppedItem.push(
            {
              name: item.name, 
              type: course!.type, 
              credit: course!.credit, 
              prereq: course!.prereq, 
              coreq: course!.coreq 
            }
          );

          setDustbins(newDustbins);
  
          progress.set(
            course!.type,
            [progress.get(course!.type)![0] + course!.credit, 
            progress.get(course!.type)![1]]
          );

          var i = boxes.findIndex(obj => obj.name === name);
          boxes.splice(i, 1); 
          adjustCategory(boxes, course!.name, "convert");

        } else {
          if (!cont) alert("Does not meet prereq requirements!");
          else if (!cont2) alert("Does not meet coreq requirements!");
        }
      }
    },
    [droppedBoxNames, dustbins]
  );

  const handleReset = useCallback(
    (index: number, boxes: BoxState[] ) => {
      var newBox: BoxState[] = boxes;
      var dustbin = dustbins[index];

      while (dustbin.lastDroppedItem.length > 0) {
        var item = dustbin.lastDroppedItem.splice(0,1);
        newBox.splice(0, 0, item[0]);

        progress.set(
          item[0].type,
          [progress.get(item[0].type)![0] - item[0].credit, 
          progress.get(item[0].type)![1]]
        );

        adjustCategory(boxes, item[0]!.name, "revert");
      }
        
      const newDustbins = [...dustbins];
      setBoxes(newBox);
      setDustbins(newDustbins);
    },
    [setBoxes]
  );

  var progressBadge = [];
  var colors = [Colors.A, Colors.B, Colors.C, Colors.D, Colors.E, Colors.F, Colors.G, Colors.H];

  for (var i = 0; i < 8; i++) {
    var type = allTypes[i];
    var color = colors[i];

    progressBadge.push(
      <div style={{ background: color }}>
          <div>{type}</div>
          <div>{progress.get(type)![0]} / {progress.get(type)![1]} </div>
      </div>
    );
  }

  return (
    <div>
      <div className="binContainer">
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <div className="semesterContainer">
            <Dustbin
                accept={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(index, item, boxes)}
                index={index}
            />
            <div>{getHours(index)} Hours</div>
            <Button className="resetButton" onClick={() => handleReset(index, boxes)}>
              Reset
            </Button>
          </div>
        ))}
      </div>
      <div className="classType">
        {progressBadge}
      </div>
      <div className="boxes">
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
});