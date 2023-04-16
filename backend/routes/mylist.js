import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import MyList from '../entities/usermylist.js';

const router = express.Router();

// router.get('/', function (req, res) {
//   appDataSource
//     .getRepository(MyList)
//     .find({})
//     .then(function (users) {
//       res.json({ users: users });
//     });
// });

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const myListRepository = appDataSource.getRepository(MyList);
  console.log(req);
  const newLsElem = myListRepository.create({
    id: req.body.uid.toString(16)+"-"+req.body.mvid.toString(16),
    user: req.body.uid,
    movie: req.body.mvid,
  });
  // console.log(newLsElem)
  userRepository
    .find({where:{id:req.body.uid}})
    .then(function (result) {
      console.log(result)
      if(result[0].loginStatus===false){
        res.status(503).json({
          message: 'Error: user not connected.'
        });
        console.log("you are not connected")
        return;
      }else{
        console.log("you are connected")
      }
    })
    .catch(function(error){
      console.error(error);
      res.status(504).json({
        message: 'Error: user not exist or has been deleted.'
      });
      return;
    });
  // console.log(newLsElem)

    
  myListRepository
    .insert(newLsElem)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie with id "${newLsElem.mvid}" already added o your list`,
        });
      } else {
        res.status(500).json({ message: 'Error while adding movie to list' });
      }
    });
});

// router.post('/login', function (req, res) {

//   // const email = req.body.usermail;
//   // const password = req.body.password;

//   appDataSource
//     .getRepository(User)
//     .find({where:{email:req.body.usermail}})
//     .then(function (result) {
//       // res.status(201).json(newDocument);
//       console.log(result[0])
//       if(result[0].password === req.body.password){
//         // console.log("password verified");
//         res.status(202).json({
//           message: "Authentication sucess.",
//           uid: result[0].id,
//           firstname: result[0].firstname,
//           lastname:result[0].lastname,
//           name:result[0].name,
//         });
//         appDataSource
//           .createQueryBuilder()
//           .update(User)
//           .set({
//               loginStatus: true
//           })
//           .where("email = :email", { email: req.body.usermail })
//           .execute()
//       }else{
//         // console.log("not verified");
//         res.status(501).json({
//           message: "Incorrect Password."
//         });
//       }
//     })
//     .catch(function (error) {
//       console.error(error);
//       if (error.code === '23505') {
//         res.status(400).json({
//           message: `User with email "${newUser.email}" already exists`,
//         });
//       } else {
//         res.status(500).json({ message: 'Error while creating the user' });
//       }
//     });
// });

// router.delete('/:userId', function (req, res) {
//   appDataSource
//     .getRepository(User)
//     .delete({ id: req.params.userId })
//     .then(function () {
//       res.status(204).json({ message: 'User successfully deleted' });
//     })
//     .catch(function () {
//       res.status(500).json({ message: 'Error while deleting the user' });
//     });
// });

export default router;
