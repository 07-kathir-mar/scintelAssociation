import sequelize from "../config/database.js";

export const getActivityById = async (req, res) => {

    try {

        const id = req.params.id;

        const [results] = await sequelize.query(`
            SELECT
                activity_id,
                batch,
                title,
                description,
                start_date,
                end_date,
                participants,
                resource_person_name,
                resource_person_description,
                resource_person_image_url,
                brochure_url,
                event_image_url,
                winner_name,
                winner_description,
                winner_image,
                testimonials_name,
                testimonials_class,
                testimonials_feedback
            FROM activities
            WHERE activity_id = :id
        `, {
            replacements: { id }
        });

        res.json(results[0]);

    } catch (error) {

        console.error("Error fetching activity by id:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }

};
