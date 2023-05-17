const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: Product,
  })
    .then((Category) => {
      res.json(Category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error loading", err });
    });
});

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id, {
    include: Product,
  })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ msg: "No categories with that id" });
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error loading", err });
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "err err err" }, err);
    });
});

router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((editCat) => {
      res.json(editCat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error loading", err });
    });
});



router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delCat) => {
      if (!delCat) {
        return res.status(400).json({ msg: "no category with that id" });
      }
      console.log(delCat);
      res.json(delCat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: " error loadinggg", err });
    });
});
module.exports = router;
