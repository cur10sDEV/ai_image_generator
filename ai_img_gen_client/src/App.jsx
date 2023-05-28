import { useState } from "react";

const App = () => {
  const [userInput, setUserInput] = useState({
    prompt: "",
    size: "small",
    noOfImages: 1,
  });
  const [imgData, setImgData] = useState({
    success: true,
    data: [],
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const requestImage = async (e) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 10000);
    e.preventDefault();
    const response = await fetch(
      "http://localhost:3000/v1/openai/generateImage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      }
    );
    const data = await response.json();
    console.log(data);
    setImgData(data);
    setIsLoading(false);
  };
  return (
    <div className="container m-0 w-full">
      <nav className="bg-slate-900 flex align-middle justify-between p-4">
        <h2 className="font-bold text-2xl text-white">
          OpenAI Image Generator
        </h2>
        <a
          href="https://platform.openai.com/docs/guides/images/introduction"
          target="_blank"
          rel="noreferrer"
        >
          <p className="font-normal text-xl text-white">OpenAI Docs</p>
        </a>
      </nav>
      <main className="bg-yellow-500 p-12 flex flex-col items-center">
        <section className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-8">Describe An Image</h1>
          <input
            className="w-full mb-5 text-lg rounded-s rounded-e p-2"
            type="text"
            name="prompt"
            id="prompt"
            placeholder="Enter an image description"
            value={userInput.prompt}
            onChange={handleUserInput}
          />
          <select
            name="size"
            id="size"
            className="w-full mb-5 text-lg rounded-s rounded-e p-2 bg-white"
            value={userInput.size}
            onChange={handleUserInput}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <select
            name="noOfImages"
            id="noOfImages"
            className="w-full mb-5 text-lg rounded-s rounded-e p-2 bg-white"
            value={userInput.noOfImages}
            onChange={handleUserInput}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button
            className="bg-slate-900 w-1/2 py-2 px-1 text-white font-bold text-xl rounded-s rounded-e mb-5"
            onClick={requestImage}
          >
            Generate
          </button>
        </section>
        <section>
          <div className="img-container">
            {!imgData.success && (
              <h2 className="msg text-red-600 font-bold">*{imgData.error}*</h2>
            )}
            {imgData.data.map((img) => (
              <img key={img.url} src={img.url} alt={userInput.prompt} />
            ))}
            {isLoading && <div className="loading">Loading&#8230;</div>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
