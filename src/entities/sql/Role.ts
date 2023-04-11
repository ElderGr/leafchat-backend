import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "./User";

@Entity(`Role`)
export class Role {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => User, user => user.role)
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
