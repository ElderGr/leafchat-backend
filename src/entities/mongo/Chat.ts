import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Messages } from "./Messages";

@Entity(`Chat`)
export class Chat {

    @ObjectIdColumn()
    id: ObjectID;

    @Column(`uuid`)
    participants: string[];

    @Column()
    name: string;

    @Column(type => Messages)
    messages: Messages[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
