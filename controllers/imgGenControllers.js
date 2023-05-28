const createImage = require("../utils/openai");

const generateImage = async (req, res) => {
  try {
    const { prompt, size } = req.body;
    console.log(req.body);
    const imgSize =
      size === "small"
        ? "256x256"
        : size === "medium"
        ? "512x512"
        : "1024x1024";
    const response = await createImage(prompt, imgSize);
    const imgUrl = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imgUrl,
      error: "",
    });
  } catch (err) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      data: "",
      error: "The image could not be generated",
    });
  }
};

module.exports = generateImage;
