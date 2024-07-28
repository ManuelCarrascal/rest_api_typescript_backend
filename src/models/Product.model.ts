import {Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
    tableName: 'products',
})

class  Product extends Model {
    @Column({
        //En sequelize no existe VARCHAR, se usa STRING
        type: DataType.STRING(50),
    })
    declare name:string;

    @Column({
        type: DataType.FLOAT
    })
    declare price: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare availability: boolean;
}

export default Product;