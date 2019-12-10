const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/**
 * @author Mateus Queiroz
 * middleware responsible for validating the entered token.
 */

module.exports = async (req, res, next) => {
  /**
   * Checks whether the authorization
   * header has been entered
   */
  if (!req.headers.authorization) {
    return res.status(403).json({
      payload: {},
      errors: [{ message: 'Token not provider' }],
    });
  }
  // Data Transformation for get token
  const token = req.headers.authorization.split(' ')[1];
  try {
    /**
     * Here we decode the token and put
     * the user ID inside the token into
     * the request object.
     */
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    console.error(error);
    // The token entered is invalid and has not been decoded
    return res.status(403).json({
      payload: {},
      errors: [{ message: 'Token is invalid' }],
    });
  }
};
