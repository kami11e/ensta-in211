import express from 'express';
import moment from 'moment';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import { generateJWT, verifyJWT } from '../helpers/utils.js';
import MyList from '../entities/usermylist.js';
import { genSaltSync, hashSync } from 'bcrypt';

const router = express.Router();
const saltRounds = 10;

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Retrieves a list of users.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The list of users has been successfully retrieved.
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the user.
 *                   name:
 *                     type: string
 *                     description: The name of the user.
 *                   email:
 *                     type: string
 *                     description: The email of the user.
 *                   password:
 *                     type: string
 *                     description: The password of the user.
 *                   createdAt:
 *                     type: string
 *                     description: The date when the user was created.
 *                   updatedAt:
 *                     type: string
 *                     description: The date when the user was last updated.
 *       500:
 *         description: An error occurred when retrieving the list of users.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

/**
 * @swagger
 * /users/userInfo:
 *   get:
 *     summary: Retrieves the information of the authenticated user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         description: The JWT token used for authentication.
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The information of the authenticated user has been successfully retrieved.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The success message.
 *             result:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the user.
 *                 name:
 *                   type: string
 *                   description: The name of the user.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *                 password:
 *                   type: string
 *                   description: The password of the user.
 *                 createdAt:
 *                   type: string
 *                   description: The date when the user was created.
 *                 updatedAt:
 *                   type: string
 *                   description: The date when the user was last updated.
 *       400:
 *         description: The token is not valid.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       500:
 *         description: An error occurred when retrieving the user information.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
router.get('/userInfo', function (req, res) {
  const content = verifyJWT(req.headers.token);
  if (content === null) {
    res.status(400).json({
      status_message: 'token not valid',
    });

    return;
  }
  appDataSource
    .getRepository(User)
    .find({ where: { id: content.uid } })
    .then((result) => {
      res.status(200).json({
        status_message: 'Success',
        result: result[0],
      });
    })
    .catch((error) => console.error(error));
});

/**
 * @swagger
 * /users/new:
 *   post:
 *     summary: Creates a new user.
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The email of the user.
 *             firstname:
 *               type: string
 *               description: The first name of the user.
 *             lastname:
 *               type: string
 *               description: The last name of the user.
 *             name:
 *               type: string
 *               description: The name of the user.
 *             password:
 *               type: string
 *               description: The password of the user.
 *         required:
 *           - email
 *           - firstname
 *           - lastname
 *           - name
 *           - password
 *     responses:
 *       201:
 *         description: The newly created user.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The ID of the user.
 *             email:
 *               type: string
 *               description: The email of the user.
 *             firstname:
 *               type: string
 *               description: The first name of the user.
 *             lastname:
 *               type: string
 *               description: The last name of the user.
 *             name:
 *               type: string
 *               description: The name of the user.
 *             salt:
 *               type: string
 *               description: The salt used for password hashing.
 *             password:
 *               type: string
 *               description: The hashed password of the user.
 *       400:
 *         description: User with the given email already exists.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       500:
 *         description: An error occurred when creating the user.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const salt = genSaltSync(saltRounds);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    name: req.body.name,
    salt: salt,
    password: hashSync(req.body.password, salt),
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          status_message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res
          .status(500)
          .json({ status_message: 'Error while creating the user' });
      }
    });
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in the user with the given email and password.
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: login
 *         description: The login credentials of the user.
 *         schema:
 *           type: object
 *           properties:
 *             usermail:
 *               type: string
 *               description: The email of the user.
 *             password:
 *               type: string
 *               description: The password of the user.
 *         required:
 *           - usermail
 *           - password
 *     responses:
 *       202:
 *         description: The authentication was successful and the access and refresh tokens were generated.
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: The JWT access token used for authentication.
 *             refresh:
 *               type: string
 *               description: The JWT refresh token used for authentication.
 *       400:
 *         description: User with the given email does not exist.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       501:
 *         description: Incorrect password.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       500:
 *         description: An error occurred when logging in the user.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
router.post('/login', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({ where: { email: req.body.usermail } })
    .then(function (result) {
      // res.status(201).json(newDocument);
      console.log(result[0]);
      const hash = hashSync(req.body.password, result[0].salt);
      if (result[0].password === hash) {
        // console.log("password verified");
        const data = {
          status_message: 'Authentication sucess.',
          uid: result[0].id,
          firstname: result[0].firstname,
          lastname: result[0].lastname,
          name: result[0].name,
          role: result[0].role,
        };
        const token = generateJWT(data);
        const refreshExpiry = moment()
          .utc()
          .add(3, 'days')
          .endOf('day')
          .format('X');
        const refreshtoken = generateJWT({
          exp: parseInt(refreshExpiry),
          data: data.uid,
        });
        res.status(202).json({
          // user: data,
          token,
          refresh: refreshtoken,
          // status_message: 'login successful',
        });

        // res.status(202).json(generateJWT(data));

        // appDataSource
        //   .createQueryBuilder()
        //   .update(User)
        //   .set({
        //       loginStatus: true
        //   })
        //   .where("email = :email", { email: req.body.usermail })
        //   .execute()
      } else {
        // console.log("not verified");
        res.status(501).json({
          status_message: 'Incorrect Password.',
        });
      }
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          status_message: `User with email  already exists`,
        });
      } else {
        res.status(500).json({ status_message: 'Error while loging in' });
      }
    });
});

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Deletes the user with the specified ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: The user has been successfully deleted.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The success message.
 *       500:
 *         description: An error occurred when deleting the user.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
router.delete('/:userId', function (req, res) {
  const mylistRepository = appDataSource.getRepository(MyList);
  mylistRepository.delete({ user: req.params.userId });
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ status_message: 'User successfully deleted' });
    })
    .catch(function (ex) {
      console.error(ex);
      res.status(500).json({ status_message: 'Error while deleting the user' });
    });
});

export default router;
