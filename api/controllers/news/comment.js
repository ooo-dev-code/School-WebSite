import Comment from '../../models/news/comment.js'

export const addComment = async (req, res, next) => {
    const { user, news, content } = req.body;

    try {
        
        if (!user || !news || !content) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const comment = await Comment.create({ user, news, content });
        res.status(201).json(comment);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
    

        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }

        const comment = await Comment.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json(comment);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
