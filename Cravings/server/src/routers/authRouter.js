import express from 'express';

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);

export default router;