import type { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'
import { Colors } from './Colors'
import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
  padding: '0.5rem 1rem',
  cursor: 'move',
  float: 'left',
}

export interface BoxProps {
  name: string
  type: string
  isDropped: boolean
}

export const Box: FC<BoxProps> = ({ name, type, isDropped }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { name },
    isDragging(monitor) {
      const item = monitor.getItem()
      return name === item.name
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1

  var color = "red";

  if (type === ItemTypes.A) {
    color = Colors.A;
  } else if (type === ItemTypes.B) {
    color = Colors.B;
  } else if (type === ItemTypes.C) {
    color = Colors.C;
  } else if (type === ItemTypes.D) {
    color = Colors.D;
  } else if (type === ItemTypes.E) {
    color = Colors.E;
  } else if (type === ItemTypes.F) {
    color = Colors.F;
  } else if (type === ItemTypes.G) {
    color = Colors.G;
  } else if (type === ItemTypes.H) {
    color = Colors.H;
  } 
  
  return (
    <div ref={drag} style={{ ...style, opacity, background: color }}>
        {name}
    </div>
  )
}