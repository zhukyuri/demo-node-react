import ApiErrors from '../exceptions/api-errors';

export default function (err, req, res, next) {

  if (err instanceof ApiErrors) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors
    })
  }
  return res.status(500).json({ message: '>>> Server error' })
}
