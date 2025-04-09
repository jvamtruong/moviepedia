import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { Comment } from './comment.entity'

@Entity('threads')
export class Thread {
  @PrimaryColumn()
  parent_id: number

  @PrimaryColumn()
  child_id: number

  @ManyToOne(() => Comment, (comment) => comment.replies)
  @JoinColumn({ name: 'parent_id' })
  parent: Comment

  @OneToOne(() => Comment)
  @JoinColumn({ name: 'child_id' })
  child: Comment
}