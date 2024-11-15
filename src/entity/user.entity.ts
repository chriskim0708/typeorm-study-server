import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  /**
   * @PrimaryGeneratedColumn()
   * 자동으로 ID를 생성한다.
   * 데이터가 생성될 때마다 자동적으로 ID가 1씩 증가한다.
   *
   * Primary Column은 모든 테이블에서 기본적으로 존재해야한다.
   * 테이블 안에서 각각의 Row를 식별하는데 사용되는 Column이다.
   *
   * @PrimaryColumn()
   *
   * @PrimaryGeneratedColumn('uuid')
   * UUID를 사용하여 ID를 생성한다.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    // 타입 지정이 없으면 자동 유추되어 적용된다.
    type: 'varchar',
    // 데이터베이스 컬럼명
    // 프로퍼티 이름으로 자동 유추되어 적용된다.
    name: 'title',
    // 데이터 길이를 지정 가능한 type인 경우에 사용한다. (text처럼 가변 길이인 경우 에러)
    length: 300,
    // null이 가능한지 여부
    nullable: false,
    // update: false로 설정하면 처음 등록 이후 update가 불가능하다.
    update: true,
    // nullable: false인 경우 default 값을 지정할 수 있다.
    default: '',
    // find()를 실행할 때 기본으로 값을 불러올지
    // 기본값이 true
    // false면 조회 시에 나오지 않는다.
    // find() 조회 시에 직접 지정한 경우에만 조회가 가능하다.
    select: true,
    // 컬럼 중에서 유일무이한 값이 되야하는지 여부
    unique: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성 일자
  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createdAt: Date;

  // 데이터 업데이트 일자
  // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힌다.
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될 때마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  // Primary는 아니지만 자동으로 1씩 증가하는 Column을 만들고 싶을 때 사용한다.
  // Generated는 반드시 Column 뒤에 있어야 한다.
  @Column()
  @Generated('uuid')
  additionalId: string;
}
