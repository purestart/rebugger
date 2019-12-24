import BaseService from '../../base/service/baseService';

import mysql from '../../../utils/mysql';
import sequelize from 'sequelize';
import projectSchema from "../schema/projectSchema";
const ProjectDao = projectSchema(mysql, sequelize);

// 重新生成表
// ProjectDao.sync({ alter: true, force: true });

class ProjectService extends BaseService {
  constructor() {
    super(ProjectDao)
  }

}
const projectService = new ProjectService();
export default projectService;