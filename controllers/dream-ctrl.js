const Dream = require('../models/dream-model');

createDream = (req,res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a dream',
    })
  }

  const dream = new Dream(body)

  if (!dream){
    return res.status(400).json({ success: false, error: err})
  }

  dream
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: dream._id,
        message: 'Dream created!',
      })
    })
    .catch(error => {
      return rest.status(400).json({
        error,
        message: 'Dream not created!',
      })
    })
}
updateDream = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Dream.findOne({ _id: req.params.id }, (err, dream) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Dream not found!',
            })
        }
        dream.name = body.name
        dream.type = body.type
        dream.pic = body.pic
        dream.location = body.location
        dream.achieved = body.achieved
        dream
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: dream._id,
                    message: 'Dream updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Dream not updated!',
                })
            })
    })
}

deleteDream = async (req, res) => {
    await Dream.findOneAndDelete({ _id: req.params.id }, (err, dream) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!dream) {
            return res
                .status(404)
                .json({ success: false, error: 'Dream not found'})
        }

        return res.status(200).json({ success: true, data: dream })
    }).catch(err => console.log(err))
}

getDreamById = async (req, res) => {
    await Dream.findOne({ _id: req.params.id }, (err, dream) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!dream) {
            return res
                .status(404)
                .json({ success: false, error: 'Dream not found' })
        }
        return res.status(200).json({ success: true, data: dream })
    }).catch(err => console.log(err))
}

getDreams = async (req, res) => {
    await Dream.find({}, (err, dreams) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!dreams.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Dreams not found' })
        }
        return res.status(200).json({ success: true, data: dreams })
    }).catch(err => console.log(err))
}

module.exports = {
    createDream,
    updateDream,
    deleteDream,
    getDreams,
    getDreamById,
}
