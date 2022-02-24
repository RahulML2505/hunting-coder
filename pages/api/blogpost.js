// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs/promises');

export default async (req, res) => {
    let dirname = 'BlogData',
        filename = `${req.body.slug}.json`;

    let content = await fs.readFile(`${dirname}/${filename}`, 'utf-8');
    let data = JSON.parse(content);

    res.status(200).json(data);
};
