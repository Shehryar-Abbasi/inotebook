import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "6464f9b8a626a6002f158034",
          "user": "6464d0aa492b20647976394d",
          "title": "My Title",
          "description": "Please run on first try",
          "tag": "personal",
          "date": "2023-05-17T15:58:48.989Z",
          "__v": 0
        },
        {
            "_id": "6464f9b8a626a6002f158034",
            "user": "6464d0aa492b20647976394d",
            "title": "My Title",
            "description": "Please run on first try",
            "tag": "personal",
            "date": "2023-05-17T15:58:48.989Z",
            "__v": 0
          },
          {
            "_id": "6464f9b8a626a6002f158034",
            "user": "6464d0aa492b20647976394d",
            "title": "My Title",
            "description": "Please run on first try",
            "tag": "personal",
            "date": "2023-05-17T15:58:48.989Z",
            "__v": 0
          },
          {
            "_id": "6464f9b8a626a6002f158034",
            "user": "6464d0aa492b20647976394d",
            "title": "My Title",
            "description": "Please run on first try",
            "tag": "personal",
            "date": "2023-05-17T15:58:48.989Z",
            "__v": 0
          },
          {
            "_id": "6464f9b8a626a6002f158034",
            "user": "6464d0aa492b20647976394d",
            "title": "My Title",
            "description": "Please run on first try",
            "tag": "personal",
            "date": "2023-05-17T15:58:48.989Z",
            "__v": 0
          },
          {
            "_id": "6464f9b8a626a6002f158034",
            "user": "6464d0aa492b20647976394d",
            "title": "My Title",
            "description": "Please run on first try",
            "tag": "personal",
            "date": "2023-05-17T15:58:48.989Z",
            "__v": 0
          },
          {
            "_id": "6464f9b8a626a6002f158034",
            "user": "6464d0aa492b20647976394d",
            "title": "My Title",
            "description": "Please run on first try",
            "tag": "personal",
            "date": "2023-05-17T15:58:48.989Z",
            "__v": 0
          },
          {
            "_id": "6464f9b8a626a6002f158034",
            "user": "6464d0aa492b20647976394d",
            "title": "My Title",
            "description": "Please run on first try",
            "tag": "personal",
            "date": "2023-05-17T15:58:48.989Z",
            "__v": 0
          }
      ]
      const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;