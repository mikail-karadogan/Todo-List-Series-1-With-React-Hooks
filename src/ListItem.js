import React, { useContext, useId } from "react";
import { actionItem } from "./App";

export default function ListItem({ listData }) {
  const contextData = useContext(actionItem);
  return (
    <>
      {listData?.map((item, index) => {
        return (
          <li className="list-group-item d-flex" key={index}>
            <input
              type="text"
              className="form-control list-input shadow-none"
              onChange={(event) => contextData.editListItem(event, index)}
              value={listData[index].content}
              disabled
            />
            <button
              type="button"
              className={`btn btn-warning edit-btn ms-2`}
              ref={(element) => (contextData.buttonRef.current[index] = element)}
              onClick={(event) => contextData.editListItemButton(event.target, index)}
            >
              Edit
            </button>
            <button
              type="button"
              className={`btn btn-primary save-btn ms-2 d-none`}
              ref={(element) => (contextData.buttonRef.current[index + "save"] = element)}
              onClick={(event) => contextData.saveButton(event.target, index)}
            >
              Save
            </button>
            <button
              type="button"
              className={`btn btn-danger remove-btn ms-2`}
              onClick={() => contextData.removeButton(index)}
            >
              Remove
            </button>
          </li>
        );
      })}
    </>
  );
}
