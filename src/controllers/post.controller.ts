import { Request, Response } from "express";

export async function getPosts(req: Request, res: Response){
//   try {
  //     const items = await database.ref('Post').once('value');
  //     let posts = [];

  //     items.forEach(item => {
  //       if(item.val().comments !== undefined && item.val().comments !== null){
  //         let comments = Object.keys(item.val().comments);
  //         comments = comments.map(comment => { return { id: comment, ...item.val().comments[comment]} })
  
  //         posts.push({
  //           ...item.val(),
  //           comments,
  //           id: item.ref_.path.pieces_[1]
  //         });
  //       }else{
  //         posts.push({
  //           ...item.val(),
  //           id: item.ref_.path.pieces_[1]
  //         });
  //       }
  //     })
  //     return res.json(posts);
  //   } catch (e) {
  //     return res.status(400).json({ error: e });
  //   }
}

export async function createPost(req: Request, res: Response){
//   let src;

//   if (req.file !== undefined) {
//     const { filename: image } = req.file;
//     src = image;
//   }

//   var newPost;
//   const { owner, content } = JSON.parse(req.body.content);

//   try {
//     var newPost = await database.ref('Post').push({
//       owner,
//       content,
//       likes: {},
//       coments: {},
//       image: req.file !== undefined ? `http://localhost:5000/files/${src}` : '',
//       timestamp: new Date().getTime()
//     }, function (err) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json({ newPost });
//       }
//     })
//   } catch (err) {
//     return res.json({ err })
//   }
}

export async function deletePost(req: Request, res: Response){
//   const {id} = req.params;

  //   await database.ref(`Post/${id}`).remove();

  //   return res.json({status: 'deletado com sucesso'});
}
