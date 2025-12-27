import { IsString, Matches,  MaxLength,  MinLength } from "class-validator";

export class UserCredentialsDto {
    
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    username: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Passowrd is weak'})
    password: string;
}