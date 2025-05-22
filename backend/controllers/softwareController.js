const { getRepository } = require("typeorm");
const Software = require("../models/Software");

module.exports = {
    createSoftware: async (req, res) => {
        try {
            const softwareRepository = getRepository(Software);
            const { name, description, accessLevels } = req.body;

            const newSoftware = softwareRepository.create({ name, description, accessLevels });
            await softwareRepository.save(newSoftware);

            res.status(201).json({ message: "Software created successfully", software: newSoftware });
        } 
        catch (error) {
            console.error("Error creating software:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getAllSoftware: async (req, res) => {
        try {
            const softwareRepository = getRepository(Software);
            const softwareList = await softwareRepository.find();

            res.status(200).json(softwareList);
        } 
        catch (error) {
            console.error("Error fetching software:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

};