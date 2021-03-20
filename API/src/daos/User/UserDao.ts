import {DB} from 'src/database';
import {IUser} from '../../../../Interfaces/IUser';
import {ICompany} from '../../../../Interfaces/ICompany';



class UserDao {

  public async getByEmail(email): Promise<IUser> {
    // TODO
    return new Promise((resolve) => {
      DB.con.query('SELECT * FROM users where email = ? limit 1', [email], (err, rows) => {
        if (err) {
          throw err;
        }
        const res = [];

        for (const row of rows) {
          res.push(Object.assign({}, row));
        }
        resolve(res[0]);
      });
    });
  }

  public async getById(id): Promise<IUser> {
    return new Promise((resolve) => {
      DB.con.query('SELECT * FROM users where id = ? limit 1', [id], (err, rows) => {
        if (err) {
          throw err;
        }
        const res = [];

        for (const row of rows) {
          res.push(Object.assign({}, row));
        }
        resolve(res[0]);
      });
    });
  }

  public async getCompanyById(id): Promise<ICompany> {
    return new Promise((resolve) => {
      DB.con.query('SELECT * FROM companies where id = ? limit 1', [id], (err, rows) => {
        if (err) {
          throw err;
        }
        const res = [];

        for (const row of rows) {
          res.push(Object.assign({}, row));
        }
        resolve(res[0]);
      });
    });
  }

  public async addUser(query): Promise<any> {
    // TODO
    return new Promise((resolve, error) => {
      try {
        DB.con.query('insert into `users` ( `email`, `password`, `name`, `companyId`) values ( ?, ?, ?, ?)',
          [query.email, query.hash, query.name, 1], (err, res) => {
            if (err) {
              throw err;
            }
            console.log(res);
            resolve(res);
          });
      } catch (e) {
        error(e);
      }
    });
  }

  public async updateUser(user: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      DB.con.query('update `users` set companyId = ?, email = ?, name = ?, password = ? where `id`= ? ',
        [user.companyId, user.email, user.name, user.password, user.id], (err, res) => {
          if (err) {
            throw err;
          }
          resolve(res);
      });
    });
  }


  public async addCompany(query, userId): Promise<any> {
    return new Promise((resolve) => {
      DB.con.query('insert into `companies` ( `name`, `userId`) values ( ?, ?)',
        [query.companyName, userId], (err, res) => {
          if (err) {
            throw err;
          }
          console.log(res);
          resolve(res);
      });
    });
  }

  public async updateCompany(company: ICompany): Promise<any> {
    return new Promise((resolve) => {
      DB.con.query('update `companies` set `name` = ? where id = ?',
        [company.name, company.id], (err, res) => {
          if (err) {
            throw err;
          }
          resolve(res);
      });
    });
  }

  public async dropPassword(query, userId): Promise<any> {
    // TODO
    return new Promise((resolve) => {
      DB.con.query('update `users` set password = ? where `id`= ? ',
        [query.password, userId], (err, res) => {
          if (err) {
            throw err;
          }
          console.log(res);
          // for (const row of rows) {
          //   res.push(Object.assign({}, row));
          // }
          resolve(res);
        });
    });
  }

}

export default UserDao;
