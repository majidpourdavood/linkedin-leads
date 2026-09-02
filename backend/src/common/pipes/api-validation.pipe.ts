import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';

type ClassConstructor = new (...args: unknown[]) => object;

@Injectable()
export class ApiValidationPipe implements PipeTransform {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype as ClassConstructor, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
    });

    if (errors.length > 0) {
      const messages = errors
        .map((err: ValidationError) => {
          if (err.constraints) {
            return Object.values(err.constraints).join(', ');
          }
          const nested = err.children?.map((child: ValidationError) => {
            if (child.constraints) {
              return Object.values(child.constraints).join(', ');
            }
            return `${child.property} is invalid`;
          });
          return nested?.join('; ') || `${err.property} is invalid`;
        })
        .join('; ');

      throw new BadRequestException(messages);
    }

    return object;
  }

  private toValidate(metatype: unknown): boolean {
    const types: ClassConstructor[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ] as ClassConstructor[];
    return !types.includes(metatype as ClassConstructor);
  }
}
