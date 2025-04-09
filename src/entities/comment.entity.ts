import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Movie } from './movie.entity'
import { User } from './user.entity'
import { Thread } from './thread.entity'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @ManyToOne(() => Movie, (movie) => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  author: User

  @OneToMany(() => Thread, (thread) => thread.parent)
  replies: Thread[]
}
