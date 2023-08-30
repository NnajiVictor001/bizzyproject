import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import placeholder from 'img/batch_placeholder.png';
import styles from './DndCard.module.scss';

function DndCard(props) {
  const {
    id,
    selectedId,
    imageUrl,
    onClick,
    index,
    onDrop,
    onHover,
    onHoverOutside,
    onEnd,
    className
  } = props;

  const { body_con__item, body_con__item__out, body_con__item__image, select_item_image } = styles;

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'Pages',
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Check If item is inside the box
      if (
        hoverClientX > 2 &&
        hoverClientY > 2 &&
        hoverClientX < hoverBoundingRect.left - 2 &&
        hoverClientY < hoverBoundingRect.top - 2
      ) {
        onDrop?.(dragIndex, hoverIndex);
      }
      item.index = hoverIndex;
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Check If item is inside the box
      if (
        hoverClientX > 2 &&
        hoverClientY > 2 &&
        hoverClientX < hoverBoundingRect.left - 2 &&
        hoverClientY < hoverBoundingRect.top - 2
      ) {
        onHover?.(dragIndex, hoverIndex);
      } else {
        onHoverOutside?.();
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'Pages',
    item: { index, imageUrl },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => {
      onEnd?.(item, monitor);
    }
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${body_con__item} ${className}`}
      style={{ opacity }}
      onClick={onClick}>
      <div className={body_con__item__out}>
        <img
          src={imageUrl || placeholder}
          alt={id}
          className={`${body_con__item__image} ${id === selectedId && select_item_image}`}
        />
      </div>
    </div>
  );
}

export default DndCard;
