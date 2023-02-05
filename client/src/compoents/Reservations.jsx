import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./flights.css";



function Reservations({ user }) {
    const [reservations, setReservations] = useState([{}])
    useEffect(() => {
        const getWeather = async () => {
            try {
              const response = await axios.get(
                `http://localhost:5000/auth/booked?user=${user.facebookId}`
              );
              if (response) {
                setReservations(response.data.user)
              }
            } catch (err) {
              console.log(err);
            }
          };
          getWeather();
    }, [])
    
  console.log(user);
  const data = user.flights;
  const cancelHandler = async(flightId) => {
    try {
       const response = await axios.delete("http://localhost:5000/auth/booked",{
            data: { facebookId: user.facebookId, flightId: flightId}
        })
        setReservations(response.data.data)

    } catch (error) {
        console.log(error)
    }
  }
  return (
    <>
      <h2 className="text-center">
        Welcome&nbsp;&nbsp;&nbsp;&nbsp;{user.username}
      </h2>
      <div id="card">
      {reservations.map((item) => {
        return (

          <React.Fragment key={uuidv4()} >
            <div className="card">
              <img
                src="https://media.istockphoto.com/id/1322328289/photo/sunset-sky-on-airplane-plane-window-seat-over-paris-france-europe-for-travel-and-business.jpg?s=170667a&w=0&k=20&c=GHqxL0L7NNIsby1gP_CVXe-xXKcvaUeQul_Ws3S1SMg="
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">
                  {item.arrival} to {item.departure}
                </h5>
                <p class="card-text">{item.time}</p>
              </div>
              <button className="btn btn-danger" onClick={()=>cancelHandler(item.flightId)}>Cancel Reservation</button>
            </div>
          </React.Fragment>
          
        );
      })}
      </div>
    </>
  );
}

export default Reservations;
