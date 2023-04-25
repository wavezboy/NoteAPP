import { useState } from "react";
import { Note as NoteModel } from "../model/note";
import { formatDate } from "../utils/formatdate";

interface NoteProps {
  onNoteClicked: (note: NoteModel) => void;
  note: NoteModel;
  setBox: React.Dispatch<React.SetStateAction<boolean>>;
  setId: any;
  onDeletNote: (note: NoteModel) => void;
  setAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  noteVisibility: boolean;
  setNoteVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const Note = ({
  setAddNote,
  note,
  setBox,
  setId,
  onDeletNote,
  onNoteClicked,
  noteVisibility,
  setNoteVisibility,
}: NoteProps) => {
  const { _id, createdAt, text, title, updatedAt } = note;

  let CreatedUpdatedTime: string;

  if (createdAt !== updatedAt) {
    CreatedUpdatedTime = "Updated:" + formatDate(updatedAt);
  } else {
    CreatedUpdatedTime = "Created:" + formatDate(createdAt);
  }

  const handleClick = () => {
    onNoteClicked(note);
  };

  const hideScrollingOnOpen = () => {
    document.body.style.overflowY = "hidden";
  };
  const handleDelete = () => {
    onDeletNote(note);
  };
  return (
    <div>
      <div
        className={`${
          noteVisibility
            ? "invisible"
            : "h-[270px] hover:scale-105 transition-all bg-[#e7edec] shadow-md border-[1px] pt-3 border-[#bfbfbf]  rounded-[10px] p-[32px]  mb-0  w-[270px]"
        } `}
      >
        <div className="w-full cursor-pointer flex flex-col justify-evenly h-full">
          <div
            onClick={() => {
              setId(_id);
              setBox(true);
              hideScrollingOnOpen();
            }}
          >
            <div className=" overflow-y-hidden h-[140px]  gradient-mask-b-90 ">
              <p className="text-[22px] text-[#2B2B2B]  mb-3 capitalize font-primary font-semibold">
                {title}
              </p>
              <p className="text-[18px] whitespace-pre-line mb-2 break-words text-[#2B2B2B] font-primary font-normal">
                {text}
              </p>
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center">
            <div className="h-2px] opacity-80 rounded-[5px] w-[196px] flex justify-center bg-[#bebab5]">
              <footer className="text-[12px]">{CreatedUpdatedTime}</footer>
            </div>
            <div className="flex gap-2 mt-4 justify-between">
              <div className="h-[44px] flex items-center justify-center w-[82px] bg-[#cccccc] rounded-[8px]">
                <button
                  onClick={() => {
                    hideScrollingOnOpen();
                    handleClick();
                  }}
                  className="text-[18px] text-[#423B34] font-primary font-semibold"
                >
                  Update
                </button>
              </div>
              <div className="h-[44px] flex items-center justify-center w-[82px] bg-[#423B34] rounded-[8px]">
                <button
                  onClick={(e) => {
                    handleDelete();
                    e.stopPropagation;
                  }}
                  className="text-[18px] text-white font-primary font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
