"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import "./header.css";
import { AuthContext } from "../authContext.js";
import { signOut } from "firebase/auth";
import { auth, db } from "../../app/firebase.js"; // Import db from your firebase setup
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => setItemName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      // Add a new document with a generated ID in the user's collection
      await addDoc(collection(db, user.uid), {
        name: itemName,
        createdAt: new Date(), // Optionally add timestamp or other fields
      });
      console.log("Item added to Firestore:", itemName);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setItemName("");
    closeModal();
  };

  const handleAuthAction = async () => {
    if (user) {
      try {
        await signOut(auth);
        router.push("/login");
      } catch (error) {
        console.error("Sign Out Error:", error);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="intro-container">
      <header className="header">
        <div className="logo">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="bi bi-house"
            >
              <path d="M8 3.293l6 6V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3.707l6-6zm5 6.707V13a.5.5 0 0 0 .5-.5H13a.5.5 0 0 0 .5-.5v-3.5L8 4.293l-5.5 5.5V12.5A.5.5 0 0 0 2.5 13H3v.5a.5.5 0 0 0 .5.5H13z" />
              <path
                fillRule="evenodd"
                d="M7.293 1.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1-1.414 1.414L8 3.414 2.707 9.707a1 1 0 0 1-1.414-1.414l7-7z"
              />
            </svg>
          </Link>
        </div>
        <div className="buttons">
          <button className="btn" onClick={openModal}>
            Add item
          </button>
          <button className="btn" onClick={handleAuthAction}>
            {user ? "Logout" : "Sign In"}
          </button>
        </div>
      </header>
      <section className="intro-section">
        <div className="intro-text">
          <h1>Welcome to StockStash</h1>
          <p>
            Our innovative pantry management app helps you keep track of all
            your groceries with ease.
          </p>
          <p>Developed by M. Ahmad and Prabh.</p>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="item">Add New Item</h2>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <form onSubmit={handleSubmit}>
              <label htmlFor="itemName">
                Item Name:
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit" className="submit-btn">
                Save Item
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
