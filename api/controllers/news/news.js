import News from '../../models/news/news.js';

export const addNews = async (req, res) => {
    const { user, content, image } = req.body;

    try {
        
        if (!user || !content) {
            return res.status(400).json({ error: "User and content are required" });
        }

        const news = await News.create({ user, content, image });
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateNews = async (req, res) => {
    const { id } = req.params;
    const { content, image } = req.body;

    try {
        
        const news = await News.findByIdAndUpdate(id, { content, image }, { new: true });
        if (!news) return res.status(404).json({ error: "News not found" });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        
        const news = await News.findByIdAndDelete(id);
        if (!news) return res.status(404).json({ error: "News not found" });
        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
