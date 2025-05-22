const { getRepository } = require("typeorm");
const Request = require("../models/Request");
const User = require("../models/User");
const Software = require("../models/Software");

module.exports = {
    createRequest: async (req, res) => {
        try {
            const requestRepository = getRepository(Request);
            const userRepository = getRepository(user);
            const softwareRepository = getRepository(Software);

            const { softwareId, accessType, reason } = req.body;
            const userId = req.userData.userId; // Assuming userId is available in req.userData
            
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const software = await softwareRepository.findOne({ where: { id: softwareId } });
            if (!software) {
                return res.status(404).json({ message: "Software not found" });
            }

            const newRequest = requestRepository.create({
                user,
                software,
                accessType,
                reason,
                status: "Pending",
            });

            await requestRepository.save(newRequest);
            res.status(201).json({ message: "Request created successfully", request: newRequest });
        }
        catch (error) {
            console.error("Error creating request:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getPendingRequests: async (req, res) => {
        try {
            const requestRepository = getRepository(Request);
            const pendingRequests = await requestRepository.find({ 
                where: { status: "Pending" },
                relations: ["user", "software"] // Assuming you want to fetch user and software details 
            });
            if (pendingRequests.length === 0) {
                return res.status(404).json({ message: "No pending requests found" });
            }
            res.status(200).json(pendingRequests);
        }
        catch (error) {
            console.error("Error fetching pending requests:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    updateRequestStatus: async (req, res) => {
        try {
            const requestRepository = getRepository(Request);
            const { id } = req.params;
            const { status } = req.body;

            const request = await requestRepository.findOne({ 
                where: { id },
                relations: ["user", "software"] // Assuming you want to fetch user and software details
            });
            if (!request) {
                return res.status(404).json({ message: "Request not found" });
            }

            if (status !== "Approved" && status !== "Rejected") {
                return res.status(400).json({ message: "Invalid status" });
            }
            request.status = status;

            await requestRepository.save(request);
            res.status(200).json({ message: "Request status updated successfully", request });
        }
        catch (error) {
            console.error("Error updating request status:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getUserRequests: async (req, res) => {
        try {
            const requestRepository = getRepository(Request);
            const userId = req.userData.userId

            const userRequests = await requestRepository.find({ 
                where: { user: { id: userId } },
                relations: ["software"] // Assuming you want to fetch software details
            });

            if (userRequests.length === 0) {
                return res.status(404).json({ message: "No requests found for this user" });
            }
            res.status(200).json(userRequests);
        }
        catch (error) {
            console.error("Error fetching user requests:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};