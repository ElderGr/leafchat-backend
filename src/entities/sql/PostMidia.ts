import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Post } from "./Post";

@Entity(`PostMidia`)
export class PostMidia {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    id_post: string

    @ManyToOne(() => Post, post => post.midia)
    @JoinColumn({ name: 'id_post' })
    post: Post;

    @Column()
    file: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
