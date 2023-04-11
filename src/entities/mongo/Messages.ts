import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity(`Messages`)
export class Messages {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    message: string;

    @Column()
    from: string;

    @Column()
    to: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(message: string, from: string, to: string){
      this.message = message;
      this.from = from;
      this.to = to
    }
}
