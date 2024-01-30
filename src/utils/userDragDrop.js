// useDragDrop.js
import { useDrag, useDrop } from 'react-dnd';

function useDragDrop(id, index) {
  const [, dragRef] = useDrag(() => ({
    type: "image",
    item: { id, index },
  }));

  const [, dropRef] = useDrop({
    accept: "image",
    hover(item) {
      if (item.index !== index) {
        //moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (node) => dragRef(dropRef(node));
}

export default useDragDrop;
