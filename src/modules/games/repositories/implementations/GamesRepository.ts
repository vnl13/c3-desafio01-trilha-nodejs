import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const game =  await this.repository
      .createQueryBuilder("games")
      .where("title ilike :param", {param: `%${param}%`})
      .getMany();
      // Complete usando query builder
      return game;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(title) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users =  await this.repository
      .createQueryBuilder("game")
      .where('id = :id', {id})
      .relation(Game, 'users')
      .of(id)
      .loadMany()
      // Complete usando query builder
      return users
  }
}
