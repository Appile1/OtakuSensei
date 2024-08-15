"use client";
import { useState, useEffect, useContext } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../app/firebase.js";
import "./page.css";
import PantryItem from "../components/pantryitem/pantryitem.js";
import { AuthContext } from "../components/authContext.js";

export default function Intro() {
  const { user } = useContext(AuthContext);
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // Do nothing if the user is not logged in

    // Set up real-time listener for pantry items
    const unsubscribe = onSnapshot(
      collection(db, user.uid),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPantryItems(items);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching pantry items:", error);
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts or the user changes
    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="centered-container">
        <p className="centered-message">
          Kindly log in or sign up to manage your pantry.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="centered-container">
        <p className="centered-message">Loading pantry items...</p>
      </div>
    );
  }

  return (
    <section className="pantry-grid">
      {pantryItems.length > 0 ? (
        pantryItems.map((item) => (
          <PantryItem key={item.id} id={item.id} name={item.name} /> // Pass id and name
        ))
      ) : (
        <p className="centered-message">
          Your pantry is empty. Add some items!
        </p>
      )}
    </section>
  );
}
