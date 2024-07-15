import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';

let model = initModels(sequelize)

const getPhotos = async (req, res) => {
  try {
    const photos = await model.hinh_anh.findAll();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching photos' });
  }
};

const searchPhotos = async (req, res) => {
  try {
    const { name } = req.query;
    const photos = await model.hinh_anh.findAll({ where: { ten: { [Sequelize.Op.like]: `%${name}%` } } });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching photos' });
  }
};

const getPhotoDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await model.hinh_anh.findByPk(id, { include: model.nguoi_dung });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching photo details' });
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await model.binh_luan.findAll({ where: { id_hinh_anh: id } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching comments' });
  }
};

const checkSaved = async (req, res) => {
  try {
    const { id } = req.params;
    const saved = await model.luu_anh.findOne({ where: { id_hinh_anh: id, id_nguoi_dung: req.user.id } });
    res.json({ saved: !!saved });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking if photo is saved' });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { noi_dung } = req.body;
    const newComment = await model.binh_luan.create({ id_hinh_anh: id, noi_dung });
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding comment' });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    await model.hinh_anh.destroy({ where: { id } });
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting photo' });
  }
};

const addPhoto = async (req, res) => {
  try {
    const { ten } = req.body;
    const newPhoto = await model.hinh_anh.create({ ten, id_nguoi_dung: req.user.id });
    res.status(201).json({ message: 'Photo added successfully', photo: newPhoto });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding photo' });
  }
};

export { getPhotos, searchPhotos, getPhotoDetails, getComments, checkSaved, addComment, deletePhoto, addPhoto };
