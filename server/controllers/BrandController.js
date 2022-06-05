import Brand from "../models/brands.js";


class BrandController {
  async create (req, res) {
    try {
      const { brand } = req.body
      const Brands = await Brand.find()
      let check=true;
      for (let i = 0; i<Brands.length; i++){
        if (Brands[i].brand.toUpperCase() === brand.toUpperCase()) check = false 
      }
      if (check) await Brand.create({ brand })
      res.status(200).json(brand)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getBrandsByInputText (req,res) {
    try{
      const { text } = req.body
      const Brands = await Brand.find()
      const FilteredBrands = Brands.filter((item)=> {  
        return item.brand.toUpperCase().indexOf(text.toUpperCase()) > -1
      })
      res.status(200).json(FilteredBrands)
    } catch(e) {
      res.status(500).json(e)
    }

  }
 
}

export default new BrandController();