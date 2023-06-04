import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrop } from 'react-dnd'
import './bin.css';
import { Button } from 'react-bootstrap';
import { Container } from './Container';

export interface DustbinProps {
  accept: string[]
  lastDroppedItem?: any[]
  onDrop: (item: any) => void
  index: number
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin({
  accept,
  lastDroppedItem,
  onDrop,
  index
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop;
  let backgroundColor = '#222';
  var l = [<></>];
  var x = [];


  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  if (index + 1 <= 8) {
    if (lastDroppedItem) {
      for (var i = 0; i < lastDroppedItem!.length; i++) {
        l.push(<div className="class">{lastDroppedItem[i].name}</div>);
      }
    }

    x.push(
      <div ref={drop} id="dustbin">
        <b>Semester {index + 1}</b><br/>
        {l}
      </div>
    );
  } else {
    if (lastDroppedItem) {
      for (var i = 0; i < lastDroppedItem!.length; i++) {
          l.push(<div className="optedOutClass">{lastDroppedItem[i].name}</div>);
      }
    }
    x.push(
      <div ref={drop} id="optedOut">
        <b>Tested Out / AP Credits</b><br/>
        {l}
      </div>
    );
  }
  
  return (
    <>
      {x}
    </>
  );
});