import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export enum STATUS {
  active = "active",
  cancelled = "cancelled",
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  time!: string;

  @Column()
  userId!: number;

  @Column({
    type: "enum",
    enum: STATUS,
    default: STATUS.active,
  })
  status!: STATUS;

  @ManyToOne(() => User, (user) => user.appointments)
  user!: User;
}