import { Router, Request, Response } from "express";
import status from "http-status";
import { returnNew } from "../../db";
import { validateResource } from "../../routes/middlewares";
import { ExpansesModel } from "./expanses.model";

export const router = Router();

router.get("/", async (_req, res) => {
  const items = await ExpansesModel.find({});
  res.status(status.OK).json(items);
});

// router.get(
//   "/:id",
//   validateResource(singleTodoSchema),
//   async (req: Request<SingleTodoInput["params"]>, res: Response) => {
//     const item = await TodosModel.findById(req.params.id);
//     res.status(status.OK).json(item);
//   }
// );

// router.post(
//   "/",
//   validateResource(createTodoSchema),
//   async (req: Request<{}, {}, CreateTodoInput["body"]>, res: Response) => {
//     // const added = new TodosModel(req.body);
//     // added._id = new Types.ObjectId();
//     // await added.save({ timestamps: true });
//     const { insertedIds } = await TodosModel.insertMany(req.body, {
//       rawResult: true,
//     });
//     const added = await TodosModel.findById(insertedIds[0]);
//     res.status(status.OK).send(added);
//   }
// );

// router.put(
//   "/:id",
//   validateResource(updateTodoSchema),
//   async (
//     req: Request<UpdateTodoInput["params"], {}, UpdateTodoInput["body"]>,
//     res: Response
//   ) => {
//     const updated = await TodosModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       returnNew
//     );
//     if (updated) {
//       res.status(status.OK).send(updated);
//     } else {
//       res.sendStatus(status.NOT_FOUND);
//     }
//   }
// );

// router.delete(
//   "/:id",
//   validateResource(singleTodoSchema),
//   async (req: Request<SingleTodoInput["params"]>, res: Response) => {
//     const deleted = await TodosModel.findByIdAndRemove(req.params.id);
//     res.sendStatus(deleted === null ? status.NOT_FOUND : status.OK);
//   }
// );

export default ["/api/expanses", router] as [string, Router];
