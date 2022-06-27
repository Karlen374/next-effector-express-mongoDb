import { v4 as uuidv4 } from 'uuid';
import config from '../config.js'
import User from '../models/user.js'
import fs from 'fs';
import Car from '../models/Car.js';

class StaticController {
  async uploadAvatar(req, res) {
    try {
        const file = req.files.file
        const user = await User.findById(req.user.id)
        const avatarName = uuidv4() + ".jpg"
        file.mv(config.staticPath + "\\" + avatarName)
        user.avatar = avatarName
        await user.save()
        return res.json(user)
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'ошибка загрузки аватара'})
    }
  }
  async deleteAvatar(req, res) {
    try {
        const user = await User.findById(req.user.id)
        fs.unlinkSync(config.staticPath + "\\" + user.avatar)
        user.avatar = null
        await user.save()
        return res.json(user)
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: 'ошибка удаления аватара'})
    }
  }
 
}

export default new StaticController();