// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';

export default async (req, res) => {
    let dirname = process.env.BLOG_DATA_FOLDER,
        filename = `${req.body.slug}.json`;

    if (req.method === 'POST') {
        fs.readFile(`${dirname}/${filename}`, 'utf-8', (err, content) => {
            if (err) {
                res.status(404).json({ error: "No Such blog found!" });
                return;
            }
            let data = JSON.parse(content);
            res.status(200).json(data);
        });
    } else {
        res.status(405).send("Method Not Allowed!");
    }
};
