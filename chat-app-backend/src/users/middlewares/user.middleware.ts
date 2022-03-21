// import { NestMiddleware, Request as _Request, UseGuards } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { JwtAuthGuard } from '../auth/jwt-auth-guard';
// import { UsersController } from '../users.controller';

// @UseGuards(JwtAuthGuard)
// export class UserMiddleware implements NestMiddleware {
//   constructor() {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const user = await this.usersController.getProfile();

//     if (user) {
//       req.user = user;
//     }

//     next();
//   }
// }
