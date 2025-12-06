import { Router } from "express";
import { getFilterOptions } from "../controllers/filterController.js";
import { getSales } from "../controllers/salesController.js";

const router = Router();

router.get("/", getSales);
router.get("/filter-options", getFilterOptions);

export default router;
