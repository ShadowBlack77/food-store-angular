import express, { Router } from 'express';
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.model';

const router = express.Router();

router.get("/seed", asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount>0) {
      res.send("Seed is already done");
      return;
    }

    await FoodModel.create(sample_foods);
    res.send('Seed is Done!');
  }
));

router.get("/", asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const foods = await FoodModel.find().maxTimeMS(40000);
    res.send(foods);
  }
));

router.get("/search/:searchTerm", asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const foods = await FoodModel.find({ name: {$regex: searchRegex} });
    res.send(foods);
  }
)); 

router.get('/tags', asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: '$tags'
      },
      {
        $group: {
          _id: '$tags',
          count: {$sum: 1}
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count'
        }
      }
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments()
    }

    tags.unshift(all);
    res.send(sample_tags);
  }
));

router.get('/tags/:tagName', asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
  }
));

router.get('/:foodId', asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  }
));

export default router;