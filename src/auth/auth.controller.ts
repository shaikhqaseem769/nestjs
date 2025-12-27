import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('/signup')
    signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<void> {
        return this.authService.signUp(userCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() userCredentialsDto: UserCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(userCredentialsDto);
    }

    @Post('/me')
    @UseGuards(AuthGuard('jwt'))
    getMe(@Req() req){
        console.log('get me', req.user);

    }
}
