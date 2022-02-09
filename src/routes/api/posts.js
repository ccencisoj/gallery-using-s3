const router = require("express").Router();
const auth = require("../auth");
const types = require("../types");
const upload = require("../upload");
const validate = require("../validate");
const Image = require("../../models/Image");
const Profile = require("../../models/Profile");
const AccessError = require("../../errors/AccessError");
const NoFoundError = require("../../errors/NoFoundError");

router.get("/",   
  auth.required,
  validate.query({
    limit: types.limit().default(20),
    skip: types.skip().default(0)
  }), async (req, res)=> {

  const images = await Image.find({
    publisher: req.payload.user.id
  })
  .sort({date: -1})
  .skip(req.query.skip)
  .limit(req.query.limit)
  .populate("publisher");

  const countImages = await Image.find({
    publisher: req.payload.user.id
  }).count();

  await Profile.updateOne({
    user: req.payload.user.id
  }, {nposts: countImages});

  return res.json({ images });
});

router.get("/publics", 
  auth.optional,
  validate.query({
    limit: types.limit().default(20),
    skip: types.skip().default(0)
  }), async (req, res)=> {

  const images = await Image.find({
    public: true
  })
  .skip(req.query.skip)
  .limit(req.query.limit)
  .populate({
    path: "publisher", 
    populate: {path: "profile"}
  });
  
  return res.json({ images });
})

router.get("/:image", 
  auth.optional, 
  async (req, res)=> {

  if(req.query.attachment)
    res.setHeader("Content-Disposition", "attachment");

  const image = await Image.findOne({
    filename: req.params.image
  });

  if(!(image))
    throw new NoFoundError(`No se ha encontrado 
      la imagen ${req.params.image}`);

  if(!(image.public) && 
    !(image.publisher.equals(req.payload.user?.id))) 
    throw new AccessError("No tienes acceso a esta imagen");
  
  return res.sendFile(image.path);
});

router.post("/add", 
  auth.required,
  upload.single("image"), 
  async (req, res)=> {

  const image = await Image.create({
    key: req.file.key,
    publisher: req.payload.user.id
  });

  return res.json({ image });
});

router.put("/:image", 
  auth.required, 
  validate.body({
    public: types.boolean()
  }), async (req, res)=> {

  const result = await Image.updateOne({
    filename: req.params.filename
  });

  return res.json({ result });
});

module.exports = router;