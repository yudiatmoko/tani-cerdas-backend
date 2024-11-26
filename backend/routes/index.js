import express from "express";
import auth from "./authRoute.js";
import courses from "./courseRoute.js";
import modules from "./moduleRoute.js";
import courseModules from "./courseModulesRoute.js";
import educations from "./educationRoute.js";
import userCourses from "./userCourseRoute.js";
import bookings from "./bookingRoute.js";
import events from "./eventsRoute.js"; // Import route events

const app = express();

app.use("/", auth);
app.use("/course", courses);
app.use("/module", modules);
app.use("/education", educations);
app.use("/course-modules", courseModules);
app.use("/user-courses", userCourses);
app.use("/booking", bookings);
app.use("/event", events); // Tambahkan route events

app.post('/api/v1/event', (req, res) => {
    // Handle event creation logic here
  });
export default app;
