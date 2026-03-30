import sequelize from "../config/database.js";


// ================= REQUIRED FIELDS (DB NOT NULL CONSTRAINT) =================
//
// Mandatory Text Fields (req.body):
// - batch
// - title
// - description
// - start_date
// - participants
// - testimonials_name
// - testimonials_class
// - testimonials_feedback
//
// Mandatory File Fields (req.files):
// - brochure              → maps to brochure_url (NOT NULL)
// - event_images          → maps to event_image_url (NOT NULL)
//
// Optional Fields:
// - end_date
// - resource_person_image
// - resource_person_name
// - resource_person_description
// - winner_image
// - winner_name
// - winner_description
//
// NOTE:
// - If required fields are missing → DB will throw NOT NULL constraint error
// - Always validate before inserting into DB
// ============================================================================



export const addActivity = async (req, res) => {
    try {
        console.log("ADD ACTIVITY WITH IMAGES");
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const {
            batch,
            title,
            description,
            start_date,
            end_date,
            participants,
            resource_person_name,
            resource_person_description,
            winner_name,
            winner_description,
            testimonials_name,
            testimonials_class,
            testimonials_feedback
        } = req.body;

        // Validate required text fields
        if (
            !batch ||
            !title ||
            !description ||
            !start_date ||
            !participants ||
            !testimonials_name ||
            !testimonials_class ||
            !testimonials_feedback
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Get file URLs directly from multer (already uploaded to Cloudinary)
        const brochure_url =
            req.files?.brochure?.[0]?.path || null;

        const resource_person_image_url =
            req.files?.resource_person_image?.[0]?.path || null;

        const winner_image =
            req.files?.winner_image?.[0]?.path || null;

        // Handle multiple event images
        let event_image_url = null;

        if (req.files?.event_images) {
            const urls = req.files.event_images.map(file => file.path);
            event_image_url = urls.join(",");
        }

        // Validate required file fields (based on DB constraints)
        if (!brochure_url || !event_image_url) {
            return res.status(400).json({
                success: false,
                message: "Brochure and event images are required"
            });
        }

        const query = `
            INSERT INTO activities (
                batch,
                brochure_url,
                title,
                description,
                start_date,
                end_date,
                participants,
                resource_person_image_url,
                resource_person_name,
                resource_person_description,
                event_image_url,
                winner_image,
                winner_name,
                winner_description,
                testimonials_name,
                testimonials_class,
                testimonials_feedback
            )
            VALUES (
                :batch,
                :brochure_url,
                :title,
                :description,
                :start_date,
                :end_date,
                :participants,
                :resource_person_image_url,
                :resource_person_name,
                :resource_person_description,
                :event_image_url,
                :winner_image,
                :winner_name,
                :winner_description,
                :testimonials_name,
                :testimonials_class,
                :testimonials_feedback
            )
        `;

        await sequelize.query(query, {
            replacements: {
                batch,
                brochure_url,
                title,
                description,
                start_date,
                end_date: end_date || null,
                participants,
                resource_person_image_url,
                resource_person_name: resource_person_name || null,
                resource_person_description: resource_person_description || null,
                event_image_url,
                winner_image,
                winner_name: winner_name || null,
                winner_description: winner_description || null,
                testimonials_name,
                testimonials_class,
                testimonials_feedback
            }
        });

        return res.status(201).json({
            success: true,
            message: "Activity added successfully"
        });

    } catch (error) {
        console.error("FULL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
