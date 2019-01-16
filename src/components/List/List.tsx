import * as React from 'react';
import { animated, Transition } from 'react-spring';
import { Item } from '../../App';
import CheckListItem from '../CheckListItem';

interface IProps {
  items: Item[];
  handleCheck: (item: any) => void;
  removeItem: (item: number) => void;
  editItem: (e: any) => void;
}

let newItem: any;

const List = ({ items, handleCheck, removeItem, editItem }: IProps) => (
  <Transition
    native={true}
    items={items.map(item => JSON.stringify(item)).reverse()}
    from={{ opacity: 0, marginTop: -10, transform: 'scale(1)' }}
    enter={{ opacity: 1, marginTop: 0, transform: 'scale(1)' }}
    leave={{ opacity: 0, marginTop: -10, transform: 'scale(0.7)' }}>
    {item => styles => {
      newItem = JSON.parse(item);
      return (
        <animated.li style={{ ...styles }}>
          <CheckListItem
            onClick={handleCheck}
            id={newItem.id}
            label={newItem.label}
            checked={newItem.done}
            remove={removeItem}
            editItem={editItem}
          />
        </animated.li>
      );
    }}
  </Transition>
);

export default List;
