const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors()); // Esto permitirá todas las solicitudes CORS

import { useState, useEffect } from 'react';

const initialUsers = ['Tú', 'Yair', 'Jesús'];

export default function Home() {
  const [turns, setTurns] = useState(initialUsers);
  const [currentTurn, setCurrentTurn] = useState(turns[0]);

  useEffect(() => {
    const storedTurns = JSON.parse(localStorage.getItem('turns'));
    if (storedTurns) {
      setTurns(storedTurns);
      setCurrentTurn(storedTurns[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('turns', JSON.stringify(turns));
  }, [turns]);

  const handleConfirm = () => {
    const newTurns = [...turns.slice(1), turns[0]]; // mover el turno actual al final
    setTurns(newTurns);
    setCurrentTurn(newTurns[0]);
  };

  const handlePostpone = () => {
    const newTurns = [...turns.slice(1), turns[0]]; // el turno actual se mueve al final
    setTurns(newTurns);
    setCurrentTurn(newTurns[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">¿A quién le toca traer el agua?</h1>
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <p className="text-xl mb-2">Hoy le toca: <strong>{currentTurn}</strong></p>
        <div className="flex space-x-4">
          <button 
            onClick={handleConfirm} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Confirmar
          </button>
          <button 
            onClick={handlePostpone} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Posponer
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl">Próximos turnos:</h2>
        <ul className="mt-2">
          {turns.slice(1).map((user, index) => (
            <li key={index} className="text-lg">{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}








module.exports = router;
