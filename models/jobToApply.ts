import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne} from "typeorm"
import { User } from "./user"
import { Job } from "./jobs"


@Entity("job_to_apply")
export class ToApplyJob {

    @PrimaryGeneratedColumn()
    id: Number

    @ManyToOne(() => Job, job => job.to_apply, {onDelete: 'CASCADE',})
    job: Job
    @Column()
    job_id: number

    @ManyToOne(() => User, user => user.job, {onDelete: 'CASCADE',})
    user: User
    @Column()
    user_id: number

    @Column({default: 0})
    limit: number

    @Column()
    is_apply: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}