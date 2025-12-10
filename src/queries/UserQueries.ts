import { executeQuery } from "../support/sqlserverUtils";

export class UserQueries {
  static async getUsersByRole(role: string) {
    const query = `SELECT * FROM users WHERE role = '${role}'`;
    return await executeQuery(query);
  }

  static async getUserByField(field: string, value: string) {
    const query = `SELECT * FROM users WHERE ${field} = '${value}'`;
    return await executeQuery(query);
  }
}
