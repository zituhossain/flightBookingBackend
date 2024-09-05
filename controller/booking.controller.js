import {
  errorHandler,
  responseHandler,
} from "../middlewares/responseHandler.js";
import Booking from "../models/Booking.model.js";
import Flight from "../models/flight.model.js";

export const createBooking = async (req, res) => {
  try {
    const { flightId, numberOfSeats } = req.body;
    const userId = req.user.id;
    if (!flightId || !numberOfSeats) {
      return responseHandler(res, 400, "All fields are required", false);
    }
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return responseHandler(res, 404, "Flight not found", false);
    }
    if (flight.availableSeats < numberOfSeats) {
      return responseHandler(res, 400, "Not enough seats available", false);
    }
    const totalPrice = flight.price * numberOfSeats;
    const booking = new Booking({
      userId,
      flightId,
      numberOfSeats,
      totalPrice,
      bookingStatus: "confirmed",
    });
    flight.availableSeats -= numberOfSeats;

    await booking.save();
    await flight.save();

    return responseHandler(res, 201, "Booking created successfully", true, {
      booking,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("flightId userId");
    return responseHandler(res, 200, "Bookings fetched successfully", true, {
      bookings,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the authentication middleware
    console.log("zid", userId);
    const bookings = await Booking.find({ userId }).populate("flightId");

    if (!bookings) {
      return responseHandler(res, 404, "Bookings not found", false);
    }

    return responseHandler(res, 200, "Bookings fetched successfully", true, {
      bookings,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) {
      return responseHandler(res, 404, "Booking not found", false);
    }
    return responseHandler(res, 200, "Booking updated successfully", true, {
      booking,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return responseHandler(res, 404, "Booking not found", false);
    }
    return responseHandler(res, 200, "Booking deleted successfully", true, {
      booking,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
