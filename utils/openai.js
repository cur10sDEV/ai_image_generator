const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const createImage = async (propmt, size) => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: propmt,
    n: 1,
    size: size,
  });
  return response;
};

module.exports = createImage;
