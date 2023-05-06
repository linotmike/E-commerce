const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: Product,
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500)({ msg: "error loading", err });
    });
});

router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [Product],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(400).json({ msg: "no tag associated with that id" });
      }
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "err err err err loading", err });
    });
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "err err err loading", err });
    });
});

router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((editTag) => {
      res.json(editTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no error loading", err });
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delTag) => {
      if (!delTag) {
        return res.status(400).json({ msg: "no tag with that id" });
      }
      res.json(delTag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no error loading", err });
    });
});

module.exports = router;
