// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs/promises');

export default async (req, res) => {
  let
    dirname = process.env.BLOG_DATA_FOLDER,
    files_str = await fs.readdir(dirname),
    filenames = Array(files_str)[0],
    file_extension = '.json',
    blogs = [];

  /***
   * ```|_ Do not use forEach with async-await _|```
   * Fortunately if your language has async-await then it will also have the `for...of` construction, so you can use that */
  for (const filename of filenames) {
    if (filename.includes(file_extension)) {
      let content = await fs.readFile(`${dirname}/${filename}`, 'utf-8');
      let data = JSON.parse(content);
      blogs.push(
        {
          slug: filename.replace(file_extension, ''),
          ...data
        }
      );
    }
  }

  res.status(200).json(blogs);
};
