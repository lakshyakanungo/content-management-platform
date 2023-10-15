import { useRef } from "react";

import { useDrag, useDrop } from "react-dnd";

const useDragAndDrop = ({ index, moveListItem }) => {
  // console.log("index: ", index, " is moving??");
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // console.log("index: ", index);
      // console.log(item);
      // console.log(monitor.didDrop());
      // console.log(monitor.getDropResult());
      item;
      monitor;
    },
  });

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  spec;
  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  // Make items being dragged transparent, so it's easier to see where we drop them
  // const opacity = isDragging ? 0 : 1;

  return [isDragging, dragDropRef];
};

export default useDragAndDrop;
