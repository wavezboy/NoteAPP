import { Note } from "../model/note";
import { user } from "../model/user";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
};

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData(
    "https://noteappbackend-production-94d1.up.railway.app/api/notes",
    {
      method: "GET",
    }
  );

  return response.json();
}

export async function getLoggedInUser(): Promise<user> {
  const response = await fetchData(
    "https://noteappbackend-production-94d1.up.railway.app/api/users",
    {
      method: "GET",
      credentials: "include",
    }
  );

  return response.json();
}

export interface signUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: signUpCredentials): Promise<user> {
  const response = await fetchData(
    "https://noteappbackend-production-94d1.up.railway.app/api/users/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );

  return response.json();
}

export interface loginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: loginCredentials): Promise<user> {
  const response = await fetchData(
    "https://noteappbackend-production-94d1.up.railway.app/api/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );

  return response.json();
}

export async function logOut() {
  await fetchData(
    "https://noteappbackend-production-94d1.up.railway.app/api/users/logout",
    { method: "POST" }
  );
}

interface NoteInput {
  title: string;
  text?: string;
}

export async function CreateNote(note: NoteInput): Promise<Note> {
  const response = await fetchData(
    "https://noteappbackend-production-94d1.up.railway.app/api/notes",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }
  );

  return response.json();
}

export async function UpdateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    "https://noteappbackend-production-94d1.up.railway.app/api/notes/" + noteId,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }
  );

  return response.json();
}

export async function DeleteNote(noteId: string) {
  const response = await fetchData(
    "https://noteappbackend-production-94d1.up.railway.app/api/notes/" + noteId,
    {
      method: "DELETE",
    }
  );
}
