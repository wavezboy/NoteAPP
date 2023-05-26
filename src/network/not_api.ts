import { Note } from "../model/note";
import { user } from "../model/user";
import axios from "axios";

const fetchData = axios.create({
  // baseURL: "https://noteappbackend-production-94d1.up.railway.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("/api/notes");

  return response.data;
}

export async function getLoggedInUser(): Promise<user> {
  const response = await fetchData("/api/users");

  return response.data;
}

export interface signUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: signUpCredentials): Promise<user> {
  const response = await fetchData.post("/api/users/signup", credentials);

  return response.data;
}

export interface loginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: loginCredentials): Promise<user> {
  const response = await fetchData.post("/api/users/login", credentials);

  return response.data;
}

export async function logOut() {
  await fetchData.post("/api/users/logout");
}

interface NoteInput {
  title: string;
  text?: string;
}

export async function CreateNote(note: NoteInput): Promise<Note> {
  const response = await fetchData.post("/api/notes", note);

  return response.data;
}

export async function UpdateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData.patch("/api/notes/" + noteId, note);

  return response.data;
}

export async function DeleteNote(noteId: string) {
  const response = await fetchData.delete("/api/notes/" + noteId);

  return response.data;
}

// const fetchData = async (input: RequestInfo, init?: RequestInit) => {
//   const response = await fetch(input, init);

//   if (response.ok) {
//     return response;
//   } else {
//     const errorBody = await response.json();
//     const errorMessage = errorBody.error;
//     throw Error(errorMessage);
//   }
// };
