import { useRef } from "react";

import { useDrag, useDrop } from "react-dnd";

const useDragAndDrop = ({ index, category, moveListItem, handleReorder }) => {
  const [_, dragRef] = useDrag({
    type: "item",
    item: { index, position: category.position },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: item => {
      if (item.index !== item.position - 1) {
        handleReorder({ category, finalPosition: item.index + 1 });
      }
    },
  });

  const [__, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return dragDropRef;
};

export default useDragAndDrop;
