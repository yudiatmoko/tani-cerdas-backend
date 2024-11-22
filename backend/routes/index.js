import express from "express";
import auth from "./authRoute.js";
import courses from "./courseRoute.js";
import modules from "./moduleRoute.js";
import courseModules from "./courseModulesRoute.js";
import educations from "./educationRoute.js";
import userCourses from "./userCourseRoute.js";
import booking from "./bookingRoute.js";

const app = express();

app.use("/", auth);
app.use("/course", courses);
app.use("/module", modules);
app.use("/education", educations);
app.use("/course-modules", courseModules);
app.use("/user-courses", userCourses);
app.use("/booking", booking);

export default app;
