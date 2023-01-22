import { createContext, useRef, useState } from "react";
import ListItem from "./ListItem";

export const actionItem = createContext();

function App() {
  const [listData, setListData] = useState([
    { content: "asdada" },
    { content: "12e21" },
  ]);
  const buttonRef = useRef([]);
  const addInput = useRef();

  const editListItemButton = (event, index) => {
    const editButtonParent = buttonRef.current[index].parentElement;
    const listInput = editButtonParent.querySelector(".list-input");

    const editBtn = buttonRef.current[index];
    const saveBtn = editButtonParent.querySelector(".save-btn");

    listInput.removeAttribute("disabled");
    editBtn.classList.add("d-none");
    saveBtn.classList.remove("d-none");
  };

  const editListItem = (event, index) => {
    const newData = listData.map((item, itemIndex) => {
      return index === itemIndex
        ? { content: (item.content = event.target.value) }
        : item;
    });

    setListData(newData);
  };

  const addListItem = () => {
    setListData([{ content: addInput.current.value }, ...listData]);
    addInput.current.value = "";
  };

  const saveButton = (event, index) => {
    const editButtonParent = buttonRef.current[index].parentElement;
    const listInput = editButtonParent.querySelector(".list-input");

    const editBtn = buttonRef.current[index];
    const saveBtn = editButtonParent.querySelector(".save-btn");

    listInput.setAttribute("disabled", true);
    editBtn.classList.add("d-block");
    editBtn.classList.remove("d-none");
    saveBtn.classList.remove("d-block");
    saveBtn.classList.add("d-none");
  };

  const removeButton = (index) => {
    setListData(
      listData.filter((item, itemIndex) => {
        return index != itemIndex;
      })
    );
  };

  const data = {
    removeButton,
    saveButton,
    addListItem,
    editListItemButton,
    editListItem,
    buttonRef,
    addInput,
  };

  return (
    <>
      <h1 className="text-center mt-3">{"leave a comment".toUpperCase()}</h1>
      <div className="head-list-area">
        <div className="form-group d-flex">
          <input type="text" className="form-control" ref={addInput} />
          <button
            className="ms-2 btn btn-success"
            onClick={() => addListItem()}
          >
            Add
          </button>
        </div>
      </div>

      <div className="content-list-area">
        <ul className="list-group">
          <actionItem.Provider value={data}>
            <ListItem listData={listData} />
          </actionItem.Provider>
        </ul>
      </div>
    </>
  );
}

export default App;
