import User from "../models/user.model.js";
import Medicine from "../models/medicine.model.js";
import generator from "../utils/generator.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, '../utils/template.hbs');

const generateDoc = async (req, res) => {
    const { username } = req.body;

    const data = {};
    let date = new Date();

    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = String(date.getFullYear()).slice(-2);
    let formattedDate = `${day}-${month}-${year}`;

    try {

        const userData = await User.findOne({ username });
        const meds = await Medicine.findOne({ username });

        data.name = userData.name;
        data.address = userData.address;
        data.sex = userData.sex;
        data.marital_status = userData.marital_status;
        data.bloodType = userData.bloodType;
        data.dosages = meds.dosages.map(dosage => ({
            medName: dosage.medicineName,
            medDose: dosage.dose,
            time: dosage.time
        }));
        data.date = formattedDate;

        const pdfBuffer = await generator(data, templatePath);
        const pdf = Buffer.from(pdfBuffer);

        res.json({ msg: data, buffer: pdf });

    } catch (error) {
        console.log(error);
        res.send({ message: 'Server error', error });
    }
};

export default generateDoc;