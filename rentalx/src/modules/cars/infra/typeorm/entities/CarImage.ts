import {
  Column,
  CreateDateColumn,
  Entity,
  // ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

// import { Car } from "./Car";

@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  // @ManyToOne(() => Car)
  // car: Car;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { CarImage };
