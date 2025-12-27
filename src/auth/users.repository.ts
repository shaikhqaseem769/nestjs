import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    
    async createUser(userCredentialsDto: UserCredentialsDto): Promise<void> {
    
        const { username, password} = userCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        const user = this.create({username, password: hashPassword});
       
        try {
            await this.save(user);
       } catch (err) {
            if(err.code === '23505'){
                throw new ConflictException('User alredy exist!')
            }else{
                throw new InternalServerErrorException()
            }
       }
    }

   
}