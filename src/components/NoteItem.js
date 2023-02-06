import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote} = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const deleteClick=(e)=>{
    deleteNote(note._id)
    props.showAlert("Deleted Successfully","success")
  }
  return (
    <div className="col-md-3">
      <div class="card my-3" >
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">
            {note.description}
          </p>
          <i className="fa-solid fa-trash mx-2" onClick={deleteClick}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
