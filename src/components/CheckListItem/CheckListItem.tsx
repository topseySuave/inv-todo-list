import * as React from 'react';
import './CheckListItem.css';

interface IProps {
  id: number;
  label: string;
  checked: boolean;
  onClick: (item: any) => void;
  remove: (item: number) => void;
  editItem: (e: any) => void;
}

const CheckListItem = ({ id, label, checked, onClick, remove, editItem }: IProps) => {
  const change = (itemID: any) => onClick(itemID);
  const removeOnClick = (itemID: number) => remove(itemID);
  const edit = (itemData: any) => editItem(itemData);

  return (
    <div className="list">

      <label className={`container ${checked && 'checked'}`}>{label}
        <input onChange={
          // tslint:disable-next-line:jsx-no-lambda
          () => change(id)
        } type="checkbox" checked={checked} disabled={checked} />
        <span className="checkmark" />
      </label>

      {// Do not show if checked
        !checked &&
        <div>
          <button onClick={
            // tslint:disable-next-line:jsx-no-lambda
            () => edit({id, label})
          }><i className="fas fa-pen" /></button>
          <button title="Remove" onClick={
            // tslint:disable-next-line:jsx-no-lambda
            () => removeOnClick(id)
          }><i className="far fa-trash-alt red" /></button>
        </div>
      }

    </div>
  );
};

export default CheckListItem;