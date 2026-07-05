import { Request, Response } from "express";

class AdminController {
  dashboard(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  }
}

export default new AdminController();