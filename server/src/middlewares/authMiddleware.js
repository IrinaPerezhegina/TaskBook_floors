import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Проверка токена
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Нет авторизации" });
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return res.status(401).json({ error: "Нет токена" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.userId = payload.userId;

    next();
  } catch (e) {
    return res.status(401).json({ error: "Неверный токен" });
  }
}
