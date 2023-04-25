import { useEffect, useState } from "react";
import { Note as NoteModel } from "../model/note";
import Note from "./note";
import * as NotesApi from "../network/not_api";

import { BsPlusSquareFill } from "react-icons/bs";
import Page from "../components/page";

export default function NoteLoggedInView() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [box, setBox] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [id, setId] = useState("");
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [noteVisibility, setNoteVisibility] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setShowNotesLoadingError(false);
        setLoadingNotes(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
        setShowNotesLoadingError(true);
      } finally {
        setLoadingNotes(false);
      }
    };
    loadNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.DeleteNote(note._id);
      setNotes(notes.filter((prevNotes) => prevNotes._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const hideScrollingOnOpen = () => {
    document.body.style.overflowY = "hidden";
  };

  const notesComponent = (
    <div className="flex justify-center gap-10 flex-wrap mt-[17px]  items-center ">
      {notes.map((note) => (
        <Note
          noteVisibility={noteVisibility}
          setNoteVisibility={setNoteVisibility}
          onNoteClicked={(note) => {
            setNoteToEdit(note);
          }}
          note={note}
          key={note._id}
          setBox={setBox}
          setId={setId}
          onDeletNote={deleteNote}
          setAddNote={setAddNote}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center  bg-white pb-10">
      <div className="flex">
        {loadingNotes && <p>Loading notes</p>}
        {showNotesLoadingError && <p>There is an error, refresh to reload</p>}
        {!loadingNotes && !showNotesLoadingError && (
          <>
            {notes.length > 0 ? (
              notesComponent
            ) : (
              <p className="text-[25px] flex text-center w-[350px] capitalize">
                you dont have any note yet. click the add button to add a new
                note
              </p>
            )}
          </>
        )}

        <Page
          setBox={setBox}
          setAddNote={setAddNote}
          box={box}
          addNote={addNote}
          id={id}
          onNoteSaved={(newNote) => {
            setAddNote(false);
            setNotes([...notes, newNote]);
          }}
        />

        {noteToEdit && (
          <Page
            setAddNote={setAddNote}
            noteToEdit={noteToEdit}
            setNoteToEdit={setNoteToEdit}
            onNoteSaved={(UpdateNote) => {
              setNotes(
                notes.map((existingNote) =>
                  existingNote._id === UpdateNote._id
                    ? UpdateNote
                    : existingNote
                )
              );

              setNoteToEdit(null);

              setAddNote(false);
            }}
          />
        )}
      </div>
      <div>
        {!box && (
          <BsPlusSquareFill
            onClick={() => {
              hideScrollingOnOpen();
              setAddNote(true);
            }}
            className={`${
              addNote
                ? "invisible"
                : "text-[#423B34] lg:left-[94%] cursor-pointer lg:top-[80%] md:left-[92%]  bottom-7 left-[80%] fixed text-[50px]"
            }`}
          />
        )}
      </div>
    </div>
  );
}
