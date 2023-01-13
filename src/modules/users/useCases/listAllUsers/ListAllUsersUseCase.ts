import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);
    const userIsAdmin = user.admin;

    if(userIsAdmin) {
      return this.usersRepository.list();
    }

    throw new Error("You do not have permission");
    
  }
}

export { ListAllUsersUseCase };
