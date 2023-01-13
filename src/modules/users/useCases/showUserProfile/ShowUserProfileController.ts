import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      this.showUserProfileUseCase.execute({ user_id: user_id.toString() });
      
      return response.status(200).send();

    } catch (error) {
      return response.status(404).json({ error });
    }
  }
}

export { ShowUserProfileController };
