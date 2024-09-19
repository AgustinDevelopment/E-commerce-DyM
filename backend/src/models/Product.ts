import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'products',
  timestamps: true, // Agrega timestamps si es necesario
})
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  declare price: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ownerId: number;
}

export default Product;
