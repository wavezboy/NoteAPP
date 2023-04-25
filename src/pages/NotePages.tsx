import React from "react";
import NoteLoggedInView from "../components/NoteLoggedInView";
import NotePageLogoutView from "../components/NotePageLogoutView";
import { user } from "../model/user";

interface NotePagesProps {
  loggedInUser: user | null;
}

export default function NotePages({ loggedInUser }: NotePagesProps) {
  return (
    <div>{loggedInUser ? <NoteLoggedInView /> : <NotePageLogoutView />}</div>
  );
}
