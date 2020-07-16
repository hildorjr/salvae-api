import Note from  './../models/note.model';

class NoteController {

  constructor() { }

  async getAll(req, res) {
    let notes = await Note.find({ userId: req.userId });
    return res.status(200).send(notes);
  }

  async create(req, res) {
    req.body.userId = req.userId;
    let note = await Note.create(req.body);
    return res.status(200).send(note);
  }

  async update(req, res) {
    let note = await Note.findOneAndUpdate({ userId: req.userId, _id: req.params.id }, {
      title: req.body.title,
      content: req.body.content
    }, { new: true });
    if (!note)
      res.status(404).send({ error: 'Note not found' });

    return res.status(200).send(note);
  }

  async delete(req, res) {
    let note = await Note.findOne({ userId: req.userId, _id: req.params.id });
    if (!note)
      res.status(404).send({ error: 'Note not found' });

    note = await note.remove();
    return res.status(200).send(note);
  }

}

export default new NoteController();
