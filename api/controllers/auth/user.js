import User from '../../models/user.js'

export const getAllUser = async (req, res) => {

    try {

        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const getUser = async (req, res) => {

    const {id} = req.params

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {

        const user = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
