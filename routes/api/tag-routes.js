const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// (?) this is for the full Product Tag - NOT the individual tag or product

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagAll = await Tag.findAll({
      include: [ // finds all products under each tag
        {
          model: Product,
          through: ProductTag,
        },
      ]
    });
    res.status(200).json(tagAll);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagOne = await Tag.findByPk(req.params.id, {
      include: [ // finds all products under one tag
        {
          model: Product,
          through: ProductTag, // goes "through" ProductTag model to see which Products are under that Tag
        },
      ]
    });
    // if tag does not exist, send error
    if (!tagOne) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(tagOne);
  } catch(err) {tagOne
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* 
  {
    "tag_name": "flamable",
  }
  */
  try {
    const tagNew = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // if tag does not exist, send error
    if (!tagUpdate[0]) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    res.status(200).json(tagUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagDelete = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(tagDelete);
});

module.exports = router;
