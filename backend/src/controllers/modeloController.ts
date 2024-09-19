import type { Request, Response } from 'express'
import Project from '../models/modelo'

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body)
        try {
            await Project.create(req.body)
            res.send('Proyecto creado')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        res.send('Todos los proyectos')
    }

}