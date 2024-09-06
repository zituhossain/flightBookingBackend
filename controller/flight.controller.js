import Flight from "../models/flight.model.js";
import {
  errorHandler,
  responseHandler,
} from "../middlewares/responseHandler.js";
import { isValid } from "date-fns";
import moment from "moment";

export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    return responseHandler(res, 200, "Flights fetched successfully", true, {
      flights,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return responseHandler(res, 404, "Flight not found", false);
    }
    return responseHandler(res, 200, "Flight fetched successfully", true, {
      flight,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const searchFlights = async (req, res) => {
  const { origin, destination, date } = req.query;
  // Ensure the date is valid
  const flightDate = new Date(date);
  if (!isValid(flightDate)) {
    return responseHandler(res, 400, "Invalid flight date", false);
  }

  try {
    const flights = await Flight.find({
      origin,
      destination,
      date: flightDate,
    });
    if (flights.length === 0) {
      return responseHandler(res, 404, "Flights not found", false);
    }

    return responseHandler(res, 200, "Flights Searched successfully", true, {
      flights,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const addFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      airline,
      origin,
      destination,
      date,
      time,
      price,
      availableSeats,
    } = req.body;

    // Check for required fields
    if (!airline || !origin || !destination || !date || !time) {
      return responseHandler(res, 400, "All fields are required", false);
    }

    // Parse the date and adjust it for the correct timezone
    const dateObj = new Date(date);
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(dateObj.getTime() - timezoneOffset);

    // Create a new flight object with adjusted date
    const flight = new Flight({
      flightNumber,
      airline,
      origin,
      destination,
      date: adjustedDate, // Save adjusted date
      time,
      price,
      availableSeats,
    });

    await flight.save();

    return responseHandler(res, 201, "Flight added successfully", true, {
      flight,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!flight) {
      return responseHandler(res, 404, "Flight not found", false);
    }
    return responseHandler(res, 200, "Flight updated successfully", true, {
      flight,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return responseHandler(res, 404, "Flight not found", false);
    }
    return responseHandler(res, 200, "Flight deleted successfully", true);
  } catch (error) {
    return errorHandler(res, error);
  }
};
