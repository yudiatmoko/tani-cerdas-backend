import { getAllEvents, getEventById, addEvent, deleteEventById, updateEventById } from "../models/eventModel.js";

// Mendapatkan semua event
export const handleGetAllEvents = async (req, res) => {
  try {
    const eventsData = await getAllEvents();

    if (eventsData.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res.json(eventsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mendapatkan event berdasarkan ID
export const handleGetEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const eventData = await getEventById(eventId);

    res.json(eventData);
  } catch (error) {
    console.error(error);
    if (error.message === "Event not found") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Menambahkan event baru
export const handleAddEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newEvent = await addEvent({ title, description, date, location });
    res.status(201).json({ message: "Event added successfully", data: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Menghapus event berdasarkan ID
export const handleDeleteEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const result = await deleteEventById(eventId);

    if (!result) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: `Event with ID ${eventId} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Memperbarui event berdasarkan ID
export const handleUpdateEventById = async (req, res) => {
  const eventId = req.params.id;
  const { title, description, date, location } = req.body;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedEvent = await updateEventById(eventId, { title, description, date, location });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: `Event with ID ${eventId} updated successfully`, data: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
