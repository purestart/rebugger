/**
 * 基础实例类
 */

export default abstract class BaseEntity {

  public id: string;

  public updateDate: string;
  
  public createDate: string;

  constructor(id: string, updateDate: string, createDate:string) {
    this.id = id;
    this.updateDate = updateDate;
    this.createDate = createDate;
  }
}
