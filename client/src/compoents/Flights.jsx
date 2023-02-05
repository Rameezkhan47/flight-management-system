import { useState } from "react";
import "./flights.css";
import axios from "axios";
import { redirect, useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';


function Flights({ user }) {
  const { facebookId } = user;
  const [arrival, setArrival] = useState();
  const [departure, setDeparture] = useState();
  const [time, setTime] = useState();
  const navigate = useNavigate;
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const flightId = uuidv4()
      console.log(time, arrival, departure);
      const response = await axios.post("http://localhost:5000/auth/booked", {
        arrival,
        departure,
        time,
        facebookId,
        flightId
      });
    } catch (error) {
      console.log(error);
    }
  };
  const testHandler = async () => {
    try {
      const response = window.open(
        "http://localhost:5000/auth/facebook",
        "_self"
      );

      if (response) {
        console.log("response is", response.json());
      }
    } catch (err) {
      console.log("err");
    }
  };
  return (
    <>


      <form
        className="row flex justify-content-center" id="form"
        onSubmit={submitHandler}
      >
        <div className="col-3">
          <div className="form-outline">
            <select
              className="form-select"
              aria-label="Default select example"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            >
              <option>Select City</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Gwadar">Gwadar</option>
              <option value="Sialkot">Sialkot</option>
            </select>
            <label className="form-label">From</label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-outline">
            <select
              className="form-select"
              aria-label="Default select example" 
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            >
              <option defaultValue>Select City</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Gwadar">Gwadar</option>
              <option value="Sialkot">Sialkot</option>
            </select>
            <label className="form">Destination</label>
          </div>
        </div>
        <div className="col-auto"></div>
        {arrival && departure && (
          <>
            <div id="card">
              <div className="card">
                <img
                  src="https://media.istockphoto.com/id/1322328289/photo/sunset-sky-on-airplane-plane-window-seat-over-paris-france-europe-for-travel-and-business.jpg?s=170667a&w=0&k=20&c=GHqxL0L7NNIsby1gP_CVXe-xXKcvaUeQul_Ws3S1SMg="
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">
                    {arrival} to {departure}
                  </h5>
                  <p class="card-text">8:30AM to 10:30AM</p>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={(e) => setTime("8:30AM to 10:30AM")}
                  >
                    Book
                  </button>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://media.istockphoto.com/id/1355983766/photo/airplane-during-take-off-on-airport-runway-n.jpg?b=1&s=170667a&w=0&k=20&c=6mcwqYXUh-2qT5iX-9TQ0D9X-dc_Kr1VtQ9DAnckVQg="
                  class="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {arrival} to {departure}
                  </h5>
                  <p className="card-text">1:30PM to 3:30PM</p>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => setTime("1:30PM to 3:30PM")}
                  >
                    Book
                  </button>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://media.istockphoto.com/id/1408933413/photo/airplane-being-preparing-ready-for-takeoff-in-international-airport-at-sunset-travel-around.jpg?b=1&s=170667a&w=0&k=20&c=OL-QUPKZk_XK5dNtbEg1RAr82Kt5y-242nEuuy2sbPE="
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {arrival} to {departure}
                  </h5>
                  <p className="card-text">8:30PM to 10:30PM</p>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => setTime("8:30PM to 10:30PM")}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default Flights;
