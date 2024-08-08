import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../user/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): void {
    done(null, user.id);
  }

  async deserializeUser(username: string, done: (err: Error, user: any) => void): Promise<void> {
    const user = await this.usersService.findOneByUsername(username); 
    done(null, user);
  }
}
