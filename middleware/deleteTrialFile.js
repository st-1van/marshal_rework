import { unlink } from 'fs';


export const deleteTrialFile = (req, res) => {
  const path = req.body.imgUrl;
  unlink(path, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete the file' });
    }
    console.log('file was deleted');
    return res.status(200).json({ message: 'File successfully deleted' });
  });
};
