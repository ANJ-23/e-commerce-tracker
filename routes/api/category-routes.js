const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryAll = await Category.findAll({
      include: [
        {
          model: Product
        },
      ]
    });
    res.status(200).json(categoryAll);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryOne = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        },
      ]
    });
    // if category does not exist, send error
    if (!categoryOne) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(categoryOne);
  } catch(err) {tagOne
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /* 
  {
    "category_name": "Gloves"
  }
  */
  try {
    const categoryNew = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // if category does not exist, send error
    if (!categoryUpdate[0]) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryDelete = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(categoryDelete);
});

module.exports = router;
