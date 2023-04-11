import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { PostMidia } from "./PostMidia";
import { User } from "./User";

@Entity(`Post`)
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    message: string

    @Column()
    id_user: string;

    @ManyToOne(() => User, user => user.post)
    @JoinColumn({ name: 'id_user' })
    user: Post;

    @OneToMany(() => PostMidia, postMidia => postMidia.post)
    midia: PostMidia;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
