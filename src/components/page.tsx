import { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { Note as NoteModel } from "../model/note";
import { useForm } from "react-hook-form";
import { CreateNote, fetchNotes, UpdateNote } from "../network/not_api";
import TextInputField from "./form/textinput";

interface PageProps {
  setBox?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  setNoteToEdit?: React.Dispatch<React.SetStateAction<NoteModel | null>>;
  box?: boolean;
  addNote?: boolean;
  id?: any;
  onNoteSaved: (note: NoteModel) => void;
  noteToEdit?: NoteModel;
}

interface NoteInput {
  title: string;
  text: string;
}
const Page = ({
  noteToEdit,
  setAddNote,
  setBox,
  setNoteToEdit,
  box,
  addNote,
  id,
  onNoteSaved,
}: PageProps) => {
  const [note, setNote] = useState<NoteModel>();

  useEffect(() => {
    if (!id) return;

    fetch("api/notes/" + id, { method: "Get" })
      .then((res) => res.json())
      .then((data) => setNote(data));
  }, [id]);

  const {
    register,

    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  const onSubmit = async (input: NoteInput) => {
    let noteResponse: NoteModel;
    try {
      if (noteToEdit) {
        noteResponse = await UpdateNote(noteToEdit._id, input);
      } else {
        noteResponse = await CreateNote(input);
      }

      onNoteSaved(noteResponse);
    } catch (error: any) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }
  };

  const showScrollingOnClosed = () => {
    document.body.style.overflowY = "auto";
  };

  return (
    <div>
      <div>
        {box && (
          <div className="w-full backdrop-blur-sm px-5 flex items-center justify-center inset-0 bg-transparent fixed">
            <div className="max-h-[300px] overflow-y-scroll overflow-auto relative min-h-fit w-[500px] max-w-full bg-[#423B34] rounded-[8px]">
              <div className="flex relative items-center justify-between p-5">
                <p className="text-[30px] font-primary text-white font-semibold">
                  {note?.title}
                </p>
                <div className="fixed right-[35%]">
                  <AiFillCloseSquare
                    onClick={() => {
                      showScrollingOnClosed();
                      setBox!(false);
                    }}
                    className="text-[30px] cursor-pointer text-[#bebab5]"
                  />
                </div>
              </div>
              <div>
                <p className="text-[15px] whitespace-pre-line ml-10 mb-10 break-words overflow-y-auto mr-10 text-white font-normal font-primary">
                  {note?.text}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {(addNote || noteToEdit) && (
          <div className="w-full backdrop-blur-sm px-5 flex items-center justify-center inset-0 bg-transparent fixed">
            <div className="sm:h-[550px] h-[480px] sm:w-[500px] mt-[96px] w-[350px] sm:mt-[100px]  sm:max-w-full bg-[#423B34]  rounded-[8px]">
              <div className="flex items-center sm:justify-between  pl-5 py-4 sm:p-5">
                <p className="text-[20px] font-sans text-[#cccccc] font-semibold">
                  {noteToEdit ? "Edit Note" : "Add Note"}
                </p>
                <div className="fixed right-[20%] sm:right-[35%]">
                  <AiFillCloseSquare
                    onClick={() => {
                      if (addNote) {
                        setAddNote(false);
                      } else {
                        setNoteToEdit!(null);
                      }
                      showScrollingOnClosed();
                    }}
                    className="text-[30px] cursor-pointer text-[#bebab5]"
                  />
                </div>
              </div>
              <span className="h-[1px] w-full bg-[#626161] block"></span>
              <div className="flex flex-col mt-1 sm:mt-8 items-center justify-center">
                <form
                  className="w-full "
                  onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                  })}
                >
                  <div className="flex w-[320px] sm:w-[400px] mx-auto items-center justify-center gap-4 flex-col">
                    <TextInputField
                      name="title"
                      label="Title"
                      type="text"
                      as="textarea"
                      placeholder="Title*"
                      register={register}
                      registerOptions={{ required: "Required" }}
                      error={errors.title}
                    />

                    <div className="flex w-full gap-2 sm:mb-10 flex-col">
                      <label className="font-sans font-normal text-[15px] text-[#cccccc]">
                        Text
                      </label>
                      <textarea
                        rows={5}
                        className=" placeholder:text-[#423B34] outline-none font-secondary rounded-[4px] text-black border-[#CCCCCC] border-2 w-[400px] max-w-full p-2 bg-[#cccccc]"
                        placeholder="Text*"
                        {...register("text", { required: true })}
                      />
                      {errors.text && (
                        <p className="text-[#cccccc]">text is required</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center mx-2 mt-4 sm:mt-10">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={showScrollingOnClosed}
                      className="h-[44px] text-[18px] text-[#423B34] font-primary font-semibold flex items-center mb-5 justify-center w-[400px] bg-[#cccccc] rounded-[8px]"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
