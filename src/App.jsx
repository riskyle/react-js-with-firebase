import { useState } from "react";
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { colRef, db } from "./firebase";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Unsubscribing from "./auth/Unsubscribing";
import GoogleAuth from "./auth/GoogleAuth";

function App() {
  const [state, setState] = useState({
    title: "",
    author: "",
    id: "",
  });
  const [update, setUpdate] = useState({
    update_title: "",
    update_author: "",
    uid: "",
  });
  const [search, setSearch] = useState("");
  //for adding data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const add = await addDoc(colRef, {
      title: state.title,
      author: state.author,
      createdAt: serverTimestamp(),
    });
    setState({ ...state, title: "", author: "" });
  };
  //for deleting data
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "books", state.id);
    await deleteDoc(docRef);
    setState({ ...state, id: "" });
  };
  //for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = query(
      colRef,
      where("author", "==", search),
      orderBy("title", "desc")
    );
    const Books = (snapshot) => {
      try {
        const books = [];
        for (const book of snapshot.docs) {
          books.push({ ...book.data(), id: book.id });
        }
        console.log(books);
      } catch (error) {
        console.log(error);
      }
    };
    onSnapshot(q, (snapshot) => Books(snapshot));
  };
  //for update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "books", update.uid);
    await updateDoc(docRef, {
      title: update.update_title,
      author: update.update_author,
    });
    setUpdate({ ...update, update_title: "", update_author: "", uid: "" });
  };
  return (
    <>
      <div>
        <h1>Getting Started with Firebase 9</h1>
        <h2>Firebase Firestore</h2>

        {/* search form */}

        <form onSubmit={(e) => handleSearchSubmit(e)}>
          <h3>Search a author</h3>
          <input
            type="text"
            placeholder="search author"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>search</button>
        </form>

        {/* add form */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>Add Books</h3>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="add book title"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            required
          />
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            placeholder="add book author"
            value={state.author}
            onChange={(e) => setState({ ...state, author: e.target.value })}
            required
          />
          <button>Add a new book.</button>
        </form>

        {/* delete form */}
        <form onSubmit={(e) => handleDeleteSubmit(e)}>
          <h3>Delete a book</h3>
          <label>document id:</label>
          <input
            type="text"
            placeholder="type the id you want to delete"
            value={state.id}
            onChange={(e) => setState({ ...state, id: e.target.value })}
          />
          <button>Delete</button>
        </form>

        {/* update form */}
        <form onSubmit={(e) => handleUpdateSubmit(e)}>
          <h3>Update a book</h3>
          <label>document id: </label>
          <input
            type="text"
            placeholder="type the id you want to update"
            value={update.uid}
            onChange={(e) => setUpdate({ ...update, uid: e.target.value })}
          />
          <label>Update Title: </label>
          <input
            type="text"
            placeholder="updated title"
            value={update.update_title}
            onChange={(e) =>
              setUpdate({ ...update, update_title: e.target.value })
            }
          />
          <label>Update Author: </label>
          <input
            type="text"
            placeholder="updated author"
            value={update.update_author}
            onChange={(e) =>
              setUpdate({ ...update, update_author: e.target.value })
            }
          />
          <button>Update Now</button>
        </form>

        <h1>Firebase Auth</h1>
        {/* Sign Un */}
        <SignUp />

        {/* Sign In */}
        <SignIn />

        {/* Unsubscribing */}
        <Unsubscribing />

        {/* Google Auth */}
        <GoogleAuth />
      </div>
    </>
  );
}

export default App;
