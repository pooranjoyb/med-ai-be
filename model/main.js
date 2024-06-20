
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs=require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyD6CQTWA0ZmP5jn7WaI1mN6s5qhkdEpSAg");



const funcall=async()=>{
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });


const image = {
  inlineData: {
    data: Buffer.from(fs.readFileSync("12th marksheet.jpeg")).toString("base64"),
    mimeType: "image/jpeg",
  },
};

const result = await model.generateContent([image]);
console.log(result.response.text());
}
funcall();