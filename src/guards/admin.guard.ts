import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log("request",request);
    console.log("request.currentUser: ", request.currentUser);
    
    if(!request.currentUser) {
      return false;
    }
    console.log("request.currentUser: ", request.currentUser);
    console.log("request.currentUser.admin", request.currentUser.admin);
    console.log("Boolean(request.currentUser.admin)", Boolean(request.currentUser.admin));
    
    return request.currentUser.admin;
  }
}