import sequelize from "../config/database.js";

export const getAssociationBatchDetails = async (req, res) => {

    try {

        const { id } = req.params;

        // Query batch information
        const [batchInfo] = await sequelize.query(`
            SELECT batch_id, batch_year, title, description, image_url
            FROM association_batch
            WHERE batch_id = :id
        `, {
            replacements: { id }
        });

        if (!batchInfo[0]) {
            return res.status(404).json({
                message: "Batch not found"
            });
        }

        const [members] = await sequelize.query(`
            SELECT member_id, phone_number, name, role, year
            FROM association_members
            WHERE batch_year = :batch_year
            ORDER BY name
        `, {
            replacements: { batch_year: batchInfo[0].batch_year }
        });

        res.json({
            batch_info: batchInfo[0] || null,
            members: members || []
        });

    } catch (error) {

        console.error("Error fetching association batch details:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }

};
