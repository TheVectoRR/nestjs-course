import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    public signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        this.authService.signUp(authCredentialsDto);
    }
}
