const createImage = require("../utils/openai");

const generateImage = async (req, res) => {
  try {
    const { prompt, size, noOfImages } = req.body;
    if (prompt === "") {
      return res.status(200).json({
        success: false,
        data: [],
        error: "Please provide a valid input",
      });
    }
    const imgSize =
      size === "small"
        ? "256x256"
        : size === "medium"
        ? "512x512"
        : "1024x1024";
    const response = await createImage(prompt, imgSize, noOfImages);
    const data = response.data.data;
    res.status(200).json({
      success: true,
      data: data,
      error: "",
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      data: [],
      error:
        error.response?.status === 429
          ? "Rate limit exceeded, Please try again after some time"
          : "The image could not be generated",
    });
  }
};

module.exports = generateImage;
