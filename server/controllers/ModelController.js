import Model from "../models/models.js";


class ModelController {
  async create (req, res) {
    try {
      const { model } = req.body
      const Models = await Model.find()
      let check=true;
      for (let i = 0; i<Models.length; i++){
        if (Models[i].model.toUpperCase() === model.toUpperCase()) check = false 
      }
      if (check) await Model.create({ model })
      res.status(200).json(model)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getModelsByInputText (req,res) {
    try{
      const { text } = req.body
      const Models = await Model.find()
      const FilteredModels = Models.filter((item)=> {  
        return item.model.toUpperCase().indexOf(text.toUpperCase()) > -1
      })
      res.status(200).json(FilteredModels)
    } catch(e) {
      res.status(500).json(e)
    }
  }
}

export default new ModelController();