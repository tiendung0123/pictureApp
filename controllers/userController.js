import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';

let model = initModels(sequelize)

const getUser = async (req, res) => {
  try {
    const user = await model.nguoi_dung.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user info' });
  }
};

const getSavedPhotos = async (req, res) => {
  try {
    const savedPhotos = await model.luu_anh.findAll({ where: { id_nguoi_dung: req.user.id }, include: model.hinh_anh });
    res.json(savedPhotos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching saved photos' });
  }
};

const getCreatedPhotos = async (req, res) => {
  try {
    const createdPhotos = await model.hinh_anh.findAll({ where: { id_nguoi_dung: req.user.id } });
    res.json(createdPhotos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching created photos' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updatedUser = await model.nguoi_dung.update({ username, password }, { where: { id: req.user.id } });
    res.json({ message: 'User info updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating user info' });
  }
};

export { getUser, getSavedPhotos, getCreatedPhotos, updateUser };
