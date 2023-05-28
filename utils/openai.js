const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const createImage = async (propmt, size, noOfImages) => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: propmt,
    n: Number(noOfImages),
    size: size,
  });
  return response;
};

module.exports = createImage;
