import jwt from "jsonwebtoken"
import db from '../orm/db'

class TokenService {

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

    return { accessToken, refreshToken }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token.process.env.JWT_REFRESH_SECRET)
    } catch (e) {
      return null;
    }
  }


  async saveToken(userId, refreshToken) {
    const tokenData = await db.tokens.findFirst({ where: { user: userId } })
    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return await db.tokens.update({ where: { user: userId }, data: { ...tokenData } })
    }

    return await db.tokens.create({ data: { user: userId, refreshToken } });
  }

  async removeToken(refreshToken) {
    return await db.tokens.deleteMany({ where: { refreshToken } })
  }

  async findToken(refreshToken) {
    return await db.tokens.findFirst({ where: { refreshToken } })
  }
}

export default new TokenService();
