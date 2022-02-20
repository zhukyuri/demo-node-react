import ApiErrors from '../exceptions/api-errors';

export default function (err, req, res, next) {
  console.log('Error:', err);
  if (err instanceof ApiErrors) res.status(err.status).json({
    message: err.message,
    errors: err.message
  })
  return res.status(500).json({message: '>>> Server error'})

}
