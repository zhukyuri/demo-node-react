import ApiErrors from '../exceptions/api-errors';
import TokenService from '../service/token-redis-service';

export default function(req, res, next) {
  try {
    const headerAuthorization = req.headers.authorization;
    if (!headerAuthorization) return next(ApiErrors.UnauthorizedError());

    const accessToken = headerAuthorization.split(' ')[1];
    if (!accessToken) return next(ApiErrors.UnauthorizedError());

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) return next(ApiErrors.UnauthorizedError());

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiErrors.UnauthorizedError());
  }
}
