import {DB} from '../../database';
import moment from 'moment';
import {IAnimal} from '../../../../Interfaces/IAnimal';
import {IUser} from '../../../../Interfaces/IUser';
import {IAddAnimalRequest} from '../../../../Interfaces/IAddAnimalRequest';
import {IAddDataRequest, IData} from '../../../../Interfaces/IData';
import {IGetDataReportRequest, IGetDataReportResponse} from '../../../../Interfaces/IGetDataReportRequest';

export default class AnimalDao  {

  public async getById(id): Promise<any> {
    return new Promise((resolve) => {
      DB.con.query('SELECT * FROM animal where id = ? limit 1', [id], (err, rows) => {
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

  public async remove(id): Promise<any> {
    return new Promise((resolve) => {
        DB.con.query('DELETE FROM animal where id = ? limit 1', [id], (err, rows) => {
          if (err) {
            throw err;
          }
          const res = [];
          resolve(res);
        });
    });
  }

  public async getList(query, user): Promise<any> {
    const sql = `select a.id, a.dateBirth, d.weight, a.comment from animal as a
                 join
                     (SELECT
                         data1.*
                     FROM
                         data AS data1
                             LEFT OUTER JOIN
                         data AS data2 ON data2.animalId = data1.animalId
                             AND data2.date > data1.date
                     WHERE
                         data2.date IS NULL) as d on d.animalId = a.id
                 where companyId = ? limit ${+query.offset || 0}, ${+query.limit || 0}`;
    console.log('sql', sql, [user.companyId]);
    return new Promise((resolve) => {
      DB.con.query(sql,
        [user.companyId, query.offset || 0, query.limit || 10000],
        (err, rows) => {
          if (err) {
            throw err;
          }
          const res = [];

          for (const row of rows) {
            res.push(Object.assign({}, row));
          }
          resolve(res);
        });
    });
  }

  public async create(request: IAddAnimalRequest, user: IUser): Promise<IAnimal> {
    return new Promise((resolve, error) => {
      try {
        let dateLoss;
        if(request.dateLoss === '') {
          dateLoss = null;
        } else {
          dateLoss =  moment(request.dateLoss).format('YYYY-MM-DD HH:mm:ss');
        }
        console.log('dateLoss2', dateLoss);
        const animal: IAnimal = {
          id: moment(request.dateBirth).format('DDMMYYYY_' + (Math.random() * 1000).toFixed(0)),
          updatedBy: user.id,
          companyId: user.companyId,
          type: request.type,
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          dateBirth: moment(request.dateBirth).format('YYYY-MM-DD HH:mm:ss'),
          dateLoss: dateLoss,
          comment: request.comment,
        };
        const keys = Object.keys(animal);
        const values = keys.map((key) => animal[key]);
        const question = keys.map(() => '?').join(', ');
        const sql = `insert into animal ( ${keys.join(', ')} ) values ( ${question} )`;
        console.log('sql', sql, values);
        DB.con.query(sql,
          [...values], (err, res) => {
            if (err) {
              throw err;
            }
            resolve(animal);
          });
      } catch (e) {
        error(e);
      }
    });
  }

  public async update(animal): Promise<any> {
    return new Promise((resolve, error) => {
      try {
        const fields = {
          type: animal.type,
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          dateBirth: moment(animal.dateBirth).format('YYYY-MM-DD HH:mm:ss'),
          dateLoss: moment(animal.dateLoss).format('YYYY-MM-DD HH:mm:ss'),
          comment: animal.comment,
        };

        const keys = Object.keys(fields);
        const values = keys.map((key) => fields[key]);
        const params = keys.map((key) => key + ' = ?');
        console.log('update values', values);
        console.log('update params', params);
        console.log('animal id', animal.id);
        // 'update `users` set companyId = ?, email = ?, name = ?, password = ? where `id`= ? '

        const sql = `update animal set ${params.join(', ')} where id = ?`;
        console.log('sql', sql, values);
        DB.con.query(sql,
          [...values, animal.id], (err, res) => {
            if (err) {
              throw err;
            }
            resolve(fields);
          });
      } catch (e) {
        error(e);
      }
    });
  }

  public async addData(addData: IAddDataRequest, user): Promise<IData> {
    return new Promise((resolve, error) => {
      try {
        const fields: IData = {
          userId: user.id,
          date: moment(addData.date).format('YYYY-MM-DD HH:mm:ss'),
          weight: addData.weight,
          comment: addData.comment,
          animalId: addData.animalId,
        };

        const keys = Object.keys(fields);
        const values = keys.map((key) => fields[key]);
        const question = keys.map(() => '?').join(', ');
        const sql = `insert into app.data ( ${keys.join(', ')} ) values ( ${question} )`;
        console.log('server animal', fields);
        console.log('sql', sql, values);
        DB.con.query(sql, [...values], (err, res) => {
            if (err) {
              throw err;
            }
            fields.id = res.insertId;
            resolve(fields);
          });
      } catch (e) {
        error(e);
      }
    });
  }

  public async updateData(updateData: IData, user: IUser): Promise<IData> {
    return new Promise((resolve, error) => {
      try {
        const fields: IData = {
          // id: updateData.id,
          userId: user.id,
          date: moment(updateData.date).format('YYYY-MM-DD HH:mm:ss'),
          weight: updateData.weight,
          comment: updateData.comment,
          animalId: updateData.animalId,
        };

        const keys = Object.keys(fields);
        const values = keys.map((key) => fields[key]);
        const params = keys.map((key) => key + ' = ?');
        const sql = `update app.data set ${params.join(', ')}  where id = ?`;
        console.log('server userId', user.id);
        console.log('sql', sql, values);
        DB.con.query(sql, [...values, updateData.id], (err, res) => {
          if (err) {
            throw err;
          }
          // console.log('insertId', res.insertId);
          // fields.id = res.insertId;
          resolve(fields);
        });
      } catch (e) {
        error(e);
      }
    });
  }

  public async getDataByAnimal(id): Promise<IData[]> {
    return new Promise((resolve) => {
      DB.con.query('SELECT * FROM app.data where animalId = ? order by app.data.date', [id], (err, rows) => {
        if (err) {
          throw err;
        }
        const res = [];

        for (const row of rows) {
          res.push(Object.assign({}, row));
        }
        console.log('data', res);
        resolve(res);
      });
    });
  }

  public async getCountAnimals(user: IUser): Promise<any> {
    const sql = `select count(id) countId, MONTH(dateBirth) dateBirth
                 from animal
                 where companyId = ? group by MONTH(dateBirth)`;
    return new Promise((resolve) => {
      DB.con.query(sql,
        [user.companyId],
        (err, rows) => {
          if (err) {
            throw err;
          }
          const res = [];

          for (const row of rows) {
            res.push(Object.assign({}, row));
          }
          resolve(res);
        });
    })
  }

  public async getCountLossAnimals(user: IUser): Promise<any> {
    const sql = `select count(id) countId, MONTH(dateLoss) dateLoss
                 from animal
                 where companyId = ? and dateLoss is not null group by MONTH(dateLoss)`;
    return new Promise((resolve) => {
      DB.con.query(sql,
        [user.companyId],
        (err, rows) => {
          if (err) {
            throw err;
          }
          const res = [];

          for (const row of rows) {
            res.push(Object.assign({}, row));
          }
          resolve(res);
        });
    })
  }

  public async getDataReport(request: IGetDataReportRequest, user: IUser): Promise<IGetDataReportResponse[]> {
    return new Promise((resolve) => {
      const from = moment(request.from).format('YYYY-MM-DD');
      const to = moment(request.to).format('YYYY-MM-DD');

      DB.con.query(`SELECT a.id, a.type, a.dateBirth, d.weight, d.date from app.data as d
                    INNER join animal as a on d.animalId = a.id
                    WHERE a.companyId = ?
                    and a.type = ?
                    and d.date BETWEEN ? AND ?;`,
        [user.companyId, request.type, from, to], (err, rows) => {
        if (err) {
          throw err;
        }
        const res = [];

        for (const row of rows) {
          res.push(Object.assign({}, row));
        }
        console.log('data', res);
        resolve(res);
      });
    });
  }

  public async getDataById(id): Promise<IData[]> {
    return new Promise((resolve) => {
      DB.con.query('SELECT * FROM app.data where id = ? ', [id], (err, rows) => {
        if (err) {
          throw err;
        }
        const res = [];

        for (const row of rows) {
          res.push(Object.assign({}, row));
        }
        console.log('data', res);
        resolve(res[0]);
      });
    });
  }

  public async removeData(id): Promise<any>{
    return new Promise((resolve) => {
      DB.con.query('DELETE FROM app.data where id = ? limit 1', [id], (err, rows) => {
        if (err) {
          throw err;
        }
        const res = [];
        resolve(res);
      });
    });
  }
}
