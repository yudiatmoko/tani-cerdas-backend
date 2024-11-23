import { query } from "../database/db.js";

const getAllCourses = async () => {
  try {
    const coursesData = await query(
      `SELECT c.*, 
              u.name AS contributor_name, 
              u.job AS contributor_position, 
              u.institute, 
              u.experiences AS experience, 
              u.rating, 
              u.image_url AS contributor_image
         FROM course c
         JOIN user u ON c.contributor_id = u.id`
    );

    if (coursesData.length === 0) {
      throw new Error("No courses found");
    }

    const formattedCourses = [];
    for (const course of coursesData) {
      // Buat objek contributor
      const contributor = {
        id: course.contributor_id,
        name: course.contributor_name,
        position: course.contributor_position,
        institution: course.institute,
        experience: course.experience,
        rating: course.rating,
        imageUrl: course.contributor_image,
      };

      // Ambil data module
      const moduleData = await query(
        `SELECT m.id AS moduleId, m.title AS moduleTitle, m.submodules_num
           FROM course_modules cm
           JOIN module m ON cm.module_id = m.id
           WHERE cm.course_id = ?`,
        [course.id]
      );

      // Tambahkan submodules ke setiap module
      for (const module of moduleData) {
        const submoduleData = await query(
          `SELECT id AS submoduleId, title, content
             FROM submodule
             WHERE module_id = ?`,
          [module.moduleId]
        );
        module.submodules = submoduleData;
      }

      // Format course
      formattedCourses.push({
        id: course.id,
        image: course.image_url,
        title: course.title,
        duration: course.duration,
        level: course.level,
        desc: course.description,
        videoUrl: course.video_url,
        contributor, // Tambahkan contributor sebagai objek
        courseModules: moduleData, // Tambahkan module dengan submodules
      });
    }

    return formattedCourses;
  } catch (error) {
    throw error;
  }
};

const getEducationById = async (courseId) => {
  try {
    const courseData = await query(
      `SELECT c.*, u.name AS contributor_name, u.job AS contributor_position, u.institute, u.experiences AS experience, u.rating, u.image_url AS contributor_image
         FROM course c
         JOIN user u ON c.contributor_id = u.id
         WHERE c.id = ?`,
      [courseId]
    );

    if (courseData.length === 0) {
      throw new Error("Course not found");
    }

    const course = courseData[0];

    const moduleData = await query(
      `SELECT m.id AS moduleId, m.title AS moduleTitle, m.submodules_num
         FROM course_modules cm
         JOIN module m ON cm.module_id = m.id
         WHERE cm.course_id = ?`,
      [courseId]
    );

    for (const module of moduleData) {
      const submoduleData = await query(
        `SELECT id AS submodulesId, title, content
           FROM submodule
           WHERE module_id = ?`,
        [module.moduleId]
      );
      module.submodules = submoduleData;
    }

    return {
      id: course.id,
      image: course.image_url,
      title: course.title,
      duration: course.duration,
      level: course.level,
      desc: course.description,
      videoUrl: course.video_url,
      contributors: {
        id: course.contributor_id,
        name: course.contributor_name,
        position: course.contributor_position,
        institution: course.institute,
        experience: course.experience,
        rating: course.rating,
        imageUrl: course.contributor_image,
      },
      courseModules: moduleData,
    };
  } catch (error) {
    throw error;
  }
};

export { getAllCourses, getEducationById };
