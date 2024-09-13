import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Appointment } from "./Appoiment";
import { Credential } from "./Credential";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    birthdate!: string;

    @Column()
    nDni!: string;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments?: Appointment[];

    @OneToOne(() => Credential, { cascade: true })
    @JoinColumn()
    credential?: Credential;
}
