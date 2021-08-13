import React, { useState } from 'react';
import './../styles/App.css';

function App() {
   const [note, setNote] = useState('');
   const [editNote, setEditNote] = useState();
   const [items, setItems] = useState([]);
   const [globalId, setGlobalId] = useState(0);
   const [editId, setEditId] = useState(-1);

   const handleNote = (e) => {
      setNote(e.target.value);
   };

   const handleEditNote = (e) => {
      setEditNote(e.target.value);
   };

   const addItem = () => {
      if (!note) {
         alert('Please something add in note...');
         return;
      }
      items.push({ id: globalId, note });
      setGlobalId((prevId) => prevId + 1);
      setNote('');
   };

   const editItem = (e) => {
      if (!editNote) {
         alert('Empty not allowed');
         return;
      }
      const itemId = e.target.value;
      const updatedItems = items.map((item) => {
         if (item.id == itemId) {
            item.note = editNote;
         }

         return item;
      });
      setItems(updatedItems);

      setEditId(-1);
      setEditNote('');
   };

   const removeItem = (e) => {
      const temp = items.filter((item) => item.id != e.target.value);
      setItems(temp);
   };

   const HandleEditTextarea = (e) => {
      const itemId = e.target.value;

      for (let i = 0; i < items.length; i++) {
         if (items[i].id == itemId) {
            setEditNote(items[i].note);
            break;
         }
      }

      setEditId(itemId);
   };

   return (
      <div id="main">
         <h1>TODO List</h1>

         <div className="todo-list">
            <div className="text-area">
               <textarea name="" id="task" value={note} onChange={handleNote}></textarea>
               <br />
               <button id="btn" onClick={addItem}>
                  Add
               </button>
            </div>
            <div className="items">
               <h2>Todo Items</h2>
               <ul>
                  {items.map((item) => (
                     <li key={item.id}>
                        {editId == item.id && (
                           <div className="edit-item">
                              <textarea
                                 name=""
                                 id="task"
                                 className="editTask"
                                 value={editNote}
                                 onChange={handleEditNote}
                              ></textarea>
                              <br />
                              <button
                                 id="btn"
                                 className="saveTask"
                                 value={item.id}
                                 onClick={editItem}
                              >
                                 Save
                              </button>
                           </div>
                        )}

                        <span className="list">{item.note}</span>
                        <div className="actions">
                           <button
                              className="edit"
                              value={item.id}
                              onClick={HandleEditTextarea}
                           >
                              Edit
                           </button>
                           <button
                              className="delete"
                              value={item.id}
                              onClick={removeItem}
                           >
                              Delete
                           </button>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
}

export default App;
