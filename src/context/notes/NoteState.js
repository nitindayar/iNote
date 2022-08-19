import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  /* eslint-disable */
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //get note
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MmZkOGFiM2I4NjBjODkxMmY3MDJjIn0sImlhdCI6MTY0OTc1MDg1M30.B7JGLiKVCrEODElXvRd5RenOchXttXruqkCh4157VkA"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }
  //add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MmZkOGFiM2I4NjBjODkxMmY3MDJjIn0sImlhdCI6MTY0OTc1MDg1M30.B7JGLiKVCrEODElXvRd5RenOchXttXruqkCh4157VkA"
      },
      body:JSON.stringify({title, description, tag})
    });
    
    //logic
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //delte a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MmZkOGFiM2I4NjBjODkxMmY3MDJjIn0sImlhdCI6MTY0OTc1MDg1M30.B7JGLiKVCrEODElXvRd5RenOchXttXruqkCh4157VkA"
      }
    });
    const json =  response.json();
    //delete logic
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  };
  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1MmZkOGFiM2I4NjBjODkxMmY3MDJjIn0sImlhdCI6MTY0OTc1MDg1M30.B7JGLiKVCrEODElXvRd5RenOchXttXruqkCh4157VkA"
      },
      body:JSON.stringify({title, description, tag})
    });
    const json =  response.json();
    //editing logic
    let newNotes = JSON.parse(JSON.stringify(notes));
    for(let i=0;i<notes.length;i++)
    {
      const element = newNotes[i];
      if(element._id === id){
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
