import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      const users = this.listAllUsersUseCase.execute({ user_id: user_id.toString() });
  
      return response.json(users);

    } catch (error) {
      return response.status(400).json({ error: "Usuário sem permissão ou Usuário não encontrado" })
    }
  }
}

export { ListAllUsersController };
