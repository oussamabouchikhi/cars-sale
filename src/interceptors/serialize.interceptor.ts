import { 
  CallHandler, 
  ExecutionContext, 
  NestInterceptor, 
  UseInterceptors
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassContructor {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data:any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    ) 
  }
}