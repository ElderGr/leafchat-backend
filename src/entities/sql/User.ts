import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Role } from "./Role";
import { Exclude } from "class-transformer";
import { Post } from "./Post";

@Entity(`User`)
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    id_role: string

    @ManyToOne(() => Role, role => role.user)
    @JoinColumn({ name: 'id_role' })
    role: Role;

    @OneToMany(() => Post, post => post.user)
    post: Post;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
