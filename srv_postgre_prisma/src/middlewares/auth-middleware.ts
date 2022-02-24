import ApiErrors from '../exceptions/api-errors';
import TokenService from '../service/token-service';

export default function (req, res, next) {
  try {
    const headerAuthorization = req.headers.authorization;
    if (!headerAuthorization) next(ApiErrors.UnauthorizedError());

    const accessToken = headerAuthorization.split(' ')[1]
    if (!accessToken) next(ApiErrors.UnauthorizedError());

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) next(ApiErrors.UnauthorizedError());

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiErrors.UnauthorizedError())
  }
}
