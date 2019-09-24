import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    public signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    public signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signin(authCredentialsDto);
    }
}
