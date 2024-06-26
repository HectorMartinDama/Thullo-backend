import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { Course } from '../../domain/Course';
import { CourseRepository } from '../../domain/CourseRepository';
import { CourseEntity } from './typeorm/CourseEntity';
import { CourseDuration } from '../../domain/CourseDuration';
import { CourseName } from '../../domain/CourseName';

export class TypeOrmCourseRepository extends TypeOrmRepository<Course> implements CourseRepository {
  public save(course: Course): Promise<void> {
    return this.persist(course);
  }

  public async search(id: CourseId): Promise<Nullable<Course>> {
    //const repository = await this.repository();

    const course = new Course(id, new CourseName('asdsdsd'), new CourseDuration('asdsad'));

    return course;
  }

  protected entitySchema(): EntitySchema<Course> {
    return CourseEntity;
  }

  public async searchAll(): Promise<Course[]> {
    const repository = await this.repository();

    const courses = await repository.find();

    return courses;
  }
}
