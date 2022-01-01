import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null
    }
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      return new NotFoundException(`No user with id ${id} found`);
    }
    this.repo.remove(user);
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      return new NotFoundException(`No user with id ${id} found`);
    }
    Object.assign(user, attributes);
    return this.repo.save(user);
  }
}
