import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({

    tableName: 'projects'

})

class Project extends Model {

    @Column({
        type: DataType.STRING(100)
    })
    declare projectName:string

    @Column({
        type: DataType.STRING(100)
    })
    declare clientName:string

    @Column({
        type: DataType.STRING(100)
    })
    declare description:string

}

export default Project