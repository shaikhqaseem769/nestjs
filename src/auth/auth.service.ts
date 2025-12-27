import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
        private jwcService: JwtService
    ) {}

    async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
        this.usersRepository.createUser(userCredentialsDto)
    }
    
     async signIn(userCredentialsDto: UserCredentialsDto): Promise<{accessToken: string}> {
       
        const {username, password} = userCredentialsDto;
        const user = await this.usersRepository.findOne({username});

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = {username}
            const accessToken = this.jwcService.sign(payload);
            return {accessToken}
        }else{
            throw new UnauthorizedException('Please check your credentials!');
        }
    }
}
