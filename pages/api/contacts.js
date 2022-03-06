import fs from 'fs';

export default async (req, res) => {

    const file_extension = '.json';
    const dirname = process.env.CONTACT_DATA_FOLDER;

    if (req.method === 'POST') {
        const {
            // name,
            phone,
            // desc,
            // email
        } = req.body;

        const files = await fs.promises.readdir(dirname);
        await fs.promises.writeFile(`${dirname}/${files.length + 1}_${phone}${file_extension}`, JSON.stringify(req.body));
        res.status(200).json({ details: 'message submited' });

    } else if (req.method === 'GET') {
        const contacts = [];
        const filenames = await fs.promises.readdir(dirname);

        for (const filename of filenames) {
            if (filename.includes(file_extension) && filename.includes('_')) {
                const content = await fs.promises.readFile(`${dirname}/${filename}`, 'utf-8');
                const data = JSON.parse(content);
                contacts.push(
                    { id: Number(filename.replace(file_extension, '').split('_')[0]), ...data }
                );
            }
        }

        res.status(200).json(contacts);

    } else {
        res.status(405).json({ details: "Method not allowed!" });
    }

};
