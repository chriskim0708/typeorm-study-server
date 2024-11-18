import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      where: {
        // 아닌 경우 가져오기
        // id: Not(1),
        // 적은 경우 가져오기 (미만)
        // id: LessThan(30),
        // 작거나 같은 경우 (이하)
        // id: LessThanOrEqual(30),
        // 큰 경우 가져오기 (초과)
        // id: MoreThan(30),
        // 크거나 같은 경우 (이상)
        // id: MoreThanOrEqual(30),
        // 같은 경우
        // id: Equal(30),
        // 유사값
        // email: Like('%0%'),
        // 대문자, 소문자 구분 안하는 유사값
        // email: ILike('%GOOGLE%'),
        // 사이값
        // id: Between(10, 20),
        // 해당되는 여러개의 값
        // id: In([1, 3, 5, 7, 9]),
        // null인 경우
        // id: IsNull(),
      },
      // 어떤 프로퍼티를 선택할지 지정할 수 있다.
      // 기본은 모든 프로퍼티를 가져온다.
      // 만약에 select를 사용하면 지정한 프로퍼티만 가져온다.
      select: {
        // id: true,
        // createdAt: true,
        // updatedAt: true,
        // version: true,
        // profile: {
        //   id: true,
        // },
      },
      // 필터링할 조건을 입력하게 된다.
      // and 조건이 된다.
      // where: {
      //   version: 1,
      //   id: 3,
      // },
      // or 조건이 된다. list 방식 사용
      // where: [{ id: 3 }, { version: 1 }, { profile: { id: 3 } }],
      // 관계를 가져오는 법
      // 가져온 이후에는 select, where에서 사용할 수 있다.
      // relations: {
      //   profile: true,
      // },
      // 오름차 내림차
      // ASC: 오름차순
      // DESC: 내림차순
      order: {
        id: 'ASC',
      },
      // 처음 몇개를 제외할지
      // skip: 0,
      // 몇개를 가져올지
      // take: 1,
    });
  }

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }

  @Post('sample')
  async postSample() {
    // 모델에 해당되는 객체 생성 - 데이터베이스에 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // });

    // 데이터베이스에 저장
    // const user2 = this.userRepository.save({
    //   email: 'test@codefactory.ai',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값을 대체함
    // 저장하지는 않음
    // const user3 = this.userRepository.preload({
    //   id: 101,
    //   email: 'codefactory@codefactory.ai',
    // });

    // 삭제하기
    // await this.userRepository.delete(101);

    // 증가 시키기
    // await this.userRepository.increment({ id: 3 }, 'count', 100);

    // 감소 시키기
    // await this.userRepository.decrement({ id: 1 }, 'count', 1);

    // 갯수 카운팅하기
    // const count = this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // 갯수 더하기
    // const sum = await this.userRepository.sum('count', {
    //   id: LessThan(4),
    // });

    // 평균 구하기
    // const avg = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // 최소값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // 최소값
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });

    // const users = await this.userRepository.find({});

    // const userOne = await this.userRepository.findOne({ where: { id: 1 } });

    // take에서 사용한 개수만큼 가져온다. 그리고 마지막에 전체 갯수를 가져온다.
    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });

    return usersAndCount;
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = this.userRepository.create({
      id: +id,
      email: user.email + '0',
    });

    return this.userRepository.save(updatedUser);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'last1224@gmail.com',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });

    // await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'postuser@codefacgtory.ai',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({ title: 'nestjs lecture' });

    const post2 = await this.postRepository.save({
      title: 'programming lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      posts: [post1],
    });

    await this.postRepository.save({
      title: 'nextjs lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
