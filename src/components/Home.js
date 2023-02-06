import React, { useContext } from "react";
import contextValue from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = ({showAlert}) => {
  return (
    <div className="container">
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
