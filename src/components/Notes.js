import React, { useContext , useEffect, useRef , useState} from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes()
    //eslint-disable-next-line
  }, [])
  
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
const updateNote = (currentNote)=>{
  ref.current.click();
  setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
}
const handleclick = (e) => {
  editNote(note.id, note.etitle,note.edescription,note.etag)
  refClose.current.click();
};
const onChange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value });
};


  return (
    <div>
      <AddNote />

  
<button  ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

      <form className="my-3">
        <div className="form-group">
          <label htmlFor="etitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            placeholder="title"
            value={note.etitle}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="edescription">Description</label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            value={note.edescription}
            name="edescription"
            placeholder="description"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            placeholder="tag"
            value={note.etag}
            onChange={onChange}
          />
        </div>
      </form>

      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>


      <h1>Your Notes</h1>
      <div className="row my-3">
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
        })}
      </div>
    </div>
  );
};
