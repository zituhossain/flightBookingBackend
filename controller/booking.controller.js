import { errorHandler, responseHandler } from "../middlewares/responseHandler";
import Booking from "../models/Booking.model";
import Flight from "../models/flight.model";

export const createBooking = async (req, res) => {
  try {
    const { userId, flightId, numberOfSeats } = req.body;
    if (!userId || !flightId || !numberOfSeats || !totalPrice) {
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
      userId: req.user.id,
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
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "flightId"
    );
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
